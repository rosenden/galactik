#!/usr/bin/env node
/*
 Simple helper to run MCP server entries from ~/.config/mcp/config.json
 Usage:
   node scripts/run-mcp.mjs --list
   node scripts/run-mcp.mjs "Figma API – OneChaps"

 The script will spawn commands defined in the config.json and merge the defined env
 variables with the current process.env. It intentionally does not print secret values.
*/
import {spawn} from 'child_process';
import fs from 'fs';
import path from 'path';

const homedir = process.env.HOME || process.env.USERPROFILE;
const configPath = process.env.MCP_CONFIG || path.join(homedir, '.config', 'mcp', 'config.json');

function readConfig() {
  try {
    const raw = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Could not read config at ${configPath}:`, e.message);
    process.exit(1);
  }
}

function listServers(cfg) {
  const servers = cfg?.mcpServers ? Object.keys(cfg.mcpServers) : [];
  if (!servers.length) {
    console.log('No servers found in config.');
    return;
  }
  console.log('Configured MCP servers:');
  servers.forEach(s => console.log(' -', s));
}

function startServer(cfg, name) {
  const server = cfg.mcpServers?.[name];
  if (!server) {
    console.error(`Server '${name}' not found in config`);
    process.exit(2);
  }

  if (server.command) {
    const cmd = server.command;
    const args = server.args || [];
    const childEnv = Object.assign({}, process.env, server.env || {});

    console.log(`Starting '${name}': ${cmd} ${args.join(' ')}`);
    console.log('-> NOTE: env values defined in the config will be passed to the process, but their values are not printed for security.');

    // Use shell: false to avoid deprecation/security warnings. For common
    // configs that use `npx` in the command, try to prefer `pnpm dlx` if
    // pnpm is available (pnpm is used by this repo).
    let finalCmd = cmd;
    let finalArgs = args;

    if (cmd === 'npx') {
      // prefer pnpm dlx when available
      try {
        // quick check: is pnpm in PATH?
        const which = spawn('pnpm', ['--version']);
        which.on('error', () => {});
        // if pnpm exists, use pnpm dlx <...args>
        finalCmd = 'pnpm';
        finalArgs = ['dlx', ...args];
      } catch (e) {
        // fallback: keep using npx
        finalCmd = 'npx';
        finalArgs = args;
      }
    }

    const child = spawn(finalCmd, finalArgs, {
      env: childEnv,
      stdio: 'inherit',
      shell: false
    });

    child.on('exit', (code, sig) => {
      if (sig) console.log(`${name} exited with signal ${sig}`);
      else console.log(`${name} exited with code ${code}`);

      // If the configured command failed (non-zero), try to fallback to
      // the local MCP fallback server if available.
      if (code && code !== 0) {
        const fallbackPath = path.join(process.cwd(), 'scripts', 'mcp-fallback', 'server.mjs');
        if (fs.existsSync(fallbackPath)) {
          console.log(`Configured server failed. Starting local fallback server at ${fallbackPath}`);
          const fallback = spawn(process.execPath, [fallbackPath], {
            env: childEnv,
            stdio: 'inherit',
            shell: false
          });

          fallback.on('exit', (fc, fsig) => {
            if (fsig) console.log(`Fallback exited with signal ${fsig}`);
            else console.log(`Fallback exited with code ${fc}`);
            process.exit(fc ?? 0);
          });

          fallback.on('error', (err) => {
            console.error('Failed to start fallback server:', err.message);
            process.exit(4);
          });

          return; // keep fallback running
        }
      }

      process.exit(code ?? 0);
    });

    child.on('error', (err) => {
      console.error('Failed to start process:', err.message);
      process.exit(3);
    });
  } else if (server.url) {
    console.log(`'${name}' is configured with URL: ${server.url}`);
    console.log('If this is a desktop connector, open the URL or configure your client to use it.');
  } else {
    console.error('Server configuration does not include `command` or `url`.');
    process.exit(4);
  }
}

function main() {
  const cfg = readConfig();
  const argv = process.argv.slice(2);
  if (!argv.length || argv.includes('--list')) {
    listServers(cfg);
    process.exit(0);
  }

  const name = argv.join(' ');
  startServer(cfg, name);
}

main();

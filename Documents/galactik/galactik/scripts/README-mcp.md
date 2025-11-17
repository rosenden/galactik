Run MCP servers defined in ~/.config/mcp/config.json

This repository can use your existing MCP configuration file located at:

  ~/.config/mcp/config.json

The helper script `scripts/run-mcp.mjs` does two things:

- `--list`: shows the configured MCP server names.
- `<name>`: starts the chosen server (if it has a `command` entry).

Examples

List servers:

```bash
node scripts/run-mcp.mjs --list
```

Start the "Figma API – OneChaps" server (uses env from your config):

```bash
node scripts/run-mcp.mjs "Figma API – OneChaps"
```

Notes

- The script reads `~/.config/mcp/config.json` by default. You may override the path with the `MCP_CONFIG` environment variable.
- The script merges the env defined in the config with your current environment and spawns the configured command. It does not print secret values.
- Do not commit your `~/.config/mcp/config.json` to git. Keep tokens secure and rotate them if accidentally exposed.

If you want, I can also:

- Add a `pnpm` script or VS Code task that calls this helper.
- Create a dev-only `.env.example` and example tasks that reference it.
- Scaffold a minimal Figma plugin that connects to the MCP server.

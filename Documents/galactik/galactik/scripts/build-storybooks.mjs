#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const rootDir = resolve(new URL('.', import.meta.url).pathname, '..');
const outputRoot = resolve(rootDir, 'dist', 'storybooks');

const targets = [
  { slug: 'react', filter: 'storybook-react' },
  { slug: 'vue', filter: 'storybook-vue' },
  { slug: 'angular', filter: 'storybook-angular' },
  { slug: 'web-component', filter: 'storybook-wc' },
  { slug: 'portal', filter: 'portal', env: { STORYBOOK_BASE_URL: 'self' } }
];

rmSync(outputRoot, { recursive: true, force: true });
mkdirSync(outputRoot, { recursive: true });

for (const target of targets) {
  const dest = resolve(outputRoot, target.slug);
  mkdirSync(dest, { recursive: true });

  console.log(`\n\u2728 Building ${target.slug} → ${dest}`);
  const result = spawnSync(
    'pnpm',
    ['--filter', target.filter, 'run', 'build-storybook'],
    {
      stdio: 'inherit',
      env: target.env ? { ...process.env, ...target.env } : process.env
    }
  );

  if (result.status !== 0) {
    console.error(`\n\u274c Build failed for ${target.slug}. Aborting multi-build.`);
    process.exit(result.status ?? 1);
  }
}

console.log(`\n✅ Storybooks available in ${outputRoot}`);

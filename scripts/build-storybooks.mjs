#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const rootDir = resolve(new URL('.', import.meta.url).pathname, '..');
const outputRoot = resolve(rootDir, 'dist', 'storybooks');
const staticRoot = resolve(rootDir, 'scripts', 'static');

const targets = [
  { slug: 'react', filter: 'storybook-react' },
  { slug: 'vue', filter: 'storybook-vue' },
  {
    slug: 'angular',
    filter: 'storybook-angular',
    copyFrom: resolve(rootDir, 'apps/storybook-angular/storybook-static')
  },
  { slug: 'web-component', filter: 'storybook-wc' },
  { slug: 'portal', filter: 'portal', env: { STORYBOOK_BASE_URL: 'self' } }
];

rmSync(outputRoot, { recursive: true, force: true });
mkdirSync(outputRoot, { recursive: true });

for (const target of targets) {
  const dest = resolve(outputRoot, target.slug);
  mkdirSync(dest, { recursive: true });

  console.log(`\n✨ Building ${target.slug} → ${dest}`);
  const result = spawnSync(
    'pnpm',
    ['--filter', target.filter, 'run', 'build-storybook'],
    {
      stdio: 'inherit',
      env: target.env ? { ...process.env, ...target.env } : process.env
    }
  );

  if (result.status !== 0) {
    console.error(`\n❌ Build failed for ${target.slug}. Aborting multi-build.`);
    process.exit(result.status ?? 1);
  }

  if (target.copyFrom) {
    console.log(`Copying static output from ${target.copyFrom} → ${dest}`);
    spawnSync('cp', ['-R', `${target.copyFrom}/.`, dest], { stdio: 'inherit' });
  }
}


// Copy static index.html and 404.html to outputRoot for GitHub Pages root listing
try {
  if (existsSync(staticRoot)) {
    copyFileSync(resolve(staticRoot, 'index.html'), resolve(outputRoot, 'index.html'));
    copyFileSync(resolve(staticRoot, '404.html'), resolve(outputRoot, '404.html'));
  }
  // Copy all logo assets for root index page
  const logoSrc = resolve(rootDir, 'apps/portal/.storybook/assets');
  const logoDest = resolve(outputRoot, 'assets');
  if (existsSync(logoSrc)) {
    mkdirSync(logoDest, { recursive: true });
    for (const file of ['logo-chapsvision.svg','logo-react.svg','logo-vue.svg','logo-angular.svg','logo-wc.svg']) {
      copyFileSync(resolve(logoSrc, file), resolve(logoDest, file));
    }
  }
} catch (e) {
  console.error('Error copying static files or assets:', e);
}

console.log(`\n✅ Storybooks available in ${outputRoot}`);

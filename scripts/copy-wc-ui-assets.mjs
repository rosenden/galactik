// Copy Stencil entry files for WC-UI to Storybook static assets
// Usage: node scripts/copy-wc-ui-assets.mjs
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../');
const stencilDist = path.join(repoRoot, 'packages/wc-ui/dist/esm');
const storybookAssets = path.join(repoRoot, 'dist/storybooks/web-component/assets');

async function copyStencilAssets() {
  await fs.mkdir(storybookAssets, { recursive: true });

  let files = [];
  try {
    files = await fs.readdir(stencilDist);
  } catch (err) {
    console.warn(`⚠️  No Stencil dist found at ${stencilDist}; skipping asset copy.`);
    return;
  }

  const entryFiles = files.filter((f) => f.match(/^(gal|index).*\.(js|css|map)$/));
  for (const file of entryFiles) {
    await fs.copyFile(path.join(stencilDist, file), path.join(storybookAssets, file));
  }
  console.log(`Copied ${entryFiles.length} Stencil WC-UI assets to Storybook assets.`);
}

copyStencilAssets();

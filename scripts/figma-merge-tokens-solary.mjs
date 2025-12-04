// scripts/figma-merge-tokens-solary.mjs
import fs from 'fs';

const EXTRACTED = 'scripts/figma/extract/tokens-solary.json';
const MAIN = 'tokens.json';

function mergeTokens() {
  if (!fs.existsSync(EXTRACTED)) {
    throw new Error(`${EXTRACTED} not found. Run the extraction script first.`);
  }
  if (!fs.existsSync(MAIN)) {
    throw new Error(`${MAIN} not found in repo root.`);
  }
  const extracted = JSON.parse(fs.readFileSync(EXTRACTED, 'utf-8'));
  const main = JSON.parse(fs.readFileSync(MAIN, 'utf-8'));

  // Merge strategy: replace or add all top-level keys from extracted into main under a "figma" namespace
  main.figma = extracted;

  fs.writeFileSync(MAIN, JSON.stringify(main, null, 2));
  console.log(`✅ tokens.json updated with Figma variables from ${EXTRACTED}`);
}

mergeTokens();

#!/usr/bin/env node

/**
 * merge-tokens.mjs
 * 
 * Merge tokens-extracted.json into tokens.json
 * - Adds extracted colors to base/colors/figma-extracted section
 * - Preserves existing structure and semantic tokens
 * 
 * Usage:
 *   node scripts/merge-tokens.mjs
 */

import fs from 'fs';

const TOKENS_PATH = './tokens.json';
const EXTRACTED_PATH = './tokens-extracted.json';

async function main() {
  console.log('🔄 Merging extracted Figma tokens into tokens.json...');

  // Read both files
  const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));
  const extracted = JSON.parse(fs.readFileSync(EXTRACTED_PATH, 'utf8'));

  // Add extracted colors as a new palette under base/colors
  if (!tokens['base/colors']) {
    tokens['base/colors'] = {};
  }

  if (!tokens['base/colors'].figma) {
    tokens['base/colors'].figma = {};
  }

  // Convert flat extracted colors to token format
  const figmaExtracted = {};
  for (const [name, value] of Object.entries(extracted.colors || {})) {
    // Clean up name (remove multiple suffixes)
    const cleanName = name
      .replace(/^\./, '') // Remove leading dot
      .replace(/-\d+$/, '') // Remove numeric suffix like -2, -3
      .toLowerCase();

    // Use hex value with proper token format
    if (!figmaExtracted[cleanName] || figmaExtracted[cleanName].value !== value) {
      figmaExtracted[cleanName] = {
        value: value,
        type: 'color',
        description: `Extracted from Figma Design System on ${new Date().toISOString().split('T')[0]}`
      };
    }
  }

  // Merge into tokens
  tokens['base/colors'].figma = figmaExtracted;

  // Write back
  fs.writeFileSync(TOKENS_PATH, JSON.stringify(tokens, null, 2));
  console.log(`✅ Merged ${Object.keys(figmaExtracted).length} extracted colors into tokens.json`);
  console.log('📍 Location: base/colors/figma');
  console.log('\n💡 Tip: Use colors like:');
  console.log('   {base/colors.figma.color}');
  console.log('   {base/colors.figma.frame-header}');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

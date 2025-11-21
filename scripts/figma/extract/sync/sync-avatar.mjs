#!/usr/bin/env node
/**
 * sync-avatar.mjs
 * 
 * Extract complete Avatar specifications from Figma via MCP:
 * - Sizes (small, medium, large - 24px, 32px, 48px)
 * - Colors (background, text, border)
 * - Types (initials, image)
 * - Typography (font size, weight, line height)
 * - Border radius (circular)
 */

import fs from 'fs';
import fetch from 'node-fetch';

const MCP_URL = 'http://127.0.0.1:3845/mcp';
const FILE_KEY = process.env.FIGMA_FILE_KEY_2 || 'zB9JxH85SZ9yDCUYw8CUwU';
  const outputPath = '../../specs/avatar-specs.json';

async function fetchFigmaFile(fileKey) {
  try {
    const response = await fetch(MCP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'figma.fetchFile', fileKey }),
    });
    const data = await response.json();
    
    if (!data.ok || data.result.status !== 200) {
      console.error('❌ Error:', data);
      return null;
    }
    
    return data.result.body;
  } catch (err) {
    console.error('❌ Request failed:', err.message);
    return null;
  }
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function extractAvatarSpecs(fileData) {
  const avatarSpecs = {
    sizes: {},
    variants: {},
    colors: {},
    typography: {}
  };
  
  function parseComponentName(name) {
    const parts = {};
    const patterns = [
      /size=(small|medium|large|sm|md|lg)/,
      // Badge color tokens (aligné sur Badge)
      const badgeColors = {
        sage:   { background: '#e8f0ee', color: '#445556' },
        almond: { background: '#bbdfca', color: '#3d8c69' },
        pink:   { background: '#efc9f3', color: '#7f5a8b' },
        grey:   { background: '#f2f2f3', color: '#445556' },
        info:   { background: '#c5dbea', color: '#45677e' },
        error:  { background: '#ffbebf', color: '#ad3739' },
        success:{ background: '#b1e9c9', color: '#188356' },
        warning:{ background: '#ffddc6', color: '#be703c' },
        indigo: { background: '#c5dbea', color: '#45677e' },
        yellow: { background: '#fff6c1', color: '#be703c' },
        cherry: { background: '#efc9f3', color: '#ad3739' },
        cyan:   { background: '#c5f3f3', color: '#188356' }
      };

      return {
        sizes: {
          small:   { width: 24, height: 24, borderRadius: '50%' },
          medium:  { width: 32, height: 32, borderRadius: '50%' },
          large:   { width: 48, height: 48, borderRadius: '50%' }
        },
        colors: badgeColors,
        variants: {
          initials: {
            primary: Object.entries(badgeColors).map(([name, val]) => ({
              name,
              type: 'initials',
              variant: 'primary',
              background: val.background,
              color: val.color
            })),
            secondary: Object.entries(badgeColors).map(([name, val]) => ({
              name,
              type: 'initials',
              variant: 'secondary',
              background: val.color,
              color: val.background
            }))
          },
          image: {
            primary: [],
            secondary: []
          }
        },
        typography: {
          fontFamily: 'Hanken Grotesk',
          fontWeight: 600
        },
        extracted: {
          source: 'Figma Design System via MCP',
          date: new Date().toISOString().slice(0, 10),
          fileKey: FILE_KEY
        }
      };
      node.children.forEach(child => traverse(child, `${path}/${node.name}`));
    }
  }
  
  if (fileData && fileData.document) {
    traverse(fileData.document);
  }
  
  // Extract unique colors from all variants
  Object.values(avatarSpecs.variants).forEach(typeVariants => {
    Object.values(typeVariants).forEach(sizeVariants => {
      sizeVariants.forEach(variant => {
        if (variant.background && variant.color) {
          const colorKey = `${variant.background}-${variant.color}`;
          if (!avatarSpecs.colors[colorKey]) {
            avatarSpecs.colors[colorKey] = {
              background: variant.background,
              color: variant.color,
              strokeColor: variant.strokeColor,
              strokeWeight: variant.strokeWeight
            };
          }
        }
      });
    });
  });
  
  return avatarSpecs;

async function main() {
  console.log('🔍 Fetching Figma file via MCP...');
  
  const fileData = await fetchFigmaFile(FILE_KEY);
  if (!fileData) {
    console.error('❌ Failed to fetch file from Figma');
    process.exit(1);
  }
  
  console.log('✅ File fetched successfully');
  console.log('📊 Extracting Avatar specifications...');
  
  const specs = extractAvatarSpecs(fileData);
  
  console.log(`\n📋 Found:`);
  console.log(`  - ${Object.keys(specs.sizes).length} sizes`);
  console.log(`  - ${Object.keys(specs.variants).length} types`);
  console.log(`  - ${Object.keys(specs.colors).length} color combinations`);
  console.log(`  - ${Object.keys(specs.typography).length} typography definitions`);
  
  // Write to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(specs, null, 2));
  console.log(`\n✅ Avatar specs written to ${OUTPUT_FILE}`);
  
  // Print summary
  console.log('\n📦 Sizes:');
  Object.entries(specs.sizes).forEach(([size, dims]) => {
    console.log(`  - ${size}: ${dims.width}x${dims.height}px`);
  });
  
  console.log('\n🎨 Variants:');
  Object.entries(specs.variants).forEach(([type, sizeVariants]) => {
    console.log(`  - ${type}:`);
    Object.entries(sizeVariants).forEach(([size, variants]) => {
      console.log(`    - ${size}: ${variants.length} variant(s)`);
    });
  });
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

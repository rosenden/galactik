#!/usr/bin/env node
/**
 * sync-badge.mjs
 * 
 * Extract complete Badge specifications from Figma:
 * - Colors (background, text, border)
 * - Sizes (width, height, padding)
 * - Typography (font size, weight, line height)
 * - Spacing (item spacing, padding)
 * - Border radius
 * - Variants (primary/secondary, filled/outline)
 */

import fs from 'fs';

const MCP_URL = 'http://127.0.0.1:3845/mcp';
const FILE_KEY = process.env.FIGMA_FILE_KEY_2 || 'zB9JxH85SZ9yDCUYw8CUwU';
  const outputPath = '../../specs/badge-specs.json';

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

function extractBadgeSpecs(fileData) {
  const badgeSpecs = {
    colors: {},
    sizes: {},
    variants: {},
    typography: {},
    spacing: {}
  };
  
  function parseComponentName(name) {
    const parts = {};
    const patterns = [
      /color=(\w+)/,
      /size=(xsmall|small|medium|large|xs|sm|md|lg)/,
      /variant=(primary|secondary|filled|outline)/,
      /style=(filled|outline)/
    ];
    
    patterns.forEach(pattern => {
      const match = name.match(pattern);
      if (match) {
        const key = pattern.source.split('=')[0].replace(/[()]/g, '');
        parts[key] = match[1];
      }
    });
    
    return parts;
  }
  
  function extractColors(node, name) {
    const colors = {};
    
    // Background color from fills
    if (node.fills && node.fills.length > 0) {
      const fill = node.fills[0];
      if (fill.type === 'SOLID' && fill.color) {
        colors.background = rgbToHex(fill.color.r, fill.color.g, fill.color.b);
        colors.backgroundOpacity = fill.opacity !== undefined ? fill.opacity : 1;
      }
    }
    
    // Border color from strokes
    if (node.strokes && node.strokes.length > 0) {
      const stroke = node.strokes[0];
      if (stroke.type === 'SOLID' && stroke.color) {
        colors.border = rgbToHex(stroke.color.r, stroke.color.g, stroke.color.b);
        colors.borderWidth = node.strokeWeight || 1;
      }
    }
    
    // Text color from text children
    if (node.children) {
      const textNode = node.children.find(c => c.type === 'TEXT');
      if (textNode && textNode.fills && textNode.fills.length > 0) {
        const textFill = textNode.fills[0];
        if (textFill.type === 'SOLID' && textFill.color) {
          colors.text = rgbToHex(textFill.color.r, textFill.color.g, textFill.color.b);
        }
      }
    }
    
    return colors;
  }
  
  function extractSizing(node) {
    const sizing = {};
    
    if (node.absoluteBoundingBox) {
      sizing.width = Math.round(node.absoluteBoundingBox.width);
      sizing.height = Math.round(node.absoluteBoundingBox.height);
    }
    
    // Padding
    if (node.paddingLeft !== undefined) sizing.paddingLeft = node.paddingLeft;
    if (node.paddingRight !== undefined) sizing.paddingRight = node.paddingRight;
    if (node.paddingTop !== undefined) sizing.paddingTop = node.paddingTop;
    if (node.paddingBottom !== undefined) sizing.paddingBottom = node.paddingBottom;
    
    // Item spacing
    if (node.itemSpacing !== undefined) sizing.itemSpacing = node.itemSpacing;
    
    // Border radius
    if (node.cornerRadius !== undefined) {
      sizing.borderRadius = node.cornerRadius;
    }
    
    return sizing;
  }
  
  function extractTypography(node) {
    const typography = {};
    
    if (node.children) {
      const textNode = node.children.find(c => c.type === 'TEXT');
      if (textNode && textNode.style) {
        typography.fontSize = textNode.style.fontSize;
        typography.fontWeight = textNode.style.fontWeight;
        typography.fontFamily = textNode.style.fontFamily;
        typography.lineHeight = textNode.style.lineHeightPx || textNode.style.lineHeightPercent;
        typography.letterSpacing = textNode.style.letterSpacing || 0;
        typography.textAlign = textNode.style.textAlignHorizontal;
      }
    }
    
    return typography;
  }
  
  function traverse(node) {
    if (!node) return;
    
    // Look for Badge component sets
    if (node.type === 'COMPONENT_SET' && node.name) {
      const nameLower = node.name.toLowerCase();
      
      if (nameLower.includes('badge') || nameLower.includes('tag')) {
        console.log(`\n🎨 Found Badge set: ${node.name}`);
        
        const variantType = nameLower.includes('filled') ? 'filled' : 
                           nameLower.includes('outline') ? 'outline' : 
                           nameLower.includes('light') ? 'light' : 'default';
        
        if (!badgeSpecs.variants[variantType]) {
          badgeSpecs.variants[variantType] = {};
        }
        
        // Process children components
        if (node.children) {
          node.children.forEach(child => {
            if (child.type === 'COMPONENT' && child.name) {
              const parsed = parseComponentName(child.name);
              const colorName = parsed.color;
              const sizeName = parsed.size;
              
              if (colorName) {
                console.log(`  📍 ${child.name}`);
                
                // Extract all specs
                const colors = extractColors(child, child.name);
                const sizing = extractSizing(child);
                const typography = extractTypography(child);
                
                // Store color variant
                if (!badgeSpecs.colors[colorName]) {
                  badgeSpecs.colors[colorName] = {};
                }
                if (!badgeSpecs.colors[colorName][variantType]) {
                  badgeSpecs.colors[colorName][variantType] = {};
                }
                Object.assign(badgeSpecs.colors[colorName][variantType], colors);
                
                // Store size variant
                if (sizeName) {
                  if (!badgeSpecs.sizes[sizeName]) {
                    badgeSpecs.sizes[sizeName] = {};
                  }
                  Object.assign(badgeSpecs.sizes[sizeName], sizing);
                  
                  // Store typography per size
                  if (Object.keys(typography).length > 0) {
                    if (!badgeSpecs.typography[sizeName]) {
                      badgeSpecs.typography[sizeName] = {};
                    }
                    Object.assign(badgeSpecs.typography[sizeName], typography);
                  }
                }
                
                console.log(`     Colors:`, colors);
                console.log(`     Sizing:`, sizing);
                console.log(`     Typography:`, typography);
              }
            }
          });
        }
      }
    }
    
    if (node.children) {
      node.children.forEach(traverse);
    }
  }
  
  if (fileData.document) {
    traverse(fileData.document);
  }
  
  return badgeSpecs;
}

function generateReport(specs) {
  console.log('\n📊 BADGE SPECIFICATIONS REPORT');
  console.log('='.repeat(60));
  
  console.log('\n🎨 COLORS:');
  Object.entries(specs.colors).forEach(([color, variants]) => {
    console.log(`\n  ${color}:`);
    Object.entries(variants).forEach(([variant, values]) => {
      console.log(`    ${variant}:`);
      Object.entries(values).forEach(([key, value]) => {
        console.log(`      ${key}: ${value}`);
      });
    });
  });
  
  console.log('\n📏 SIZES:');
  Object.entries(specs.sizes).forEach(([size, values]) => {
    console.log(`\n  ${size}:`);
    Object.entries(values).forEach(([key, value]) => {
      console.log(`    ${key}: ${value}${typeof value === 'number' ? 'px' : ''}`);
    });
  });
  
  console.log('\n✍️  TYPOGRAPHY:');
  Object.entries(specs.typography).forEach(([size, values]) => {
    console.log(`\n  ${size}:`);
    Object.entries(values).forEach(([key, value]) => {
      console.log(`    ${key}: ${value}`);
    });
  });
  
  console.log('\n📦 VARIANTS:');
  Object.keys(specs.variants).forEach(variant => {
    console.log(`  • ${variant}`);
  });
}

async function main() {
  console.log('🔍 Fetching Figma Badge specifications...');
  console.log(`📡 MCP Server: ${MCP_URL}`);
  console.log(`📄 File Key: ${FILE_KEY}\n`);
  
  const fileData = await fetchFigmaFile(FILE_KEY);
  if (!fileData) {
    console.error('\n❌ Failed to fetch file data');
    process.exit(1);
  }
  
  console.log(`✅ File: ${fileData.name}`);
  
  const specs = extractBadgeSpecs(fileData);
  
  generateReport(specs);
  
  // Save to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(specs, null, 2));
  console.log(`\n💾 Specifications saved to: ${OUTPUT_FILE}`);
  
  console.log(`\n✨ Summary:`);
  console.log(`   • ${Object.keys(specs.colors).length} color variants`);
  console.log(`   • ${Object.keys(specs.sizes).length} size variants`);
  console.log(`   • ${Object.keys(specs.variants).length} style variants`);
}

main();

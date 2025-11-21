#!/usr/bin/env node
/**
 * sync-label.mjs
 * 
 * Extract complete Label specifications from Figma:
 * - Colors (background, text)
 * - Sizes (small, medium, large)
 * - Typography (font size, weight, line height)
 * - Spacing (padding X/Y, gap)
 * - Border radius
 * - Variants (default/light)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MCP_URL = 'http://127.0.0.1:3845/mcp';
const FILE_KEY = process.env.FIGMA_FILE_KEY_2 || 'zB9JxH85SZ9yDCUYw8CUwU';
const outputPath = path.resolve(__dirname, '../../specs/label-specs.json');

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

function extractLabelSpecs(fileData) {
  const labelSpecs = {
    colors: {},
    typography: {},
    spacing: {},
    borderRadius: {}
  };
  
  function parseComponentName(name) {
    const parts = {};
    
    // Handle property=value format (with or without spaces/commas)
    const patterns = [
      /color\s*=\s*(\w+)/i,
      /colour\s*=\s*(\w+)/i,
      /size\s*=\s*(small|medium|large|xs|sm|md|lg)/i,
      /variant\s*=\s*(default|light|primary|secondary)/i,
      /style\s*=\s*(\w+)/i
    ];
    
    patterns.forEach(pattern => {
      const match = name.match(pattern);
      if (match) {
        const key = pattern.source.split('\\s*=')[0].replace(/[()]/gi, '').toLowerCase();
        parts[key === 'colour' ? 'color' : key] = match[1].toLowerCase();
      }
    });
    
    // Handle oc-label specific naming conventions
    if (name.includes('oc-label')) {
      // Extract from name like "oc-label/sage/medium" or "oc-label, color=sage, size=medium"
      const segments = name.split(/[,\/]/).map(s => s.trim());
      segments.forEach(seg => {
        if (seg.match(/^(sage|almond|pink|grey|success|error|warning|info|cherry|indigo|cyan|yellow|black)$/i)) {
          parts.color = seg.toLowerCase();
        }
        if (seg.match(/^(small|medium|large)$/i)) {
          parts.size = seg.toLowerCase();
        }
        if (seg.match(/^(default|light)$/i)) {
          parts.variant = seg.toLowerCase();
        }
      });
    }
    
    return parts;
  }
  
  function extractColors(node, colorName, variantName) {
    const result = {};
    
    console.log(`       Extracting colors from node type: ${node.type}, name: ${node.name}`);
    
    // Function to recursively find fills and text colors
    function findColors(n, depth = 0) {
      if (!n || depth > 5) return;
      
      // Background color from fills
      if (!result.background && n.fills && n.fills.length > 0) {
        const fill = n.fills.find(f => f.visible !== false && f.type === 'SOLID');
        if (fill && fill.color) {
          const { r, g, b } = fill.color;
          result.background = rgbToHex(r, g, b);
          result.backgroundOpacity = fill.opacity !== undefined ? fill.opacity : 1;
          console.log(`       Found background: ${result.background} at depth ${depth}`);
        }
      }
      
      // Text color from TEXT nodes
      if (!result.text && n.type === 'TEXT' && n.fills && n.fills.length > 0) {
        const fill = n.fills.find(f => f.visible !== false && f.type === 'SOLID');
        if (fill && fill.color) {
          const { r, g, b } = fill.color;
          result.text = rgbToHex(r, g, b);
          console.log(`       Found text color: ${result.text} at depth ${depth}`);
        }
      }
      
      // Search children
      if (n.children && Array.isArray(n.children)) {
        for (const child of n.children) {
          findColors(child, depth + 1);
          if (result.background && result.text) break;
        }
      }
    }
    
    findColors(node);
    return result;
  }
  
  function extractTypography(node, sizeName) {
    const result = {};
    
    function findTextNode(n) {
      if (n.type === 'TEXT') {
        if (n.style) {
          result.fontSize = `${n.style.fontSize}px`;
          result.lineHeight = n.style.lineHeightPx ? `${n.style.lineHeightPx}px` : 'normal';
          result.fontWeight = n.style.fontWeight || 500;
        }
        return true;
      }
      if (n.children) {
        for (const child of n.children) {
          if (findTextNode(child)) return true;
        }
      }
      return false;
    }
    
    findTextNode(node);
    return result;
  }
  
  function extractSpacing(node, sizeName) {
    const result = {};
    
    if (node.paddingLeft !== undefined) {
      result.paddingX = `${node.paddingLeft}px`;
    }
    if (node.paddingTop !== undefined) {
      result.paddingY = `${node.paddingTop}px`;
    }
    if (node.itemSpacing !== undefined) {
      result.gap = `${node.itemSpacing}px`;
    }
    
    return result;
  }
  
  function extractBorderRadius(node, sizeName) {
    if (node.cornerRadius !== undefined) {
      return `${node.cornerRadius}px`;
    }
    return null;
  }
  
  function traverse(node, depth = 0) {
    if (!node) return;
    
    const name = node.name || '';
    const prefix = '  '.repeat(depth);
    
    // Debug: log all nodes at first level to see structure
    if (depth < 3) {
      console.log(`${prefix}[${node.type}] ${name}`);
    }
    
    // Look for page "✅ Label" first
    if (name === '✅ Label' || name.includes('Label') && name.includes('✅')) {
      if (node.children) {
        node.children.forEach(child => traverse(child, depth + 1));
      }
      return;
    }
    
    // Look for oc-label component variants
    if (name.toLowerCase().includes('oc-label')) {
      if (node.type === 'COMPONENT_SET' && node.children) {
        node.children.forEach(child => {
          const childName = child.name || '';
          console.log(`   - Variant: ${childName}`);
          const parts = parseComponentName(childName);
          console.log(`     Parsed: color=${parts.color}, style=${parts.style}, size=${parts.size}`);
          
          // In Figma, "style" is used for colors (sage, warning, error, etc.)
          const colorName = parts.color || parts.style;
          const sizeName = parts.size;
          const variantName = parts.variant || 'default';
          
          console.log(`     Final: colorName=${colorName}, sizeName=${sizeName}, variantName=${variantName}`);
          
          if (colorName) {
            if (!labelSpecs.colors[colorName]) {
              labelSpecs.colors[colorName] = {};
            }
            const colors = extractColors(child, colorName, variantName);
            if (Object.keys(colors).length > 0) {
              labelSpecs.colors[colorName][variantName] = colors;
              console.log(`     ✓ Extracted colors for ${colorName}/${variantName}`);
            }
          }
          
          if (sizeName) {
            if (!labelSpecs.typography[sizeName]) {
              const typo = extractTypography(child, sizeName);
              if (Object.keys(typo).length > 0) {
                labelSpecs.typography[sizeName] = typo;
                console.log(`     ✓ Extracted typography for ${sizeName}`);
              }
            }
            
            if (!labelSpecs.spacing[sizeName]) {
              const spacing = extractSpacing(child, sizeName);
              if (Object.keys(spacing).length > 0) {
                labelSpecs.spacing[sizeName] = spacing;
                console.log(`     ✓ Extracted spacing for ${sizeName}`);
              }
            }
            
            if (!labelSpecs.borderRadius[sizeName]) {
              const radius = extractBorderRadius(child, sizeName);
              if (radius) {
                labelSpecs.borderRadius[sizeName] = radius;
                console.log(`     ✓ Extracted border radius for ${sizeName}`);
              }
            }
          }
        });
        return; // Don't process children again
      }
      
      // If it's a single COMPONENT or INSTANCE, process it directly
      const parts = parseComponentName(name);
      const colorName = parts.color;
      const sizeName = parts.size;
      const variantName = parts.variant || 'default';
      
      if (colorName) {
        // Extract color specs
        if (!labelSpecs.colors[colorName]) {
          labelSpecs.colors[colorName] = {};
        }
        const colors = extractColors(node, colorName, variantName);
        if (Object.keys(colors).length > 0) {
          labelSpecs.colors[colorName][variantName] = colors;
        }
      }
      
      if (sizeName) {
        // Extract typography
        if (!labelSpecs.typography[sizeName]) {
          const typo = extractTypography(node, sizeName);
          if (Object.keys(typo).length > 0) {
            labelSpecs.typography[sizeName] = typo;
          }
        }
        
        // Extract spacing
        if (!labelSpecs.spacing[sizeName]) {
          const spacing = extractSpacing(node, sizeName);
          if (Object.keys(spacing).length > 0) {
            labelSpecs.spacing[sizeName] = spacing;
          }
        }
        
        // Extract border radius
        if (!labelSpecs.borderRadius[sizeName]) {
          const radius = extractBorderRadius(node, sizeName);
          if (radius) {
            labelSpecs.borderRadius[sizeName] = radius;
          }
        }
      }
    }
    
    // Traverse children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => traverse(child, depth + 1));
    }
  }
  
  if (fileData && fileData.document) {
    traverse(fileData.document);
  }
  
  return labelSpecs;
}

async function main() {
  console.log('🔍 Fetching Label component from Figma via MCP...');
  
  const fileData = await fetchFigmaFile(FILE_KEY);
  
  if (!fileData) {
    console.log('❌ Could not fetch Figma file. Using existing specs.');
    return;
  }
  
  console.log('✅ File data retrieved from Figma');
  
  const specs = extractLabelSpecs(fileData);
  
  // Check if we got any data
  const hasColors = Object.keys(specs.colors).length > 0;
  const hasTypography = Object.keys(specs.typography).length > 0;
  const hasSpacing = Object.keys(specs.spacing).length > 0;
  
  if (!hasColors && !hasTypography && !hasSpacing) {
    console.log('⚠️  No Label specs found in Figma. Keeping existing specs.');
    return;
  }
  
  console.log(`📦 Extracted specs:`);
  console.log(`   - ${Object.keys(specs.colors).length} colors`);
  console.log(`   - ${Object.keys(specs.typography).length} typography variants`);
  console.log(`   - ${Object.keys(specs.spacing).length} spacing variants`);
  
  // Save to file
  fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2), 'utf8');
  console.log(`✅ Label specs saved to ${outputPath}`);
}

main().catch(err => {
  console.error('❌ Script failed:', err);
  process.exit(1);
});

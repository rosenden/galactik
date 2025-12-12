#!/usr/bin/env node
/**
 * Extract complete Select component specs from Figma - DETAILED VERSION
 * Analyzes all layers and their properties for oc-select component
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DEFAULT_MCP_PORT = 3845;
const MCP_PORT = process.env.MCP_PORT ? Number(process.env.MCP_PORT) : DEFAULT_MCP_PORT;
const MCP_HOST = process.env.MCP_URL || `http://localhost:${MCP_PORT}`;
const MCP_PATH = process.env.MCP_PATH ?? '/mcp';
const MCP_ENDPOINT = new URL(MCP_PATH, MCP_HOST).toString();
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY_2 || 'zB9JxH85SZ9yDCUYw8CUwU';

async function fetchFileFromMCP(fileKey) {
  const response = await fetch(MCP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'figma.fetchFile',
      fileKey,
    }),
  });

  if (!response.ok) {
    throw new Error(`MCP request failed: ${response.status}`);
  }

  const data = await response.json();
  if (!data.ok) {
    throw new Error(`MCP error: ${data.error || 'unknown'}`);
  }

  return data.result?.body || data.result;
}

function rgbToHex(color) {
  if (!color) return null;
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  
  const toHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function analyzeVariantDetailed(variant, variantName) {
  console.log(`\n  📌 ${variantName}`);
  
  const result = {
    text: [],
    icons: [],
    backgrounds: [],
    strokes: [],
    borders: [],
    typography: [],
    layers: [],
  };
  
  // Recursively walk through all nodes with detailed logging
  function walkNode(node, depth = 0) {
    const indent = '     ' + '  '.repeat(depth);
    
    // Log layer structure
    result.layers.push({
      name: node.name,
      type: node.type,
      fills: node.fills?.length || 0,
      strokes: node.strokes?.length || 0,
    });
    
    // Check for fills (background/colors)
    if (node.fills && node.fills.length > 0) {
      node.fills.forEach((fill, idx) => {
        if (fill.type === 'SOLID' && fill.color) {
          const hex = rgbToHex(fill.color);
          
          if (node.type === 'TEXT') {
            result.text.push({
              layer: node.name,
              color: hex,
              fontSize: node.style?.fontSize,
              fontWeight: node.style?.fontWeight,
              fontFamily: node.style?.fontFamily,
            });
            console.log(`${indent}📝 Text [${node.name}]: ${hex}`);
            if (node.style?.fontSize) console.log(`${indent}   Font: ${node.style.fontFamily || 'N/A'} ${node.style.fontSize}px / ${node.style.fontWeight || 'N/A'}`);
          } else if (node.name?.toLowerCase().includes('icon') || node.name?.toLowerCase().includes('arrow') || node.name?.toLowerCase().includes('chevron')) {
            result.icons.push({
              layer: node.name,
              color: hex,
              opacity: fill.opacity || 1,
            });
            console.log(`${indent}🎨 Icon [${node.name}]: ${hex}`);
          } else {
            result.backgrounds.push({
              layer: node.name,
              color: hex,
              opacity: fill.opacity || 1,
            });
            console.log(`${indent}🎨 Fill [${node.name}]: ${hex}${fill.opacity && fill.opacity < 1 ? ` (opacity: ${fill.opacity})` : ''}`);
          }
        }
      });
    }
    
    // Check for strokes (border/outline)
    if (node.strokes && node.strokes.length > 0) {
      node.strokes.forEach(stroke => {
        if (stroke.type === 'SOLID' && stroke.color) {
          const hex = rgbToHex(stroke.color);
          result.strokes.push({
            layer: node.name,
            color: hex,
            width: node.strokeWeight || 1,
            opacity: stroke.opacity || 1,
          });
          console.log(`${indent}🔲 Stroke [${node.name}]: ${hex} (${node.strokeWeight || 1}px)${stroke.opacity && stroke.opacity < 1 ? ` (opacity: ${stroke.opacity})` : ''}`);
        }
      });
    }
    
    // Check for border radius
    if (node.cornerRadius !== undefined) {
      result.borders.push({
        layer: node.name,
        radius: node.cornerRadius,
      });
      console.log(`${indent}📐 Border Radius [${node.name}]: ${node.cornerRadius}px`);
    }
    
    // Recurse into children
    if (node.children) {
      node.children.forEach(child => walkNode(child, depth + 1));
    }
  }
  
  if (variant.children) {
    variant.children.forEach(child => walkNode(child, 0));
  }
  
  // Summary
  if (result.text.length > 0) {
    console.log(`     └─ Text Elements: ${result.text.map(t => `${t.color} [${t.layer}]`).join(', ')}`);
  }
  if (result.icons.length > 0) {
    console.log(`     └─ Icons: ${result.icons.map(i => `${i.color} [${i.layer}]`).join(', ')}`);
  }
  if (result.backgrounds.length > 0) {
    console.log(`     └─ Backgrounds: ${result.backgrounds.map(b => `${b.color} (${b.layer})`).join(', ')}`);
  }
  if (result.strokes.length > 0) {
    console.log(`     └─ Strokes: ${result.strokes.map(s => `${s.color} (${s.width}px) [${s.layer}]`).join(', ')}`);
  }
  if (result.borders.length > 0) {
    console.log(`     └─ Border Radius: ${result.borders.map(b => `${b.radius}px [${b.layer}]`).join(', ')}`);
  }
  
  return result;
}

function analyzeComponentSet(componentSet) {
  console.log(`\n📦 ${componentSet.name} (${componentSet.type})`);
  console.log('═'.repeat(70));
  
  if (componentSet.children) {
    console.log(`\n✅ Found ${componentSet.children.length} variants:\n`);
    
    const allSpecs = {};
    
    componentSet.children.forEach(variant => {
      const variantName = variant.name;
      const specs = analyzeVariantDetailed(variant, variantName);
      allSpecs[variantName] = specs;
    });
    
    // Create simplified summary grouped by state
    console.log('\n\n📊 STATE ANALYSIS:');
    console.log('═'.repeat(70));
    
    const states = {};
    Object.entries(allSpecs).forEach(([name, specs]) => {
      const stateMatch = name.match(/state=(\w+)/);
      const state = stateMatch ? stateMatch[1] : 'unknown';
      
      if (!states[state]) {
        states[state] = {
          text: specs.text,
          icons: specs.icons,
          backgrounds: specs.backgrounds,
          strokes: specs.strokes,
          borders: specs.borders,
        };
      }
    });
    
    console.log(JSON.stringify(states, null, 2));
    
    // Save both detailed and summary to files
    const detailedPath = path.join(__dirname, 'figma', 'extract', 'select-detailed-specs.json');
    const summaryPath = path.join(__dirname, 'figma', 'extract', 'select-states-summary.json');
    
    fs.mkdirSync(path.dirname(detailedPath), { recursive: true });
    fs.writeFileSync(detailedPath, JSON.stringify(allSpecs, null, 2));
    fs.writeFileSync(summaryPath, JSON.stringify(states, null, 2));
    
    console.log(`\n💾 Detailed specs saved to: ${detailedPath}`);
    console.log(`💾 States summary saved to: ${summaryPath}`);
  }
}

async function main() {
  console.log('🔄 Fetching Figma file...');
  const fileData = await fetchFileFromMCP(FIGMA_FILE_KEY);
  
  console.log('🔍 Searching for oc-select component...\n');
  
  // Search recursively
  function findByName(node, name) {
    if (node.name === name) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findByName(child, name);
        if (found) return found;
      }
    }
    return null;
  }
  
  const selectComponent = findByName(fileData.document, 'oc-select');
  
  if (!selectComponent) {
    console.log('❌ oc-select component not found');
    console.log('\n🔍 Searching for alternative names...');
    
    // Try to find components with "select" in the name
    const allComponents = [];
    function findAllComponents(node) {
      if (node.type === 'COMPONENT_SET' || node.type === 'COMPONENT') {
        if (node.name.toLowerCase().includes('select')) {
          allComponents.push(node.name);
        }
      }
      if (node.children) {
        node.children.forEach(child => findAllComponents(child));
      }
    }
    findAllComponents(fileData.document);
    
    if (allComponents.length > 0) {
      console.log('\n📋 Found these select-related components:');
      allComponents.forEach(name => console.log(`  • ${name}`));
    } else {
      console.log('❌ No select-related components found');
    }
    return;
  }
  
  analyzeComponentSet(selectComponent);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
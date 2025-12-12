#!/usr/bin/env node
/**
 * Deep search for Link component in Figma file
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

function findAllComponents(node, results = []) {
  if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
    results.push({
      id: node.id,
      name: node.name,
      type: node.type,
      path: node.absoluteBoundingBox,
    });
  }
  
  if (node.children) {
    node.children.forEach(child => findAllComponents(child, results));
  }
  
  return results;
}

function analyzeComponentSet(componentSet) {
  console.log(`\n📦 ${componentSet.name} (${componentSet.type})`);
  console.log('═'.repeat(60));
  
  if (componentSet.children) {
    console.log(`\n✅ Found ${componentSet.children.length} variants:\n`);
    
    const colorMap = {};
    
    componentSet.children.forEach(variant => {
      const variantName = variant.name;
      console.log(`  📌 ${variantName}`);
      
      // Recursively collect all elements
      const textElements = [];
      const iconElements = [];
      
      function walkNode(node) {
        if (node.type === 'TEXT') {
          textElements.push(node);
        }
        
        // Look for icon/arrow elements
        const nodeName = node.name?.toLowerCase() || '';
        if (nodeName.includes('icon') || nodeName.includes('arrow') || nodeName.includes('chevron')) {
          iconElements.push(node);
        }
        
        if (node.children) {
          node.children.forEach(walkNode);
        }
      }
      
      if (variant.children) {
        variant.children.forEach(walkNode);
      }
      
      // Extract colors
      let textColor = null;
      let iconColor = null;
      
      if (textElements.length > 0) {
        const textElem = textElements[0];
        if (textElem.fills && textElem.fills.length > 0) {
          const fill = textElem.fills[0];
          if (fill.type === 'SOLID' && fill.color) {
            textColor = rgbToHex(fill.color);
            console.log(`     Text: ${textColor}`);
          }
        }
      }
      
      if (iconElements.length > 0) {
        const iconElem = iconElements[0];
        if (iconElem.fills && iconElem.fills.length > 0) {
          const fill = iconElem.fills[0];
          if (fill.type === 'SOLID' && fill.color) {
            iconColor = rgbToHex(fill.color);
            console.log(`     Icon: ${iconColor}`);
          }
        }
      }
      
      colorMap[variantName] = { text: textColor, icon: iconColor };
    });
    
    console.log('\n\n📋 COLOR SUMMARY:');
    console.log(JSON.stringify(colorMap, null, 2));
    
    // Save to file
    const outputPath = path.join(__dirname, 'figma', 'extract', 'link-colors.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(colorMap, null, 2));
    console.log(`\n💾 Saved to: ${outputPath}`);
  }
}

async function main() {
  console.log('🔄 Fetching Figma file...');
  const fileData = await fetchFileFromMCP(FIGMA_FILE_KEY);
  
  console.log('🔍 Searching for oc-link component...\n');
  
  // Search in all nodes recursively
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
  
  const linkComponent = findByName(fileData.document, 'oc-link');
  
  if (!linkComponent) {
    console.log('❌ oc-link component not found');
    return;
  }
  
  analyzeComponentSet(linkComponent);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
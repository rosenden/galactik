#!/usr/bin/env node
/**
 * Extract Link component color specs from Figma
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

function findComponentByName(nodes, name) {
  for (const nodeId in nodes) {
    const node = nodes[nodeId];
    if (node.name === name) {
      return node;
    }
  }
  return null;
}

async function extractLinkColors() {
  console.log('Fetching Figma file...');
  const fileData = await fetchFileFromMCP(FIGMA_FILE_KEY);
  
  const linkComponent = findComponentByName(fileData.document.children[0]?.children || [], 'Link');
  
  if (!linkComponent) {
    console.error('Link component not found');
    console.log('Available components:', fileData.document.children[0]?.children?.map(c => c.name));
    return;
  }

  console.log('\n=== LINK COMPONENT ANALYSIS ===\n');
  console.log('Component Name:', linkComponent.name);
  console.log('Component Type:', linkComponent.type);
  
  if (linkComponent.children) {
    console.log('\nChildren:', linkComponent.children.length);
    linkComponent.children.forEach((child, idx) => {
      console.log(`  [${idx}] ${child.name} (${child.type})`);
      
      // Check for fills
      if (child.fills && child.fills.length > 0) {
        child.fills.forEach(fill => {
          if (fill.type === 'SOLID' && fill.color) {
            const hex = rgbToHex(fill.color);
            console.log(`      Fill: ${hex}`);
          }
        });
      }
      
      // Check for strokes
      if (child.strokes && child.strokes.length > 0) {
        child.strokes.forEach(stroke => {
          if (stroke.type === 'SOLID' && stroke.color) {
            const hex = rgbToHex(stroke.color);
            console.log(`      Stroke: ${hex}`);
          }
        });
      }
    });
  }

  // If it's a component set, check variants
  if (linkComponent.children) {
    const variants = linkComponent.children.filter(c => c.type === 'COMPONENT');
    
    if (variants.length > 0) {
      console.log('\n=== LINK STATES/VARIANTS ===\n');
      
      const stateColors = {};
      
      variants.forEach(variant => {
        const variantName = variant.name;
        console.log(`\n${variantName}:`);
        
        // Get text element
        const textElement = variant.children?.find(c => c.type === 'TEXT');
        if (textElement) {
          if (textElement.fills && textElement.fills.length > 0) {
            textElement.fills.forEach(fill => {
              if (fill.type === 'SOLID' && fill.color) {
                const hex = rgbToHex(fill.color);
                console.log(`  Text Color: ${hex}`);
                stateColors[variantName] = { text: hex };
              }
            });
          }
        }
        
        // Get icon element
        const iconElement = variant.children?.find(c => c.name?.includes('icon') || c.name?.includes('Icon'));
        if (iconElement) {
          if (iconElement.fills && iconElement.fills.length > 0) {
            iconElement.fills.forEach(fill => {
              if (fill.type === 'SOLID' && fill.color) {
                const hex = rgbToHex(fill.color);
                console.log(`  Icon Color: ${hex}`);
                if (!stateColors[variantName]) stateColors[variantName] = {};
                stateColors[variantName].icon = hex;
              }
            });
          }
        }
      });

      console.log('\n=== COLOR SUMMARY ===');
      console.log(JSON.stringify(stateColors, null, 2));
    }
  }
}

extractLinkColors().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});

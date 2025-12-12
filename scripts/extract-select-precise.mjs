#!/usr/bin/env node
/**
 * Ultra-precise extraction for oc-select component
 * Captures EVERY visual property from Figma
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

function analyzeNodePrecise(node, depth = 0) {
  const indent = '  '.repeat(depth);
  const info = {
    name: node.name,
    type: node.type,
    width: node.absoluteBoundingBox?.width,
    height: node.absoluteBoundingBox?.height,
    x: node.absoluteBoundingBox?.x,
    y: node.absoluteBoundingBox?.y,
  };
  
  console.log(`${indent}📦 ${node.name} [${node.type}]`);
  if (info.width) console.log(`${indent}   Size: ${Math.round(info.width)}×${Math.round(info.height)}px`);
  
  // Padding / Spacing
  if (node.paddingLeft !== undefined) {
    console.log(`${indent}   Padding: T${node.paddingTop} R${node.paddingRight} B${node.paddingBottom} L${node.paddingLeft}`);
  }
  
  // Layout properties
  if (node.layoutMode) {
    console.log(`${indent}   Layout: ${node.layoutMode}`);
    if (node.itemSpacing) console.log(`${indent}   Gap: ${node.itemSpacing}px`);
    if (node.primaryAxisAlignItems) console.log(`${indent}   Align: ${node.primaryAxisAlignItems}`);
    if (node.counterAxisAlignItems) console.log(`${indent}   Cross-align: ${node.counterAxisAlignItems}`);
  }
  
  // Fills
  if (node.fills && node.fills.length > 0) {
    node.fills.forEach(fill => {
      if (fill.type === 'SOLID' && fill.color) {
        const hex = rgbToHex(fill.color);
        const opacity = fill.opacity !== undefined ? fill.opacity : 1;
        console.log(`${indent}   Fill: ${hex}${opacity < 1 ? ` (${Math.round(opacity * 100)}%)` : ''}`);
      }
    });
  }
  
  // Strokes
  if (node.strokes && node.strokes.length > 0) {
    node.strokes.forEach(stroke => {
      if (stroke.type === 'SOLID' && stroke.color) {
        const hex = rgbToHex(stroke.color);
        const weight = node.strokeWeight || 1;
        const opacity = stroke.opacity !== undefined ? stroke.opacity : 1;
        console.log(`${indent}   Stroke: ${hex} ${weight}px${opacity < 1 ? ` (${Math.round(opacity * 100)}%)` : ''}`);
      }
    });
  }
  
  // Border radius
  if (node.cornerRadius !== undefined) {
    console.log(`${indent}   Border-radius: ${node.cornerRadius}px`);
  }
  
  // Typography
  if (node.type === 'TEXT' && node.style) {
    console.log(`${indent}   Font: ${node.style.fontFamily || 'N/A'} ${node.style.fontSize}px / ${node.style.fontWeight || 400}`);
    console.log(`${indent}   Line-height: ${node.style.lineHeightPx || 'auto'}px`);
    console.log(`${indent}   Letter-spacing: ${node.style.letterSpacing || 0}`);
  }
  
  // Effects (shadows, etc)
  if (node.effects && node.effects.length > 0) {
    node.effects.forEach(effect => {
      if (effect.visible !== false) {
        console.log(`${indent}   Effect: ${effect.type}`);
      }
    });
  }
  
  return info;
}

function analyzeVariantComplete(variant, variantName) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📌 ${variantName}`);
  console.log('='.repeat(80));
  
  function walkAndAnalyze(node, depth = 0) {
    analyzeNodePrecise(node, depth);
    if (node.children) {
      node.children.forEach(child => walkAndAnalyze(child, depth + 1));
    }
  }
  
  walkAndAnalyze(variant, 0);
}

async function main() {
  console.log('🔄 Fetching Figma file...\n');
  const fileData = await fetchFileFromMCP(FIGMA_FILE_KEY);
  
  console.log('🔍 Searching for oc-select component...\n');
  
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
    return;
  }
  
  console.log(`✅ Found ${selectComponent.children.length} variants\n`);
  
  // Analyze just a few key variants to understand the structure
  const keyVariants = selectComponent.children.filter(v => 
    v.name.includes('size=medium') && 
    (v.name.includes('state=empty') || 
     v.name.includes('state=active') || 
     v.name.includes('state=focus') ||
     v.name.includes('state=readonly'))
  );
  
  keyVariants.forEach(variant => {
    analyzeVariantComplete(variant, variant.name);
  });
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

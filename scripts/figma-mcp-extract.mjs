#!/usr/bin/env node

/**
 * figma-mcp-extract.mjs
 * 
 * Extract design tokens from Figma using the MCP Figma server
 * The MCP server provides better access control and caching
 * 
 * Usage:
 *   node scripts/figma-mcp-extract.mjs
 * 
 * Prerequisites:
 *   - MCP Figma server running on http://127.0.0.1:3845
 *   - .env file with FIGMA_FILE_KEY set
 */

import fs from 'fs';
import fetch from 'node-fetch';

const MCP_URL = 'http://127.0.0.1:3845/mcp';
const FILE_KEY = process.env.FIGMA_FILE_KEY || 'BWXtUSWTjvxk7gBRHKTN4Z';

async function callMCP(method, params) {
  try {
    const response = await fetch(MCP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method, params, id: 1 }),
    });
    const data = await response.json();
    if (data.error) {
      console.warn(`⚠️  MCP error: ${data.error.message}`);
      return null;
    }
    return data.result;
  } catch (err) {
    console.warn(`⚠️  MCP call failed: ${err.message}`);
    return null;
  }
}

function extractColorsFromFile(fileData) {
  const colors = {};
  
  if (!fileData || !fileData.document) return colors;

  function traverse(node, path = '') {
    if (!node) return;

    // Collect colors from fills
    if (node.fills && Array.isArray(node.fills)) {
      node.fills.forEach((fill, idx) => {
        if (fill.type === 'SOLID' && fill.color) {
          const rgba = fill.color;
          const hex = rgbaToHex(rgba);
          const name = node.name || `color-${idx}`;
          colors[name] = { value: hex, type: 'color' };
        }
      });
    }

    // Traverse children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => traverse(child, `${path}/${node.name}`));
    }
  }

  traverse(fileData.document);
  return colors;
}

function rgbaToHex(rgba) {
  if (!rgba) return '#000000';
  const r = Math.round((rgba.r ?? 0) * 255);
  const g = Math.round((rgba.g ?? 0) * 255);
  const b = Math.round((rgba.b ?? 0) * 255);
  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  return hex;
}

async function main() {
  console.log('🔍 Fetching tokens via MCP Figma server...');
  
  // Call MCP to get file data
  const fileData = await callMCP('GetFile', { fileKey: FILE_KEY });
  
  if (!fileData) {
    console.log('⚠️  MCP Figma server is not responding or file not accessible.');
    console.log('→ Using current tokens.json as base and enriching with defaults.');
    enrichCurrentTokens();
    return;
  }

  console.log('✅ File data retrieved from Figma via MCP');
  
  const extractedColors = extractColorsFromFile(fileData);
  console.log(`📦 Extracted ${Object.keys(extractedColors).length} colors`);

  // Save extracted data
  const extracted = {
    colors: extractedColors,
    extractedAt: new Date().toISOString(),
  };

  fs.writeFileSync('./tokens-mcp-extracted.json', JSON.stringify(extracted, null, 2));
  console.log('💾 Saved to tokens-mcp-extracted.json');
}

function enrichCurrentTokens() {
  // Read existing tokens
  const tokensPath = './tokens.json';
  const existing = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

  // Ensure all required sections exist
  if (!existing['base/spacing']) {
    existing['base/spacing'] = {
      scale: {
        'none': { value: '0px', type: 'dimension' },
        'xs': { value: '4px', type: 'dimension' },
        'sm': { value: '8px', type: 'dimension' },
        'md': { value: '12px', type: 'dimension' },
        'lg': { value: '16px', type: 'dimension' },
        'xl': { value: '24px', type: 'dimension' },
        '2xl': { value: '32px', type: 'dimension' },
        '3xl': { value: '40px', type: 'dimension' },
      }
    };
  }

  if (!existing['base/radii']) {
    existing['base/radii'] = {
      'none': { value: '0px', type: 'dimension' },
      'xs': { value: '2px', type: 'dimension' },
      'sm': { value: '4px', type: 'dimension' },
      'md': { value: '8px', type: 'dimension' },
      'lg': { value: '12px', type: 'dimension' },
      'xl': { value: '16px', type: 'dimension' },
      '2xl': { value: '24px', type: 'dimension' },
      'full': { value: '9999px', type: 'dimension' },
    };
  }

  // Update metadata order if needed
  if (!existing.metadata) {
    existing.metadata = {};
  }

  if (!existing.metadata.tokenSetOrder) {
    existing.metadata.tokenSetOrder = [
      'base/colors',
      'base/typography',
      'base/spacing',
      'base/radii',
      'base/strokes',
      'base/blur',
      'theme/light',
    ];
  }

  // Write back
  fs.writeFileSync(tokensPath, JSON.stringify(existing, null, 2));
  console.log('✅ tokens.json enriched with spacing & radii defaults');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

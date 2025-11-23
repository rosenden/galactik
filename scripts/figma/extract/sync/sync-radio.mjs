#!/usr/bin/env node
// sync-radio.mjs - Extract Radio button specs from Figma (robust, like button/bullet)



import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
dotenv.config();

const MCP_URL = 'http://127.0.0.1:3845/mcp';
const FILE_KEY = process.env.FIGMA_FILE_KEY_2 || process.env.FIGMA_FILE_KEY || 'zB9JxH85SZ9yDCUYw8CUwU';
const TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.resolve(__dirname, '../../specs/radio-specs.json');

async function fetchFigmaFile(fileKey) {
  // Try MCP first
  try {
    const response = await fetch(MCP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'figma.fetchFile', fileKey }),
    });
    const data = await response.json();
    if (data.ok && data.result?.status === 200) {
      console.log('✅ Retrieved via MCP');
      return data.result.body;
    }
  } catch (err) {
    console.log('⚠️  MCP not available, trying direct API...');
  }
  // Fallback to direct API
  if (!TOKEN) {
    console.error('❌ FIGMA_ACCESS_TOKEN not set');
    return null;
  }
  try {
    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: { 'X-Figma-Token': TOKEN }
    });
    if (!response.ok) {
      console.error('❌ Figma API Error:', response.status);
      return null;
    }
    console.log('✅ Retrieved via Figma API');
    return await response.json();
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

function extractRadioSpecs(fileData) {
  const radioSpecs = {
    component: 'oc-radio-light',
    description: 'Radio button component from Figma OneChaps Design System',
    extractedAt: new Date().toISOString(),
    sizes: {},
    variants: {},
    colors: [],
    figmaNodeId: null,
    figmaFileKey: FILE_KEY
  };

  // Helper to find node by id
  function findNodeById(node, id) {
    if (!node) return null;
    if (node.id === id) return node;
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        const found = findNodeById(child, id);
        if (found) return found;
      }
    }
    return null;
  }

  // Force node id for radio: 2345:2443
  const radioNodeId = '2345:2443';
  let radioNode = null;
  if (fileData && fileData.document) {
    radioNode = findNodeById(fileData.document, radioNodeId);
  }
  if (radioNode && radioNode.type === 'COMPONENT_SET') {
    radioSpecs.figmaNodeId = radioNode.id;
    if (radioNode.children && Array.isArray(radioNode.children)) {
      radioNode.children.forEach((child) => {
        if (child.type === 'COMPONENT' && child.name) {
          // Parse variant name: "state=checked, size=medium"
          const params = {};
          child.name.split(',').forEach(part => {
            const [key, value] = part.trim().split('=');
            if (key && value) {
              params[key.trim()] = value.trim();
            }
          });
          // Size
          if (params.size && child.absoluteBoundingBox) {
            const width = Math.round(child.absoluteBoundingBox.width);
            const height = Math.round(child.absoluteBoundingBox.height);
            if (!radioSpecs.sizes[params.size]) {
              radioSpecs.sizes[params.size] = {
                width: `${width}px`,
                height: `${height}px`
              };
            }
          }
          // State/variant
          if (params.state) {
            if (!radioSpecs.variants[params.state]) {
              radioSpecs.variants[params.state] = {};
            }
            // Extract effects for focus state
            let effects = undefined;
            if (child.effects && child.effects.length > 0) {
              effects = child.effects.map(effect => ({
                type: effect.type,
                color: effect.color ? rgbToHex(effect.color.r, effect.color.g, effect.color.b) : undefined,
                radius: effect.radius,
                offset: effect.offset,
                visible: effect.visible
              }));
            }
            radioSpecs.variants[params.state][params.size] = {
              border: child.strokes && child.strokes[0] && child.strokes[0].color ? rgbToHex(child.strokes[0].color.r, child.strokes[0].color.g, child.strokes[0].color.b) : undefined,
              background: child.fills && child.fills[0] && child.fills[0].color ? rgbToHex(child.fills[0].color.r, child.fills[0].color.g, child.fills[0].color.b) : undefined,
              dot: child.children && child.children[0] && child.children[0].fills && child.children[0].fills[0] && child.children[0].fills[0].color ? rgbToHex(child.children[0].fills[0].color.r, child.children[0].fills[0].color.g, child.children[0].fills[0].color.b) : undefined,
              effects
            };
          }
        }
      });
    }
  }
  return radioSpecs;
}

async function main() {
  console.log('🔍 Syncing Radio button component from Figma...\n');
  console.log(`File Key: ${FILE_KEY}`);
  let fileData = await fetchFigmaFile(FILE_KEY);
  if (!fileData) {
    console.error('❌ Failed to fetch file from Figma');
    process.exit(1);
  }
  const specs = extractRadioSpecs(fileData);
  fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2), 'utf8');
  console.log('✅ radio-specs.json generated successfully');
  console.log(`📄 File: ${outputPath}`);
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});



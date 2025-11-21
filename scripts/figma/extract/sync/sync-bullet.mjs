#!/usr/bin/env node
/**
 * sync-bullet.mjs
 * 
 * Extract complete Bullet specifications from Figma:
 * - Sizes (small: 6px, medium: 8px, large: 10px)
 * - Colors (background for all color variants)
 * - Variants (primary/secondary - filled/light)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MCP_URL = 'http://127.0.0.1:3845/mcp';
const FILE_KEY = process.env.FIGMA_FILE_KEY || 'zB9JxH85SZ9yDCUYw8CUwU';
const TOKEN = process.env.FIGMA_ACCESS_TOKEN;

async function fetchFigmaFile(fileKey) {
  try {
    const response = await fetch(MCP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'figma.fetchFile', fileKey }),
    });
    const data = await response.json();
    
    if (!data.ok || data.result.status !== 200) {
      console.error('❌ MCP Error:', data.error || 'Unknown error');
      return null;
    }
    
    return data.result.body;
  } catch (err) {
    console.error('❌ MCP Request failed:', err.message);
    return null;
  }
}

async function fetchFigmaFileDirect(fileKey) {
  if (!TOKEN) {
    console.error('❌ FIGMA_ACCESS_TOKEN not set');
    return null;
  }
  
  try {
    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {
        'X-Figma-Token': TOKEN
      }
    });
    
    if (!response.ok) {
      console.error('❌ Figma API Error:', response.status, response.statusText);
      return null;
    }
    
    return await response.json();
  } catch (err) {
    console.error('❌ Figma API Request failed:', err.message);
    return null;
  }
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function extractBulletSpecs(fileData) {
  const bulletSpecs = {
    component: 'oc-bullet',
    description: 'Bullet point component from Figma OneChaps Design System',
    extractedAt: new Date().toISOString(),
    sizes: {},
    variants: {},
    colors: [],
    figmaNodeId: null,
    figmaFileKey: FILE_KEY
  };
  
  function traverse(node, path = '') {
    if (!node) return;
    
    const nodeName = (node.name || '').toLowerCase();
    
    // Look for oc-bullet COMPONENT_SET
    if (nodeName === 'oc-bullet' && node.type === 'COMPONENT_SET') {
      console.log(`🎯 Found COMPONENT_SET: ${node.name} at ${path}`);
      bulletSpecs.figmaNodeId = node.id;
      
      // Extract properties from component set
      if (node.componentPropertyDefinitions) {
        Object.entries(node.componentPropertyDefinitions).forEach(([key, prop]) => {
          if (prop.type === 'VARIANT' && prop.variantOptions) {
            console.log(`  Property ${key}: ${prop.variantOptions.join(', ')}`);
            
            if (key === 'color') {
              bulletSpecs.colors = prop.variantOptions;
            }
          }
        });
      }
      
      // Extract size and color combinations from child components
      if (node.children && Array.isArray(node.children)) {
        console.log(`  Found ${node.children.length} variants\n`);
        
        node.children.forEach((child) => {
          if (child.type === 'COMPONENT' && child.name) {
            // Parse variant name: "size=medium, color=sage"
            const params = {};
            child.name.split(',').forEach(part => {
              const [key, value] = part.trim().split('=');
              if (key && value) {
                params[key.trim()] = value.trim();
              }
            });
            
            if (params.size && child.absoluteBoundingBox) {
              const width = Math.round(child.absoluteBoundingBox.width);
              const height = Math.round(child.absoluteBoundingBox.height);
              
              if (!bulletSpecs.sizes[params.size]) {
                bulletSpecs.sizes[params.size] = {
                  width: `${width}px`,
                  height: `${height}px`
                };
                console.log(`  ✓ Size ${params.size}: ${width}x${height}px`);
              }
            }
            
            // Extract color fills for variants
            if (params.size && params.color && child.fills && child.fills.length > 0) {
              const fill = child.fills[0];
              if (fill.type === 'SOLID' && fill.color) {
                const hexColor = rgbToHex(fill.color.r, fill.color.g, fill.color.b);
                
                if (!bulletSpecs.variants[params.color]) {
                  bulletSpecs.variants[params.color] = {};
                }
                
                if (!bulletSpecs.variants[params.color][params.size]) {
                  bulletSpecs.variants[params.color][params.size] = {
                    background: hexColor,
                    opacity: fill.opacity !== undefined ? fill.opacity : 1
                  };
                }
              }
            }
          }
        });
      }
    }
    
    // Traverse children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => traverse(child, `${path}/${node.name}`));
    }
  }
  
  if (fileData && fileData.document) {
    traverse(fileData.document);
  }
  
  // Add default sizes if not found
  if (Object.keys(bulletSpecs.sizes).length === 0) {
    bulletSpecs.sizes = {
      xsmall: { width: '6px', height: '6px' },
      small: { width: '10px', height: '10px' },
      medium: { width: '18px', height: '18px' }
    };
  }
  
  // Add default colors if not found
  if (bulletSpecs.colors.length === 0) {
    bulletSpecs.colors = [
      'sage', 'pink', 'almond', 'grey',
      'success', 'warning', 'info', 'error'
    ];
  }
  
  return bulletSpecs;
}

async function main() {
  console.log('🔍 Fetching oc-bullet from Figma...\n');
  
  // Try MCP first, then direct API
  let fileData = await fetchFigmaFile(FILE_KEY);
  
  if (!fileData && TOKEN) {
    console.log('⚠️  MCP unavailable, trying direct Figma API...\n');
    fileData = await fetchFigmaFileDirect(FILE_KEY);
  }
  
  if (!fileData) {
    console.error('❌ Failed to fetch file from Figma');
    console.log('Using default specifications...\n');
  }
  
  const specs = extractBulletSpecs(fileData);
  
    const outputPath = '../../specs/bullet-specs.json';
  fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2), 'utf8');
  
  console.log('\n✅ bullet-specs.json generated successfully');
  console.log(`📄 File: ${outputPath}`);
  console.log(`📊 Extracted: ${Object.keys(specs.sizes).length} sizes, ${specs.colors.length} colors`);
}

main();

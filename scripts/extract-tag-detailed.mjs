#!/usr/bin/env node
/**
 * Extract detailed Tag component specs from Figma
 * Including fill/outline variants and exact color hex values
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
  const a = color.a !== undefined ? Math.round(color.a * 255) : 255;
  
  if (a < 255) {
    return `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(2)})`;
  }
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function analyzeTagNode(node) {
  const analysis = {
    id: node.id,
    name: node.name,
    type: node.type,
    width: Math.round(node.absoluteBoundingBox?.width || 0),
    height: Math.round(node.absoluteBoundingBox?.height || 0),
    borderRadius: node.cornerRadius || 0,
    fills: [],
    strokes: [],
    text: [],
    icons: [],
    flags: [],
    padding: {
      left: node.paddingLeft || 0,
      right: node.paddingRight || 0,
      top: node.paddingTop || 0,
      bottom: node.paddingBottom || 0,
    },
  };

  // Extract fill colors
  if (node.fills && Array.isArray(node.fills)) {
    node.fills.forEach((fill, idx) => {
      if (fill.type === 'SOLID') {
        analysis.fills.push({
          index: idx,
          color: rgbToHex(fill.color),
          opacity: fill.opacity || 1,
        });
      }
    });
  }

  // Extract strokes/borders
  if (node.strokes && Array.isArray(node.strokes)) {
    node.strokes.forEach((stroke, idx) => {
      if (stroke.type === 'SOLID') {
        analysis.strokes.push({
          index: idx,
          color: rgbToHex(stroke.color),
          width: stroke.strokeWeight || 0,
          opacity: stroke.opacity || 1,
        });
      }
    });
  }

  // Extract text properties and detect icons/flags from children
  if (node.children) {
    node.children.forEach((child) => {
      const childName = child.name?.toLowerCase() || '';
      
      if (child.type === 'TEXT') {
        const textInfo = {
          name: child.name,
          content: child.characters || '',
          fontSize: child.style?.fontSize || 0,
          fontWeight: child.style?.fontWeight || 400,
          fontFamily: child.style?.fontFamily || '',
          color: null,
        };

        if (child.fills && child.fills[0]) {
          textInfo.color = rgbToHex(child.fills[0].color);
        }

        analysis.text.push(textInfo);
      }
      
      // Detect icon elements (usually named "icon", "trailing-icon", or have icon in name)
      if (childName.includes('icon') || childName.includes('leading') || childName.includes('trailing')) {
        const iconInfo = {
          name: child.name,
          type: child.type,
          position: childName.includes('leading') || childName.includes('left') ? 'left' : 'right',
          visible: child.visible !== false,
          size: Math.round(child.absoluteBoundingBox?.width || 0),
          color: null,
        };

        // Try to get icon color from fills
        if (child.fills && child.fills[0]) {
          iconInfo.color = rgbToHex(child.fills[0].color);
        }

        // Check if it's an instance (icon component)
        if (child.type === 'INSTANCE' && child.componentId) {
          iconInfo.componentId = child.componentId;
        }

        analysis.icons.push(iconInfo);
      }

      // Detect flag elements (usually named "flag", "badge", or similar)
      if (childName.includes('flag') || childName.includes('badge') || childName.includes('indicator')) {
        const flagInfo = {
          name: child.name,
          type: child.type,
          visible: child.visible !== false,
          width: Math.round(child.absoluteBoundingBox?.width || 0),
          height: Math.round(child.absoluteBoundingBox?.height || 0),
          color: null,
        };

        if (child.fills && child.fills[0]) {
          flagInfo.color = rgbToHex(child.fills[0].color);
        }

        analysis.flags.push(flagInfo);
      }
    });
  }

  return analysis;
}

async function extractDetailedTags() {
  console.log('🔍 Extracting detailed Tag component specs from Figma...\n');

  try {
    console.log('📡 Fetching Figma file structure...');
    const fileContent = await fetchFileFromMCP(FIGMA_FILE_KEY);
    console.log('✅ File loaded:', fileContent.name ?? 'Unnamed Figma file\n');

    const tagsByVariant = {};
    const uniqueComponents = new Set();

    // Find the tag component section
    function findTagSection(node, path = []) {
      if (!node) return;

      const nodeName = node.name?.toLowerCase() || '';
      
      // Look specifically for the tag section with variants
      if (nodeName.includes('oc-tag')) {
        const fullPath = [...path, node.name].join(' > ');
        
        // Process all node types to get variants
        if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET' || node.type === 'INSTANCE') {
          const key = node.name;
          
          // For COMPONENT_SET, also explore children for individual variants
          if (node.type === 'COMPONENT_SET' && node.children) {
            console.log(`\n📦 Component Set: ${node.name}`);
            node.children.forEach((child) => {
              if (child.name && (child.type === 'COMPONENT' || child.type === 'INSTANCE')) {
                const childKey = `${node.name}/${child.name}`;
                const analysis = analyzeTagNode(child);
                
                if (!tagsByVariant[childKey]) {
                  tagsByVariant[childKey] = [];
                }
                tagsByVariant[childKey].push({
                  path: `${fullPath} > ${child.name}`,
                  parentVariant: node.name,
                  childVariant: child.name,
                  ...analysis,
                });

                console.log(`   └─ ${child.name} (${child.type})`);
                console.log(`      Size: ${analysis.width}x${analysis.height}px`);
                if (analysis.fills.length > 0) {
                  console.log(`      Fill: ${analysis.fills[0].color}`);
                }
                if (analysis.strokes.length > 0) {
                  console.log(`      Stroke: ${analysis.strokes[0].color}`);
                }
              }
            });
          } else {
            // For standalone COMPONENT or INSTANCE
            if (!uniqueComponents.has(key)) {
              uniqueComponents.add(key);
              
              const analysis = analyzeTagNode(node);
              
              if (!tagsByVariant[key]) {
                tagsByVariant[key] = [];
              }
              tagsByVariant[key].push({
                path: fullPath,
                ...analysis,
              });

              console.log(`\n📋 Found component: ${node.name}`);
              console.log(`   Type: ${node.type}`);
              console.log(`   Size: ${analysis.width}x${analysis.height}px`);
              if (analysis.fills.length > 0) {
                console.log(`   Fill: ${analysis.fills[0].color}`);
              }
              if (analysis.strokes.length > 0) {
                console.log(`   Stroke: ${analysis.strokes[0].color}`);
              }
            }
          }
        }
      }

      // Recurse into children
      if (node.children) {
        node.children.forEach((child) => findTagSection(child, [...path, node.name]));
      }
    }

    findTagSection(fileContent.document);

    // Organize by variant type
    const variants = {
      fill: {},
      outline: {},
    };

    Object.entries(tagsByVariant).forEach(([name, instances]) => {
      instances.forEach((instance) => {
        // Detect variant type based on properties
        const hasFill = instance.fills.length > 0 && instance.fills[0].opacity === 1;
        const hasStroke = instance.strokes.length > 0;

        if (hasFill && !hasStroke) {
          variants.fill[name] = instance;
        } else if (hasStroke && !hasFill) {
          variants.outline[name] = instance;
        } else if (hasFill && hasStroke) {
          // Determine primary variant type
          variants.fill[name] = instance;
        }
      });
    });

    const output = {
      extracted: new Date().toISOString(),
      fileKey: FIGMA_FILE_KEY,
      fileName: fileContent.name,
      variants,
      summary: {
        totalComponents: Object.keys(tagsByVariant).length,
        fillVariants: Object.keys(variants.fill).length,
        outlineVariants: Object.keys(variants.outline).length,
      },
    };

    // Save detailed output
    const outputPath = path.resolve(__dirname, 'figma/extract/tag-detailed-specs.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`\n💾 Detailed specs saved to: ${outputPath}`);

    // Print summary
    console.log('\n📊 SUMMARY:');
    console.log(`   Fill variants: ${Object.keys(variants.fill).length}`);
    console.log(`   Outline variants: ${Object.keys(variants.outline).length}`);
    console.log('\n✅ Extraction complete!');

    return output;
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

extractDetailedTags();

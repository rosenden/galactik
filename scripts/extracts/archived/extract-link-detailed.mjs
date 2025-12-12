#!/usr/bin/env node

/**
 * Extract Link component specifications from Figma "OneChaps UI kit"
 * Uses the MCP server Figma API to get complete component specs
 * 
 * Outputs to: scripts/figma/extract/link-detailed-specs.json
 */

import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MCP_URL = 'http://127.0.0.1:3845/mcp';
const FIGMA_FILE_ID = 'zB9JxH85SZ9yDCUYw8CUwU';

async function callMCP(method, params) {
  const response = await fetch(MCP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    }),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`MCP Error: ${data.error.message}`);
  }
  return data.result;
}

/**
 * Get the file document to find components
 */
async function getFile() {
  console.log('📄 Fetching Figma file...');
  return await callMCP('figma/file', { file_id: FIGMA_FILE_ID });
}

/**
 * Recursively find all nodes matching a pattern
 */
function findNodes(node, matcher, results = []) {
  if (!node) return results;

  // Check if this node matches
  if (matcher(node)) {
    results.push(node);
  }

  // Recurse into children
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      findNodes(child, matcher, results);
    }
  }

  return results;
}

/**
 * Get detailed node info including component structure
 */
async function getNodeDetails(nodeId) {
  return await callMCP('figma/node', {
    file_id: FIGMA_FILE_ID,
    node_ids: [nodeId],
  });
}

/**
 * Extract specs from a link variant node
 */
function extractLinkVariant(node, parentName = '') {
  if (!node) return null;

  const spec = {
    id: node.id,
    name: node.name,
    path: node.absolutePath || parentName,
    type: node.type,
    width: node.absoluteBoundingBox?.width,
    height: node.absoluteBoundingBox?.height,
    borderRadius: node.cornerRadius,
    fills: [],
    strokes: [],
    text: [],
    children: [],
  };

  // Extract fill colors
  if (node.fills && Array.isArray(node.fills)) {
    for (let i = 0; i < node.fills.length; i++) {
      const fill = node.fills[i];
      if (fill.type === 'SOLID' && fill.visible !== false) {
        const color = fill.color;
        const hex = color
          ? `#${Math.round(color.r * 255)
              .toString(16)
              .padStart(2, '0')}${Math.round(color.g * 255)
              .toString(16)
              .padStart(2, '0')}${Math.round(color.b * 255)
              .toString(16)
              .padStart(2, '0')}`
              .toUpperCase()
          : 'none';
        spec.fills.push({
          index: i,
          color: hex,
          opacity: fill.opacity !== undefined ? fill.opacity : 1,
        });
      }
    }
  }

  // Extract stroke colors and weight
  if (node.strokes && Array.isArray(node.strokes)) {
    for (let i = 0; i < node.strokes.length; i++) {
      const stroke = node.strokes[i];
      if (stroke.type === 'SOLID' && stroke.visible !== false) {
        const color = stroke.color;
        const hex = color
          ? `#${Math.round(color.r * 255)
              .toString(16)
              .padStart(2, '0')}${Math.round(color.g * 255)
              .toString(16)
              .padStart(2, '0')}${Math.round(color.b * 255)
              .toString(16)
              .padStart(2, '0')}`
              .toUpperCase()
          : 'none';
        spec.strokes.push({
          index: i,
          color: hex,
          weight: stroke.strokeWeight,
          opacity: stroke.opacity !== undefined ? stroke.opacity : 1,
        });
      }
    }
  }

  // Extract text nodes
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      if (child.type === 'TEXT') {
        const textColor = child.fills?.[0]?.color;
        const textHex = textColor
          ? `#${Math.round(textColor.r * 255)
              .toString(16)
              .padStart(2, '0')}${Math.round(textColor.g * 255)
              .toString(16)
              .padStart(2, '0')}${Math.round(textColor.b * 255)
              .toString(16)
              .padStart(2, '0')}`
              .toUpperCase()
          : 'inherit';
        
        spec.text.push({
          name: child.name,
          content: child.characters || '',
          fontSize: child.style?.fontSize,
          fontWeight: child.style?.fontWeight,
          fontFamily: child.style?.fontFamily,
          textDecoration: child.style?.textDecoration,
          color: textHex,
        });
      }

      // Store child info
      spec.children.push({
        id: child.id,
        name: child.name,
        type: child.type,
      });
    }
  }

  return spec;
}

/**
 * Main extraction
 */
async function extractLink() {
  try {
    console.log('🚀 Starting Link component extraction from Figma...\n');

    // Get file
    const file = await getFile();
    console.log(`✓ File: ${file.name}\n`);

    // Find link components
    console.log('🔎 Searching for Link components in Figma...');
    const linkComponents = findNodes(
      file.document,
      (node) =>
        (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET' || node.type === 'INSTANCE') &&
        node.name &&
        node.name.toLowerCase().includes('link')
    );

    if (linkComponents.length === 0) {
      console.log('❌ No Link components found');
      return;
    }

    console.log(`✓ Found ${linkComponents.length} Link component(s):`);
    linkComponents.forEach((comp) => {
      console.log(`  - ${comp.name} (${comp.type})`);
    });

    // Get detailed info for each component
    console.log('\n📊 Fetching detailed component specs...');
    const specs = {};

    for (const component of linkComponents) {
      try {
        const details = await getNodeDetails(component.id);
        const doc = details.nodes[component.id]?.document;

        if (!doc) continue;

        // If it's a component set, explore variants
        if (doc.type === 'COMPONENT_SET' || (doc.children && doc.children.length > 0)) {
          const componentKey = component.name;
          specs[componentKey] = {
            id: component.id,
            name: component.name,
            type: doc.type,
            variants: {},
          };

          // Extract parent component info
          const parentSpec = extractLinkVariant(doc, component.name);
          if (parentSpec) {
            specs[componentKey].parentSpec = parentSpec;
          }

          // If component set, get child variants
          if (doc.children && Array.isArray(doc.children)) {
            console.log(`  Analyzing ${doc.children.length} variant(s) for ${component.name}...`);
            
            for (const child of doc.children) {
              const variantSpec = extractLinkVariant(child, component.name);
              if (variantSpec) {
                specs[componentKey].variants[child.name] = variantSpec;
              }
            }
          }
        }

        console.log(`✓ Extracted: ${component.name}`);
      } catch (error) {
        console.warn(`⚠️ Could not extract ${component.name}:`, error.message);
      }
    }

    // Save results
    const outputDir = path.join(__dirname, 'figma', 'extract');
    await fs.mkdir(outputDir, { recursive: true });

    const outputFile = path.join(outputDir, 'link-detailed-specs.json');
    const output = {
      extracted: new Date().toISOString(),
      fileKey: FIGMA_FILE_ID,
      fileName: file.name,
      variants: specs,
    };

    await fs.writeFile(outputFile, JSON.stringify(output, null, 2));

    console.log(`\n✅ Extraction complete!`);
    console.log(`📁 Saved to: ${outputFile}`);

    // Print summary
    console.log('\n📋 Summary:');
    let totalVariants = 0;
    for (const [name, spec] of Object.entries(specs)) {
      const variantCount = Object.keys(spec.variants).length;
      console.log(`  - ${name}: ${variantCount} variant(s)`);
      totalVariants += variantCount;
    }
    console.log(`  Total: ${totalVariants} variant(s)`);

  } catch (error) {
    console.error('❌ Extraction failed:', error.message);
    process.exit(1);
  }
}

extractLink();

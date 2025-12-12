#!/usr/bin/env node
/**
 * Extract Tag component from Figma using MCP server
 * Component: oc-tag-primary and oc-tag-secondary
 */

import fs from 'fs';

const DEFAULT_MCP_PORT = 3845;
const MCP_PORT = process.env.MCP_PORT ? Number(process.env.MCP_PORT) : DEFAULT_MCP_PORT;
const MCP_HOST = process.env.MCP_URL || `http://localhost:${MCP_PORT}`;
const MCP_PATH = process.env.MCP_PATH ?? '/mcp';
const MCP_ENDPOINT = new URL(MCP_PATH, MCP_HOST).toString();
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY_2 || 'zB9JxH85SZ9yDCUYw8CUwU'; // one chaps ui kit

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

async function extractTagFromFigma() {
  console.log('🔍 Extracting Tag component from Figma via MCP...\n');

  try {
    console.log('📡 Fetching Figma file structure...');
    const fileContent = await fetchFileFromMCP(FIGMA_FILE_KEY);
    console.log('✅ File loaded:', fileContent.name ?? 'Unnamed Figma file');
    const tags = [];

    // Search for tag components recursively
    function searchNodes(node, path = []) {
      if (!node) return;

      const nodeName = node.name?.toLowerCase() || '';
      
      // Look for oc-tag components
      if (nodeName.includes('oc-tag')) {
        console.log(`\n🏷️  Found: ${node.name} (${node.type})`);
        console.log(`   Path: ${[...path, node.name].join(' > ')}`);
        
        tags.push({
          id: node.id,
          name: node.name,
          type: node.type,
          path: [...path, node.name].join(' > '),
          node: node,
        });
      }

      // Recurse into children
      if (node.children) {
        node.children.forEach((child) => searchNodes(child, [...path, node.name]));
      }
    }

    searchNodes(fileContent.document);

    if (tags.length === 0) {
      console.log('\n⚠️  No oc-tag components found. Searching for any "tag" nodes...\n');
      
      function searchTagNodes(node, path = []) {
        if (!node) return;
        const nodeName = node.name?.toLowerCase() || '';
        
        if (nodeName.includes('tag')) {
          console.log(`   Found: ${node.name} at ${[...path, node.name].join(' > ')}`);
          tags.push({
            id: node.id,
            name: node.name,
            type: node.type,
            path: [...path, node.name].join(' > '),
            node: node,
          });
        }

        if (node.children) {
          node.children.forEach((child) => searchTagNodes(child, [...path, node.name]));
        }
      }
      
      searchTagNodes(fileContent.document);
    }

    console.log(`\n✅ Found ${tags.length} tag component(s)\n`);

    // Get detailed information for each tag
    const detailedTags = tags.map((tag) => {
      console.log(`📋 Analyzing: ${tag.name}...`);
      const analysis = analyzeNode(tag.node);

      console.log(`   ✓ Width: ${analysis.width}px, Height: ${analysis.height}px`);
      console.log(`   ✓ Background: ${analysis.backgroundColor}`);
      console.log(`   ✓ Border radius: ${analysis.borderRadius}px`);

      return {
        ...tag,
        analysis,
      };
    });

    // Save results
    const output = {
      extracted: new Date().toISOString(),
      fileKey: FIGMA_FILE_KEY,
      components: detailedTags,
    };

    fs.writeFileSync(
      'scripts/figma/extract/tag-component.json',
      JSON.stringify(output, null, 2)
    );
    
    console.log('\n💾 Saved to scripts/figma/extract/tag-component.json');
    
    return detailedTags;
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

function analyzeNode(node) {
  const analysis = {
    type: node.type,
    width: node.absoluteBoundingBox?.width,
    height: node.absoluteBoundingBox?.height,
    borderRadius: node.cornerRadius,
    backgroundColor: null,
    textColor: null,
    fontSize: null,
    fontWeight: null,
    padding: null,
    children: [],
  };

  // Extract background color
  if (node.fills && node.fills.length > 0 && node.fills[0].type === 'SOLID') {
    analysis.backgroundColor = rgbToHex(node.fills[0].color);
  }

  // Extract padding
  if (node.paddingLeft !== undefined) {
    analysis.padding = {
      left: node.paddingLeft,
      right: node.paddingRight,
      top: node.paddingTop,
      bottom: node.paddingBottom,
    };
  }

  // Analyze children (text, icons, etc.)
  if (node.children) {
    node.children.forEach((child) => {
      if (child.type === 'TEXT') {
        analysis.children.push({
          type: 'text',
          content: child.characters || 'Label',
          fontSize: child.style?.fontSize,
          fontWeight: child.style?.fontWeight,
          fontFamily: child.style?.fontFamily,
          color: child.fills?.[0]?.color ? rgbToHex(child.fills[0].color) : null,
        });
      } else {
        analysis.children.push({
          type: child.type,
          name: child.name,
        });
      }
    });
  }

  return analysis;
}

function rgbToHex(color) {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

extractTagFromFigma().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

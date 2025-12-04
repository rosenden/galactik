#!/usr/bin/env node
/**
 * Extract Tag component from Figma using MCP server
 * Component: oc-tag-primary and oc-tag-secondary
 */

import fs from 'fs';

const MCP_URL = 'http://localhost:3845';
const FIGMA_FILE_KEY = 'zB9JxH85SZ9yDCUYw8CUwU'; // one chaps ui kit

async function callMCP(method, params) {
  const response = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params,
    }),
  });

  if (!response.ok) {
    throw new Error(`MCP request failed: ${response.status}`);
  }

  const result = await response.json();
  if (result.error) {
    throw new Error(`MCP error: ${result.error.message}`);
  }

  return result.result;
}

async function extractTagFromFigma() {
  console.log('🔍 Extracting Tag component from Figma via MCP...\n');

  try {
    // Get file structure
    console.log('📡 Fetching Figma file structure...');
    const fileData = await callMCP('tools/call', {
      name: 'figma_get_file',
      arguments: {
        file_key: FIGMA_FILE_KEY,
      },
    });

    console.log('✅ File loaded:', fileData.content[0]?.text ? 'Success' : 'No data');
    
    // Parse the file data
    const fileContent = JSON.parse(fileData.content[0].text);
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
    const detailedTags = [];
    for (const tag of tags) {
      console.log(`📋 Analyzing: ${tag.name}...`);
      
      const nodeDetails = await callMCP('tools/call', {
        name: 'figma_get_node',
        arguments: {
          file_key: FIGMA_FILE_KEY,
          node_id: tag.id,
        },
      });

      const nodeData = JSON.parse(nodeDetails.content[0].text);
      const analysis = analyzeNode(nodeData.nodes[tag.id]);
      
      detailedTags.push({
        ...tag,
        analysis,
      });

      console.log(`   ✓ Width: ${analysis.width}px, Height: ${analysis.height}px`);
      console.log(`   ✓ Background: ${analysis.backgroundColor}`);
      console.log(`   ✓ Border radius: ${analysis.borderRadius}px`);
    }

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

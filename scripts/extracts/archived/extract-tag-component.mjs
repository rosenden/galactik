#!/usr/bin/env node
/**
 * Extract Tag component from Figma "one chaps ui kit"
 * Looking for: oc-tag-primary and oc-tag-secondary
 */

import fs from 'fs';
import { config } from 'dotenv';

// Load .env file
config();

const FIGMA_FILE_KEY = 'zB9JxH85SZ9yDCUYw8CUwU'; // one chaps ui kit
const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;

if (!FIGMA_TOKEN) {
  console.error('❌ FIGMA_ACCESS_TOKEN not found in environment');
  console.log('Please set it in .env file');
  process.exit(1);
}

async function extractTagComponent() {
  console.log('🔍 Extracting Tag component from Figma...\n');

  try {
    const response = await fetch(
      `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`,
      {
        headers: {
          'X-Figma-Token': FIGMA_TOKEN,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const tags = [];

    // Search for tag components
    function searchNodes(node, path = []) {
      if (!node) return;

      const nodeName = node.name?.toLowerCase() || '';
      
      // Look for oc-tag-primary and oc-tag-secondary
      if (nodeName.includes('oc-tag') || nodeName.includes('tag')) {
        if (nodeName.includes('primary') || nodeName.includes('secondary')) {
          tags.push({
            id: node.id,
            name: node.name,
            type: node.type,
            path: [...path, node.name].join(' > '),
            properties: extractProperties(node),
          });
        }
      }

      // Recurse into children
      if (node.children) {
        node.children.forEach((child) => searchNodes(child, [...path, node.name]));
      }
    }

    function extractProperties(node) {
      const props = {
        type: node.type,
      };

      // Extract styles
      if (node.fills && node.fills.length > 0) {
        const fill = node.fills[0];
        if (fill.type === 'SOLID') {
          props.backgroundColor = rgbToHex(fill.color);
        }
      }

      // Extract text properties if TEXT node
      if (node.type === 'TEXT' && node.style) {
        props.fontSize = node.style.fontSize;
        props.fontWeight = node.style.fontWeight;
        props.fontFamily = node.style.fontFamily;
        props.textColor = node.fills?.[0]?.color ? rgbToHex(node.fills[0].color) : null;
      }

      // Extract dimensions
      if (node.absoluteBoundingBox) {
        props.width = Math.round(node.absoluteBoundingBox.width);
        props.height = Math.round(node.absoluteBoundingBox.height);
      }

      // Extract corner radius
      if (node.cornerRadius !== undefined) {
        props.borderRadius = node.cornerRadius;
      }

      // Extract padding
      if (node.paddingLeft !== undefined) {
        props.padding = {
          left: node.paddingLeft,
          right: node.paddingRight,
          top: node.paddingTop,
          bottom: node.paddingBottom,
        };
      }

      // Extract effects (shadows, etc.)
      if (node.effects && node.effects.length > 0) {
        props.effects = node.effects.map((effect) => ({
          type: effect.type,
          color: effect.color ? rgbToHex(effect.color) : null,
          offset: effect.offset,
          radius: effect.radius,
        }));
      }

      return props;
    }

    function rgbToHex(color) {
      const r = Math.round(color.r * 255);
      const g = Math.round(color.g * 255);
      const b = Math.round(color.b * 255);
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // Start search from document root
    searchNodes(data.document);

    console.log(`✅ Found ${tags.length} Tag components:\n`);
    
    tags.forEach((tag, idx) => {
      console.log(`${idx + 1}. ${tag.name}`);
      console.log(`   Path: ${tag.path}`);
      console.log(`   Properties:`, JSON.stringify(tag.properties, null, 2));
      console.log('');
    });

    // Save to file
    const output = {
      extracted: new Date().toISOString(),
      fileKey: FIGMA_FILE_KEY,
      components: tags,
    };

    fs.writeFileSync('scripts/figma/extract/tag-component.json', JSON.stringify(output, null, 2));
    console.log('💾 Saved to scripts/figma/extract/tag-component.json');

    return tags;
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

extractTagComponent();

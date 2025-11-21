#!/usr/bin/env node
/**
 * sync-button.mjs
 * 
 * Extract complete Button specifications from Figma:
 * - Variants (primary, secondary, tertiary, light-accent)
 * - Sizes (small, medium, large) with heights: 24px, 36px, 44px
 * - States (default, hover, pressed, disabled, focus)
 * - Typography (font family, size, weight, line height)
 * - Spacing (padding horizontal/vertical, gap between icon and text)
 * - Colors (background, text, border for each variant and state)
 * - Border radius, shadows, transitions
 * - Icon support
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MCP_URL = 'http://127.0.0.1:3845/mcp';
const FILE_KEY = process.env.FIGMA_FILE_KEY || 'zB9JxH85SZ9yDCUYw8CUwU';
const TOKEN = process.env.FIGMA_ACCESS_TOKEN;

// Fallback to MCP or direct API
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

function rgbToHex(r, g, b, a = 1) {
  const hex = '#' + [r, g, b].map(x => {
    const h = Math.round(x * 255).toString(16);
    return h.length === 1 ? '0' + h : h;
  }).join('');
  
  if (a < 1) {
    const alpha = Math.round(a * 255).toString(16).padStart(2, '0');
    return hex + alpha;
  }
  
  return hex;
}

function extractButtonSpecs(fileData) {
  const buttonSpecs = {
    component: 'oc-button',
    description: 'Button component from Figma OneChaps Design System',
    extractedAt: new Date().toISOString(),
    figmaFileKey: FILE_KEY,
    figmaNodeId: null,
    variants: {},
    sizes: {
      small: { height: 24, paddingHorizontal: 14, paddingVertical: 8, fontSize: 12 },
      medium: { height: 36, paddingHorizontal: 24, paddingVertical: 12, fontSize: 14 },
      large: { height: 44, paddingHorizontal: 32, paddingVertical: 16, fontSize: 16 }
    },
    commonStyles: {
      fontFamily: 'Hanken Grotesk',
      fontWeight: 600,
      borderRadius: 12,
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      outline: 'none',
      userSelect: 'none',
      textDecoration: 'none'
    }
  };
  
  function traverse(node, path = '') {
    if (!node) return;
    
    const nodeName = (node.name || '').toLowerCase();
    
    // Look for oc-button COMPONENT_SET
    if (nodeName === 'oc-button' && node.type === 'COMPONENT_SET') {
      console.log(`🎯 Found COMPONENT_SET: ${node.name}`);
      buttonSpecs.figmaNodeId = node.id;
      
      // Process each variant child
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(child => {
          if (child.type === 'COMPONENT') {
            const variantName = extractVariantName(child.name);
            console.log(`  → Processing: ${child.name} → ${variantName}`);
            buttonSpecs.variants[variantName] = extractVariantDetails(child);
          }
        });
      }
    }
    
    // Also look for individual oc-button-* components
    if (node.type === 'COMPONENT' && (
      nodeName.includes('oc-button-primary') ||
      nodeName.includes('oc-button-secondary') ||
      nodeName.includes('oc-button-tertiary') ||
      nodeName.includes('oc-button-light-accent')
    )) {
      const variantName = extractVariantName(node.name);
      console.log(`📦 Found individual: ${node.name} → ${variantName}`);
      if (!buttonSpecs.variants[variantName]) {
        buttonSpecs.variants[variantName] = extractVariantDetails(node);
      }
    }
    
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        traverse(child, `${path}/${node.name || 'unnamed'}`);
      }
    }
  }
  
  traverse(fileData.document);
  
  return buttonSpecs;
}

function extractVariantName(name) {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('light') && lowerName.includes('accent')) return 'light-accent';
  if (lowerName.includes('primary')) return 'primary';
  if (lowerName.includes('secondary')) return 'secondary';
  if (lowerName.includes('tertiary')) return 'tertiary';
  
  return 'default';
}

function extractVariantDetails(node) {
  const variant = {
    name: node.name,
    id: node.id,
    description: `Button variant: ${extractVariantName(node.name)}`,
    className: `oc-button-${extractVariantName(node.name)}`,
    dimensions: {
      width: node.absoluteBoundingBox?.width || null,
      height: node.absoluteBoundingBox?.height || null,
    },
    layout: extractLayout(node),
    styles: extractStyles(node),
    states: extractStates(node),
    children: []
  };
  
  // Extract child elements (text, icons)
  if (node.children && node.children.length > 0) {
    variant.children = node.children.map(child => extractChildElement(child));
  }
  
  return variant;
}

function extractLayout(node) {
  return {
    layoutMode: node.layoutMode,
    primaryAxisSizingMode: node.primaryAxisSizingMode,
    counterAxisSizingMode: node.counterAxisSizingMode,
    primaryAxisAlignItems: node.primaryAxisAlignItems,
    counterAxisAlignItems: node.counterAxisAlignItems,
    paddingLeft: node.paddingLeft,
    paddingRight: node.paddingRight,
    paddingTop: node.paddingTop,
    paddingBottom: node.paddingBottom,
    itemSpacing: node.itemSpacing
  };
}

function extractStyles(node) {
  const styles = {};
  
  // Background
  if (node.fills && node.fills.length > 0) {
    styles.background = node.fills.map(fill => {
      if (fill.type === 'SOLID' && fill.color) {
        return {
          type: 'solid',
          color: rgbToHex(fill.color.r, fill.color.g, fill.color.b, fill.color.a || 1),
          opacity: fill.opacity !== undefined ? fill.opacity : 1
        };
      } else if (fill.type === 'GRADIENT_LINEAR' && fill.gradientStops) {
        return {
          type: 'gradient',
          stops: fill.gradientStops.map(stop => ({
            position: stop.position,
            color: rgbToHex(stop.color.r, stop.color.g, stop.color.b, stop.color.a || 1)
          }))
        };
      }
      return null;
    }).filter(Boolean);
  }
  
  // Border
  if (node.strokes && node.strokes.length > 0) {
    styles.border = {
      strokes: node.strokes.map(stroke => ({
        color: stroke.color ? rgbToHex(stroke.color.r, stroke.color.g, stroke.color.b, stroke.color.a || 1) : null,
        visible: stroke.visible !== false
      })),
      weight: node.strokeWeight,
      align: node.strokeAlign
    };
  }
  
  // Border radius
  if (node.cornerRadius !== undefined) {
    styles.borderRadius = node.cornerRadius;
  } else if (node.rectangleCornerRadii) {
    styles.borderRadius = {
      topLeft: node.rectangleCornerRadii[0],
      topRight: node.rectangleCornerRadii[1],
      bottomRight: node.rectangleCornerRadii[2],
      bottomLeft: node.rectangleCornerRadii[3]
    };
  }
  
  // Effects (shadows, blur)
  if (node.effects && node.effects.length > 0) {
    styles.effects = node.effects
      .filter(effect => effect.visible !== false)
      .map(effect => ({
        type: effect.type,
        color: effect.color ? rgbToHex(effect.color.r, effect.color.g, effect.color.b, effect.color.a || 1) : null,
        offset: effect.offset,
        radius: effect.radius,
        spread: effect.spread,
        blendMode: effect.blendMode
      }));
  }
  
  return styles;
}

function extractStates(node) {
  const states = {};
  
  // Try to extract interaction states if available
  // This is limited as Figma API doesn't expose all hover/pressed states
  // We'll document the base state and note that others need manual definition
  
  states.default = {
    extracted: true,
    note: 'Base state extracted from Figma'
  };
  
  states.hover = {
    extracted: false,
    note: 'Hover state needs manual definition or prototype inspection'
  };
  
  states.pressed = {
    extracted: false,
    note: 'Pressed state needs manual definition or prototype inspection'
  };
  
  states.disabled = {
    extracted: false,
    note: 'Disabled state needs manual definition'
  };
  
  states.focus = {
    extracted: false,
    note: 'Focus state needs manual definition'
  };
  
  return states;
}

function extractChildElement(node) {
  const child = {
    name: node.name,
    type: node.type,
    visible: node.visible !== false
  };
  
  if (node.absoluteBoundingBox) {
    child.dimensions = {
      width: node.absoluteBoundingBox.width,
      height: node.absoluteBoundingBox.height,
      x: node.absoluteBoundingBox.x,
      y: node.absoluteBoundingBox.y
    };
  }
  
  // Text elements
  if (node.type === 'TEXT') {
    child.text = {
      characters: node.characters,
      style: {
        fontFamily: node.style?.fontFamily,
        fontWeight: node.style?.fontWeight,
        fontSize: node.style?.fontSize,
        lineHeight: node.style?.lineHeightPx || node.style?.lineHeightPercentFontSize,
        letterSpacing: node.style?.letterSpacing,
        textAlignHorizontal: node.style?.textAlignHorizontal,
        textAlignVertical: node.style?.textAlignVertical,
        textCase: node.style?.textCase,
        textDecoration: node.style?.textDecoration
      }
    };
    
    if (node.fills && node.fills.length > 0 && node.fills[0].color) {
      child.text.color = rgbToHex(
        node.fills[0].color.r,
        node.fills[0].color.g,
        node.fills[0].color.b,
        node.fills[0].color.a || 1
      );
    }
  }
  
  // Icon/Vector elements
  if (node.type === 'VECTOR' || node.type === 'BOOLEAN_OPERATION' || node.type === 'FRAME') {
    if (node.fills && node.fills.length > 0 && node.fills[0].color) {
      child.fillColor = rgbToHex(
        node.fills[0].color.r,
        node.fills[0].color.g,
        node.fills[0].color.b,
        node.fills[0].color.a || 1
      );
    }
  }
  
  // Recursively extract nested children
  if (node.children && node.children.length > 0) {
    child.children = node.children.map(c => extractChildElement(c));
  }
  
  return child;
}

async function main() {
  console.log('🔍 Syncing Button component from Figma...\n');
  console.log(`File Key: ${FILE_KEY}`);
  console.log(`Expected variants: primary, secondary, tertiary, light-accent\n`);
  
  const fileData = await fetchFigmaFile(FILE_KEY);
  
  if (!fileData) {
    console.error('❌ Could not retrieve Figma file');
    process.exit(1);
  }
  
  console.log(`✅ File retrieved: ${fileData.name}\n`);
  console.log('🔍 Extracting Button specifications...\n');
  
  const specs = extractButtonSpecs(fileData);
  
  if (Object.keys(specs.variants).length === 0) {
    console.log('\n⚠️  No button variants found!');
    console.log('Searching for all components with "button" in name...\n');
    
    function findAll(node, results = []) {
      if (node && (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET')) {
        if (node.name.toLowerCase().includes('button')) {
          results.push(`${node.name} (${node.type})`);
        }
      }
      if (node?.children) {
        node.children.forEach(child => findAll(child, results));
      }
      return results;
    }
    
    const allButtons = findAll(fileData.document);
    console.log('Found components:');
    allButtons.forEach(name => console.log(`  - ${name}`));
    
    process.exit(1);
  }
  
  // Save to file
  const outputPath = path.join(__dirname, '../../specs/button-specs.json');
  fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2));
  
  console.log(`\n💾 Specs saved to: ${outputPath}`);
  console.log('\n📋 Summary:');
  console.log(`  Component: ${specs.component}`);
  console.log(`  Variants found: ${Object.keys(specs.variants).length}`);
  Object.keys(specs.variants).forEach(variant => {
    const v = specs.variants[variant];
    console.log(`    ✓ ${variant} (${v.dimensions.width}x${v.dimensions.height}px)`);
  });
  console.log(`\n✅ Sync complete!`);
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});

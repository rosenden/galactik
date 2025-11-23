#!/usr/bin/env node
/**
 * Extract Button component specs from Figma via REST API
 */

import fetch from 'node-fetch';
import fs from 'fs';

const FILE_KEY = 'zB9JxH85SZ9yDCUYw8CUwU';
const TOKEN = process.env.FIGMA_ACCESS_TOKEN;

async function extractButtonSpecs() {
  console.log('🔍 Extracting Button component from Figma...\n');
  
  try {
    const url = `https://api.figma.com/v1/files/${FILE_KEY}`;
    console.log(`📡 Fetching: ${url}\n`);
    
    const response = await fetch(url, TOKEN ? { headers: { 'X-Figma-Token': TOKEN } } : {});
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('❌ Error response:', errorBody);
      return;
    }

    if (!TOKEN) {
      console.warn('⚠️  FIGMA_ACCESS_TOKEN non défini. Ajoute-le dans ton .env avant d’extraire en production.');
    }
    
    const data = await response.json();
    console.log(`✅ File retrieved: ${data.name}\n`);
    
    // Search for button components
    console.log('🔍 Searching for oc-button variants...\n');
    
    const buttonComponents = [];
    
    function traverse(node, path = '') {
      if (!node) return;
      
      const nodeName = (node.name || '').toLowerCase();
      
      // Look for button component set or individual button variants
      if ((node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') && 
          nodeName.includes('oc-button')) {
        console.log(`✓ Found: ${node.name} (${node.type})`);
        buttonComponents.push(node);
      }
      
      if (node.children && Array.isArray(node.children)) {
        for (const child of node.children) {
          traverse(child, `${path}/${node.name || 'unnamed'}`);
        }
      }
    }
    
    traverse(data.document);
    
    if (buttonComponents.length === 0) {
      console.log('\n⚠️  No oc-button components found');
      
      // List all components for debugging
      const allComponents = [];
      function findAll(node) {
        if (node && (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET')) {
          allComponents.push(node.name);
        }
        if (node?.children) {
          node.children.forEach(findAll);
        }
      }
      findAll(data.document);
      
      console.log('\nAll components found:');
      allComponents.filter(name => name.toLowerCase().includes('button'))
        .forEach(name => console.log(`  - ${name}`));
      
      return;
    }
    
    console.log(`\n🎯 Found ${buttonComponents.length} button component(s)\n`);
    
    // Extract detailed specs
    const specs = {
      componentName: "Button",
      figmaFile: FILE_KEY,
      source: "Figma OneChaps Design System",
      extractedAt: new Date().toISOString(),
      description: "Button component with multiple variants: primary, secondary, tertiary, and light-accent",
      variants: {}
    };
    
    buttonComponents.forEach(comp => {
      if (comp.type === 'COMPONENT_SET' && comp.children) {
        // Component set with multiple variants
        console.log(`📦 Component Set: ${comp.name}`);
        comp.children.forEach(variant => {
          const variantName = extractVariantName(variant.name);
          console.log(`  → ${variant.name} → ${variantName}`);
          specs.variants[variantName] = extractDetailedSpec(variant);
        });
      } else {
        // Individual component
        const variantName = extractVariantName(comp.name);
        console.log(`📦 ${comp.name} → ${variantName}`);
        specs.variants[variantName] = extractDetailedSpec(comp);
      }
    });
    
    // Save to file
    const outputPath = '../../../../../specs/button-specs.json';
    fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2));
    console.log(`\n💾 Specs saved to ${outputPath}\n`);
    
    // Display summary
    console.log('📋 Summary:');
    Object.keys(specs.variants).forEach(variant => {
      console.log(`  ✓ ${variant}`);
    });
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err.stack);
  }
}

function extractVariantName(name) {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('light') && lowerName.includes('accent')) return 'light-accent';
  if (lowerName.includes('primary')) return 'primary';
  if (lowerName.includes('secondary')) return 'secondary';
  if (lowerName.includes('tertiary')) return 'tertiary';
  
  return 'default';
}

function extractDetailedSpec(node) {
  const spec = {
    name: node.name,
    id: node.id,
    type: node.type,
    description: `Button variant: ${extractVariantName(node.name)}`,
    dimensions: {
      width: node.absoluteBoundingBox?.width || null,
      height: node.absoluteBoundingBox?.height || null,
      minWidth: node.minWidth || null,
      maxWidth: node.maxWidth || null,
    },
    layout: {
      layoutMode: node.layoutMode,
      primaryAxisSizingMode: node.primaryAxisSizingMode,
      counterAxisSizingMode: node.counterAxisSizingMode,
      primaryAxisAlignItems: node.primaryAxisAlignItems,
      counterAxisAlignItems: node.counterAxisAlignItems,
      paddingLeft: node.paddingLeft,
      paddingRight: node.paddingRight,
      paddingTop: node.paddingTop,
      paddingBottom: node.paddingBottom,
      itemSpacing: node.itemSpacing,
    },
    styles: {}
  };

  // Background fills
  if (node.fills && node.fills.length > 0) {
    spec.styles.background = node.fills.map(fill => {
      const bg = {
        type: fill.type,
        visible: fill.visible !== false,
      };
      
      if (fill.type === 'SOLID' && fill.color) {
        bg.color = rgbaToHex(fill.color);
        bg.opacity = fill.opacity !== undefined ? fill.opacity : 1;
      } else if (fill.type === 'GRADIENT_LINEAR' && fill.gradientStops) {
        bg.gradientStops = fill.gradientStops.map(stop => ({
          position: stop.position,
          color: rgbaToHex(stop.color)
        }));
      }
      
      return bg;
    });
  }

  // Strokes (borders)
  if (node.strokes && node.strokes.length > 0) {
    spec.styles.border = {
      strokes: node.strokes.map(stroke => ({
        type: stroke.type,
        color: stroke.color ? rgbaToHex(stroke.color) : null,
        visible: stroke.visible !== false
      })),
      weight: node.strokeWeight,
      align: node.strokeAlign
    };
  }

  // Corner radius
  if (node.cornerRadius !== undefined) {
    spec.styles.borderRadius = node.cornerRadius;
  } else if (node.rectangleCornerRadii) {
    spec.styles.borderRadius = {
      topLeft: node.rectangleCornerRadii[0],
      topRight: node.rectangleCornerRadii[1],
      bottomRight: node.rectangleCornerRadii[2],
      bottomLeft: node.rectangleCornerRadii[3]
    };
  }

  // Effects (shadows, blur)
  if (node.effects && node.effects.length > 0) {
    spec.styles.effects = node.effects
      .filter(effect => effect.visible !== false)
      .map(effect => ({
        type: effect.type,
        color: effect.color ? rgbaToHex(effect.color) : null,
        offset: effect.offset,
        radius: effect.radius,
        spread: effect.spread,
        blendMode: effect.blendMode
      }));
  }

  // Extract children (text, icons)
  if (node.children && node.children.length > 0) {
    spec.children = node.children.map(child => extractChildNode(child));
  }

  return spec;
}

function extractChildNode(node) {
  const child = {
    name: node.name,
    type: node.type,
    visible: node.visible !== false,
  };

  if (node.absoluteBoundingBox) {
    child.dimensions = {
      width: node.absoluteBoundingBox.width,
      height: node.absoluteBoundingBox.height,
      x: node.absoluteBoundingBox.x,
      y: node.absoluteBoundingBox.y
    };
  }

  // Text nodes
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
      child.text.color = rgbaToHex(node.fills[0].color);
    }
  }

  // Vector/icon nodes
  if (node.type === 'VECTOR' || node.type === 'BOOLEAN_OPERATION') {
    if (node.fills && node.fills.length > 0 && node.fills[0].color) {
      child.fillColor = rgbaToHex(node.fills[0].color);
    }
  }

  // Recursively extract nested children
  if (node.children && node.children.length > 0) {
    child.children = node.children.map(c => extractChildNode(c));
  }

  return child;
}

function rgbaToHex(color) {
  if (!color) return null;
  
  const r = Math.round((color.r || 0) * 255);
  const g = Math.round((color.g || 0) * 255);
  const b = Math.round((color.b || 0) * 255);
  const a = color.a !== undefined ? color.a : 1;
  
  const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  
  if (a < 1) {
    return `${hex}${Math.round(a * 255).toString(16).padStart(2, '0')}`;
  }
  
  return hex;
}

extractButtonSpecs();

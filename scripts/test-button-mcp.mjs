#!/usr/bin/env node
/**
 * Test script to fetch Button component from Figma via MCP
 */

import fetch from 'node-fetch';
import fs from 'fs';

const MCP_URL = 'http://127.0.0.1:3845/mcp';
const FILE_KEY = 'zB9JxH85SZ9yDCUYw8CUwU'; // OneChaps file

async function fetchButtonComponent() {
  try {
    const response = await fetch(MCP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        type: 'figma.fetchFile', 
        fileKey: FILE_KEY 
      }),
    });

    const data = await response.json();
    
    if (!data.ok) {
      console.error('❌ MCP request failed:', data.error || 'Unknown error');
      return;
    }

    console.log('✅ Fichier Figma récupéré via MCP');
    
    const fileData = data.result?.body;
    if (!fileData || !fileData.document) {
      console.error('❌ No document data in response');
      return;
    }

    // Search for oc-button component
    const buttonComponents = findButtonComponents(fileData.document);
    
    if (buttonComponents.length > 0) {
      console.log(`\n🎯 ${buttonComponents.length} variants de Button trouvés!\n`);
      
      const specs = {
        componentName: "Button",
        figmaFile: FILE_KEY,
        source: "Figma OneChaps Design System",
        extractedAt: new Date().toISOString(),
        variants: []
      };

      buttonComponents.forEach(comp => {
        console.log(`📦 ${comp.name}`);
        const variantSpec = extractButtonSpec(comp);
        specs.variants.push(variantSpec);
        console.log(JSON.stringify(variantSpec, null, 2));
        console.log('---');
      });

      // Save to specs file
      const specsPath = './figma/specs/button-specs.json';
      fs.writeFileSync(specsPath, JSON.stringify(specs, null, 2));
      console.log(`\n💾 Specs sauvegardées dans ${specsPath}`);

    } else {
      console.log('\n⚠️  Composants oc-button non trouvés dans le fichier');
      console.log('Recherche de composants similaires...');
      const allComponents = findAllComponents(fileData.document);
      console.log('\nComposants disponibles contenant "button":');
      allComponents
        .filter(c => c.name.toLowerCase().includes('button'))
        .forEach(c => console.log(` - ${c.name} (${c.type})`));
    }

  } catch (err) {
    console.error('❌ Erreur:', err.message);
  }
}

function findButtonComponents(node, buttons = []) {
  if (!node) return buttons;
  
  // Look for button components with specific variants
  if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
    const name = node.name.toLowerCase();
    if (name.includes('oc-button') || name.includes('button')) {
      buttons.push(node);
    }
  }
  
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      findButtonComponents(child, buttons);
    }
  }
  
  return buttons;
}

function extractButtonSpec(node) {
  const spec = {
    name: node.name,
    id: node.id,
    type: node.type,
    variant: extractVariantName(node.name),
    dimensions: {
      width: node.absoluteBoundingBox?.width || 0,
      height: node.absoluteBoundingBox?.height || 0,
      minWidth: node.minWidth,
      maxWidth: node.maxWidth,
    },
    styles: {},
    children: []
  };

  // Extract fills (background)
  if (node.fills && node.fills.length > 0) {
    spec.styles.fills = node.fills.map(fill => ({
      type: fill.type,
      color: fill.color ? rgbaToHex(fill.color) : null,
      opacity: fill.opacity
    }));
  }

  // Extract strokes (borders)
  if (node.strokes && node.strokes.length > 0) {
    spec.styles.strokes = node.strokes.map(stroke => ({
      type: stroke.type,
      color: stroke.color ? rgbaToHex(stroke.color) : null,
      weight: node.strokeWeight
    }));
  }

  // Extract effects (shadows, etc)
  if (node.effects && node.effects.length > 0) {
    spec.styles.effects = node.effects.map(effect => ({
      type: effect.type,
      color: effect.color ? rgbaToHex(effect.color) : null,
      offset: effect.offset,
      radius: effect.radius,
      visible: effect.visible
    }));
  }

  // Extract corner radius
  if (node.cornerRadius !== undefined) {
    spec.styles.cornerRadius = node.cornerRadius;
  }

  // Extract padding
  if (node.paddingLeft !== undefined) {
    spec.styles.padding = {
      left: node.paddingLeft,
      right: node.paddingRight,
      top: node.paddingTop,
      bottom: node.paddingBottom
    };
  }

  // Extract children (text, icons, etc)
  if (node.children && node.children.length > 0) {
    spec.children = node.children.map(child => extractChildSpec(child));
  }

  return spec;
}

function extractChildSpec(node) {
  const child = {
    name: node.name,
    type: node.type,
    visible: node.visible !== false
  };

  if (node.type === 'TEXT') {
    child.text = {
      characters: node.characters,
      style: {
        fontFamily: node.style?.fontFamily,
        fontWeight: node.style?.fontWeight,
        fontSize: node.style?.fontSize,
        lineHeight: node.style?.lineHeightPx,
        letterSpacing: node.style?.letterSpacing,
        textAlignHorizontal: node.style?.textAlignHorizontal
      }
    };

    if (node.fills && node.fills.length > 0) {
      child.text.color = rgbaToHex(node.fills[0].color);
    }
  }

  if (node.absoluteBoundingBox) {
    child.dimensions = {
      width: node.absoluteBoundingBox.width,
      height: node.absoluteBoundingBox.height
    };
  }

  return child;
}

function extractVariantName(name) {
  const variants = {
    'primary': 'primary',
    'secondary': 'secondary',
    'tertiary': 'tertiary',
    'light-accent': 'light-accent',
    'light accent': 'light-accent'
  };

  const lowerName = name.toLowerCase();
  for (const [key, value] of Object.entries(variants)) {
    if (lowerName.includes(key)) {
      return value;
    }
  }

  return 'default';
}

function rgbaToHex(color) {
  if (!color) return null;
  
  const r = Math.round((color.r || 0) * 255);
  const g = Math.round((color.g || 0) * 255);
  const b = Math.round((color.b || 0) * 255);
  const a = color.a !== undefined ? color.a : 1;
  
  const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  
  return a < 1 ? `${hex}${Math.round(a * 255).toString(16).padStart(2, '0')}` : hex;
}

function findAllComponents(node, components = []) {
  if (!node) return components;
  
  if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
    components.push({ name: node.name, type: node.type, id: node.id });
  }
  
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      findAllComponents(child, components);
    }
  }
  
  return components;
}

fetchButtonComponent();

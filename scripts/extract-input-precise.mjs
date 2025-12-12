#!/usr/bin/env node
/**
 * Ultra-precise extraction for oc-input component
 * Captures EVERY visual property from Figma
 * 
 * Based on Figma extract showing these variants:
 * - States: 
 *   • default/empty: placeholder visible, border #445556 1px
 *   • active: onClick/typing state, border #2D393A 2px (primary pressed stroke)
 *   • default/filled: has value, not focused, border #445556 1px
 *   • hovered: (empty & filled) mouse hover state
 *   • focus: (empty & filled) keyboard Tab navigation, double stroke (outline #926E9B 2px + border #A9C1B8 1px)
 *   • readonly: bg #F1F8F4, no border, no counter/controls
 *   • disabled: opacity 0.6, icons #626C84
 *   • success/default & success/hovered: green border #A9C1B8
 *   • error/default, error/empty/hovered, error/filled/hovered: red border/text #DC004E
 * - Each state shows input field with placeholder/value, icon left, icons right, counter (0/320), and number controls
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
  
  const toHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function extractTextProperties(node) {
  if (node.type !== 'TEXT') return null;
  
  return {
    content: node.characters || '',
    fontFamily: node.style?.fontFamily || 'N/A',
    fontSize: node.style?.fontSize || 0,
    fontWeight: node.style?.fontWeight || 400,
    lineHeight: node.style?.lineHeightPx || 'auto',
    letterSpacing: node.style?.letterSpacing || 0,
    textAlign: node.style?.textAlignHorizontal || 'LEFT',
    fills: node.fills?.map(f => ({
      type: f.type,
      color: rgbToHex(f.color),
      opacity: f.opacity !== undefined ? f.opacity : 1
    })) || []
  };
}

function extractLayoutProperties(node) {
  return {
    width: node.absoluteBoundingBox?.width,
    height: node.absoluteBoundingBox?.height,
    x: node.absoluteBoundingBox?.x,
    y: node.absoluteBoundingBox?.y,
    layoutMode: node.layoutMode,
    itemSpacing: node.itemSpacing,
    paddingTop: node.paddingTop,
    paddingRight: node.paddingRight,
    paddingBottom: node.paddingBottom,
    paddingLeft: node.paddingLeft,
    primaryAxisAlignItems: node.primaryAxisAlignItems,
    counterAxisAlignItems: node.counterAxisAlignItems,
  };
}

function extractStyleProperties(node) {
  return {
    fills: node.fills?.filter(f => f.visible !== false).map(f => ({
      type: f.type,
      color: rgbToHex(f.color),
      opacity: f.opacity !== undefined ? f.opacity : 1
    })) || [],
    strokes: node.strokes?.filter(s => s.visible !== false).map(s => ({
      type: s.type,
      color: rgbToHex(s.color),
      opacity: s.opacity !== undefined ? s.opacity : 1,
      weight: node.strokeWeight || 1
    })) || [],
    cornerRadius: node.cornerRadius,
    effects: node.effects?.filter(e => e.visible !== false).map(e => ({
      type: e.type,
      radius: e.radius,
      offset: e.offset,
      color: rgbToHex(e.color)
    })) || []
  };
}

function analyzeNodeDetailed(node, depth = 0) {
  const indent = '  '.repeat(depth);
  
  console.log(`${indent}📦 ${node.name} [${node.type}]`);
  
  const layout = extractLayoutProperties(node);
  if (layout.width) {
    console.log(`${indent}   Size: ${Math.round(layout.width)}×${Math.round(layout.height)}px`);
  }
  
  if (layout.paddingLeft !== undefined) {
    console.log(`${indent}   Padding: T${layout.paddingTop} R${layout.paddingRight} B${layout.paddingBottom} L${layout.paddingLeft}`);
  }
  
  if (layout.layoutMode) {
    console.log(`${indent}   Layout: ${layout.layoutMode}`);
    if (layout.itemSpacing) console.log(`${indent}   Gap: ${layout.itemSpacing}px`);
  }
  
  const styles = extractStyleProperties(node);
  
  styles.fills.forEach(fill => {
    const opacity = fill.opacity < 1 ? ` (${Math.round(fill.opacity * 100)}%)` : '';
    console.log(`${indent}   Fill: ${fill.color}${opacity}`);
  });
  
  styles.strokes.forEach(stroke => {
    const opacity = stroke.opacity < 1 ? ` (${Math.round(stroke.opacity * 100)}%)` : '';
    console.log(`${indent}   Stroke: ${stroke.color} ${stroke.weight}px${opacity}`);
  });
  
  if (styles.cornerRadius !== undefined) {
    console.log(`${indent}   Border-radius: ${styles.cornerRadius}px`);
  }
  
  if (node.type === 'TEXT') {
    const text = extractTextProperties(node);
    console.log(`${indent}   Text: "${text.content}"`);
    console.log(`${indent}   Font: ${text.fontFamily} ${text.fontSize}px / ${text.fontWeight}`);
    console.log(`${indent}   Line-height: ${text.lineHeight}px`);
    if (text.fills.length > 0) {
      console.log(`${indent}   Color: ${text.fills[0].color}`);
    }
  }
  
  return {
    name: node.name,
    type: node.type,
    layout,
    styles,
    text: node.type === 'TEXT' ? extractTextProperties(node) : null
  };
}

function analyzeVariantComplete(variant, variantName) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📌 ${variantName}`);
  console.log('='.repeat(80));
  
  const analysis = {
    name: variantName,
    structure: {}
  };
  
  function walkAndAnalyze(node, depth = 0) {
    const nodeData = analyzeNodeDetailed(node, depth);
    
    if (node.children) {
      nodeData.children = [];
      node.children.forEach(child => {
        nodeData.children.push(walkAndAnalyze(child, depth + 1));
      });
    }
    
    return nodeData;
  }
  
  analysis.structure = walkAndAnalyze(variant, 0);
  return analysis;
}

function summarizeAllVariants(variants) {
  console.log(`\n${'='.repeat(80)}`);
  console.log('📊 SUMMARY - All Input Variants Found');
  console.log('='.repeat(80));
  
  const states = {};
  
  variants.forEach(v => {
    const name = v.name;
    const stateMatch = name.match(/state=([^,]+)/);
    const state = stateMatch ? stateMatch[1] : 'unknown';
    
    if (!states[state]) {
      states[state] = [];
    }
    states[state].push(name);
  });
  
  Object.keys(states).sort().forEach(state => {
    console.log(`\n${state}:`);
    states[state].forEach(name => {
      console.log(`  - ${name}`);
    });
  });
}

async function main() {
  console.log('🔄 Fetching Figma file...\n');
  const fileData = await fetchFileFromMCP(FIGMA_FILE_KEY);
  
  console.log('🔍 Searching for oc-input component...\n');
  
  function findByName(node, name) {
    if (node.name === name) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findByName(child, name);
        if (found) return found;
      }
    }
    return null;
  }
  
  const inputComponent = findByName(fileData.document, 'oc-input');
  
  if (!inputComponent) {
    console.log('❌ oc-input component not found');
    console.log('\n🔍 Searching for alternative names...');
    
    // Try alternative names
    const alternatives = ['Input', 'input', 'oc-Input', 'OC-Input'];
    let found = false;
    
    for (const alt of alternatives) {
      const comp = findByName(fileData.document, alt);
      if (comp) {
        console.log(`✅ Found as "${alt}"`);
        inputComponent = comp;
        found = true;
        break;
      }
    }
    
    if (!found) {
      console.log('❌ No input component found with any expected name');
      return;
    }
  }
  
  console.log(`✅ Found ${inputComponent.children?.length || 0} variants\n`);
  
  if (inputComponent.children && inputComponent.children.length > 0) {
    summarizeAllVariants(inputComponent.children);
    
    // Analyze key variants to understand the structure
    const keyVariants = inputComponent.children.filter(v => {
      const name = v.name.toLowerCase();
      return name.includes('state=empty') || 
             name.includes('state=active') || 
             name.includes('state=focus') ||
             name.includes('state=filled') ||
             name.includes('state=readonly') ||
             name.includes('state=disabled') ||
             name.includes('success') ||
             name.includes('error');
    });
    
    console.log(`\n🔬 Analyzing ${Math.min(keyVariants.length, 8)} key variants in detail...\n`);
    
    const analyses = [];
    keyVariants.slice(0, 8).forEach(variant => {
      const analysis = analyzeVariantComplete(variant, variant.name);
      analyses.push(analysis);
    });
    
    // Save detailed specs to JSON
    const outputDir = path.join(__dirname, 'figma', 'extract');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'input-detailed-specs.json');
    fs.writeFileSync(outputPath, JSON.stringify(analyses, null, 2));
    console.log(`\n✅ Detailed specs saved to: ${outputPath}`);
    
    // Create summary
    const summary = {
      componentName: 'oc-input',
      totalVariants: inputComponent.children.length,
      states: {},
      extractedAt: new Date().toISOString()
    };
    
    inputComponent.children.forEach(v => {
      const stateMatch = v.name.match(/state=([^,]+)/);
      const state = stateMatch ? stateMatch[1] : 'unknown';
      if (!summary.states[state]) {
        summary.states[state] = 0;
      }
      summary.states[state]++;
    });
    
    const summaryPath = path.join(outputDir, 'input-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`✅ Summary saved to: ${summaryPath}`);
  }
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  console.error(err.stack);
  process.exit(1);
});

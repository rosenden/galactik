#!/usr/bin/env node
/**
 * Extract gradient fill values from Figma Solary styles by node ID
 * Usage: node scripts/extract-figma-gradients.mjs
 */

import fetch from 'node-fetch';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const FILE_KEY = process.env.FIGMA_FILE_KEY;
const TOKEN = process.env.FIGMA_ACCESS_TOKEN;

if (!FILE_KEY || !TOKEN) {
  throw new Error('FIGMA_FILE_KEY and FIGMA_ACCESS_TOKEN must be defined in .env');
}

function parseGradient(paint) {
  if (!paint) return null;
  
  if (paint.type === 'GRADIENT_LINEAR') {
    const stops = paint.gradientStops?.map(stop => {
      const { r, g, b, a } = stop.color;
      const position = Math.round(stop.position * 100);
      return {
        color: `rgba(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)},${a})`,
        position
      };
    }) || [];
    
    return {
      type: 'LINEAR',
      stops,
      css: generateLinearGradientCSS(stops)
    };
  }
  
  if (paint.type === 'GRADIENT_RADIAL') {
    const stops = paint.gradientStops?.map(stop => {
      const { r, g, b, a } = stop.color;
      const position = Math.round(stop.position * 100);
      return {
        color: `rgba(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)},${a})`,
        position
      };
    }) || [];
    
    return {
      type: 'RADIAL',
      stops,
      css: generateRadialGradientCSS(stops)
    };
  }
  
  if (paint.type === 'SOLID') {
    const { r, g, b, a } = paint.color;
    return `rgba(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)},${a ?? 1})`;
  }
  
  return null;
}

function generateLinearGradientCSS(stops) {
  if (!stops || stops.length === 0) return null;
  const stopStrings = stops.map(s => `${s.color} ${s.position}%`).join(', ');
  return `linear-gradient(135deg, ${stopStrings})`;
}

function generateRadialGradientCSS(stops) {
  if (!stops || stops.length === 0) return null;
  const stopStrings = stops.map(s => `${s.color} ${s.position}%`).join(', ');
  return `radial-gradient(circle, ${stopStrings})`;
}

function findNodeById(node, nodeId) {
  if (node.id === nodeId) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, nodeId);
      if (found) return found;
    }
  }
  return null;
}

async function extractGradients() {
  const fileUrl = `https://api.figma.com/v1/files/${FILE_KEY}`;
  const headers = { 'X-Figma-Token': TOKEN };
  
  console.log('🎨 Fetching Figma file...');
  const fileRes = await fetch(fileUrl, { headers });
  if (!fileRes.ok) {
    throw new Error(`Figma API error: ${fileRes.status} ${fileRes.statusText}`);
  }
  
  const fileData = await fileRes.json();
  
  // Read styles from tokens-solary.json
  const tokensSolary = JSON.parse(fs.readFileSync('tokens-solary.json', 'utf-8'));
  const gradientStyles = Object.entries(tokensSolary.styles)
    .filter(([_, style]) => style.styleType === 'FILL' && ['gradient-brand', 'gradient-ai'].includes(style.name))
    .map(([nodeId, style]) => ({ nodeId, ...style }));
  
  console.log(`Found ${gradientStyles.length} gradient styles`);
  
  const gradients = {};
  
  for (const style of gradientStyles) {
    console.log(`\n🔍 Looking for node ${style.nodeId} (${style.name})...`);
    const node = findNodeById(fileData.document, style.nodeId);
    
    if (node && node.fills && node.fills.length > 0) {
      const fill = node.fills[0];
      const gradientData = parseGradient(fill);
      
      if (gradientData && typeof gradientData === 'object' && gradientData.css) {
        gradients[style.name] = gradientData;
        console.log(`✅ ${style.name}: ${gradientData.css}`);
      } else {
        console.log(`⚠️ ${style.name} fill type not supported:`, fill.type);
      }
    } else {
      console.log(`❌ Node not found or has no fills: ${style.nodeId}`);
    }
  }
  
  // Save to file
  const output = {
    lastExtracted: new Date().toISOString(),
    count: Object.keys(gradients).length,
    gradients
  };
  
  fs.writeFileSync('gradients-figma.json', JSON.stringify(output, null, 2));
  console.log(`\n✅ Gradients extracted to gradients-figma.json`);
  
  return gradients;
}

extractGradients().catch(err => {
  console.error('❌ Extraction failed:', err.message);
  process.exit(1);
});

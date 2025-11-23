#!/usr/bin/env node
/**
 * test-figma-rest-api.mjs
 * 
 * Test direct de l'API REST Figma pour extraire oc-bullet
 */

const FILE_KEY = 'zB9JxH85SZ9yDCUYw8CUwU';
const TOKEN = process.env.FIGMA_ACCESS_TOKEN;

async function testFigmaAPI() {
  console.log('🔍 Testing Figma REST API...\n');
  console.log(`File Key: ${FILE_KEY}`);
  console.log(`Token: ${TOKEN ? TOKEN.substring(0, 8) + '…' : '(non défini)'}`);
  
  try {
    const url = `https://api.figma.com/v1/files/${FILE_KEY}`;
    console.log(`\n📡 Fetching: ${url}\n`);
    
    const response = await fetch(url, TOKEN ? {
        headers: { 'X-Figma-Token': TOKEN }
    } : {});
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('\n❌ Error response:', errorBody);
      return;
    }
    
    const data = await response.json();
    console.log('\n✅ Success! File data retrieved');
    console.log(`\nFile name: ${data.name}`);
    console.log(`Last modified: ${data.lastModified}`);
    console.log(`Version: ${data.version}`);
    
    // Search for bullet components
    console.log('\n🔍 Searching for oc-bullet component set...\n');
    
    let bulletCount = 0;
    let bulletComponentSet = null;
    
    function traverse(node, path = '') {
      if (!node) return;
      
      const nodeName = (node.name || '').toLowerCase();
      
      // Look specifically for oc-bullet COMPONENT_SET
      if (nodeName === 'oc-bullet' && node.type === 'COMPONENT_SET') {
        bulletComponentSet = node;
        console.log(`\n🎯 Found COMPONENT_SET: ${node.name}`);
        console.log(`   Type: ${node.type}`);
        console.log(`   ID: ${node.id}`);
        console.log(`   Path: ${path}`);
        
        if (node.componentPropertyDefinitions) {
          console.log(`   Properties:`, Object.keys(node.componentPropertyDefinitions));
          
          // Extract property values
          Object.entries(node.componentPropertyDefinitions).forEach(([key, prop]) => {
            if (prop.type === 'VARIANT' && prop.variantOptions) {
              console.log(`     ${key}: ${prop.variantOptions.join(', ')}`);
            }
          });
        }
        
        // List all child components (variants)
        if (node.children && Array.isArray(node.children)) {
          console.log(`\n   Variants (${node.children.length}):`);
          node.children.forEach((child, idx) => {
            if (child.type === 'COMPONENT') {
              console.log(`\n   [${idx + 1}] ${child.name}`);
              
              if (child.absoluteBoundingBox) {
                const w = Math.round(child.absoluteBoundingBox.width);
                const h = Math.round(child.absoluteBoundingBox.height);
                console.log(`       Size: ${w}x${h}px`);
              }
              
              if (child.fills && child.fills.length > 0) {
                const fill = child.fills[0];
                if (fill.type === 'SOLID' && fill.color) {
                  const r = Math.round(fill.color.r * 255);
                  const g = Math.round(fill.color.g * 255);
                  const b = Math.round(fill.color.b * 255);
                  const hex = `#${[r,g,b].map(x => x.toString(16).padStart(2,'0')).join('')}`.toUpperCase();
                  console.log(`       Color: ${hex} rgb(${r}, ${g}, ${b})`);
                  if (fill.opacity !== undefined && fill.opacity !== 1) {
                    console.log(`       Opacity: ${fill.opacity}`);
                  }
                }
              }
              
              if (child.effects && child.effects.length > 0) {
                console.log(`       Effects: ${child.effects.map(e => e.type).join(', ')}`);
              }
            }
          });
        }
      }
      
      if (nodeName.includes('bullet') || nodeName.includes('oc-bullet')) {
        bulletCount++;
      }
      
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(child => traverse(child, `${path}/${node.name}`));
      }
    }
    
    if (data.document) {
      traverse(data.document);
    }
    
    console.log(`\n📊 Total bullet components found: ${bulletCount}`);
    
    if (bulletCount === 0) {
      console.log('\n⚠️  No bullet components found in the file.');
      console.log('Listing all component sets and components:\n');
      
      function listComponents(node, depth = 0) {
        if (!node) return;
        
        if (node.type === 'COMPONENT_SET' || node.type === 'COMPONENT') {
          const indent = '  '.repeat(depth);
          console.log(`${indent}• ${node.name} (${node.type})`);
        }
        
        if (node.children && Array.isArray(node.children)) {
          node.children.forEach(child => listComponents(child, depth + 1));
        }
      }
      
      listComponents(data.document);
    }
    
  } catch (err) {
    console.error('\n❌ Request failed:', err.message);
    console.error(err.stack);
  }
}

testFigmaAPI();

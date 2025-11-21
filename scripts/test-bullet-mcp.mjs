#!/usr/bin/env node
/**
 * Test script to fetch Bullet component from Figma via MCP
 */

const MCP_URL = 'http://127.0.0.1:3845/mcp';
const FILE_KEY = 'zB9JxH85SZ9yDCUYw8CUwU';

async function fetchBulletComponent() {
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

    // Search for oc-bullet component
    const bulletComponent = findComponent(fileData.document, 'oc-bullet');
    
    if (bulletComponent) {
      console.log('\n🎯 Composant oc-bullet trouvé!');
      console.log(JSON.stringify(bulletComponent, null, 2));
    } else {
      console.log('\n⚠️  Composant oc-bullet non trouvé dans le fichier');
      console.log('Recherche de composants similaires...');
      const allComponents = findAllComponents(fileData.document);
      console.log('\nComposants disponibles:');
      allComponents.forEach(c => console.log(` - ${c.name} (${c.type})`));
    }

  } catch (err) {
    console.error('❌ Erreur:', err.message);
  }
}

function findComponent(node, name) {
  if (!node) return null;
  
  if (node.name && node.name.toLowerCase().includes(name.toLowerCase())) {
    return node;
  }
  
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      const found = findComponent(child, name);
      if (found) return found;
    }
  }
  
  return null;
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

fetchBulletComponent();

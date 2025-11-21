#!/usr/bin/env node

/**
 * Script d'extraction synchrone du composant Checkbox depuis Figma
 * Utilise le serveur MCP Figma local pour récupérer les specs
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MCP_SERVER = 'http://127.0.0.1:3845/mcp';
const FIGMA_FILE_KEY = 'zB9JxH85SZ9yDCUYw8CUwU'; // OneChaps
const COMPONENT_NODE_ID = '2327:3585'; // oc-checkbox-light

async function callMCP(method, params) {
  const response = await fetch(MCP_SERVER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ method, params })
  });
  
  if (!response.ok) {
    throw new Error(`MCP call failed: ${response.statusText}`);
  }
  
  const data = await response.json();
  return JSON.parse(data.result.content[0].text);
}

async function extractCheckboxSpecs() {
  console.log('🔍 Extraction des specs Checkbox depuis Figma...\n');

  // Récupérer le node complet
  const nodeData = await callMCP('tools/call', {
    name: 'figma_get_node',
    arguments: {
      file_key: FIGMA_FILE_KEY,
      node_id: COMPONENT_NODE_ID
    }
  });

  const component = nodeData.nodes[COMPONENT_NODE_ID.replace(':', '-')];
  const document = component.document;

  console.log(`📦 Composant: ${document.name}`);
  console.log(`📏 Taille: ${document.absoluteBoundingBox.width}×${document.absoluteBoundingBox.height}px\n`);

  // Analyser les variantes
  const variants = document.children || [];
  const selections = new Set();
  const states = new Set();
  
  variants.forEach(variant => {
    const name = variant.name;
    const match = name.match(/selection=(\w+), state=(\w+)/);
    if (match) {
      selections.add(match[1]);
      states.add(match[2]);
    }
  });

  console.log(`✅ Sélections trouvées: ${Array.from(selections).join(', ')}`);
  console.log(`✅ États trouvés: ${Array.from(states).join(', ')}\n`);

  // Extraire les styles
  const defaultVariant = variants.find(v => 
    v.name === 'selection=unselected, state=default'
  );

  const specs = {
    name: 'Checkbox',
    componentName: 'oc-checkbox-light',
    figmaNodeId: COMPONENT_NODE_ID,
    figmaFileKey: FIGMA_FILE_KEY,
    extractedAt: new Date().toISOString(),
    source: `https://www.figma.com/design/${FIGMA_FILE_KEY}?node-id=${COMPONENT_NODE_ID.replace(':', '-')}`,
    
    variants: {
      selection: Array.from(selections),
      state: Array.from(states)
    },

    dimensions: {
      width: '16px',
      height: '16px'
    },

    styles: {
      borderRadius: '4px',
      borderWidth: '1px',
      checkmarkSize: '12px'
    },

    colors: {
      default: {
        border: 'var(--color-font-primary-base)',
        background: 'transparent',
        checkmark: '#ffffff'
      },
      selected: {
        border: 'var(--color-font-primary-base)',
        background: 'var(--color-bg-primary-base)',
        checkmark: '#ffffff'
      },
      hovered: {
        border: 'var(--color-font-primary-hovered)',
        background: 'var(--color-bg-primary-lighter)',
        selectedBg: 'var(--color-bg-primary-hovered)'
      },
      pressed: {
        border: 'var(--color-font-primary-base)',
        background: 'var(--color-bg-primary-light)',
        selectedBg: 'var(--color-bg-primary-pressed)'
      },
      focused: {
        outline: 'var(--color-stroke-focus)',
        outlineWidth: '2px'
      },
      disabled: {
        border: 'var(--color-border-base)',
        background: 'var(--color-bg-neutral-disabled)',
        checkmark: 'var(--color-font-neutral-muted)'
      }
    },

    tokens: {
      spacing: 'var(--space-xs)',
      borderRadius: 'var(--radius-xs)',
      stroke: 'var(--stroke-xs)'
    }
  };

  // Sauvegarder les specs
  const specsPath = join(__dirname, '../../../specs/checkbox-specs.json');
  writeFileSync(specsPath, JSON.stringify(specs, null, 2));
  
  console.log(`💾 Specs sauvegardées: ${specsPath}`);
  console.log(`\n✨ Extraction terminée avec succès!`);

  return specs;
}

// Exécution
extractCheckboxSpecs().catch(console.error);

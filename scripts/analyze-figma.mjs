#!/usr/bin/env node
/**
 * Analyse complète du fichier Figma via MCP
 */

const DEFAULT_MCP_PORT = 3845;
const MCP_PORT = process.env.MCP_PORT ? Number(process.env.MCP_PORT) : DEFAULT_MCP_PORT;
const MCP_URL = process.env.MCP_URL || `http://localhost:${MCP_PORT}`;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY_2 || 'zB9JxH85SZ9yDCUYw8CUwU';

async function callMCP(method, params) {
  const response = await fetch(MCP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: Date.now(), method, params }),
  });
  const result = await response.json();
  if (result.error) throw new Error(result.error.message);
  return result.result;
}

async function analyzeFigmaFile() {
  console.log('🔍 Analyse complète du fichier Figma "one chaps ui kit"...\n');

  try {
    const fileData = await callMCP('tools/call', {
      name: 'figma_get_file',
      arguments: { file_key: FIGMA_FILE_KEY },
    });

    console.log('📄 Informations du fichier:');
    console.log(`  Nom: ${fileData.name}`);
    console.log(`  Clé: ${fileData.key}`);
    console.log(`  Dernière modification: ${new Date(fileData.lastModified).toLocaleString()}`);
    console.log(`  Version: ${fileData.version}`);
    console.log('');

    const stats = {
      components: [],
      frames: [],
      tagRelated: [],
      colorVariants: []
    };

    function traverse(node, path = []) {
      if (!node) return;

      const currentPath = [...path, node.name];
      const fullPath = currentPath.join(' > ');
      const nodeName = node.name.toLowerCase();

      // Collecter les composants
      if (node.type === 'COMPONENT') {
        stats.components.push({
          id: node.id,
          name: node.name,
          type: node.type,
          path: fullPath
        });
      }

      // Collecter les frames
      if (node.type === 'FRAME') {
        stats.frames.push({
          id: node.id,
          name: node.name,
          type: node.type,
          path: fullPath
        });
      }

      // Collecter tout ce qui est lié aux tags
      if (nodeName.includes('tag') || fullPath.toLowerCase().includes('tag')) {
        stats.tagRelated.push({
          id: node.id,
          name: node.name,
          type: node.type,
          path: fullPath
        });
      }

      // Collecter les variantes de couleurs potentielles
      const colorKeywords = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'danger', 'green', 'red', 'blue', 'orange', 'yellow', 'purple', 'pink'];
      if (colorKeywords.some(keyword => nodeName.includes(keyword))) {
        stats.colorVariants.push({
          id: node.id,
          name: node.name,
          type: node.type,
          path: fullPath
        });
      }

      if (node.children) {
        node.children.forEach(child => traverse(child, currentPath));
      }
    }

    traverse(fileData.document);

    console.log('📊 STATISTIQUES:');
    console.log(`  Composants: ${stats.components.length}`);
    console.log(`  Frames: ${stats.frames.length}`);
    console.log(`  Éléments liés aux tags: ${stats.tagRelated.length}`);
    console.log(`  Variantes de couleurs: ${stats.colorVariants.length}`);
    console.log('');

    console.log('🔧 COMPOSANTS TROUVÉS:');
    stats.components.forEach(comp => {
      console.log(`  - ${comp.name} (${comp.type})`);
      console.log(`    Chemin: ${comp.path}`);
      console.log('');
    });

    console.log('🏷️ ÉLÉMENTS LIÉS AUX TAGS:');
    if (stats.tagRelated.length === 0) {
      console.log('  Aucun élément trouvé avec "tag" dans le nom ou le chemin');
    } else {
      stats.tagRelated.forEach(item => {
        console.log(`  - ${item.name} (${item.type})`);
        console.log(`    Chemin: ${item.path}`);
        console.log('');
      });
    }

    console.log('🎨 VARIANTES DE COULEURS POTENTIELLES:');
    if (stats.colorVariants.length === 0) {
      console.log('  Aucune variante de couleur trouvée');
    } else {
      stats.colorVariants.forEach(variant => {
        console.log(`  - ${variant.name} (${variant.type})`);
        console.log(`    Chemin: ${variant.path}`);
        console.log('');
      });
    }

    // Analyser spécifiquement les composants Tag
    console.log('🔍 ANALYSE SPÉCIFIQUE DES TAGS:');
    const tagComponents = stats.components.filter(c => c.name.toLowerCase().includes('tag'));
    const tagFrames = stats.frames.filter(f => f.name.toLowerCase().includes('tag'));

    if (tagComponents.length === 0 && tagFrames.length === 0) {
      console.log('  ❌ Aucun composant ou frame Tag trouvé dans le fichier Figma');
      console.log('  💡 Il se peut que les tags soient organisés différemment ou utilisent une nomenclature différente');
    } else {
      console.log('  Composants Tag:');
      tagComponents.forEach(comp => console.log(`    - ${comp.name}`));

      console.log('  Frames Tag:');
      tagFrames.forEach(frame => console.log(`    - ${frame.name}`));
    }

  } catch (error) {
    console.error('❌ Erreur lors de l\'analyse:', error.message);
    console.log('\n🔧 Vérifications:');
    console.log('  - Le serveur MCP fonctionne-t-il sur http://localhost:3845 ?');
    console.log('  - Le token FIGMA_ACCESS_TOKEN est-il configuré dans .env ?');
    console.log('  - La clé du fichier Figma est-elle correcte ?');
  }
}

analyzeFigmaFile();

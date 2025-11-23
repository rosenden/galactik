// scripts/figma-rest-extract-tokens-solary.mjs
dotenv.config();

import fetch from 'node-fetch';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const FILE_KEY = process.env.FIGMA_FILE_KEY;
const TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const OUTPUT = 'tokens-solary.json';

if (!FILE_KEY || !TOKEN) {
  throw new Error('FIGMA_FILE_KEY et FIGMA_ACCESS_TOKEN doivent être définis dans .env');
}

function parsePaint(paint) {
  if (!paint) return null;
  if (paint.type === 'SOLID') {
    const { r, g, b } = paint.color;
    const a = paint.opacity !== undefined ? paint.opacity : 1;
    return `rgba(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)},${a})`;
  }
  // TODO: gérer les gradients, images, etc.
  return null;
}

function extractColorsFromStyles(styles, styleType, fileData) {
  const result = {};
  for (const [styleId, style] of Object.entries(styles)) {
    if (style.style_type === styleType) {
      // Chercher le node correspondant dans le document
      const node = findNodeByStyleId(fileData.document, styleId);
      if (node && node.fills && node.fills.length > 0) {
        result[style.name] = parsePaint(node.fills[0]);
      }
    }
  }
  return result;
}

function findNodeByStyleId(node, styleId) {
  if (node.styles && node.styles.fill === styleId) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeByStyleId(child, styleId);
      if (found) return found;
    }
  }
  return null;
}

function extractTextStyles(styles, fileData) {
  const result = {};
  for (const [styleId, style] of Object.entries(styles)) {
    if (style.style_type === 'TEXT') {
      const node = findNodeByStyleId(fileData.document, styleId);
      if (node && node.style) {
        result[style.name] = {
          fontFamily: node.style.fontFamily,
          fontWeight: node.style.fontWeight,
          fontSize: node.style.fontSize,
          letterSpacing: node.style.letterSpacing,
          lineHeightPx: node.style.lineHeightPx
        };
      }
    }
  }
  return result;
}

async function extractTokensAndStyles() {
  // 1. Récupérer le fichier complet (pour styles)
  const fileUrl = `https://api.figma.com/v1/files/${FILE_KEY}`;
  const headers = { 'X-Figma-Token': TOKEN };
  console.log('Fetching Figma file:', fileUrl);
  const fileRes = await fetch(fileUrl, { headers });
  if (!fileRes.ok) throw new Error(`Figma API error: ${fileRes.status} ${fileRes.statusText}`);
  const fileData = await fileRes.json();

  // Extraction des styles (couleurs, textes, effets...)
  const styles = fileData.styles || {};
  const colors = extractColorsFromStyles(styles, 'FILL', fileData);
  const textStyles = extractTextStyles(styles, fileData);
  // TODO: ajouter extraction d'autres styles si besoin

  const output = {
    colors,
    textStyles,
    styles,
    lastModified: fileData.lastModified || null,
    name: fileData.name || null
  };
  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
  console.log(`✅ Couleurs et styles extraits et sauvegardés dans ${OUTPUT}`);
}

extractTokensAndStyles().catch(err => {
  console.error('❌ Extraction failed:', err.message);
  process.exit(1);
});

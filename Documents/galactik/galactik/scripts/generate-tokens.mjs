#!/usr/bin/env node

/**
 * Script pour générer les variables CSS à partir de tokens.json
 * Compatible avec la structure existante dans styles/tokens.css
 * 
 * Usage:
 *   node scripts/generate-tokens.mjs
 * 
 * Génère:
 *   styles/tokens-generated.css (variables CSS)
 *   styles/tokens-generated-vars.js (export pour JS/TS)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tokensPath = path.resolve(__dirname, '../tokens.json');
const cssOutPath = path.resolve(__dirname, '../styles/tokens-generated.css');
const jsOutPath = path.resolve(__dirname, '../styles/tokens-generated-vars.js');

// Charge tokens.json
function loadTokens() {
  try {
    const content = fs.readFileSync(tokensPath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`❌ Erreur lors de la lecture de tokens.json:`, err.message);
    process.exit(1);
  }
}

// Résout les références de tokens (ex: {base/colors.palette.pink.500})
function resolveReference(ref, tokens) {
  const match = ref.match(/^\{(.*)\}$/);
  if (!match) return ref;

  const path = match[1].split('.');
  let value = tokens;

  for (const part of path) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      console.warn(`⚠️  Référence non trouvée: ${ref}`);
      return ref;
    }
  }

  // Si c'est un objet avec 'value', extrait la valeur
  if (value && typeof value === 'object' && 'value' in value) {
    return value.value;
  }

  return value;
}

// Applique les références en profondeur
function resolveAllReferences(obj, tokens, depth = 0) {
  if (depth > 10) {
    console.warn('⚠️  Profondeur de référence trop grande (boucle infinie?)');
    return obj;
  }

  if (typeof obj === 'string' && obj.startsWith('{')) {
    return resolveAllReferences(resolveReference(obj, tokens), tokens, depth + 1);
  }

  if (Array.isArray(obj)) {
    return obj.map(v => resolveAllReferences(v, tokens, depth + 1));
  }

  if (typeof obj === 'object' && obj !== null) {
    const resolved = {};
    for (const [key, value] of Object.entries(obj)) {
      resolved[key] = resolveAllReferences(value, tokens, depth + 1);
    }
    return resolved;
  }

  return obj;
}

// Génère des variables CSS à partir des tokens
function generateCSSVariables(tokens) {
  let css = `/* Auto-generated from tokens.json */
/* Generated on ${new Date().toISOString()} */
/* DO NOT EDIT MANUALLY - Run: node scripts/generate-tokens.mjs */

:root,
:root[data-theme='light'] {
`;

  function flattenTokens(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined) continue;

      const varName = prefix ? `${prefix}-${key}` : key;

      if (typeof value === 'object' && 'value' in value) {
        // Token with value property
        const cssVarName = `--${varName.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        css += `  ${cssVarName}: ${value.value};\n`;
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // Nested object, recurse
        flattenTokens(value, varName);
      }
    }
  }

  // Flatten base tokens first
  const baseTokens = {};
  const themeTokens = {};

  for (const [key, val] of Object.entries(tokens)) {
    if (key.startsWith('base/')) {
      baseTokens[key.replace('base/', '')] = val;
    } else if (key.startsWith('theme/')) {
      themeTokens[key.replace('theme/', '')] = val;
    }
  }

  flattenTokens(baseTokens);
  flattenTokens(themeTokens);

  css += `}\n`;
  return css;
}

// Génère un fichier d'export JS
function generateJSVariables(tokens) {
  const resolved = resolveAllReferences(tokens, tokens);

  let js = `/**
 * Auto-generated design tokens for JavaScript/TypeScript
 * Generated on ${new Date().toISOString()}
 * DO NOT EDIT MANUALLY - Run: node scripts/generate-tokens.mjs
 */

export const designTokens = ${JSON.stringify(resolved, null, 2)};

// Helper pour récupérer un token CSS par chemin
export function getToken(path) {
  const parts = path.split('.');
  let value = designTokens;
  for (const part of parts) {
    value = value?.[part];
  }
  return value?.value ?? null;
}

export default designTokens;
`;

  return js;
}

// Main
function main() {
  console.log('🚀 Génération des tokens CSS et JS...');

  const tokens = loadTokens();

  // Génère CSS
  const css = generateCSSVariables(tokens);
  fs.writeFileSync(cssOutPath, css, 'utf-8');
  console.log(`✅ CSS généré: ${cssOutPath}`);

  // Génère JS
  const js = generateJSVariables(tokens);
  fs.writeFileSync(jsOutPath, js, 'utf-8');
  console.log(`✅ JS généré: ${jsOutPath}`);

  console.log('\n📋 Prochaines étapes:');
  console.log('  1. Importe le CSS généré dans ton Storybook');
  console.log('  2. Ou utilise les tokens JS dans tes composants');
  console.log('  3. Mets à jour tokens.json si tu ajoutes/modifies des tokens');
}

main();

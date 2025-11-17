// convert-figma-to-tokens.js
// 📦 npm install --save-dev camelcase

const fs = require('fs');
const camelCase = require('camelcase');

const inputPath = 'tokens/figma-combined.json';
const outputPath = 'tokens/converted-tokens.json';

const figma = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

console.log(`🔍 Fichier chargé : ${inputPath}`);
console.log(`🔍 Nombre de variables trouvées : ${figma.variables?.length || 0}`);

const tokens = {};

figma.variables?.forEach(variable => {
  const pathParts = variable.name.split('.');
  const value = variable.valuesByMode?.default || variable.valuesByMode?.['Default'];
  if (!value) {
    console.warn(`⚠️ Pas de valeur pour la variable : ${variable.name}`);
    return;
  }

  let current = tokens;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const key = camelCase(pathParts[i]);
    current[key] = current[key] || {};
    current = current[key];
  }

  const finalKey = camelCase(pathParts[pathParts.length - 1]);
  current[finalKey] = { value };
});

fs.mkdirSync('tokens', { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(tokens, null, 2));
console.log(`✅ ${Object.keys(tokens).length} catégories exportées dans tokens/converted-tokens.json`);
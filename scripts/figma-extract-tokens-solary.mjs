// scripts/figma-extract-tokens-solary.mjs
import fetch from 'node-fetch';
import fs from 'fs';

const MCP_PORT = process.env.MCP_PORT || 3845;
const FILE_KEY = 'BWXtUSWTjvxk7gBRHKTN4Z'; // Solary

const OUTPUT = 'scripts/figma/extract/tokens-solary.json';

async function extractTokens() {
  const url = `http://localhost:${MCP_PORT}/v1/files/${FILE_KEY}`;
  console.log('Fetching Figma file data from:', url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Figma MCP API error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();

  // Extraction des variables (design tokens)
  let variables = {};
  if (data.variables) {
    variables = data.variables;
  } else if (data.document && data.document.children) {
    // Recherche récursive de variables dans le document
    function findVariables(node) {
      if (node.variables) return node.variables;
      if (node.children) {
        for (const child of node.children) {
          const found = findVariables(child);
          if (found) return found;
        }
      }
      return null;
    }
    const foundVars = findVariables(data.document);
    if (foundVars) variables = foundVars;
  }

  // Extraction des styles (paint, text, effect, grid)
  const styles = data.styles || {};

  const output = { variables, styles };
  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
  console.log(`✅ Variables et styles extraits et sauvegardés dans ${OUTPUT}`);
}

extractTokens().catch(err => {
  console.error('❌ Extraction failed:', err.message);
  process.exit(1);
});

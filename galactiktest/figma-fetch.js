// figma-fetch.js
const fetch = require('node-fetch');
const fs = require('fs');

const FIGMA_FILE_ID = 'OPcj83krFGFw2FF6tqC5Gj';
const FIGMA_TOKEN = 'figd_u7Yh5O3Jkvzb-d6jPHjLPNzhdjFStTQQJSkqW6CH';
const TARGET_MODE = 'boston.theme';

const FILE_URL = `https://api.figma.com/v1/files/${FIGMA_FILE_ID}`;
const VAR_URL = `https://api.figma.com/v1/files/${FIGMA_FILE_ID}/variables`;

const headers = { 'X-Figma-Token': FIGMA_TOKEN };

const fetchStyles = () =>
  fetch(FILE_URL, { headers })
    .then((res) => res.json())
    .then((data) => {
      const styles = data.styles || {};
      return Object.entries(styles).map(([id, style]) => ({
        id,
        name: style.name,
        type: style.style_type,
        description: style.description || ''
      }));
    });

const fetchVariables = () =>
  fetch(VAR_URL, { headers })
    .then((res) => res.json())
    .then((data) => {
      const rawVars = data.meta?.variables || [];
      console.log(`📦 ${rawVars.length} variables brutes reçues depuis Figma.`);

      rawVars.forEach(v => {
        const keys = Object.keys(v.valuesByMode || {});
        console.log(`- ${v.name}:`, keys);
      });

      return rawVars.map(v => {
        const value = v.valuesByMode?.[TARGET_MODE] || null;
        return {
          name: v.name,
          type: v.resolvedType,
        };
      }).filter(v => v.value);
    });

Promise.all([fetchStyles(), fetchVariables()])
  .then(([styles, variables]) => {
    const combined = { styles, variables };
    fs.mkdirSync('tokens', { recursive: true });
    fs.writeFileSync('tokens/figma-combined.json', JSON.stringify(combined, null, 2));
    console.log(`✅ ${styles.length} styles et ${variables.length} variables Figma sauvegardés dans tokens/figma-combined.json`);
  })
  .catch((err) => {
    console.error('❌ Erreur lors de la récupération Figma :', err);
  });


// build-tokens.mjs
import StyleDictionary from 'style-dictionary';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./style-dictionary.config.json', 'utf-8'));
const dictionary = StyleDictionary.create(config);

dictionary.buildAllPlatforms();

const allTokens = dictionary.getAllTokens?.() || dictionary.exportPlatform('css').allProperties || [];
console.log(`✅ ${allTokens.length} variables générées dans src/tokens/variables.css`);

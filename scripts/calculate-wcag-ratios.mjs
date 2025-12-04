#!/usr/bin/env node
/**
 * Calculate WCAG contrast ratios for all color token combinations
 * Generates a comprehensive JSON with all contrast data
 */

import fs from 'fs';

// WCAG contrast ratio calculation
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(x => {
    x = x / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(rgb1, rgb2) {
  const parseRGB = (hex) => {
    const h = hex.replace('#', '');
    return [
      parseInt(h.substring(0, 2), 16),
      parseInt(h.substring(2, 4), 16),
      parseInt(h.substring(4, 6), 16)
    ];
  };
  
  const [r1, g1, b1] = parseRGB(rgb1);
  const [r2, g2, b2] = parseRGB(rgb2);
  
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

function getWCAGLevel(ratio) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  return 'Fail';
}

// Define all color tokens from tokens.css
const colorTokens = {
  'pink': { '50': '#fcf7fd', '100': '#faecfb', '200': '#efc9f3', '300': '#dbbade', '400': '#c9aacb', '500': '#b896bb', '600': '#a582ab', '700': '#926e9b', '800': '#7f5a8b', '900': '#6c467b', '950': '#4a325b' },
  'grey': { '50': '#fdfefe', '100': '#f9fafb', '200': '#eff2f6', '300': '#b9c4d5', '400': '#97a6be', '500': '#7685a2', '600': '#626c84', '700': '#4d5260', '800': '#36383e', '900': '#272b30', '950': '#171c1f' },
  'yellow': { '50': '#fef8ed', '100': '#fdf2dc', '200': '#fbe5b9', '300': '#f8d795', '400': '#f6ca72', '500': '#c89b40', '600': '#9d7930', '700': '#715621', '800': '#5b4519', '900': '#463411', '950': '#30230a' },
  'orange': { '50': '#fff6f1', '100': '#ffeee2', '200': '#ffddc6', '300': '#ffcba9', '400': '#ffba8d', '500': '#df884f', '600': '#be703c', '700': '#98552a', '800': '#85461e', '900': '#753a13', '950': '#592a0b' },
  'green': { '50': '#f6faf5', '100': '#e5eee3', '200': '#c4d6c0', '300': '#91b38b', '400': '#709b67', '500': '#4e8344', '600': '#3e6936', '700': '#2f4f29', '800': '#1f341b', '900': '#172714', '950': '#101a0e' },
  'red': { '50': '#ffefef', '100': '#ffdedf', '200': '#ffbebf', '300': '#ff9d9f', '400': '#ff7d7f', '500': '#d64a4c', '600': '#ad3739', '700': '#852527', '800': '#701c1d', '900': '#5c1214', '950': '#47090a' },
  'cherry': { '50': '#f8f0f1', '100': '#f1e0e4', '200': '#e2c1c8', '300': '#d4a3ad', '400': '#c58491', '500': '#bb6779', '600': '#6e3d47', '700': '#49282f', '800': '#371e23', '900': '#251418', '950': '#120a0c' },
  'indigo': { '50': '#f2f4fc', '100': '#e5e9f9', '200': '#cbd4f2', '300': '#b2beec', '400': '#98a9e5', '500': '#6779bb', '600': '#505f97', '700': '#394673', '800': '#2e3961', '900': '#222c4f', '950': '#171f3d' },
  'blue': { '50': '#f1f6fa', '100': '#e2edf4', '200': '#c5dbea', '300': '#a9cadf', '400': '#8cb8d5', '500': '#5a87a4', '600': '#45677e', '700': '#2f4859', '800': '#253846', '900': '#1a2833', '950': '#101920' },
  'cyan': { '50': '#e6eff0', '100': '#d4e3e4', '200': '#b1cccd', '300': '#8db4b5', '400': '#6a9d9e', '500': '#468586', '600': '#2a5050', '700': '#1c3536', '800': '#152828', '900': '#0e1b1b', '950': '#070d0d' },
  'sage': { '50': '#f5f8f7', '100': '#e8f0ee', '200': '#d1e1dd', '300': '#a9c1b8', '400': '#7a9b95', '500': '#607c7f', '600': '#5d7374', '700': '#4f6162', '800': '#445556', '900': '#374648', '950': '#2d393a', '975': '#222d30' },
  'almond': { '50': '#f1f8f4', '100': '#dcefe3', '200': '#bbdfca', '300': '#8ec7a9', '400': '#5fa884', '500': '#3d8c69', '600': '#2c6f52', '700': '#235944', '800': '#1e4737', '900': '#193b2e', '950': '#0d211a' }
};

console.log('🎨 Calculating WCAG contrast ratios for all color combinations...\n');

const allCombinations = [];
const validCombinations = { AA: [], AAA: [] };
const forbiddenCombinations = [];

let totalCount = 0;
let validCount = 0;
let forbiddenCount = 0;

// Calculate all ratios
for (const [bgFamily, bgShades] of Object.entries(colorTokens)) {
  for (const [bgShade, bgHex] of Object.entries(bgShades)) {
    for (const [textFamily, textShades] of Object.entries(colorTokens)) {
      for (const [textShade, textHex] of Object.entries(textShades)) {
        const ratio = getContrastRatio(bgHex, textHex);
        const level = getWCAGLevel(ratio);
        
        const combination = {
          background: {
            family: bgFamily,
            shade: bgShade,
            hex: bgHex
          },
          text: {
            family: textFamily,
            shade: textShade,
            hex: textHex
          },
          ratio: parseFloat(ratio.toFixed(2)),
          level
        };
        
        allCombinations.push(combination);
        totalCount++;
        
        if (level === 'AAA') {
          validCombinations.AAA.push(combination);
          validCount++;
        } else if (level === 'AA') {
          validCombinations.AA.push(combination);
          validCount++;
        } else {
          forbiddenCombinations.push(combination);
          forbiddenCount++;
        }
      }
    }
  }
}

// Sort by ratio
allCombinations.sort((a, b) => b.ratio - a.ratio);
validCombinations.AAA.sort((a, b) => b.ratio - a.ratio);
validCombinations.AA.sort((a, b) => b.ratio - a.ratio);
forbiddenCombinations.sort((a, b) => a.ratio - b.ratio);

// Generate summary
const summary = {
  generated: new Date().toISOString(),
  statistics: {
    total: totalCount,
    valid: validCount,
    validAAA: validCombinations.AAA.length,
    validAA: validCombinations.AA.length,
    forbidden: forbiddenCount,
    validPercentage: ((validCount / totalCount) * 100).toFixed(2) + '%'
  },
  wcagStandards: {
    AAA: '7.0:1 or higher (enhanced contrast)',
    AA: '4.5:1 or higher (standard)',
    Fail: 'Less than 4.5:1 (insufficient contrast)'
  }
};

// Save comprehensive data
const comprehensiveData = {
  ...summary,
  allCombinations: allCombinations.slice(0, 500) // Top 500 for file size
};

// Save valid combinations only
const validData = {
  ...summary,
  validCombinations
};

// Save forbidden combinations only
const forbiddenData = {
  ...summary,
  forbiddenCombinations: forbiddenCombinations.slice(0, 500)
};

fs.writeFileSync('contrast-ratios-comprehensive.json', JSON.stringify(comprehensiveData, null, 2));
fs.writeFileSync('contrast-ratios-valid.json', JSON.stringify(validData, null, 2));
fs.writeFileSync('contrast-ratios-forbidden.json', JSON.stringify(forbiddenData, null, 2));

// Print summary
console.log('📊 WCAG Contrast Ratio Analysis Summary\n');
console.log(`Total combinations analyzed: ${summary.statistics.total}`);
console.log(`Valid combinations (AA+): ${summary.statistics.valid} (${summary.statistics.validPercentage})`);
console.log(`  - AAA (7.0:1+): ${summary.statistics.validAAA}`);
console.log(`  - AA (4.5:1+): ${summary.statistics.validAA}`);
console.log(`Forbidden combinations: ${summary.statistics.forbidden}`);

console.log('\n✅ Files generated:');
console.log('  - contrast-ratios-comprehensive.json (top 500 combinations)');
console.log('  - contrast-ratios-valid.json (all valid AA+ combinations)');
console.log('  - contrast-ratios-forbidden.json (all failing combinations)');

console.log('\n📈 Top 10 Best Contrast Ratios:');
allCombinations.slice(0, 10).forEach((combo, idx) => {
  console.log(`  ${idx + 1}. ${combo.background.family}-${combo.background.shade} on ${combo.text.family}-${combo.text.shade}: ${combo.ratio}:1 (${combo.level})`);
});

console.log('\n⚠️  Bottom 10 Worst Contrast Ratios (that fail):');
forbiddenCombinations.slice(0, 10).forEach((combo, idx) => {
  console.log(`  ${idx + 1}. ${combo.background.family}-${combo.background.shade} on ${combo.text.family}-${combo.text.shade}: ${combo.ratio}:1 (FAIL)`);
});

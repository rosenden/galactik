#!/usr/bin/env node

/**
 * figma-extract.mjs
 * 
 * Extract design tokens (colors, spacing, radii) from a Figma file using the Figma API
 * - Requires environment variables: FIGMA_ACCESS_TOKEN, FIGMA_FILE_KEY
 * - Outputs: tokens-extracted.json (raw), and optionally merges into tokens.json
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=figd_... FIGMA_FILE_KEY=BWXt... node scripts/figma-extract.mjs
 */

import fs from 'fs';
import https from 'https';
import fetch from 'node-fetch';

const TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;
const OUT_PATH = './tokens-extracted.json';

if (!TOKEN || !FILE_KEY) {
  console.error('ERROR: FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY must be set.');
  console.error('Example: FIGMA_ACCESS_TOKEN=figd_... FIGMA_FILE_KEY=BWXt... node scripts/figma-extract.mjs');
  process.exit(1);
}

async function api(path) {
  const res = await fetch(`https://api.figma.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Figma API error ${res.status}: ${JSON.stringify(json)}`);
  }
  return json;
}

function rgbaToHex(rgba) {
  if (!rgba) return null;
  // rgba values are {r,g,b,a} 0..1
  const r = Math.round((rgba.r ?? 0) * 255);
  const g = Math.round((rgba.g ?? 0) * 255);
  const b = Math.round((rgba.b ?? 0) * 255);
  const a = rgba.a === undefined || rgba.a === 1 ? null : Math.round((rgba.a ?? 1) * 255);
  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  return a ? `${hex}${a.toString(16).padStart(2, '0')}` : hex;
}

function resolveFillColor(node) {
  if (!node.fills || !Array.isArray(node.fills)) return null;
  const fill = node.fills.find(f => f.type === 'SOLID');
  if (!fill) return null;
  return rgbaToHex(fill.color);
}

function collectNodes(node, list = []) {
  if (!node) return list;
  list.push(node);
  if (node.children && Array.isArray(node.children)) {
    for (const c of node.children) collectNodes(c, list);
  }
  return list;
}

(async function main() {
  try {
    console.log('Fetching file meta...');
    const file = await api(`files/${FILE_KEY}?depth=3`);
    const doc = file.document;
    if (!doc || !doc.children) {
      console.error('File document empty or inaccessible.');
      process.exit(1);
    }

    console.log('Traversing nodes, looking for token groups (Colors, Spacing, Radius)...');
    const allNodes = collectNodes(doc, []);

    // Heuristics: find frames or groups whose name contains token keywords
    const candidates = allNodes.filter(n => {
      if (!n || !n.name) return false;
      const name = n.name.toLowerCase();
      return name.includes('token') || name.includes('tokens') || name.includes('color') || name.includes('palette') || name.includes('spacing') || name.includes('radius') || name.includes('radii');
    });

    console.log(`Found ${candidates.length} candidate token groups.`);

    const colors = {};
    const spacing = {};
    const radii = {};

    // Process candidate groups
    for (const grp of candidates) {
      const gname = (grp.name || '').toLowerCase();
      const nodes = collectNodes(grp);

      for (const n of nodes) {
        if (!n || !n.type) continue;
        const lname = (n.name || '').trim();
        const lnameLower = lname.toLowerCase();

        // Colors: rectangles with solid fills, or text nodes whose sibling rectangle has fill
        if (n.type === 'RECTANGLE' || n.type === 'ELLIPSE' || n.type === 'FRAME' || n.type === 'COMPONENT') {
          const c = resolveFillColor(n);
          if (c) {
            // pick a token name: use node name if descriptive, else parent name
            let tokenName = lname || grp.name || 'color';
            // normalize: replace spaces/slashes
            tokenName = tokenName.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_.]/g, '').toLowerCase();
            // if already exists, append index
            let key = tokenName;
            let idx = 1;
            while (colors[key]) {
              idx += 1;
              key = `${tokenName}-${idx}`;
            }
            colors[key] = c;
          }
        }

        // Text-based spacing: text nodes with numeric values (e.g., "8", "16px", "space-md")
        if (n.type === 'TEXT' && n.characters) {
          const text = n.characters.trim();
          // find numbers or px
          const m = text.match(/(\d+\.?\d*)\s*(px)?/i);
          if (m) {
            const val = m[1] + (m[2] ? 'px' : '');
            const tokenName = text.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_.]/g, '').toLowerCase();
            spacing[tokenName] = val;
          }
        }

        // Radii: nodes with cornerRadius or individual corner radii
        if (n.type === 'RECTANGLE' && (n.cornerRadius || (n.topLeftRadius !== undefined))) {
          const r = n.cornerRadius ?? n.topLeftRadius ?? 0;
          let tokenName = lname || grp.name || 'radius';
          tokenName = tokenName.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_.]/g, '').toLowerCase();
          let key = tokenName;
          let idx = 1;
          while (radii[key]) {
            idx += 1;
            key = `${tokenName}-${idx}`;
          }
          radii[key] = `${r}px`;
        }
      }
    }

    // Fallback: if no candidates, scan entire doc for rectangles and text patterns
    if (Object.keys(colors).length === 0) {
      console.log('No candidate color groups — scanning all rectangles for fills...');
      for (const n of allNodes) {
        if (!n || !n.type) continue;
        if (['RECTANGLE','ELLIPSE'].includes(n.type)) {
          const c = resolveFillColor(n);
          if (c) {
            const name = (n.name || 'color').replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_.]/g, '').toLowerCase();
            let key = name;
            let idx = 1;
            while (colors[key]) {
              idx += 1; key = `${name}-${idx}`;
            }
            colors[key] = c;
          }
        }
        if (n.type === 'TEXT' && n.characters) {
          const m = n.characters.trim().match(/(\d+\.?\d*)\s*(px)?/i);
          if (m) {
            const name = n.characters.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_.]/g, '').toLowerCase();
            spacing[name] = m[1] + (m[2] ? 'px' : 'px');
          }
        }
      }
    }

    const result = { colors, spacing, radii };

    fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`✅ Extraction terminée — ${Object.keys(colors).length} colors, ${Object.keys(spacing).length} spacing, ${Object.keys(radii).length} radii.`);
    console.log(`Fichier écrit: ${OUT_PATH}`);
    console.log('Next: review tokens-extracted.json and merge values into tokens.json as needed.');
  } catch (err) {
    console.error('ERROR:', err.message);
    if (err.message.includes('403')) {
      console.error('→ The Figma token is invalid or lacks permissions (need personal access token with file:read).');
    }
    process.exit(1);
  }
})();

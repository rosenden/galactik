# 🎨 Workflow Figma → Code

Ce document décrit le workflow complet pour synchroniser les composants Figma avec le code React.

## Configuration

### 1. Fichiers Figma configurés

Deux fichiers Figma sont disponibles via le MCP server :

| Fichier | ID | Usage | Token |
|---------|-----|-------|-------|
| **Tokens** | `BWXtUSWTjvxk7gBRHKTN4Z` | Design tokens globaux | `FIGMA_ACCESS_TOKEN` |
| **UI Components** | `zB9JxH85SZ9yDCUYw8CUwU` | Composants d'interface | `FIGMA_ACCESS_TOKEN_2` |

### 2. MCP Server

Le serveur MCP proxy est configuré dans `.env` et gère automatiquement le routing des tokens :

```bash
# Port du serveur MCP
MCP_PORT=3845

# Figma tokens
FIGMA_ACCESS_TOKEN=figd_6CvVFDsvE5Q_EXOsgaila-WNIaEJ4qr7f1Y92Kr_
FIGMA_ACCESS_TOKEN_2=figd_7OgXkgB5STkwkBWDNS22TgaBhbC0oug7JujvgJp_

# Figma file IDs
FIGMA_FILE_KEY=BWXtUSWTjvxk7gBRHKTN4Z
FIGMA_FILE_KEY_2=zB9JxH85SZ9yDCUYw8CUwU
```

Démarrer le serveur :
```bash
pnpm run mcp:fallback
```

Le serveur tourne sur `http://localhost:3845` et proxifie les requêtes vers l'API Figma.

---

## 🔄 Synchronisation Badge (Exemple complet)

### Étape 1 : Extraction des specs Figma

```bash
pnpm run figma:badge:extract
```

Ce script (`scripts/sync-badge.mjs`) :
- ✅ Se connecte au fichier Figma via MCP
- ✅ Traverse toutes les frames de la page "Badge"
- ✅ Extrait couleurs, tailles, typographie, espacements
- ✅ Génère `badge-specs.json` avec toutes les specs

**Output** : `badge-specs.json`
```json
{
  "colors": {
    "sage": {
      "default": { "background": "#d1e1dd", "text": "#445556", ... },
      "light": { ... },
      "outline": { ... }
    },
    ...
  },
  "sizes": {
    "xsmall": { "width": 87, "height": 16, "typography": {...}, ... },
    ...
  },
  "typography": {
    "fontFamily": "Hanken Grotesk",
    ...
  }
}
```

### Étape 2 : Mise à jour du composant

Le composant React (`packages/react-ui/src/components/Badge.tsx`) a été mis à jour pour utiliser directement les valeurs de Figma :

**Avant** (CSS variables) :
```tsx
background: 'var(--color-bg-primary-base)'
```

**Après** (hex values directs) :
```tsx
background: '#d1e1dd'
```

Les tokens sont maintenant codés en dur dans le composant à partir des specs extraites.

### Étape 3 : Validation

```bash
pnpm run figma:badge:validate
```

Ce script (`scripts/validate-badge-sync.mjs`) :
- ✅ Vérifie que toutes les couleurs sont présentes
- ✅ Vérifie que les hex values correspondent
- ✅ Vérifie les tailles (height, fontSize, fontWeight)
- ✅ Vérifie la typographie
- ✅ Vérifie que les props sont à jour
- ✅ Détecte les CSS variables restantes

### Étape 4 : Test visuel

```bash
pnpm run storybook:react
```

Ouvrir `http://localhost:6006` et vérifier les stories du Badge.

---

## 📋 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `pnpm run mcp:fallback` | Démarrer le serveur MCP Figma |
| `pnpm run figma:badge:extract` | Extraire les specs Badge de Figma |
| `pnpm run figma:badge:validate` | Valider la sync Badge |
| `pnpm run figma:badge:sync` | Sync complète (extract + validate) |
| `pnpm run storybook:react` | Lancer Storybook React |

---

## 🎯 Composants synchronisés

### ✅ Badge

**Status** : Synchronisé  
**Fichier** : `packages/react-ui/src/components/Badge.tsx`  
**Specs** : `badge-specs.json`  
**Figma page** : "Badge"  

**Features synchronisées** :
- 20 couleurs × 3 variantes (filled, light, outline)
- 4 tailles (xsmall, small, medium, large)
- Typographie Hanken Grotesk
- Espacements et paddings
- Border radius

**API** :
```tsx
<Badge 
  label="New" 
  color="success" 
  variant="filled" 
  size="medium"
  showIcon
  icon={<Icon />}
  onClick={() => {}}
/>
```

### 🔜 Prochains composants

- Button
- Input
- Card
- Avatar
- ...

---

## 🛠️ Créer un nouveau workflow de sync

### 1. Créer le script d'extraction

```javascript
// scripts/sync-[component].mjs
import fetch from 'node-fetch';

const MCP_PORT = process.env.MCP_PORT || 3845;
const FILE_KEY = process.env.FIGMA_FILE_KEY_2;

async function extractSpecs() {
  const url = `http://localhost:${MCP_PORT}/v1/files/${FILE_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  
  // Extraire les specs du composant
  // ...
  
  // Sauvegarder dans [component]-specs.json
}

extractSpecs();
```

### 2. Mettre à jour le composant

Utiliser les specs extraites pour mettre à jour le code TypeScript/React.

### 3. Créer un script de validation

```javascript
// scripts/validate-[component]-sync.mjs
import fs from 'fs';

const specs = JSON.parse(fs.readFileSync('[component]-specs.json'));
const componentCode = fs.readFileSync('[component].tsx', 'utf-8');

// Vérifier que les valeurs Figma sont dans le code
// ...
```

### 4. Ajouter les scripts npm

```json
{
  "scripts": {
    "figma:[component]:extract": "node scripts/sync-[component].mjs",
    "figma:[component]:validate": "node scripts/validate-[component]-sync.mjs",
    "figma:[component]:sync": "node scripts/resync-[component].mjs"
  }
}
```

---

## 📚 Ressources

- **Figma REST API** : https://www.figma.com/developers/api
- **MCP Server code** : `scripts/mcp-fallback/server.mjs`
- **Badge example** : `scripts/sync-badge.mjs`
- **Validation example** : `scripts/validate-badge-sync.mjs`

---

## ⚠️ Notes importantes

1. **Tokens Figma** : Les tokens sont stockés dans `.env` et ne doivent JAMAIS être committés dans git
2. **MCP Server** : Doit être démarré avant toute extraction
3. **Validation** : Toujours valider après une extraction
4. **Tests visuels** : Vérifier dans Storybook après chaque sync
5. **Breaking changes** : Documenter les changements d'API dans le CHANGELOG

---

## 🔐 Sécurité

- ✅ Les tokens Figma sont dans `.env` (gitignored)
- ✅ Le MCP server tourne en local uniquement
- ✅ Aucune donnée n'est envoyée à des services tiers
- ✅ Les specs extraites sont committées dans git (pas de secrets)

---

**Dernière mise à jour** : $(date +%Y-%m-%d)  
**Version** : 1.0  
**Maintainer** : Galactik Team

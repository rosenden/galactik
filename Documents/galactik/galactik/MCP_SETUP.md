# MCP + Figma Plugin Setup Guide

## Quick Start

Tout est configuré et prêt à fonctionner. Trois étapes simples:

### 1. Configure ton token Figma (local, sécurisé)

Copie `.env.example` et renomme-le en `.env` (ou crée `.env`):

```bash
cp .env.example .env
```

Puis édite `.env` et ajoute ton vrai token personnel Figma:

```env
FIGMA_ACCESS_TOKEN=figs_your_personal_access_token_here
```

⚠️ **Important**: Jamais commit `.env` dans git — il est déjà dans `.gitignore`.

Pour générer un token Figma:
- Va sur https://www.figma.com/developers/docs#authentication
- Créé un "Personal access token" → copie-le dans `.env`.

### 2. Lance le MCP fallback server

Une fois ton token dans `.env`, le serveur peut le charger:

```bash
# Option A: direct
export FIGMA_ACCESS_TOKEN=$(grep FIGMA_ACCESS_TOKEN .env | cut -d= -f2)
pnpm run mcp:fallback

# Option B: from pnpm script (if env is already set)
pnpm run mcp:fallback

# Option C: from VS Code
# Ouvre Command Palette (Cmd+Shift+P) → "Run Task" → "Start MCP Fallback"
```

Résultat attendu:
```
MCP fallback server listening on http://127.0.0.1:3845/mcp
```

### 3. Teste le plugin Figma

- Ouvre Figma Desktop.
- Plugins → Development → "Import plugin from manifest..." → sélectionne:
  ```
  tools/figma-plugin/manifest.json
  ```
- Lance le plugin → Plugins → Development → Galactik MCP Figma Connector.
- Dans le plugin UI:
  - URL: `http://127.0.0.1:3845/mcp` (par défaut)
  - File key: `zB9JxH85SZ9yDCUYw8CUwU` (ou ton propre)
  - Clique **"Fetch via HTTP"**
  - Les résultats apparaîtront dans la zone output.

## Fichiers clés

- `.env.example` — template pour secrets locaux
- `.env` — fichier local (toi seul, jamais commit)
- `scripts/mcp-fallback/server.mjs` — petit serveur HTTP MCP
- `scripts/run-mcp.mjs` — lance un serveur configuré ou fallback
- `tools/figma-plugin/` — plugin Figma minimal
- `package.json` scripts:
  - `pnpm run mcp:fallback` — lance le serveur fallback
  - `pnpm run mcp:run -- "ServerName"` — lance un serveur depuis ~/.config/mcp/config.json

## Troubleshooting

| Problème | Solution |
|----------|----------|
| "FIGMA_ACCESS_TOKEN not set" | Assure-toi que `.env` existe et a `FIGMA_ACCESS_TOKEN=...` |
| "Invalid token" (403 from API) | Vérifie que ton token est un "Personal access token" (pas API key) |
| Port 3845 déjà utilisé | Change `MCP_PORT` dans `.env` ou tue le processus: `lsof -ti:3845 \| xargs kill -9` |
| Plugin UI ne charge pas | Ouvre DevTools du plugin (Figma) → Console → check for errors |

## Prochaines étapes optionnelles

- Ajoute un WebSocket endpoint au fallback pour supporter `Connect WebSocket` dans le plugin.
- Améliore l'UI du plugin pour afficher les données Figma en temps réel.
- Intègre avec tes workflow Storybook/components.

C'est tout ! Le système est maintenant simple et sécurisé pour le dev local. 🚀

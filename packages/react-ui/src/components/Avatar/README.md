# Avatar Component

Composant Avatar synchronisé avec le design system Figma via MCP server.

## 📋 Spécifications Figma

Le composant est synchronisé avec `avatar-specs.json` extrait depuis Figma.

### Tailles

| Taille | Dimensions | Font Size | Font Weight |
|--------|-----------|-----------|-------------|
| small  | 24×24px   | 10px      | 600         |
| medium | 32×32px   | 13px      | 600         |
| large  | 48×48px   | 18px      | 600         |

### Couleurs Figma

- **sauge**: `#e8f0ee` (bg) / `#445556` (text)
- **saugeDark**: `#445556` (bg) / `#ffffff` (text)
- **grey**: `#f2f2f3` (bg) / `#445556` (text)
- **accent**: `#a9c1b8` (bg) / `#ffffff` (text)

### Types

- **initials**: Affiche les initiales du nom (2 premières lettres)
- **image**: Affiche une photo depuis une URL

## 🎨 Utilisation

### Avatar avec initiales

```tsx
import { Avatar } from 'react-ui/components/Avatar/Avatar';

// Avatar par défaut avec couleurs Figma
<Avatar name="Alice Smith" size="medium" />

// Avatar avec couleurs personnalisées
<Avatar 
  name="Bob Jones" 
  size="large"
  background="#445556"
  color="#ffffff"
/>

// Avatar avec bordure (Figma Frame header)
<Avatar 
  name="Clara White"
  size="medium"
  background="#e8f0ee"
  color="#445556"
  strokeWeight={1}
  strokeColor="#445556"
/>
```

### Avatar avec image

```tsx
<Avatar 
  name="David Brown"
  src="https://example.com/photo.jpg"
  size="large"
/>
```

## 🔄 Synchronisation

Le composant utilise directement les spécifications extraites de Figma :

1. **Extraction** : `node scripts/sync-avatar.mjs`
2. **Spécifications** : `avatar-specs.json` (racine du projet)
3. **Import** : Les stories importent directement `avatar-specs.json`

### Script de synchronisation

```bash
# Démarrer le serveur MCP (nécessaire)
pnpm run mcp:fallback

# Extraire les spécifications
node scripts/sync-avatar.mjs
```

## 📦 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Nom complet pour générer les initiales |
| `src` | `string` | - | URL de l'image (optionnel) |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Taille de l'avatar |
| `background` | `string` | `'#e8f0ee'` | Couleur de fond (hex/CSS) |
| `color` | `string` | `'#445556'` | Couleur du texte (hex/CSS) |
| `strokeWeight` | `number` | - | Épaisseur de la bordure en pixels |
| `strokeColor` | `string` | - | Couleur de la bordure (hex/CSS) |
| `className` | `string` | - | Classes CSS additionnelles |

## 📚 Storybook

Consultez les stories pour voir toutes les variantes :

- **Playground** : Testez toutes les props interactivement
- **Variantes Figma** : Toutes les variantes extraites de Figma
- **Palette Couleurs** : Palette complète de couleurs Figma
- **Tailles** : Démonstration des 3 tailles
- **Avec Image** : Exemple avec photo
- **Matrice** : Combinaisons tailles × couleurs
- **Avec Bordures** : Exemples de bordures Figma

## 🔗 Source Figma

- **Fichier**: Design System Components
- **Key**: `zB9JxH85SZ9yDCUYw8CUwU`
- **Extraction**: Via MCP Server Figma
- **Date**: 2025-11-17

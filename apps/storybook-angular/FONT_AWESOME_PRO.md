# Configuration Font Awesome Pro

Les composants Angular utilisent des icônes Font Awesome Pro (fa-regular) pour être cohérents avec les composants React.

## État actuel

Le Storybook Angular charge actuellement la version **gratuite** de Font Awesome depuis un CDN public. Les icônes `fa-regular` ne fonctionneront pas correctement avec cette version.

## Configuration Font Awesome Pro

Pour utiliser Font Awesome Pro avec les icônes `fa-regular`, vous devez configurer votre Kit Pro.

### Option 1: Kit Font Awesome (Recommandé)

1. Connectez-vous à votre compte Font Awesome Pro sur https://fontawesome.com
2. Créez ou récupérez votre Kit sur https://fontawesome.com/kits
3. Remplacez dans `.storybook/preview-head.html` :

```html
<!-- Remplacer cette ligne -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" ... />

<!-- Par votre Kit Pro -->
<script src="https://kit.fontawesome.com/YOUR_KIT_ID.js" crossorigin="anonymous"></script>
```

### Option 2: CDN Pro avec Token

Si vous utilisez le CDN Pro avec token :

```html
<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v6.5.1/css/all.css" integrity="YOUR_INTEGRITY" crossorigin="anonymous">
```

## Utilisation

Une fois configuré, les classes `fa-regular` fonctionneront correctement :

```html
<oc-tag color="sage" iconLeft="fa-regular fa-tag">Tagged</oc-tag>
<oc-link href="/" icon="fa-regular fa-arrow-up-right">Link</oc-link>
```

## Icônes disponibles

### Composant Tag
- `iconLeft`: Icône à gauche du texte
- `iconRight`: Icône à droite du texte

Exemple :
```html
<oc-tag color="sage" iconLeft="fa-regular fa-tag">Label</oc-tag>
<oc-tag color="success" iconRight="fa-regular fa-check">Verified</oc-tag>
```

### Composant Link
- `icon`: Icône à droite du lien (défaut: `fa-regular fa-arrow-up-right`)

Exemple :
```html
<!-- Icône par défaut -->
<oc-link href="/">Link</oc-link>

<!-- Icône personnalisée -->
<oc-link href="/" icon="fa-regular fa-external-link">External</oc-link>

<!-- Sans icône -->
<oc-link href="/" [icon]="null">No icon</oc-link>
```

## Dépendances

Le package.json du Storybook Angular inclut les dépendances Pro :
```json
"@fortawesome/fontawesome-svg-core": "^7.1.0",
"@fortawesome/pro-regular-svg-icons": "^7.1.0"
```

Ces dépendances sont nécessaires pour la cohérence avec le reste du monorepo mais ne sont pas utilisées directement dans les composants Angular (qui utilisent des classes CSS).

import { Host, h } from '@stencil/core';
// Color tokens structure - same as React Badge/Avatar
const colorTokens = {
  sage: {
    primary: { background: 'var(--color-bg-primary-base)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-primary-lightest)', color: 'var(--color-font-primary-base)' }
  },
  almond: {
    primary: { background: 'var(--color-bg-secondary-base)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-secondary-lightest)', color: 'var(--color-font-secondary-base)' }
  },
  pink: {
    primary: { background: 'var(--color-bg-accent-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-accent-hover)', color: 'var(--color-font-accent-base)' }
  },
  grey: {
    primary: { background: 'var(--color-bg-neutral-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-neutral-disabled)', color: 'var(--color-font-neutral-muted)' }
  },
  info: {
    primary: { background: 'var(--color-bg-info-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-info-base)', color: 'var(--color-font-info-base)' }
  },
  error: {
    primary: { background: 'var(--color-bg-error-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-error-base)', color: 'var(--color-font-error-base)' }
  },
  success: {
    primary: { background: 'var(--color-bg-success-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-success-base)', color: 'var(--color-font-success-base)' }
  },
  warning: {
    primary: { background: 'var(--color-bg-warning-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-warning-base)', color: 'var(--color-font-warning-base)' }
  },
  indigo: {
    primary: { background: 'var(--color-bg-indigo-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-indigo-base-alt)', color: 'var(--color-font-indigo-base)' }
  },
  yellow: {
    primary: { background: 'var(--color-bg-yellow-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-yellow-base-alt)', color: 'var(--color-font-yellow-base)' }
  },
  cherry: {
    primary: { background: 'var(--color-bg-cherry-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-cherry-base)', color: 'var(--color-font-cherry-base)' }
  },
  cyan: {
    primary: { background: 'var(--color-bg-cyan-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-cyan-base-alt)', color: 'var(--color-font-cyan-base)' }
  }
};
const colorAliases = {
  orange: 'warning',
  green: 'success',
  blue: 'info',
  red: 'error'
};
// Figma specs sizes
const sizeSpecs = {
  small: { width: '24px', height: '24px', fontSize: '10px', lineHeight: '1' },
  medium: { width: '32px', height: '32px', fontSize: '13px', lineHeight: '1' },
  large: { width: '48px', height: '48px', fontSize: '18px', lineHeight: '1' }
};
export class GalAvatar {
  constructor() {
    this.name = '';
    this.src = undefined;
    this.icon = undefined;
    this.alt = undefined;
    this.size = 'medium';
    this.variant = 'primary';
    this.avatarColor = 'sage';
    this.status = 'none';
  }
  getInitials() {
    if (!this.name)
      return '?';
    const parts = this.name.trim().split(/\s+/).slice(0, 2);
    return parts.map(p => p.charAt(0).toUpperCase()).join('') || '?';
  }
  getAlt() {
    if (this.alt)
      return this.alt;
    if (this.name)
      return `Avatar de ${this.name}`;
    if (this.icon)
      return 'Avatar avec icône';
    return 'Avatar';
  }
  render() {
    var _a, _b;
    const initials = this.getInitials();
    const sizing = sizeSpecs[this.size];
    // Get color tokens like React
    const paletteKey = (_a = colorAliases[this.avatarColor]) !== null && _a !== void 0 ? _a : this.avatarColor;
    const palette = (_b = colorTokens[paletteKey]) !== null && _b !== void 0 ? _b : colorTokens.sage;
    const variantTokens = this.variant === 'secondary' ? palette.secondary : palette.primary;
    const avatarStyle = {
      width: sizing.width,
      height: sizing.height,
      fontSize: sizing.fontSize,
      lineHeight: sizing.lineHeight,
      background: !this.src ? variantTokens.background : 'transparent',
      color: variantTokens.color
    };
    return (h(Host, null, this.icon && (h("link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" })), h("div", { class: "qa-avatar", style: avatarStyle, role: "img", "aria-label": this.getAlt() }, h("div", { class: "qa-avatar__clip" }, this.src ? (h("img", { class: "qa-avatar__img", src: this.src, alt: this.getAlt() })) : this.icon ? (h("i", { class: this.icon, "aria-hidden": "true" })) : (h("span", { "aria-hidden": "true" }, initials))), this.status !== 'none' && (h("span", { class: ['qa-avatar__status', `qa-status--${this.status}`].join(' '), "aria-hidden": "true" })))));
  }
  static get is() { return "gal-avatar"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gal-avatar.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gal-avatar.css"]
    };
  }
  static get properties() {
    return {
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Nom complet utilis\u00E9 pour g\u00E9n\u00E9rer les initiales"
        },
        "attribute": "name",
        "reflect": false,
        "defaultValue": "''"
      },
      "src": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "URL de l'image"
        },
        "attribute": "src",
        "reflect": false
      },
      "icon": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Font Awesome icon class (ex: \"fas fa-user\")"
        },
        "attribute": "icon",
        "reflect": false
      },
      "alt": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Texte alternatif personnalis\u00E9"
        },
        "attribute": "alt",
        "reflect": false
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Size",
          "resolved": "\"large\" | \"medium\" | \"small\"",
          "references": {
            "Size": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Taille du composant"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'medium'"
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "AvatarVariant",
          "resolved": "\"primary\" | \"secondary\"",
          "references": {
            "AvatarVariant": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Variant: primary or secondary"
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'primary'"
      },
      "avatarColor": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "AvatarColor",
          "resolved": "\"almond\" | \"blue\" | \"cherry\" | \"cyan\" | \"error\" | \"green\" | \"grey\" | \"indigo\" | \"info\" | \"orange\" | \"pink\" | \"red\" | \"sage\" | \"success\" | \"warning\" | \"yellow\"",
          "references": {
            "AvatarColor": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Avatar color (semantic tokens)"
        },
        "attribute": "avatar-color",
        "reflect": false,
        "defaultValue": "'sage'"
      },
      "status": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Status",
          "resolved": "\"away\" | \"busy\" | \"none\" | \"offline\" | \"online\"",
          "references": {
            "Status": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Statut affich\u00E9 dans la pastille"
        },
        "attribute": "status",
        "reflect": false,
        "defaultValue": "'none'"
      }
    };
  }
}
//# sourceMappingURL=gal-avatar.js.map

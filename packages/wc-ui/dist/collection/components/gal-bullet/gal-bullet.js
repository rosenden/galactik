import { Host, h } from '@stencil/core';
const sizeTokens = {
  xsmall: { width: '6px', height: '6px' },
  small: { width: '10px', height: '10px' },
  medium: { width: '18px', height: '18px' }
};
const colorTokens = {
  sage: {
    primary: { background: 'var(--sage-800)' },
    secondary: { background: 'var(--sage-200)' }
  },
  pink: {
    primary: { background: 'var(--pink-950)' },
    secondary: { background: 'var(--pink-200)' }
  },
  almond: {
    primary: { background: 'var(--almond-800)' },
    secondary: { background: 'var(--almond-200)' }
  },
  grey: {
    primary: { background: 'var(--grey-800)' },
    secondary: { background: 'var(--grey-200)' }
  },
  success: {
    primary: { background: 'var(--green-800)' },
    secondary: { background: 'var(--green-200)' }
  },
  warning: {
    primary: { background: 'var(--orange-800)' },
    secondary: { background: 'var(--orange-200)' }
  },
  info: {
    primary: { background: 'var(--blue-800)' },
    secondary: { background: 'var(--blue-200)' }
  },
  error: {
    primary: { background: 'var(--red-800)' },
    secondary: { background: 'var(--red-200)' }
  }
};
export class GalBullet {
  constructor() {
    this.size = 'small';
    this.color = 'sage';
    this.variant = 'primary';
  }
  render() {
    const colorStyles = colorTokens[this.color];
    const sizeStyles = sizeTokens[this.size];
    // For xsmall, single circle only
    if (this.size === 'xsmall') {
      const bulletStyle = Object.assign(Object.assign({}, sizeStyles), { background: this.variant === 'secondary' ? colorStyles.secondary.background : colorStyles.primary.background, borderRadius: '50%', display: 'inline-block', flexShrink: '0' });
      return (h(Host, null, h("span", { class: `oc-bullet oc-bullet--${this.size} oc-bullet--${this.variant} oc-bullet--${this.color}`, style: bulletStyle, role: "presentation", "aria-hidden": "true" })));
    }
    // For small and medium: concentric circles (outer + inner)
    const outerStyle = Object.assign(Object.assign({}, sizeStyles), { background: colorStyles.secondary.background, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0', position: 'relative' });
    // Inner circle size based on Figma structure
    const innerSize = this.size === 'small' ? '6px' : '10px'; // small: 3px radius = 6px diameter, medium: 5px radius = 10px diameter
    const innerStyle = {
      width: innerSize,
      height: innerSize,
      background: colorStyles.primary.background,
      borderRadius: '50%'
    };
    return (h(Host, null, h("span", { class: `oc-bullet oc-bullet--${this.size} oc-bullet--${this.variant} oc-bullet--${this.color}`, style: outerStyle, role: "presentation", "aria-hidden": "true" }, h("span", { style: innerStyle }))));
  }
  static get is() { return "gal-bullet"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gal-bullet.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gal-bullet.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "BulletSize",
          "resolved": "\"medium\" | \"small\" | \"xsmall\"",
          "references": {
            "BulletSize": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Size of the bullet: xsmall (6px), small (10px), medium (18px)"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'small'"
      },
      "color": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "BulletColor",
          "resolved": "\"almond\" | \"error\" | \"grey\" | \"info\" | \"pink\" | \"sage\" | \"success\" | \"warning\"",
          "references": {
            "BulletColor": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Color theme based on semantic tokens"
        },
        "attribute": "color",
        "reflect": false,
        "defaultValue": "'sage'"
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "BulletVariant",
          "resolved": "\"primary\" | \"secondary\"",
          "references": {
            "BulletVariant": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Variant: filled (primary) or light (secondary)"
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'primary'"
      }
    };
  }
}
//# sourceMappingURL=gal-bullet.js.map

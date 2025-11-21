import { Host, h } from '@stencil/core';
const sizeTokens = {
  xs: { padding: '0', fontSize: '10px', width: '18px', height: '18px' },
  sm: { padding: '0', fontSize: '12px', width: '24px', height: '24px' },
  lg: { padding: '0', fontSize: '14px', width: '36px', height: '36px' }
};
const colorTokens = {
  sage: {
    primary: { background: 'var(--color-bg-primary-base)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-primary-base)' },
    secondary: { background: 'var(--color-bg-primary-lightest)', color: 'var(--color-font-primary-base)', border: 'var(--color-stroke-primary-light)' }
  },
  almond: {
    primary: { background: 'var(--color-bg-secondary-base)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-secondary-base)' },
    secondary: { background: 'var(--color-bg-secondary-lightest)', color: 'var(--color-font-secondary-base)', border: 'var(--color-stroke-secondary-base)' }
  },
  pink: {
    primary: { background: 'var(--color-bg-accent-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-accent-base)' },
    secondary: { background: 'var(--color-bg-accent-hover)', color: 'var(--color-font-accent-base)', border: 'var(--color-stroke-accent-base)' }
  },
  grey: {
    primary: { background: 'var(--color-bg-neutral-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-neutral-dark)' },
    secondary: { background: 'var(--color-bg-neutral-disabled)', color: 'var(--color-font-neutral-muted)', border: 'var(--color-stroke-neutral-disabled)' }
  },
  info: {
    primary: { background: 'var(--color-bg-info-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-info-base)' },
    secondary: { background: 'var(--color-bg-info-base)', color: 'var(--color-font-info-base)', border: 'var(--color-stroke-info-base)' }
  },
  error: {
    primary: { background: 'var(--color-bg-error-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-error-base)' },
    secondary: { background: 'var(--color-bg-error-base)', color: 'var(--color-font-error-base)', border: 'var(--color-stroke-error-base)' }
  },
  success: {
    primary: { background: 'var(--color-bg-success-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-success-base)' },
    secondary: { background: 'var(--color-bg-success-base)', color: 'var(--color-font-success-base)', border: 'var(--color-stroke-success-base)' }
  },
  warning: {
    primary: { background: 'var(--color-bg-warning-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-warning-base)' },
    secondary: { background: 'var(--color-bg-warning-base)', color: 'var(--color-font-warning-base)', border: 'var(--color-stroke-warning-base)' }
  },
  indigo: {
    primary: { background: 'var(--color-bg-indigo-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-indigo-base)' },
    secondary: { background: 'var(--color-bg-indigo-base-alt)', color: 'var(--color-font-indigo-base)', border: 'var(--color-stroke-indigo-base)' }
  },
  yellow: {
    primary: { background: 'var(--color-bg-yellow-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-yellow-base)' },
    secondary: { background: 'var(--color-bg-yellow-base-alt)', color: 'var(--color-font-yellow-base)', border: 'var(--color-stroke-yellow-base)' }
  },
  cherry: {
    primary: { background: 'var(--color-bg-cherry-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-cherry-base)' },
    secondary: { background: 'var(--color-bg-cherry-base)', color: 'var(--color-font-cherry-base)', border: 'var(--color-stroke-cherry-base)' }
  },
  cyan: {
    primary: { background: 'var(--color-bg-cyan-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-cyan-base)' },
    secondary: { background: 'var(--color-bg-cyan-base-alt)', color: 'var(--color-font-cyan-base)', border: 'var(--color-stroke-cyan-base)' }
  }
};
const colorAliases = {
  orange: 'warning',
  green: 'success',
  blue: 'info',
  red: 'error'
};
export class GalBadge {
  constructor() {
    this.number = undefined;
    this.size = 'sm';
    this.color = 'sage';
    this.variant = 'primary';
    this.mode = 'number';
    this.icon = undefined;
  }
  render() {
    var _a, _b;
    const paletteKey = (_a = colorAliases[this.color]) !== null && _a !== void 0 ? _a : this.color;
    const palette = (_b = colorTokens[paletteKey]) !== null && _b !== void 0 ? _b : colorTokens.sage;
    const variantTokens = this.variant === 'secondary' ? palette.secondary : palette.primary;
    const sizing = sizeTokens[this.size];
    const labelText = this.number !== undefined ? String(this.number) : undefined;
    const badgeStyle = {
      background: variantTokens.background,
      color: variantTokens.color,
      borderColor: variantTokens.border,
      padding: sizing.padding,
      fontSize: sizing.fontSize,
      width: sizing.width,
      height: sizing.height
    };
    const renderContent = () => {
      if (this.mode === 'icon' && this.icon) {
        return (h("span", { class: "qa-badge__icon", "aria-hidden": "true" }, h("i", { class: this.icon })));
      }
      return h("span", { class: "qa-badge__label" }, labelText);
    };
    return (h(Host, null, this.icon && (h("link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" })), h("span", { class: "qa-badge", style: badgeStyle, role: "status", "aria-label": labelText !== null && labelText !== void 0 ? labelText : 'badge' }, renderContent())));
  }
  static get is() { return "gal-badge"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gal-badge.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gal-badge.css"]
    };
  }
  static get properties() {
    return {
      "number": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Number to display"
        },
        "attribute": "number",
        "reflect": false
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "BadgeSize",
          "resolved": "\"lg\" | \"sm\" | \"xs\"",
          "references": {
            "BadgeSize": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Size of the badge"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'sm'"
      },
      "color": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "BadgeColor",
          "resolved": "\"almond\" | \"blue\" | \"cherry\" | \"cyan\" | \"error\" | \"green\" | \"grey\" | \"indigo\" | \"info\" | \"orange\" | \"pink\" | \"red\" | \"sage\" | \"success\" | \"warning\" | \"yellow\"",
          "references": {
            "BadgeColor": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Color variant"
        },
        "attribute": "color",
        "reflect": false,
        "defaultValue": "'sage'"
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "BadgeVariant",
          "resolved": "\"primary\" | \"secondary\"",
          "references": {
            "BadgeVariant": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Variant: primary (filled) or secondary (bordered)"
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'primary'"
      },
      "mode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "BadgeMode",
          "resolved": "\"icon\" | \"number\"",
          "references": {
            "BadgeMode": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Mode: number or icon"
        },
        "attribute": "mode",
        "reflect": false,
        "defaultValue": "'number'"
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
          "text": "Icon class (Font Awesome)"
        },
        "attribute": "icon",
        "reflect": false
      }
    };
  }
}
//# sourceMappingURL=gal-badge.js.map

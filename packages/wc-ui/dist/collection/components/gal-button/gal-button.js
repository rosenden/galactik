import { Host, h } from '@stencil/core';
export class GalButton {
  constructor() {
    this.variant = 'filled';
    this.colorVariant = 'primary';
    this.size = 'medium';
    this.disabled = false;
    this.loading = false;
    this.fullWidth = false;
    this.type = 'button';
    this.iconOnly = false;
  }
  hasIcons() {
    // Always load Font Awesome if loading state (for loader icon)
    if (this.loading)
      return true;
    const iconLeftSlot = this.el.querySelector('[slot="icon-left"]');
    const iconRightSlot = this.el.querySelector('[slot="icon-right"]');
    const defaultSlot = this.el.childNodes;
    // Check if any slot has Font Awesome icons
    if (iconLeftSlot || iconRightSlot)
      return true;
    // Check default slot for icon-only buttons
    if (this.iconOnly) {
      for (let i = 0; i < defaultSlot.length; i++) {
        const node = defaultSlot[i];
        if (node.nodeType === 1) { // Element node
          const element = node;
          if (element.tagName === 'I' || element.classList.contains('fa')) {
            return true;
          }
        }
      }
    }
    return false;
  }
  render() {
    const baseClass = 'oc-button';
    const classes = [
      baseClass,
      `${baseClass}--${this.variant}`,
      `${baseClass}--${this.colorVariant}`,
      `${baseClass}--${this.size}`,
      this.iconOnly ? `${baseClass}--icon-only` : '',
      this.fullWidth ? `${baseClass}--full-width` : '',
      this.loading ? `${baseClass}--loading` : ''
    ].filter(Boolean).join(' ');
    const loadFontAwesome = this.hasIcons();
    return (h(Host, null, loadFontAwesome && (h("link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" })), h("button", { type: this.type, class: classes, disabled: this.disabled || this.loading }, this.loading && (h("span", { class: `${baseClass}__spinner`, "aria-hidden": "true" }, h("i", { class: `fa-solid fa-spinner ${baseClass}__spinner-icon` }))), !this.loading && (h("slot", { name: "icon-left" })), !this.iconOnly && (h("span", { class: `${baseClass}__label` }, h("slot", null))), this.iconOnly && !this.loading && (h("slot", null)), !this.loading && (h("slot", { name: "icon-right" })))));
  }
  static get is() { return "gal-button"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gal-button.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gal-button.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ButtonVariant",
          "resolved": "\"filled\" | \"outlined\" | \"text\"",
          "references": {
            "ButtonVariant": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Style variant of the button"
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'filled'"
      },
      "colorVariant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ButtonColorVariant",
          "resolved": "\"accent\" | \"light-accent\" | \"primary\" | \"secondary\"",
          "references": {
            "ButtonColorVariant": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Color theme of the button"
        },
        "attribute": "color-variant",
        "reflect": false,
        "defaultValue": "'primary'"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ButtonSize",
          "resolved": "\"large\" | \"medium\" | \"small\"",
          "references": {
            "ButtonSize": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Size of the button"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'medium'"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If true, button is disabled"
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "loading": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If true, shows loading spinner"
        },
        "attribute": "loading",
        "reflect": false,
        "defaultValue": "false"
      },
      "fullWidth": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If true, button takes full width"
        },
        "attribute": "full-width",
        "reflect": false,
        "defaultValue": "false"
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'button' | 'submit' | 'reset'",
          "resolved": "\"button\" | \"reset\" | \"submit\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "HTML button type"
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "'button'"
      },
      "iconOnly": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If true, only shows icon without text"
        },
        "attribute": "icon-only",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=gal-button.js.map

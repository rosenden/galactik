import { Host, h } from '@stencil/core';
export class GalLabel {
  constructor() {
    this.handleIconSlotChange = (event) => {
      const slot = event.target;
      this.hasIconSlot = !!slot && slot.assignedNodes().length > 0;
    };
    this.handleTextSlotChange = (event) => {
      const slot = event.target;
      this.hasTextSlot = !!slot && slot.assignedNodes().length > 0;
    };
    this.text = 'Label';
    this.size = 'medium';
    this.color = 'sage';
    this.icon = undefined;
    this.hasIconSlot = false;
    this.hasTextSlot = false;
  }
  hasProjectedIcon() {
    if (this.hasIconSlot)
      return true;
    if (!this.el)
      return false;
    return !!this.el.querySelector('[slot="icon"]');
  }
  hasDefaultTextNodes() {
    if (!this.el)
      return false;
    const childNodes = Array.from(this.el.childNodes);
    return childNodes.some((node) => {
      if (node.nodeType === 1) {
        const element = node;
        return !element.hasAttribute('slot');
      }
      return Boolean(node.textContent && node.textContent.trim().length);
    });
  }
  shouldLoadFontAwesome(showIcon) {
    return showIcon;
  }
  render() {
    const baseClass = 'oc-label';
    const classes = [
      baseClass,
      `${baseClass}--${this.size}`,
      `${baseClass}--${this.color}`,
      `${baseClass}--default`
    ]
      .filter(Boolean)
      .join(' ');
    const hasProjectedIcon = this.hasProjectedIcon();
    const showIcon = Boolean(this.icon) || hasProjectedIcon;
    const shouldLoadFA = this.shouldLoadFontAwesome(showIcon);
    const hasCustomText = this.hasTextSlot || this.hasDefaultTextNodes();
    return (h(Host, null, showIcon && shouldLoadFA && (h("link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" })), h("span", { class: classes }, showIcon && (h("span", { class: "oc-label__icon", "aria-hidden": "true" }, this.icon && h("i", { class: this.icon }), h("slot", { name: "icon", onSlotchange: this.handleIconSlotChange }))), h("span", { class: "oc-label__text" }, h("slot", { onSlotchange: this.handleTextSlotChange }), !hasCustomText && this.text))));
  }
  static get is() { return "gal-label"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gal-label.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gal-label.css"]
    };
  }
  static get properties() {
    return {
      "text": {
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
          "text": "Text rendered inside the label (fallback when no slot)"
        },
        "attribute": "text",
        "reflect": false,
        "defaultValue": "'Label'"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "LabelSize",
          "resolved": "\"medium\" | \"small\"",
          "references": {
            "LabelSize": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Label size"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'medium'"
      },
      "color": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "LabelColor",
          "resolved": "\"black\" | \"error\" | \"info\" | \"sage\" | \"success\" | \"warning\"",
          "references": {
            "LabelColor": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Palette aligned with the React implementation"
        },
        "attribute": "color",
        "reflect": false,
        "defaultValue": "'sage'"
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
          "text": "Optional Font Awesome class for the icon"
        },
        "attribute": "icon",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "hasIconSlot": {},
      "hasTextSlot": {}
    };
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=gal-label.js.map

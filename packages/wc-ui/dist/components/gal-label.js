import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const galLabelCss = ":host{display:inline-flex}.oc-label{display:inline-flex;align-items:center;justify-content:center;font-family:var(--font-family-base, 'Inter', system-ui, -apple-system, sans-serif);font-weight:600;box-sizing:border-box;vertical-align:middle;white-space:nowrap}.oc-label__icon{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:var(--icon-md);height:var(--icon-md)}.oc-label__icon ::slotted(*){width:100%;height:100%;display:inline-flex;align-items:center;justify-content:center}.oc-label__icon svg{width:100%;height:100%;display:block}.oc-label__text{display:inline-block}.oc-label--small{font-size:var(--font-size-sm);line-height:var(--line-height-2);font-weight:var(--font-weight-semibold);gap:var(--space-3xs)}.oc-label--medium{font-size:var(--font-size-base);line-height:var(--line-height-4);font-weight:var(--font-weight-semibold);gap:var(--space-3xs)}.oc-label.oc-label--sage.oc-label--default{color:var(--color-font-primary-base) !important}.oc-label.oc-label--black.oc-label--default{color:var(--color-font-neutral-base) !important}.oc-label.oc-label--success.oc-label--default{color:var(--color-font-success-muted) !important}.oc-label.oc-label--error.oc-label--default{color:var(--color-font-error-muted) !important}.oc-label.oc-label--warning.oc-label--default{color:var(--color-font-warning-muted) !important}.oc-label.oc-label--info.oc-label--default{color:var(--color-font-info-muted) !important}";

const GalLabel$1 = /*@__PURE__*/ proxyCustomElement(class GalLabel extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  get el() { return this; }
  static get style() { return galLabelCss; }
}, [1, "gal-label", {
    "text": [1],
    "size": [1],
    "color": [1],
    "icon": [1],
    "hasIconSlot": [32],
    "hasTextSlot": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["gal-label"];
  components.forEach(tagName => { switch (tagName) {
    case "gal-label":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, GalLabel$1);
      }
      break;
  } });
}

const GalLabel = GalLabel$1;
const defineCustomElement = defineCustomElement$1;

export { GalLabel, defineCustomElement };

//# sourceMappingURL=gal-label.js.map
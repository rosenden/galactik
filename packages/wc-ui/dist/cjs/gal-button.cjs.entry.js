'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4533a219.js');

const galButtonCss = ".oc-button{font-family:var(--font-family-base);font-weight:var(--font-weight-semibold);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:var(--space-xs);user-select:none;text-decoration:none;outline:none;transition:all 0.2s ease;white-space:nowrap;border:none;position:relative;overflow:hidden;box-sizing:border-box}.oc-button--large{min-height:var(--row-h-lg);padding:var(--space-xl) var(--space-4xl);font-size:var(--font-size-lg);line-height:var(--line-height-4);border-radius:var(--radius-rounded)}.oc-button--medium{min-height:var(--row-h-md);padding:var(--space-lg) var(--space-3xl);font-size:var(--font-size-base);line-height:var(--line-height-3);border-radius:var(--radius-rounded)}.oc-button--small{min-height:var(--row-h-sm);padding:var(--space-xs) var(--space-lg);font-size:var(--font-size-sm);line-height:var(--line-height-2);border-radius:var(--radius-rounded)}.oc-button--icon-only.oc-button--large{width:var(--row-h-lg);height:var(--row-h-lg);padding:var(--space-lg)}.oc-button--icon-only.oc-button--medium{width:var(--row-h-md);height:var(--row-h-md);padding:var(--space-sm)}.oc-button--icon-only.oc-button--small{width:var(--row-h-sm);height:var(--row-h-sm);padding:var(--space-3xs)}.oc-button--full-width{width:100%}.oc-button--filled.oc-button--primary{background:var(--color-bg-primary-base);color:var(--color-font-primary-dark)}.oc-button--filled.oc-button--primary:hover:not(:disabled){background:var(--color-bg-primary-hovered)}.oc-button--filled.oc-button--primary:active:not(:disabled){background:var(--color-bg-primary-pressed)}.oc-button--filled.oc-button--primary:focus-visible{outline:2px solid var(--color-bg-primary-base);outline-offset:2px}.oc-button--outlined.oc-button--primary{background:transparent;color:var(--color-font-primary-base);border:var(--stroke-xs) solid var(--color-border-base)}.oc-button--outlined.oc-button--primary:hover:not(:disabled){background:var(--color-bg-primary-lightest);border-color:var(--color-bg-primary-base)}.oc-button--outlined.oc-button--primary:active:not(:disabled){background:var(--color-bg-primary-light);border-color:var(--color-bg-primary-hovered)}.oc-button--outlined.oc-button--primary:focus-visible{outline:2px solid var(--color-bg-primary-base);outline-offset:2px}.oc-button--text.oc-button--primary{background:transparent;color:var(--color-font-primary-base)}.oc-button--text.oc-button--primary:hover:not(:disabled){background:var(--color-bg-primary-lightest)}.oc-button--text.oc-button--primary:active:not(:disabled){background:var(--color-bg-primary-light)}.oc-button--text.oc-button--primary:focus-visible{outline:2px solid var(--color-bg-primary-base);outline-offset:2px}.oc-button--filled.oc-button--secondary{background:var(--color-bg-secondary-base);color:var(--color-font-primary-dark)}.oc-button--filled.oc-button--secondary:hover:not(:disabled){background:var(--color-bg-secondary-base-alt)}.oc-button--filled.oc-button--secondary:active:not(:disabled){background:var(--color-bg-secondary-active)}.oc-button--filled.oc-button--secondary:focus-visible{outline:2px solid var(--color-bg-secondary-base);outline-offset:2px}.oc-button--outlined.oc-button--secondary{background:transparent;color:var(--color-font-secondary-base);border:var(--stroke-xs) solid var(--color-bg-secondary-base)}.oc-button--outlined.oc-button--secondary:hover:not(:disabled){background:var(--color-bg-secondary-lightest);border-color:var(--color-bg-secondary-base-alt)}.oc-button--outlined.oc-button--secondary:active:not(:disabled){background:var(--color-bg-secondary-lighter);border-color:var(--color-bg-secondary-active)}.oc-button--outlined.oc-button--secondary:focus-visible{outline:2px solid var(--color-bg-secondary-base);outline-offset:2px}.oc-button--text.oc-button--secondary{background:transparent;color:var(--color-font-secondary-base)}.oc-button--text.oc-button--secondary:hover:not(:disabled){background:var(--color-bg-secondary-lightest)}.oc-button--text.oc-button--secondary:active:not(:disabled){background:var(--color-bg-secondary-lighter)}.oc-button--text.oc-button--secondary:focus-visible{outline:2px solid var(--color-bg-secondary-base);outline-offset:2px}.oc-button--filled.oc-button--light-accent{background:var(--color-bg-primary-light);color:var(--color-font-primary-base)}.oc-button--filled.oc-button--light-accent:hover:not(:disabled){background:var(--color-bg-primary-lighter)}.oc-button--filled.oc-button--light-accent:active:not(:disabled){background:var(--color-bg-primary-lightest)}.oc-button--filled.oc-button--light-accent:focus-visible{outline:2px solid var(--color-bg-primary-base);outline-offset:2px}.oc-button--outlined.oc-button--light-accent{background:transparent;color:var(--color-font-primary-base);border:var(--stroke-xs) solid var(--color-bg-primary-lighter)}.oc-button--outlined.oc-button--light-accent:hover:not(:disabled){background:var(--color-bg-primary-lightest);border-color:var(--color-bg-primary-light)}.oc-button--outlined.oc-button--light-accent:active:not(:disabled){background:var(--color-bg-primary-lighter);border-color:var(--color-bg-primary-base)}.oc-button--outlined.oc-button--light-accent:focus-visible{outline:2px solid var(--color-bg-primary-base);outline-offset:2px}.oc-button--text.oc-button--light-accent{background:transparent;color:var(--color-font-primary-base)}.oc-button--text.oc-button--light-accent:hover:not(:disabled){background:var(--color-bg-primary-lightest)}.oc-button--text.oc-button--light-accent:active:not(:disabled){background:var(--color-bg-primary-lighter)}.oc-button--text.oc-button--light-accent:focus-visible{outline:2px solid var(--color-bg-primary-base);outline-offset:2px}.oc-button--filled.oc-button--accent{background:var(--color-bg-accent-base-alt);color:var(--color-font-primary-dark)}.oc-button--filled.oc-button--accent:hover:not(:disabled){background:var(--color-bg-accent-pressed)}.oc-button--filled.oc-button--accent:active:not(:disabled){background:var(--color-bg-accent-base)}.oc-button--filled.oc-button--accent:focus-visible{outline:2px solid var(--color-bg-accent-base-alt);outline-offset:2px}.oc-button--outlined.oc-button--accent{background:transparent;color:var(--color-font-accent-base);border:var(--stroke-xs) solid var(--color-bg-accent-base-alt)}.oc-button--outlined.oc-button--accent:hover:not(:disabled){background:var(--color-bg-accent-hover);border-color:var(--color-bg-accent-pressed)}.oc-button--outlined.oc-button--accent:active:not(:disabled){background:var(--color-bg-accent-base);border-color:var(--color-bg-accent-base-alt)}.oc-button--outlined.oc-button--accent:focus-visible{outline:2px solid var(--color-bg-accent-base-alt);outline-offset:2px}.oc-button--text.oc-button--accent{background:transparent;color:var(--color-font-accent-base)}.oc-button--text.oc-button--accent:hover:not(:disabled){background:var(--color-bg-accent-hover)}.oc-button--text.oc-button--accent:active:not(:disabled){background:var(--color-bg-accent-base)}.oc-button--text.oc-button--accent:focus-visible{outline:2px solid var(--color-bg-accent-base-alt);outline-offset:2px}.oc-button:disabled,.oc-button--loading{cursor:not-allowed;opacity:0.5}.oc-button--filled:disabled{background:var(--color-bg-neutral-disabled);color:var(--color-font-neutral-muted)}.oc-button--outlined:disabled{background:transparent;color:var(--color-font-neutral-muted);border-color:var(--color-bg-neutral-disabled)}.oc-button--text:disabled{background:transparent;color:var(--color-font-neutral-muted)}.oc-button__spinner{display:inline-flex;align-items:center;justify-content:center}.oc-button__spinner-icon{display:inline-block;animation:button-spin 1s linear infinite}@keyframes button-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.oc-button__icon,::slotted([slot=\"icon-left\"]),::slotted([slot=\"icon-right\"]){display:inline-flex;align-items:center;justify-content:center}.oc-button--large .oc-button__icon,.oc-button--large ::slotted([slot=\"icon-left\"]),.oc-button--large ::slotted([slot=\"icon-right\"]){font-size:var(--icon-l)}.oc-button--medium .oc-button__icon,.oc-button--medium ::slotted([slot=\"icon-left\"]),.oc-button--medium ::slotted([slot=\"icon-right\"]){font-size:var(--icon-md)}.oc-button--small .oc-button__icon,.oc-button--small ::slotted([slot=\"icon-left\"]),.oc-button--small ::slotted([slot=\"icon-right\"]){font-size:var(--icon-xs)}.oc-button--icon-only ::slotted(i),.oc-button--icon-only ::slotted(.fa){display:inline-flex;align-items:center;justify-content:center}.oc-button__label{display:inline-block}.oc-button__content{display:inline-flex;align-items:center}";

const GalButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, null, loadFontAwesome && (index.h("link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" })), index.h("button", { type: this.type, class: classes, disabled: this.disabled || this.loading }, this.loading && (index.h("span", { class: `${baseClass}__spinner`, "aria-hidden": "true" }, index.h("i", { class: `fa-solid fa-spinner ${baseClass}__spinner-icon` }))), !this.loading && (index.h("slot", { name: "icon-left" })), !this.iconOnly && (index.h("span", { class: `${baseClass}__label` }, index.h("slot", null))), this.iconOnly && !this.loading && (index.h("slot", null)), !this.loading && (index.h("slot", { name: "icon-right" })))));
  }
  get el() { return index.getElement(this); }
};
GalButton.style = galButtonCss;

exports.gal_button = GalButton;

//# sourceMappingURL=gal-button.cjs.entry.js.map
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4533a219.js');

const galBadgeCss = ".qa-badge{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-3xs, 4px);border-radius:9999px;border:0;font-family:var(--font-family-base);font-weight:var(--font-weight-semibold);line-height:1;box-sizing:border-box;aspect-ratio:1 / 1}.qa-badge__icon{display:inline-flex;align-items:center;justify-content:center;font-size:1em;line-height:1}.qa-badge__label{display:inline-flex;align-items:center}.oc-badge--primary.oc-badge--sage{background-color:var(--color-bg-primary-base);color:var(--color-font-neutral-white)}.oc-badge--primary.oc-badge--almond{background-color:var(--color-bg-secondary-base);color:var(--color-font-neutral-white)}.oc-badge--primary.oc-badge--pink{background-color:var(--color-bg-accent-base-alt);color:var(--color-font-neutral-white)}.oc-badge--primary.oc-badge--grey{background-color:var(--color-bg-neutral-muted);color:var(--color-font-neutral-white)}.oc-badge--primary.oc-badge--success{background-color:var(--color-bg-success-base);color:var(--color-font-neutral-white)}.oc-badge--primary.oc-badge--error{background-color:var(--color-bg-error-base);color:var(--color-font-neutral-white)}.oc-badge--primary.oc-badge--warning{background-color:var(--color-bg-warning-base);color:var(--color-font-neutral-white)}.oc-badge--primary.oc-badge--info{background-color:var(--color-bg-info-base);color:var(--color-font-neutral-white)}.oc-badge--primary.oc-badge--cherry{background-color:var(--color-bg-cherry-base);color:var(--color-font-neutral-white)}.oc-badge--primary.oc-badge--indigo{background-color:var(--color-bg-indigo-base);color:var(--color-font-neutral-white)}.oc-badge--primary.oc-badge--yellow{background-color:var(--color-bg-yellow-base);color:var(--color-font-neutral-base)}.oc-badge--primary.oc-badge--cyan{background-color:var(--color-bg-cyan-base);color:var(--color-font-neutral-white)}.oc-badge--secondary.oc-badge--sage{background-color:var(--color-bg-primary-lightest);color:var(--color-font-primary-base);border:var(--stroke-xs) solid var(--color-stroke-primary-light)}.oc-badge--secondary.oc-badge--almond{background-color:var(--color-bg-secondary-lightest);color:var(--color-font-secondary-base);border:var(--stroke-xs) solid var(--color-stroke-secondary-base)}.oc-badge--secondary.oc-badge--pink{background-color:var(--color-bg-accent-hover);color:var(--color-font-accent-base);border:var(--stroke-xs) solid var(--color-stroke-accent-base)}.oc-badge--secondary.oc-badge--grey{background-color:var(--color-bg-neutral-lightest);color:var(--color-font-neutral-base);border:var(--stroke-xs) solid var(--color-stroke-neutral-light)}.oc-badge--secondary.oc-badge--success{background-color:var(--color-bg-success-lightest);color:var(--color-font-success-base);border:var(--stroke-xs) solid var(--color-stroke-success-base)}.oc-badge--secondary.oc-badge--error{background-color:var(--color-bg-error-lightest);color:var(--color-font-error-base);border:var(--stroke-xs) solid var(--color-stroke-error-base)}.oc-badge--secondary.oc-badge--warning{background-color:var(--color-bg-warning-lightest);color:var(--color-font-warning-base);border:var(--stroke-xs) solid var(--color-stroke-warning-base)}.oc-badge--secondary.oc-badge--info{background-color:var(--color-bg-info-lightest);color:var(--color-font-info-base);border:var(--stroke-xs) solid var(--color-stroke-info-base)}.oc-badge--secondary.oc-badge--cherry{background-color:var(--color-bg-cherry-lightest);color:var(--color-font-cherry-base);border:var(--stroke-xs) solid var(--color-stroke-cherry-base)}.oc-badge--secondary.oc-badge--indigo{background-color:var(--color-bg-indigo-lightest);color:var(--color-font-indigo-base);border:var(--stroke-xs) solid var(--color-stroke-indigo-base)}.oc-badge--secondary.oc-badge--yellow{background-color:var(--color-bg-yellow-lightest);color:var(--color-font-yellow-base);border:var(--stroke-xs) solid var(--color-stroke-yellow-base)}.oc-badge--secondary.oc-badge--cyan{background-color:var(--color-bg-cyan-lightest);color:var(--color-font-cyan-base);border:var(--stroke-xs) solid var(--color-stroke-cyan-base)}.oc-badge--icon i{font-size:inherit;line-height:1}";

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
const GalBadge = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
        return (index.h("span", { class: "qa-badge__icon", "aria-hidden": "true" }, index.h("i", { class: this.icon })));
      }
      return index.h("span", { class: "qa-badge__label" }, labelText);
    };
    return (index.h(index.Host, null, this.icon && (index.h("link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" })), index.h("span", { class: "qa-badge", style: badgeStyle, role: "status", "aria-label": labelText !== null && labelText !== void 0 ? labelText : 'badge' }, renderContent())));
  }
};
GalBadge.style = galBadgeCss;

exports.gal_badge = GalBadge;

//# sourceMappingURL=gal-badge.cjs.entry.js.map
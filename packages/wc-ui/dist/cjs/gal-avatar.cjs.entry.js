'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4533a219.js');

const galAvatarCss = ".qa-avatar{display:inline-flex;position:relative;align-items:center;justify-content:center;border-radius:50%;font-family:'Hanken Grotesk', var(--font-family-base), sans-serif;font-weight:600;user-select:none;flex-shrink:0;overflow:hidden}.qa-avatar__clip{width:100%;height:100%;border-radius:inherit;overflow:hidden;display:flex;align-items:center;justify-content:center}.qa-avatar__img{width:100%;height:100%;object-fit:cover;display:block}.qa-avatar{--status-size:30%;--status-offset:8%}.qa-avatar__status{position:absolute;width:var(--status-size);height:var(--status-size);right:calc(-1 * var(--status-offset));bottom:calc(-1 * var(--status-offset));border-radius:50%;border:var(--stroke-xs) solid var(--abs-pure-white);box-sizing:border-box}.qa-status--online{background:var(--green-500)}.qa-status--away{background:var(--yellow-500)}.qa-status--busy{background:var(--red-500)}.qa-status--offline{background:var(--grey-400)}";

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
const GalAvatar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
      return `Avatar for ${this.name}`;
    if (this.icon)
      return 'Avatar with icon';
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
    return (index.h(index.Host, null, this.icon && (index.h("link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" })), index.h("div", { class: "qa-avatar", style: avatarStyle, role: "img", "aria-label": this.getAlt() }, index.h("div", { class: "qa-avatar__clip" }, this.src ? (index.h("img", { class: "qa-avatar__img", src: this.src, alt: this.getAlt() })) : this.icon ? (index.h("i", { class: this.icon, "aria-hidden": "true" })) : (index.h("span", { "aria-hidden": "true" }, initials))), this.status !== 'none' && (index.h("span", { class: ['qa-avatar__status', `qa-status--${this.status}`].join(' '), "aria-hidden": "true" })))));
  }
};
GalAvatar.style = galAvatarCss;

exports.gal_avatar = GalAvatar;

//# sourceMappingURL=gal-avatar.cjs.entry.js.map
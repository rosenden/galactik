import { r as registerInstance, h, H as Host } from './index-5172b2ee.js';

const galAvatarCss = ".qa-avatar{display:inline-flex;position:relative;align-items:center;justify-content:center;border-radius:var(--radius-rounded);background:var(--color-bg-primary-base);color:var(--color-font-neutral-white);font-family:var(--font-family-base);font-weight:var(--font-weight-semibold);user-select:none;overflow:visible;--status-size:30%;--status-offset:8%}.qa-avatar__clip{width:100%;height:100%;border-radius:inherit;overflow:hidden;display:flex;align-items:center;justify-content:center}.qa-avatar--sm{width:var(--row-h-sm);height:var(--row-h-sm);font-size:var(--font-size-sm);line-height:var(--line-height-3)}.qa-avatar--md{width:var(--row-h-md);height:var(--row-h-md);font-size:var(--font-size-base);line-height:var(--line-height-5)}.qa-avatar--lg{width:var(--row-h-lg);height:var(--row-h-lg);font-size:var(--font-size-xl);line-height:var(--line-height-6)}.qa-avatar__img{width:100%;height:100%;object-fit:cover;display:block}.qa-avatar__status{position:absolute;width:var(--status-size);height:var(--status-size);right:calc(-1 * var(--status-offset));bottom:calc(-1 * var(--status-offset));border-radius:var(--radius-rounded);border:var(--stroke-xs) solid var(--abs-pure-white);box-sizing:border-box}.qa-status--online{background:var(--green-500)}.qa-status--away{background:var(--yellow-500)}.qa-status--busy{background:var(--red-500)}.qa-status--offline{background:var(--grey-400)}.qa-avatar--primary{background:var(--color-bg-primary-base);color:var(--color-font-neutral-white)}.qa-avatar--primaryLight{background:var(--color-bg-primary-light);color:var(--color-font-primary-base)}.qa-avatar--secondary{background:var(--color-bg-secondary-base);color:var(--color-font-neutral-white)}.qa-avatar--accent{background:var(--color-bg-accent-base-alt);color:var(--color-font-neutral-white)}.qa-avatar--accentSoft{background:var(--color-bg-accent-base);color:var(--color-font-accent-base)}.qa-avatar--cherry{background:var(--color-bg-cherry-base-alt);color:var(--color-font-neutral-white)}.qa-avatar--success{background:var(--color-bg-success-base-alt);color:var(--color-font-neutral-white)}.qa-avatar--warning{background:var(--color-bg-warning-base-alt);color:var(--color-font-neutral-white)}.qa-avatar--info{background:var(--color-bg-info-base-alt);color:var(--color-font-neutral-white)}.qa-avatar--error{background:var(--color-bg-error-base-alt);color:var(--color-font-neutral-white)}.qa-avatar--indigo{background:var(--color-bg-indigo-base);color:var(--color-font-neutral-white)}.qa-avatar--indigoAlt{background:var(--color-bg-indigo-base-alt);color:var(--color-font-indigo-base)}.qa-avatar--neutralDark{background:var(--color-bg-neutral-base-alt);color:var(--color-font-neutral-white)}.qa-avatar--yellow{background:var(--color-bg-yellow-base);color:var(--color-font-neutral-white)}.qa-avatar--cyan{background:var(--color-bg-cyan-base);color:var(--color-font-neutral-white)}";

const GalAvatar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = 'Alex Doe';
    this.src = undefined;
    this.alt = undefined;
    this.size = 'md';
    this.variant = 'primary';
    this.status = 'none';
  }
  getInitials() {
    if (!this.name)
      return '??';
    return this.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('') || '??';
  }
  getAlt() {
    if (this.alt)
      return this.alt;
    if (this.name)
      return `Avatar de ${this.name}`;
    return 'Avatar';
  }
  render() {
    const classes = [
      'qa-avatar',
      `qa-avatar--${this.size}`,
      `qa-avatar--${this.variant}`
    ].join(' ');
    return (h(Host, null, h("div", { class: classes, role: "img", "aria-label": this.getAlt() }, h("div", { class: "qa-avatar__clip" }, this.src ? (h("img", { class: "qa-avatar__img", src: this.src, alt: this.getAlt() })) : (h("span", { "aria-hidden": "true" }, this.getInitials()))), this.status !== 'none' && (h("span", { class: ['qa-avatar__status', `qa-status--${this.status}`].join(' '), "aria-hidden": "true" })))));
  }
};
GalAvatar.style = galAvatarCss;

export { GalAvatar as gal_avatar };

//# sourceMappingURL=gal-avatar.entry.js.map
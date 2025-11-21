import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const galBulletCss = ".oc-bullet{box-sizing:border-box;transition:all 0.2s ease-in-out}.oc-bullet--xsmall{width:6px;height:6px}.oc-bullet--small{width:10px;height:10px}.oc-bullet--medium{width:18px;height:18px}";

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
const GalBullet$1 = /*@__PURE__*/ proxyCustomElement(class GalBullet extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  static get style() { return galBulletCss; }
}, [1, "gal-bullet", {
    "size": [1],
    "color": [1],
    "variant": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["gal-bullet"];
  components.forEach(tagName => { switch (tagName) {
    case "gal-bullet":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, GalBullet$1);
      }
      break;
  } });
}

const GalBullet = GalBullet$1;
const defineCustomElement = defineCustomElement$1;

export { GalBullet, defineCustomElement };

//# sourceMappingURL=gal-bullet.js.map
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const galCheckboxCss = ":host{display:inline-flex}.oc-checkbox-wrapper{display:inline-flex;align-items:center;gap:var(--space-xs);cursor:pointer;user-select:none;position:relative;height:24px}.oc-checkbox-wrapper--disabled{cursor:not-allowed;opacity:1}.oc-checkbox__input{position:absolute;opacity:0;width:0;height:0;pointer-events:none}.oc-checkbox{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:var(--radius-xs);border:var(--stroke-xs) solid var(--color-font-primary-base);background-color:transparent;transition:all 0.15s ease;flex-shrink:0}.oc-checkbox__icon{display:flex;align-items:center;justify-content:center;width:10px;height:10px;color:var(--color-font-neutral-white);font-weight:900;opacity:1;transition:opacity 0.15s ease;overflow:hidden;font-size:0;line-height:0}.oc-checkbox__icon svg{width:100%;height:100%;display:block}.oc-checkbox--unselected .oc-checkbox__icon{opacity:0}.oc-checkbox__label{font-family:var(--font-family-base);font-size:var(--font-size-base);line-height:1;color:var(--color-font-neutral-base) !important;font-weight:var(--font-weight-regular)}.oc-checkbox__label--disabled{color:var(--color-font-neutral-muted) !important}.oc-checkbox--selected,.oc-checkbox--indeterminate{background-color:var(--color-bg-primary-base);border-color:var(--color-bg-primary-base)}.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):hover .oc-checkbox--unselected{background-color:var(--color-bg-primary-lighter);border-color:var(--color-font-primary-hovered)}.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):hover .oc-checkbox--selected,.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):hover .oc-checkbox--indeterminate{background-color:var(--color-bg-primary-hovered);border-color:var(--color-bg-primary-hovered)}.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--unselected{background-color:var(--color-bg-primary-light);border-color:var(--color-stroke-primary-base)}.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--selected,.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--indeterminate{background-color:var(--color-bg-primary-pressed);border-color:var(--color-bg-primary-pressed)}.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--selected .oc-checkbox__icon,.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--indeterminate .oc-checkbox__icon{color:var(--color-font-neutral-black)}.oc-checkbox--focused{outline:2px solid var(--color-stroke-focus);outline-offset:1px}.oc-checkbox--disabled{background-color:var(--color-bg-neutral-disabled) !important;border-color:var(--color-border-base) !important;cursor:not-allowed}.oc-checkbox--disabled.oc-checkbox--selected .oc-checkbox__icon,.oc-checkbox--disabled.oc-checkbox--indeterminate .oc-checkbox__icon{color:var(--color-font-neutral-muted) !important}.oc-checkbox--disabled.oc-checkbox--unselected{background-color:var(--color-bg-neutral-disabled) !important}";

const GalCheckbox$1 = /*@__PURE__*/ proxyCustomElement(class GalCheckbox extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.galChange = createEvent(this, "galChange", 7);
    this.galCheckedChange = createEvent(this, "galCheckedChange", 7);
    this.galFocus = createEvent(this, "galFocus", 7);
    this.galBlur = createEvent(this, "galBlur", 7);
    this.handleInputChange = (event) => {
      if (this.disabled)
        return;
      const target = event.target;
      this.checked = target.checked;
      this.galCheckedChange.emit(this.checked);
      this.galChange.emit(this.checked);
    };
    this.handleKeyDown = (event) => {
      if (event.key === ' ' && !this.disabled) {
        event.preventDefault();
        this.checked = !this.checked;
        this.galCheckedChange.emit(this.checked);
        this.galChange.emit(this.checked);
      }
      this.isKeyboardFocus = true;
    };
    this.handleMouseDown = () => {
      this.isKeyboardFocus = false;
    };
    this.handleFocus = (event) => {
      this.isFocused = true;
      this.galFocus.emit(event);
    };
    this.handleBlur = (event) => {
      this.isFocused = false;
      this.isKeyboardFocus = false;
      this.galBlur.emit(event);
    };
    this.handleLabelSlotChange = (event) => {
      const slot = event.target;
      this.hasLabelSlot = !!slot && slot.assignedNodes().length > 0;
    };
    this.checked = false;
    this.indeterminate = false;
    this.disabled = false;
    this.label = undefined;
    this.name = undefined;
    this.value = undefined;
    this.isFocused = false;
    this.isKeyboardFocus = false;
    this.hasLabelSlot = false;
  }
  componentDidLoad() {
    this.syncIndeterminate();
  }
  componentDidUpdate() {
    this.syncIndeterminate();
  }
  onIndeterminateChange() {
    this.syncIndeterminate();
  }
  onCheckedChange(newValue) {
    if (this.inputEl) {
      this.inputEl.checked = newValue;
    }
  }
  syncIndeterminate() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.indeterminate;
    }
  }
  get selectionState() {
    if (this.indeterminate)
      return 'indeterminate';
    if (this.checked)
      return 'selected';
    return 'unselected';
  }
  render() {
    const wrapperClasses = [
      'oc-checkbox-wrapper',
      this.disabled ? 'oc-checkbox-wrapper--disabled' : ''
    ].filter(Boolean).join(' ');
    const selection = this.selectionState;
    const checkboxClasses = [
      'oc-checkbox',
      `oc-checkbox--${selection}`,
      this.disabled ? 'oc-checkbox--disabled' : '',
      this.isFocused && this.isKeyboardFocus ? 'oc-checkbox--focused' : ''
    ].filter(Boolean).join(' ');
    const showLabel = this.label || this.hasLabelSlot;
    return (h(Host, null, h("label", { class: wrapperClasses, onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown }, h("input", { ref: (el) => (this.inputEl = el), type: "checkbox", class: "oc-checkbox__input", checked: this.checked, disabled: this.disabled, name: this.name, value: this.value, "aria-checked": this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false', onChange: this.handleInputChange, onFocus: this.handleFocus, onBlur: this.handleBlur }), h("div", { class: checkboxClasses }, h("div", { class: "oc-checkbox__icon" }, selection === 'selected' && (h("svg", { viewBox: "0 0 16 16", width: "16", height: "16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M4 8.5L6.5 11L12 5.5", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), selection === 'indeterminate' && (h("svg", { viewBox: "0 0 16 16", width: "16", height: "16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M4 8H12", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" }))))), showLabel && (h("span", { class: {
        'oc-checkbox__label': true,
        'oc-checkbox__label--disabled': this.disabled
      } }, h("slot", { onSlotchange: this.handleLabelSlotChange }), !this.hasLabelSlot && this.label)))));
  }
  get el() { return this; }
  static get watchers() { return {
    "indeterminate": ["onIndeterminateChange"],
    "checked": ["onCheckedChange"]
  }; }
  static get style() { return galCheckboxCss; }
}, [1, "gal-checkbox", {
    "checked": [1540],
    "indeterminate": [516],
    "disabled": [4],
    "label": [1],
    "name": [1],
    "value": [1],
    "isFocused": [32],
    "isKeyboardFocus": [32],
    "hasLabelSlot": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["gal-checkbox"];
  components.forEach(tagName => { switch (tagName) {
    case "gal-checkbox":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, GalCheckbox$1);
      }
      break;
  } });
}

const GalCheckbox = GalCheckbox$1;
const defineCustomElement = defineCustomElement$1;

export { GalCheckbox, defineCustomElement };

//# sourceMappingURL=gal-checkbox.js.map
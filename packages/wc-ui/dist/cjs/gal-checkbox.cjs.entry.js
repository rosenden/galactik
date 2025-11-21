'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4533a219.js');

const galCheckboxCss = ":host{display:inline-flex}.oc-checkbox-wrapper{display:inline-flex;align-items:center;gap:var(--space-xs);cursor:pointer;user-select:none;position:relative;height:24px}.oc-checkbox-wrapper--disabled{cursor:not-allowed;opacity:1}.oc-checkbox__input{position:absolute;opacity:0;width:0;height:0;pointer-events:none}.oc-checkbox{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:var(--radius-xs);border:var(--stroke-xs) solid var(--color-font-primary-base);background-color:transparent;transition:all 0.15s ease;flex-shrink:0}.oc-checkbox__icon{display:flex;align-items:center;justify-content:center;width:10px;height:10px;color:var(--color-font-neutral-white);font-weight:900;opacity:1;transition:opacity 0.15s ease;overflow:hidden;font-size:0;line-height:0}.oc-checkbox__icon svg{width:100%;height:100%;display:block}.oc-checkbox--unselected .oc-checkbox__icon{opacity:0}.oc-checkbox__label{font-family:var(--font-family-base);font-size:var(--font-size-base);line-height:1;color:var(--color-font-neutral-base) !important;font-weight:var(--font-weight-regular)}.oc-checkbox__label--disabled{color:var(--color-font-neutral-muted) !important}.oc-checkbox--selected,.oc-checkbox--indeterminate{background-color:var(--color-bg-primary-base);border-color:var(--color-bg-primary-base)}.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):hover .oc-checkbox--unselected{background-color:var(--color-bg-primary-lighter);border-color:var(--color-font-primary-hovered)}.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):hover .oc-checkbox--selected,.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):hover .oc-checkbox--indeterminate{background-color:var(--color-bg-primary-hovered);border-color:var(--color-bg-primary-hovered)}.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--unselected{background-color:var(--color-bg-primary-light);border-color:var(--color-stroke-primary-base)}.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--selected,.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--indeterminate{background-color:var(--color-bg-primary-pressed);border-color:var(--color-bg-primary-pressed)}.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--selected .oc-checkbox__icon,.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--indeterminate .oc-checkbox__icon{color:var(--color-font-neutral-black)}.oc-checkbox--focused{outline:2px solid var(--color-stroke-focus);outline-offset:1px}.oc-checkbox--disabled{background-color:var(--color-bg-neutral-disabled) !important;border-color:var(--color-border-base) !important;cursor:not-allowed}.oc-checkbox--disabled.oc-checkbox--selected .oc-checkbox__icon,.oc-checkbox--disabled.oc-checkbox--indeterminate .oc-checkbox__icon{color:var(--color-font-neutral-muted) !important}.oc-checkbox--disabled.oc-checkbox--unselected{background-color:var(--color-bg-neutral-disabled) !important}";

const GalCheckbox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.galChange = index.createEvent(this, "galChange", 7);
    this.galCheckedChange = index.createEvent(this, "galCheckedChange", 7);
    this.galFocus = index.createEvent(this, "galFocus", 7);
    this.galBlur = index.createEvent(this, "galBlur", 7);
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
    return (index.h(index.Host, null, index.h("label", { class: wrapperClasses, onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown }, index.h("input", { ref: (el) => (this.inputEl = el), type: "checkbox", class: "oc-checkbox__input", checked: this.checked, disabled: this.disabled, name: this.name, value: this.value, "aria-checked": this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false', onChange: this.handleInputChange, onFocus: this.handleFocus, onBlur: this.handleBlur }), index.h("div", { class: checkboxClasses }, index.h("div", { class: "oc-checkbox__icon" }, selection === 'selected' && (index.h("svg", { viewBox: "0 0 16 16", width: "16", height: "16", fill: "none", "aria-hidden": "true" }, index.h("path", { d: "M4 8.5L6.5 11L12 5.5", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), selection === 'indeterminate' && (index.h("svg", { viewBox: "0 0 16 16", width: "16", height: "16", fill: "none", "aria-hidden": "true" }, index.h("path", { d: "M4 8H12", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" }))))), showLabel && (index.h("span", { class: {
        'oc-checkbox__label': true,
        'oc-checkbox__label--disabled': this.disabled
      } }, index.h("slot", { onSlotchange: this.handleLabelSlotChange }), !this.hasLabelSlot && this.label)))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "indeterminate": ["onIndeterminateChange"],
    "checked": ["onCheckedChange"]
  }; }
};
GalCheckbox.style = galCheckboxCss;

exports.gal_checkbox = GalCheckbox;

//# sourceMappingURL=gal-checkbox.cjs.entry.js.map
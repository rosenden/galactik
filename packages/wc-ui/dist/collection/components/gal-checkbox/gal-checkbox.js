import { Host, h } from '@stencil/core';
export class GalCheckbox {
  constructor() {
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
  static get is() { return "gal-checkbox"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gal-checkbox.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gal-checkbox.css"]
    };
  }
  static get properties() {
    return {
      "checked": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether the checkbox is checked"
        },
        "attribute": "checked",
        "reflect": true,
        "defaultValue": "false"
      },
      "indeterminate": {
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
          "text": "Indeterminate visual state (minus)"
        },
        "attribute": "indeterminate",
        "reflect": true,
        "defaultValue": "false"
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
          "text": "Disable interactions"
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "label": {
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
          "text": "Optional label text (fallback if no slot)"
        },
        "attribute": "label",
        "reflect": false
      },
      "name": {
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
          "text": "Native input name"
        },
        "attribute": "name",
        "reflect": false
      },
      "value": {
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
          "text": "Native input value"
        },
        "attribute": "value",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "isFocused": {},
      "isKeyboardFocus": {},
      "hasLabelSlot": {}
    };
  }
  static get events() {
    return [{
        "method": "galChange",
        "name": "galChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }, {
        "method": "galCheckedChange",
        "name": "galCheckedChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }, {
        "method": "galFocus",
        "name": "galFocus",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global"
            }
          }
        }
      }, {
        "method": "galBlur",
        "name": "galBlur",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "indeterminate",
        "methodName": "onIndeterminateChange"
      }, {
        "propName": "checked",
        "methodName": "onCheckedChange"
      }];
  }
}
//# sourceMappingURL=gal-checkbox.js.map

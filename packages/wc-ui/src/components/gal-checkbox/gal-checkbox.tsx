import { Component, Element, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';

type CheckboxSelection = 'unselected' | 'selected' | 'indeterminate';

@Component({
  tag: 'gal-checkbox',
  styleUrl: 'gal-checkbox.css',
  shadow: true
})
export class GalCheckbox {
  @Element() el!: HTMLElement;

  /** Whether the checkbox is checked */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;
  /** Indeterminate visual state (minus) */
  @Prop({ reflect: true }) indeterminate: boolean = false;
  /** Disable interactions */
  @Prop() disabled: boolean = false;
  /** Optional label text (fallback if no slot) */
  @Prop() label?: string;
  /** Native input name */
  @Prop() name?: string;
  /** Native input value */
  @Prop() value?: string;

  @State() isFocused = false;
  @State() isKeyboardFocus = false;
  @State() hasLabelSlot = false;

  @Event() galChange!: EventEmitter<boolean>;
  @Event() galCheckedChange!: EventEmitter<boolean>;
  @Event() galFocus!: EventEmitter<FocusEvent>;
  @Event() galBlur!: EventEmitter<FocusEvent>;

  private inputEl?: HTMLInputElement;

  componentDidLoad() {
    this.syncIndeterminate();
  }

  componentDidUpdate() {
    this.syncIndeterminate();
  }

  @Watch('indeterminate')
  onIndeterminateChange() {
    this.syncIndeterminate();
  }

  @Watch('checked')
  onCheckedChange(newValue: boolean) {
    if (this.inputEl) {
      this.inputEl.checked = newValue;
    }
  }

  private syncIndeterminate() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.indeterminate;
    }
  }

  private get selectionState(): CheckboxSelection {
    if (this.indeterminate) return 'indeterminate';
    if (this.checked) return 'selected';
    return 'unselected';
  }

  private handleInputChange = (event: Event) => {
    if (this.disabled) return;
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.galCheckedChange.emit(this.checked);
    this.galChange.emit(this.checked);
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === ' ' && !this.disabled) {
      event.preventDefault();
      this.checked = !this.checked;
      this.galCheckedChange.emit(this.checked);
      this.galChange.emit(this.checked);
    }
    this.isKeyboardFocus = true;
  };

  private handleMouseDown = () => {
    this.isKeyboardFocus = false;
  };

  private handleFocus = (event: FocusEvent) => {
    this.isFocused = true;
    this.galFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.isFocused = false;
    this.isKeyboardFocus = false;
    this.galBlur.emit(event);
  };

  private handleLabelSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;
    this.hasLabelSlot = !!slot && slot.assignedNodes().length > 0;
  };

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

    return (
      <Host>
        <label
          class={wrapperClasses}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
        >
          <input
            ref={(el) => (this.inputEl = el as HTMLInputElement)}
            type="checkbox"
            class="oc-checkbox__input"
            checked={this.checked}
            disabled={this.disabled}
            name={this.name}
            value={this.value}
            aria-checked={this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false'}
            onChange={this.handleInputChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />

          <div class={checkboxClasses}>
            <div class="oc-checkbox__icon">
              {selection === 'selected' && (
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
                  <path
                    d="M4 8.5L6.5 11L12 5.5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
              {selection === 'indeterminate' && (
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
                  <path
                    d="M4 8H12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              )}
            </div>
          </div>

          {showLabel && (
            <span
              class={{
                'oc-checkbox__label': true,
                'oc-checkbox__label--disabled': this.disabled
              }}
            >
              <slot onSlotchange={this.handleLabelSlotChange}></slot>
              {!this.hasLabelSlot && this.label}
            </span>
          )}
        </label>
      </Host>
    );
  }
}

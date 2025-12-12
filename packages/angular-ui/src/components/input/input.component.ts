import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputSize = 'small' | 'medium' | 'large';
export type InputVariant = 'default' | 'success' | 'error';
export type InputType = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url';

/**
 * Input component from Figma "OneChaps UI kit" - oc-input
 * 
 * Specifications from Figma (2025-12-12):
 * - Font: Hanken Grotesk 14px / 400
 * - States: default/empty, active, filled, hovered, focus, readonly, disabled
 * - Variants: default, success, error
 * - Sizes: small (24px), medium (36px), large (44px)
 * - Border radius: 8px
 * - Gap between elements: 8px
 * 
 * States color mapping:
 * - default/empty: text #5D7374, icons #445556, border #445556 1px
 * - active: (onClick/typing) text #182021, icons #2D393A, border #2D393A 2px (primary pressed)
 * - filled: text #182021, icons #445556, border #445556 1px
 * - hovered: text #374648, icons #374648
 * - focus: (keyboard Tab navigation) double stroke: outline #926E9B 2px + border #A9C1B8 1px
 * - readonly: bg #F1F8F4, text #182021, no border, no counter/controls
 * - disabled: text #626C84, icons #626C84, opacity 0.6
 * - success: border #A9C1B8 (green)
 * - error: border/text #DC004E (cherry)
 * 
 * Counter: 12px Hanken Grotesk / 400, color #445556
 * Number controls: vertical chevrons (up/down) on medium/large, horizontal on small
 * 
 * @example
 * ```html
 * <!-- Basic input -->
 * <oc-input
 *   [(value)]="textValue"
 *   placeholder="Enter text...">
 * </oc-input>
 * 
 * <!-- Different sizes -->
 * <oc-input [(value)]="value" size="small"></oc-input>
 * <oc-input [(value)]="value" size="medium"></oc-input>
 * <oc-input [(value)]="value" size="large"></oc-input>
 * 
 * <!-- With icons -->
 * <oc-input 
 *   [(value)]="value"
 *   iconLeft="fa-solid fa-search"
 *   placeholder="Search...">
 * </oc-input>
 * 
 * <!-- Number input with controls -->
 * <oc-input 
 *   [(value)]="value"
 *   type="number"
 *   [showNumberControls]="true">
 * </oc-input>
 * 
 * <!-- With character counter -->
 * <oc-input 
 *   [(value)]="value"
 *   [maxLength]="320"
 *   placeholder="Enter message">
 * </oc-input>
 * 
 * <!-- Variants -->
 * <oc-input [(value)]="value" variant="success"></oc-input>
 * <oc-input [(value)]="value" variant="error"></oc-input>
 * 
 * <!-- States -->
 * <oc-input [(value)]="value" [disabled]="true"></oc-input>
 * <oc-input [(value)]="value" [readonly]="true"></oc-input>
 * ```
 */
@Component({
  selector: 'oc-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  /**
   * Input value
   */
  @Input() value: string = '';

  /**
   * Value change emitter
   */
  @Output() valueChange = new EventEmitter<string>();

  /**
   * Change event emitter
   */
  @Output() change = new EventEmitter<string>();

  /**
   * Focus event emitter
   */
  @Output() focusEvent = new EventEmitter<FocusEvent>();

  /**
   * Blur event emitter
   */
  @Output() blurEvent = new EventEmitter<FocusEvent>();

  /**
   * Placeholder text
   * @default 'Lorem ipsum'
   */
  @Input() placeholder: string = 'Lorem ipsum';

  /**
   * Input size
   * - small: 24px height
   * - medium: 36px height (default)
   * - large: 44px height
   * @default 'medium'
   */
  @Input() size: InputSize = 'medium';

  /**
   * Input variant
   * - default: standard input
   * - success: green styling
   * - error: red/cherry styling
   * @default 'default'
   */
  @Input() variant: InputVariant = 'default';

  /**
   * Input type
   * @default 'text'
   */
  @Input() type: InputType = 'text';

  /**
   * Left icon (Font Awesome class string)
   * @example iconLeft="fa-solid fa-search"
   */
  @Input() iconLeft?: string;

  /**
   * Right icon(s) (Font Awesome class string or array)
   * @example iconRight="fa-solid fa-user"
   * @example iconRight="fa-solid fa-user fa-solid fa-lock"
   */
  @Input() iconRight?: string | string[];

  /**
   * Show character counter
   * Format: "0/320"
   */
  @Input() maxLength?: number;

  /**
   * Show counter even without maxLength
   */
  @Input() showCounter: boolean = false;

  /**
   * Show number controls (up/down chevrons) for number inputs
   * @default true for type="number"
   */
  @Input() showNumberControls?: boolean;

  /**
   * Whether the input is disabled
   */
  @Input() disabled: boolean = false;

  /**
   * Whether the input is readonly
   */
  @Input() readonly: boolean = false;

  /**
   * Additional CSS class
   */
  @Input() className?: string;

  /**
   * Name attribute
   */
  @Input() name?: string;

  /**
   * ID attribute
   */
  @Input() id?: string;

  /**
   * Required attribute
   */
  @Input() required: boolean = false;

  /**
   * Aria label
   */
  @Input() ariaLabel?: string;

  // Internal state
  isFocused: boolean = false;
  isHovered: boolean = false;
  isKeyboardFocus: boolean = false;

  // ControlValueAccessor
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get baseClass(): string {
    return 'oc-input';
  }

  get isEmpty(): boolean {
    return !this.value || this.value.length === 0;
  }

  get isFilled(): boolean {
    return !this.isEmpty;
  }

  get isActive(): boolean {
    return this.isFocused && !this.isKeyboardFocus;
  }

  get isFocusVisible(): boolean {
    return this.isFocused && this.isKeyboardFocus;
  }

  get shouldShowNumberControls(): boolean {
    return this.showNumberControls !== undefined 
      ? this.showNumberControls 
      : this.type === 'number';
  }

  get showCounterDisplay(): boolean {
    return (this.showCounter || !!this.maxLength) && !this.readonly;
  }

  get counterText(): string {
    return this.maxLength 
      ? `${this.value.length}/${this.maxLength}`
      : this.value.length.toString();
  }

  get rightIconsArray(): string[] {
    if (!this.iconRight) return [];
    if (Array.isArray(this.iconRight)) return this.iconRight;
    // Split string by spaces to handle multiple icon classes
    return this.iconRight.split(' ').filter(Boolean);
  }

  get classes(): string {
    const base = this.baseClass;
    return [
      base,
      `${base}--${this.size}`,
      `${base}--${this.variant}`,
      this.isEmpty && !this.isFocused ? `${base}--empty` : '',
      this.isFilled && !this.isFocused && !this.isHovered ? `${base}--filled` : '',
      this.isActive ? `${base}--active` : '',
      this.isHovered && !this.isFocused ? `${base}--hovered` : '',
      this.isFocusVisible ? `${base}--focus` : '',
      this.readonly ? `${base}--readonly` : '',
      this.disabled ? `${base}--disabled` : '',
      this.className
    ].filter(Boolean).join(' ');
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
    this.change.emit(this.value);
    this.onChange(this.value);
  }

  handleFocus(event: FocusEvent): void {
    this.isFocused = true;
    // Check if focus was triggered by keyboard (Tab key)
    const target = event.target as HTMLInputElement;
    this.isKeyboardFocus = target.matches(':focus-visible');
    this.focusEvent.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.isFocused = false;
    this.isKeyboardFocus = false;
    this.blurEvent.emit(event);
    this.onTouched();
  }

  handleMouseDown(): void {
    // When clicking, it's not keyboard focus
    this.isKeyboardFocus = false;
  }

  handleKeyDown(event: KeyboardEvent): void {
    // When pressing Tab, it's keyboard focus
    if (event.key === 'Tab') {
      this.isKeyboardFocus = true;
    }
  }

  handleMouseEnter(): void {
    if (!this.disabled) {
      this.isHovered = true;
    }
  }

  handleMouseLeave(): void {
    this.isHovered = false;
  }

  handleIncrement(): void {
    if (this.type === 'number' && !this.disabled && !this.readonly) {
      const num = parseFloat(this.value || '0');
      this.value = (num + 1).toString();
      this.valueChange.emit(this.value);
      this.change.emit(this.value);
      this.onChange(this.value);
    }
  }

  handleDecrement(): void {
    if (this.type === 'number' && !this.disabled && !this.readonly) {
      const num = parseFloat(this.value || '0');
      this.value = (num - 1).toString();
      this.valueChange.emit(this.value);
      this.change.emit(this.value);
      this.onChange(this.value);
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

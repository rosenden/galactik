import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SelectSize = 'small' | 'medium' | 'large';

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Select component from Figma "OneChaps UI kit" - oc-select
 * 
 * Specifications from Figma (2025-12-10):
 * - Font: Hanken Grotesk 14px / 400
 * - States: empty, active, filled, hovered, readonly, disabled, focus
 * - Sizes: small, medium, large
 * - Border radius: 8px
 * - Focus border: #A9C1B8 (1px)
 * 
 * @example
 * ```html
 * <!-- Basic select -->
 * <oc-select
 *   [options]="options"
 *   [(value)]="selectedValue"
 *   placeholder="Select an option">
 * </oc-select>
 * 
 * <!-- Different sizes -->
 * <oc-select [options]="options" size="small"></oc-select>
 * <oc-select [options]="options" size="medium"></oc-select>
 * <oc-select [options]="options" size="large"></oc-select>
 * 
 * <!-- With icon -->
 * <oc-select 
 *   [options]="options"
 *   icon="fa-solid fa-user"
 *   placeholder="Select user">
 * </oc-select>
 * 
 * <!-- Disabled -->
 * <oc-select [options]="options" [disabled]="true"></oc-select>
 * 
 * <!-- Readonly -->
 * <oc-select [options]="options" [readonly]="true" value="1"></oc-select>
 * ```
 */
@Component({
  selector: 'oc-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @ViewChild('triggerButton', { static: false }) triggerButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('dropdown', { static: false }) dropdown?: ElementRef<HTMLDivElement>;

  /**
   * Select options
   */
  @Input() options: SelectOption[] = [];

  /**
   * Currently selected value
   */
  @Input() value?: string;

  /**
   * Value change emitter
   */
  @Output() valueChange = new EventEmitter<string>();

  /**
   * Placeholder text (shown in empty state)
   * @default 'Lorem ipsum dolor'
   */
  @Input() placeholder: string = 'Lorem ipsum dolor';

  /**
   * Select size
   * - small: compact size
   * - medium: default size
   * - large: larger size
   * @default 'medium'
   */
  @Input() size: SelectSize = 'medium';

  /**
   * Left icon (Font Awesome class string)
   * @example icon="fa-solid fa-user"
   */
  @Input() icon?: string;

  /**
   * Whether the select is disabled
   */
  @Input() disabled: boolean = false;

  /**
   * Whether the select is readonly (no chevron, not clickable)
   */
  @Input() readonly: boolean = false;

  /**
   * Additional CSS class
   */
  @Input() className?: string;

  // Internal state
  isOpen: boolean = false;
  isFocused: boolean = false;
  highlightedIndex: number | null = null;

  constructor(private elementRef: ElementRef) {}

  get baseClass(): string {
    return 'oc-select';
  }

  get isEmpty(): boolean {
    return !this.value;
  }

  get isFilled(): boolean {
    return !!this.value && !this.isOpen;
  }

  get isActive(): boolean {
    return this.isOpen;
  }

  get classes(): string {
    const base = this.baseClass;
    return [
      base,
      `${base}--${this.size}`,
      this.isEmpty && !this.isOpen && !this.isFocused && `${base}--empty`,
      this.isActive && `${base}--active`,
      this.isFilled && !this.isFocused && `${base}--filled`,
      this.isFocused && !this.disabled && !this.readonly && `${base}--focus`,
      this.disabled && `${base}--disabled`,
      this.readonly && `${base}--readonly`,
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  get selectedOption(): SelectOption | undefined {
    return this.options.find(opt => opt.value === this.value);
  }

  get displayText(): string {
    return this.selectedOption ? this.selectedOption.label : this.placeholder;
  }

  get iconClasses(): string[] | undefined {
    return this.icon ? this.icon.split(' ') : undefined;
  }

  handleClick(): void {
    if (this.disabled || this.readonly) return;
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      const selIdx = this.options.findIndex(o => o.value === this.value);
      this.highlightedIndex = selIdx >= 0 ? selIdx : 0;
      
      // Scroll to highlighted option
      setTimeout(() => {
        if (this.highlightedIndex !== null && this.dropdown) {
          const optionEl = this.dropdown.nativeElement.querySelector(`[data-index="${this.highlightedIndex}"]`) as HTMLElement;
          optionEl?.scrollIntoView({ block: 'nearest' });
        }
      }, 0);
    } else {
      this.highlightedIndex = null;
    }
  }

  handleOptionClick(optionValue: string): void {
    this.value = optionValue;
    this.valueChange.emit(optionValue);
    this.isOpen = false;
  }

  handleFocus(): void {
    if (!this.disabled && !this.readonly) {
      this.isFocused = true;
    }
  }

  handleBlur(): void {
    this.isFocused = false;
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled || this.readonly) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.isOpen = true;
          this.highlightedIndex = 0;
        } else {
          this.highlightedIndex = this.highlightedIndex === null 
            ? 0 
            : Math.min(this.options.length - 1, this.highlightedIndex + 1);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) {
          this.isOpen = true;
          this.highlightedIndex = this.options.length - 1;
        } else {
          this.highlightedIndex = this.highlightedIndex === null 
            ? this.options.length - 1 
            : Math.max(0, this.highlightedIndex - 1);
        }
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!this.isOpen) {
          this.isOpen = true;
          this.highlightedIndex = this.options.findIndex(o => o.value === this.value) || 0;
        } else if (this.highlightedIndex !== null) {
          const opt = this.options[this.highlightedIndex];
          this.handleOptionClick(opt.value);
        }
        break;

      case 'Escape':
        this.isOpen = false;
        this.highlightedIndex = null;
        this.triggerButton?.nativeElement.focus();
        break;

      case 'Home':
        event.preventDefault();
        this.highlightedIndex = 0;
        break;

      case 'End':
        event.preventDefault();
        this.highlightedIndex = this.options.length - 1;
        break;
    }
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;
    if (this.isOpen && !this.elementRef.nativeElement.contains(target)) {
      this.isOpen = false;
      this.highlightedIndex = null;
    }
  }

  isOptionHighlighted(index: number): boolean {
    return this.highlightedIndex === index;
  }

  isOptionSelected(option: SelectOption): boolean {
    return option.value === this.value;
  }

  onOptionMouseEnter(index: number): void {
    this.highlightedIndex = index;
  }

  onOptionMouseDown(event: MouseEvent): void {
    // Prevent blur on click
    event.preventDefault();
  }
}

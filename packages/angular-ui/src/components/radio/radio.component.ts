import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'oc-radio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label
      [class]="wrapperClasses"
      (keydown)="handleKeyDown($event)"
      (mousedown)="handleMouseDown()"
    >
      <input
        type="radio"
        class="oc-radio__input"
        [checked]="checked"
        [disabled]="disabled"
        [attr.name]="name"
        [attr.value]="value"
        [attr.aria-checked]="checked"
        (change)="handleInputChange($event)"
        (focus)="handleFocus()"
        (blur)="handleBlur()"
      />

      <span [class]="radioClasses">
        <span class="oc-radio__outer"></span>
        <span class="oc-radio__dot"></span>
      </span>

      <span
        *ngIf="label"
        class="oc-radio__label"
        [class.oc-radio__label--disabled]="disabled"
      >
        {{ label }}
      </span>
    </label>
  `,
  styles: [`
    .oc-radio-wrapper {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      user-select: none;
      position: relative;
      height: 24px;
    }

    .oc-radio-wrapper--disabled {
      cursor: not-allowed;
      opacity: 1;
    }

    .oc-radio__input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    .oc-radio {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: var(--stroke-xs) solid var(--color-font-primary-base);
      background-color: transparent;
      transition: all 0.15s ease;
      flex-shrink: 0;
      position: relative;
    }

    .oc-radio--checked {
      border-color: var(--color-stroke-primary-base);
    }

    .oc-radio--disabled {
      border-color: var(--color-font-neutral-disabled, #d1d1d1);
      background: var(--color-bg-neutral-disabled, #f5f5f5);
    }

    .oc-radio--focused {
      box-shadow: 0 0 0 2px var(--color-accent-primary-light, #e6f0ff);
    }

    .oc-radio__dot {
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-stroke-primary-base);
      opacity: 0;
      transition: opacity 0.15s ease;
      position: absolute;
      left: 4px;
      top: 4px;
    }

    .oc-radio--checked .oc-radio__dot {
      opacity: 1;
    }

    .oc-radio--disabled .oc-radio__dot {
      background: var(--color-font-neutral-disabled, #d1d1d1);
    }

    .oc-radio__outer {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }

    .oc-radio__label {
      margin-left: 4px;
      color: var(--color-font-primary-base);
      font-size: var(--font-size-body);
      user-select: none;
    }

    .oc-radio__label--disabled {
      color: var(--color-font-neutral-disabled, #d1d1d1);
    }
  `]
})
export class RadioComponent {
  /** Whether the radio is selected */
  @Input() checked = false;
  /** Whether the radio is disabled */
  @Input() disabled = false;
  /** Optional label text */
  @Input() label?: string;
  /** Input name attribute */
  @Input() name?: string;
  /** Input value attribute */
  @Input() value?: string;

  /** Emits when the radio changes state */
  @Output() change = new EventEmitter<boolean>();

  isFocused = false;
  isKeyboardFocus = false;

  get wrapperClasses(): string {
    return [
      'oc-radio-wrapper',
      this.disabled ? 'oc-radio-wrapper--disabled' : ''
    ].filter(Boolean).join(' ');
  }

  get radioClasses(): string {
    return [
      'oc-radio',
      this.checked ? 'oc-radio--checked' : '',
      this.disabled ? 'oc-radio--disabled' : '',
      this.isFocused && this.isKeyboardFocus ? 'oc-radio--focused' : ''
    ].filter(Boolean).join(' ');
  }

  handleInputChange(event: Event): void {
    if (this.disabled) return;
    const target = event.target as HTMLInputElement;
    this.change.emit(target.checked);
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' && !this.disabled) {
      event.preventDefault();
      this.change.emit(!this.checked);
    }
    this.isKeyboardFocus = true;
  }

  handleMouseDown(): void {
    this.isKeyboardFocus = false;
  }

  handleFocus(): void {
    this.isFocused = true;
  }

  handleBlur(): void {
    this.isFocused = false;
    this.isKeyboardFocus = false;
  }
}

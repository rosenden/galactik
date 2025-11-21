import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'oc-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label
      [class]="wrapperClasses"
      (keydown)="handleKeyDown($event)"
      (mousedown)="handleMouseDown()"
    >
      <input
        #inputRef
        type="checkbox"
        class="oc-checkbox__input"
        [checked]="checked"
        [disabled]="disabled"
        [attr.name]="name"
        [attr.value]="value"
        [attr.aria-checked]="indeterminate ? 'mixed' : checked"
        (change)="handleInputChange($event)"
        (focus)="handleFocus($event)"
        (blur)="handleBlur($event)"
      />

      <div [class]="checkboxClasses">
        <div class="oc-checkbox__icon">
          <svg
            *ngIf="selectionState === 'selected'"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 8.5L6.5 11L12 5.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            *ngIf="selectionState === 'indeterminate'"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 8H12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <span
        *ngIf="label"
        class="oc-checkbox__label"
        [class.oc-checkbox__label--disabled]="disabled"
      >
        {{ label }}
      </span>
    </label>
  `,
  styles: [`
    .oc-checkbox-wrapper {
      display: inline-flex;
      align-items: center;
      gap: var(--space-xs);
      cursor: pointer;
      user-select: none;
      position: relative;
      height: 24px;
    }

    .oc-checkbox-wrapper--disabled {
      cursor: not-allowed;
      opacity: 1;
    }

    .oc-checkbox__input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    .oc-checkbox {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: var(--radius-xs);
      border: var(--stroke-xs) solid var(--color-font-primary-base);
      background-color: transparent;
      transition: all 0.15s ease;
      flex-shrink: 0;
    }

    .oc-checkbox__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10px;
      height: 10px;
      color: var(--color-font-neutral-white);
      font-weight: 900;
      opacity: 1;
      transition: opacity 0.15s ease;
      overflow: hidden;
      font-size: 0;
      line-height: 0;
    }

    .oc-checkbox__icon svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .oc-checkbox--unselected .oc-checkbox__icon {
      opacity: 0;
    }

    .oc-checkbox__label {
      font-family: var(--font-family-base);
      font-size: var(--font-size-base);
      line-height: 1;
      color: var(--color-font-neutral-base) !important;
      font-weight: var(--font-weight-regular);
    }

    .oc-checkbox__label--disabled {
      color: var(--color-font-neutral-muted) !important;
    }

    .oc-checkbox--selected,
    .oc-checkbox--indeterminate {
      background-color: var(--color-bg-primary-base);
      border-color: var(--color-bg-primary-base);
    }

    .oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):hover .oc-checkbox--unselected {
      background-color: var(--color-bg-primary-lighter);
      border-color: var(--color-font-primary-hovered);
    }

    .oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):hover .oc-checkbox--selected,
    .oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):hover .oc-checkbox--indeterminate {
      background-color: var(--color-bg-primary-hovered);
      border-color: var(--color-bg-primary-hovered);
    }

    .oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--unselected {
      background-color: var(--color-bg-primary-light);
      border-color: var(--color-stroke-primary-base);
    }

    .oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--selected,
    .oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--indeterminate {
      background-color: var(--color-bg-primary-pressed);
      border-color: var(--color-bg-primary-pressed);
    }

    .oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--selected .oc-checkbox__icon,
    .oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--indeterminate .oc-checkbox__icon {
      color: var(--color-font-neutral-black);
    }

    .oc-checkbox--focused {
      outline: 2px solid var(--color-stroke-focus);
      outline-offset: 1px;
    }

    .oc-checkbox--disabled {
      background-color: var(--color-bg-neutral-disabled) !important;
      border-color: var(--color-border-base) !important;
      cursor: not-allowed;
    }

    .oc-checkbox--disabled.oc-checkbox--selected .oc-checkbox__icon,
    .oc-checkbox--disabled.oc-checkbox--indeterminate .oc-checkbox__icon {
      color: var(--color-font-neutral-muted) !important;
    }

    .oc-checkbox--disabled.oc-checkbox--unselected {
      background-color: var(--color-bg-neutral-disabled) !important;
    }
  `]
})
export class CheckboxComponent implements AfterViewInit, OnChanges {
  @Input() checked = false;
  @Input() indeterminate = false;
  @Input() disabled = false;
  @Input() label?: string;
  @Input() name?: string;
  @Input() value?: string;

  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() change = new EventEmitter<boolean>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() blur = new EventEmitter<FocusEvent>();

  @ViewChild('inputRef', { static: true }) inputRef?: ElementRef<HTMLInputElement>;

  isFocused = false;
  isKeyboardFocus = false;

  ngAfterViewInit(): void {
    this.syncIndeterminate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['indeterminate']) {
      this.syncIndeterminate();
    }
  }

  get selectionState(): 'unselected' | 'selected' | 'indeterminate' {
    if (this.indeterminate) return 'indeterminate';
    if (this.checked) return 'selected';
    return 'unselected';
  }

  get wrapperClasses(): string {
    return [
      'oc-checkbox-wrapper',
      this.disabled ? 'oc-checkbox-wrapper--disabled' : ''
    ].filter(Boolean).join(' ');
  }

  get checkboxClasses(): string {
    const base = 'oc-checkbox';
    return [
      base,
      `${base}--${this.selectionState}`,
      this.disabled ? `${base}--disabled` : '',
      this.isFocused && this.isKeyboardFocus ? `${base}--focused` : ''
    ].filter(Boolean).join(' ');
  }

  handleInputChange(event: Event): void {
    if (this.disabled) return;
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.checkedChange.emit(this.checked);
    this.change.emit(this.checked);
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' && !this.disabled) {
      event.preventDefault();
      const next = !this.checked;
      this.checked = next;
      this.checkedChange.emit(next);
      this.change.emit(next);
    }
    this.isKeyboardFocus = true;
  }

  handleMouseDown(): void {
    this.isKeyboardFocus = false;
  }

  handleFocus(event: FocusEvent): void {
    this.isFocused = true;
    this.focus.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.isFocused = false;
    this.isKeyboardFocus = false;
    this.blur.emit(event);
  }

  private syncIndeterminate(): void {
    if (this.inputRef?.nativeElement) {
      this.inputRef.nativeElement.indeterminate = this.indeterminate;
    }
  }
}

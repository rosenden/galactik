import { Component, ContentChild, Directive, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type LabelSize = 'small' | 'medium';
type LabelColor = 'sage' | 'black' | 'success' | 'error' | 'warning' | 'info';

@Directive({
  selector: '[ocLabelIcon]',
  standalone: true,
})
export class OcLabelIconDirective {}

@Directive({
  selector: '[ocLabelText]',
  standalone: true,
})
export class OcLabelTextDirective {}

/**
 * Label Component - ISO with React implementation
 *
 * Usage:
 * ```html
 * <oc-label text="New" color="success" size="medium" icon="fa-regular fa-image"></oc-label>
 * <oc-label text="Warning" color="warning" size="small">
 *   <span ocLabelIcon class="fa-regular fa-triangle-exclamation"></span>
 * </oc-label>
 * ```
 */
@Component({
  selector: 'oc-label',
  standalone: true,
  imports: [CommonModule, OcLabelIconDirective, OcLabelTextDirective],
  template: `
    <span [ngClass]="labelClasses">
      <span class="oc-label__icon" *ngIf="icon || iconSlot">
        <i *ngIf="icon" [class]="icon" aria-hidden="true"></i>
        <ng-content select="[ocLabelIcon]"></ng-content>
      </span>
      <span class="oc-label__text">
        <ng-content select="[ocLabelText]"></ng-content>
        <ng-container *ngIf="!textSlot">{{ text }}</ng-container>
      </span>
    </span>
  `,
  styles: [`
    .oc-label {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-family-base, 'Inter', system-ui, -apple-system, sans-serif);
      font-weight: 600;
      box-sizing: border-box;
      vertical-align: middle;
      white-space: nowrap;
    }

    .oc-label__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: var(--icon-md);
      height: var(--icon-md);
    }

    .oc-label__icon svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .oc-label__text {
      display: inline-block;
    }

    .oc-label--small {
      font-size: var(--font-size-sm);
      line-height: var(--line-height-2);
      font-weight: var(--font-weight-semibold);
      gap: var(--space-3xs);
    }

    .oc-label--medium {
      font-size: var(--font-size-base);
      line-height: var(--line-height-4);
      font-weight: var(--font-weight-semibold);
      gap: var(--space-3xs);
    }

    .oc-label.oc-label--sage.oc-label--default {
      color: var(--color-font-primary-base) !important;
    }

    .oc-label.oc-label--black.oc-label--default {
      color: var(--color-font-neutral-base) !important;
    }

    .oc-label.oc-label--success.oc-label--default {
      color: var(--color-font-success-muted) !important;
    }

    .oc-label.oc-label--error.oc-label--default {
      color: var(--color-font-error-muted) !important;
    }

    .oc-label.oc-label--warning.oc-label--default {
      color: var(--color-font-warning-muted) !important;
    }

    .oc-label.oc-label--info.oc-label--default {
      color: var(--color-font-info-muted) !important;
    }
  `]
})
export class LabelComponent {
  @Input() text = '';
  @Input() size: LabelSize = 'medium';
  @Input() color: LabelColor = 'sage';
  @Input() icon?: string;

  @ContentChild(OcLabelIconDirective) iconSlot?: OcLabelIconDirective;
  @ContentChild(OcLabelTextDirective) textSlot?: OcLabelTextDirective;

  get labelClasses(): string {
    const base = 'oc-label';
    return [
      base,
      `${base}--${this.size}`,
      `${base}--${this.color}`,
      `${base}--default`
    ].join(' ');
  }
}

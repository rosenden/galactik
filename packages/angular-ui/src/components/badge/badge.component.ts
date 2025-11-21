import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Badge Component - Synchronized with Figma Design System via MCP
 * 
 * @example
 * ```html
 * <!-- Badge with number (default mode) -->
 * <oc-badge [label]="5" color="sage" style="primary" size="sm"></oc-badge>
 * 
 * <!-- Badge with custom colors -->
 * <oc-badge [label]="12" color="info" style="secondary" size="lg"></oc-badge>
 * 
 * <!-- Badge with icon (Font Awesome) -->
 * <oc-badge 
 *   color="error" 
 *   style="primary" 
 *   size="lg"
 *   mode="icon">
 *   <i class="fa-solid fa-bell"></i>
 * </oc-badge>
 * 
 * <!-- Badge in a notification -->
 * <div style="display: flex; align-items: center; gap: 8px">
 *   <span>Notifications</span>
 *   <oc-badge [label]="3" color="cherry" style="primary" size="xs"></oc-badge>
 * </div>
 * ```
 */

type BadgeSize = 'xs' | 'sm' | 'lg';
type BadgeVariant = 'primary' | 'secondary';
type BadgeColor =
  | 'sage'
  | 'almond'
  | 'pink'
  | 'grey'
  | 'info'
  | 'error'
  | 'success'
  | 'warning'
  | 'indigo'
  | 'yellow'
  | 'cherry'
  | 'cyan';
type BadgeMode = 'number' | 'icon';

// Color tokens structure - same as React
const colorTokens: Record<
  BadgeColor,
  { primary: Record<'background' | 'color' | 'border', string>; secondary: Record<'background' | 'color' | 'border', string> }
> = {
  sage: {
    primary: { background: 'var(--color-bg-primary-base)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-primary-base)' },
    secondary: { background: 'var(--color-bg-primary-lightest)', color: 'var(--color-font-primary-base)', border: 'var(--color-stroke-primary-light)' }
  },
  almond: {
    primary: { background: 'var(--color-bg-secondary-base)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-secondary-base)' },
    secondary: { background: 'var(--color-bg-secondary-lightest)', color: 'var(--color-font-secondary-base)', border: 'var(--color-stroke-secondary-base)' }
  },
  pink: {
    primary: { background: 'var(--color-bg-accent-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-accent-base)' },
    secondary: { background: 'var(--color-bg-accent-hover)', color: 'var(--color-font-accent-base)', border: 'var(--color-stroke-accent-base)' }
  },
  grey: {
    primary: { background: 'var(--color-bg-neutral-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-neutral-dark)' },
    secondary: { background: 'var(--color-bg-neutral-disabled)', color: 'var(--color-font-neutral-muted)', border: 'var(--color-stroke-neutral-disabled)' }
  },
  info: {
    primary: { background: 'var(--color-bg-info-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-info-base)' },
    secondary: { background: 'var(--color-bg-info-base)', color: 'var(--color-font-info-base)', border: 'var(--color-stroke-info-base)' }
  },
  error: {
    primary: { background: 'var(--color-bg-error-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-error-base)' },
    secondary: { background: 'var(--color-bg-error-base)', color: 'var(--color-font-error-base)', border: 'var(--color-stroke-error-base)' }
  },
  success: {
    primary: { background: 'var(--color-bg-success-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-success-base)' },
    secondary: { background: 'var(--color-bg-success-base)', color: 'var(--color-font-success-base)', border: 'var(--color-stroke-success-base)' }
  },
  warning: {
    primary: { background: 'var(--color-bg-warning-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-warning-base)' },
    secondary: { background: 'var(--color-bg-warning-base)', color: 'var(--color-font-warning-base)', border: 'var(--color-stroke-warning-base)' }
  },
  indigo: {
    primary: { background: 'var(--color-bg-indigo-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-indigo-base)' },
    secondary: { background: 'var(--color-bg-indigo-base-alt)', color: 'var(--color-font-indigo-base)', border: 'var(--color-stroke-indigo-base)' }
  },
  yellow: {
    primary: { background: 'var(--color-bg-yellow-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-yellow-base)' },
    secondary: { background: 'var(--color-bg-yellow-base-alt)', color: 'var(--color-font-yellow-base)', border: 'var(--color-stroke-yellow-base)' }
  },
  cherry: {
    primary: { background: 'var(--color-bg-cherry-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-cherry-base)' },
    secondary: { background: 'var(--color-bg-cherry-base)', color: 'var(--color-font-cherry-base)', border: 'var(--color-stroke-cherry-base)' }
  },
  cyan: {
    primary: { background: 'var(--color-bg-cyan-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-cyan-base)' },
    secondary: { background: 'var(--color-bg-cyan-base-alt)', color: 'var(--color-font-cyan-base)', border: 'var(--color-stroke-cyan-base)' }
  }
};

@Component({
  selector: 'oc-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      class="qa-badge qa-badge--{{size}}"
      [ngStyle]="getStyles()"
      role="status"
      [attr.aria-label]="getAriaLabel()">
      <span *ngIf="mode === 'number'" class="qa-badge__label">{{ label }}</span>
      <span *ngIf="mode === 'icon'" class="qa-badge__icon" aria-hidden="true">
        <ng-content></ng-content>
      </span>
    </span>
  `,
  styles: [`
    .qa-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-3xs, 4px);
      border-radius: 9999px;
      border: 0;
      font-family: var(--font-family-base);
      font-weight: var(--font-weight-semibold);
      line-height: 1;
      box-sizing: border-box;
      aspect-ratio: 1 / 1;
    }

    .qa-badge__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1em;
      line-height: 1;
    }

    .qa-badge__label {
      display: inline-flex;
      align-items: center;
    }

    /* Sizes: fixed pixel dimensions for circular badges */
    .qa-badge--xs { 
      width: 18px; 
      height: 18px; 
      font-size: 10px;
    }
    .qa-badge--sm { 
      width: 24px; 
      height: 24px; 
      font-size: 12px;
    }
    .qa-badge--lg { 
      width: 36px; 
      height: 36px; 
      font-size: 14px;
    }
  `]
})
export class BadgeComponent {
  @Input() label?: number | string;
  @Input() color: BadgeColor = 'sage';
  @Input() variant: BadgeVariant = 'primary';
  @Input() size: BadgeSize = 'sm';
  @Input() mode: BadgeMode = 'number';
  @Input() className?: string;

  getStyles(): Record<string, string> {
    const tokens = colorTokens[this.color];
    if (!tokens) {
      return {
        background: 'var(--color-bg-primary-base)',
        color: 'var(--color-font-neutral-white)',
        borderColor: 'var(--color-stroke-primary-base)',
        padding: '0',
        fontSize: '12px'
      };
    }

    const colors = tokens[this.variant];
    const sizing = this.getSizing();
    
    return {
      background: colors.background,
      color: colors.color,
      borderColor: colors.border,
      padding: sizing.padding,
      fontSize: sizing.fontSize
    };
  }

  getSizing(): { padding: string; fontSize: string } {
    const sizeTokens: Record<BadgeSize, { padding: string; fontSize: string }> = {
      xs: { padding: '0', fontSize: '10px' },
      sm: { padding: '0', fontSize: '12px' },
      lg: { padding: '0', fontSize: '14px' }
    };
    return sizeTokens[this.size];
  }

  getAriaLabel(): string {
    const labelText = this.label !== undefined ? String(this.label) : undefined;
    return labelText ?? 'badge';
  }
}

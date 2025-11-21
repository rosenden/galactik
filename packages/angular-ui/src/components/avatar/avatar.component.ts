import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Avatar Component - Synchronized with Figma Design System via MCP
 * 
 * @example
 * ```html
 * <!-- Avatar with initials (default Figma colors) -->
 * <oc-avatar name="Alice Smith" size="medium"></oc-avatar>
 * 
 * <!-- Avatar with image -->
 * <oc-avatar 
 *   name="Clara White"
 *   src="https://example.com/photo.jpg"
 *   size="large">
 * </oc-avatar>
 * 
 * <!-- Avatar with custom variant -->
 * <oc-avatar 
 *   name="Bob Jones" 
 *   size="large"
 *   variant="secondary"
 *   avatarColor="pink">
 * </oc-avatar>
 * ```
 */

type AvatarSize = 'small' | 'medium' | 'large';
type AvatarVariant = 'primary' | 'secondary';
type AvatarColor =
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
  | 'cyan'
  | 'orange'
  | 'green'
  | 'blue'
  | 'red';

// Color tokens structure - same as React
const colorTokens: Record<
  Exclude<AvatarColor, 'orange' | 'green' | 'blue' | 'red'>,
  { primary: Record<'background' | 'color', string>; secondary: Record<'background' | 'color', string> }
> = {
  sage: {
    primary: { background: 'var(--color-bg-primary-base)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-primary-lightest)', color: 'var(--color-font-primary-base)' }
  },
  almond: {
    primary: { background: 'var(--color-bg-secondary-base)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-secondary-lightest)', color: 'var(--color-font-secondary-base)' }
  },
  pink: {
    primary: { background: 'var(--color-bg-accent-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-accent-hover)', color: 'var(--color-font-accent-base)' }
  },
  grey: {
    primary: { background: 'var(--color-bg-neutral-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-neutral-disabled)', color: 'var(--color-font-neutral-muted)' }
  },
  info: {
    primary: { background: 'var(--color-bg-info-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-info-base)', color: 'var(--color-font-info-base)' }
  },
  error: {
    primary: { background: 'var(--color-bg-error-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-error-base)', color: 'var(--color-font-error-base)' }
  },
  success: {
    primary: { background: 'var(--color-bg-success-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-success-base)', color: 'var(--color-font-success-base)' }
  },
  warning: {
    primary: { background: 'var(--color-bg-warning-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-warning-base)', color: 'var(--color-font-warning-base)' }
  },
  indigo: {
    primary: { background: 'var(--color-bg-indigo-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-indigo-base-alt)', color: 'var(--color-font-indigo-base)' }
  },
  yellow: {
    primary: { background: 'var(--color-bg-yellow-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-yellow-base-alt)', color: 'var(--color-font-yellow-base)' }
  },
  cherry: {
    primary: { background: 'var(--color-bg-cherry-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-cherry-base)', color: 'var(--color-font-cherry-base)' }
  },
  cyan: {
    primary: { background: 'var(--color-bg-cyan-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-cyan-base-alt)', color: 'var(--color-font-cyan-base)' }
  }
};

@Component({
  selector: 'oc-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="oc-avatar"
      [class]="'oc-avatar--' + size + ' ' + (className || '')"
      [ngStyle]="getStyles()"
      [attr.aria-label]="alt || name"
      role="img">
      <img 
        *ngIf="src && !imageError" 
        [src]="src" 
        [alt]="alt || name"
        (error)="onImageError()"
        class="oc-avatar__image">
      <i 
        *ngIf="(!src || imageError) && icon" 
        [class]="icon"
        class="oc-avatar__icon">
      </i>
      <span *ngIf="(!src || imageError) && !icon" class="oc-avatar__initials">
        {{ getInitials() }}
      </span>
    </div>
  `,
  styles: [`
    .oc-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      user-select: none;
      font-family: var(--font-family-base);
    }

    .oc-avatar--small {
      width: 24px;
      height: 24px;
      font-size: 10px;
      font-weight: 600;
      line-height: 1;
    }

    .oc-avatar--medium {
      width: 32px;
      height: 32px;
      font-size: 13px;
      font-weight: 600;
      line-height: 1;
    }

    .oc-avatar--large {
      width: 48px;
      height: 48px;
      font-size: 18px;
      font-weight: 600;
      line-height: 1;
    }

    .oc-avatar__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .oc-avatar__initials {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .oc-avatar__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  `]
})
export class AvatarComponent {
  @Input() name?: string;
  @Input() src?: string;
  @Input() icon?: string;
  @Input() size: AvatarSize = 'medium';
  @Input() variant: AvatarVariant = 'primary';
  @Input() avatarColor: AvatarColor = 'sage';
  @Input() className?: string;
  @Input() alt?: string;

  imageError = false;

  onImageError(): void {
    this.imageError = true;
  }

  getInitials(): string {
    if (!this.name) return '?';
    const parts = this.name.trim().split(/\s+/).slice(0, 2);
    return parts.map(p => p.charAt(0).toUpperCase()).join('') || '?';
  }

  getStyles(): Record<string, string> {
    const tokens = colorTokens[this.avatarColor as keyof typeof colorTokens];
    if (!tokens) {
      return {
        background: 'var(--color-bg-primary-lightest)',
        color: 'var(--color-font-primary-base)'
      };
    }

    const colors = tokens[this.variant];
    return {
      background: colors.background,
      color: colors.color
    };
  }
}

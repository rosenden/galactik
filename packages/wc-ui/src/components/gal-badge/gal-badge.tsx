import { Component, Host, Prop, h } from '@stencil/core';

type BadgeSize = 'xs' | 'sm' | 'lg';
type BadgeVariant = 'primary' | 'secondary';
type BadgeColor =
  | 'sage' | 'almond' | 'pink' | 'grey'
  | 'info' | 'error' | 'success' | 'warning'
  | 'indigo' | 'yellow' | 'cherry' | 'cyan'
  | 'orange' | 'green' | 'blue' | 'red';
type BadgeMode = 'number' | 'icon';

const sizeTokens: Record<BadgeSize, { padding: string; fontSize: string; width: string; height: string }> = {
  xs: { padding: '0', fontSize: '10px', width: '18px', height: '18px' },
  sm: { padding: '0', fontSize: '12px', width: '24px', height: '24px' },
  lg: { padding: '0', fontSize: '14px', width: '36px', height: '36px' }
};

const colorTokens: Record<
  Exclude<BadgeColor, 'orange' | 'green' | 'blue' | 'red'>,
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

const colorAliases: Partial<Record<BadgeColor, keyof typeof colorTokens>> = {
  orange: 'warning',
  green: 'success',
  blue: 'info',
  red: 'error'
};

@Component({
  tag: 'gal-badge',
  styleUrl: 'gal-badge.css',
  shadow: true
})
export class GalBadge {
  /** Number to display */
  @Prop() number?: number;
  /** Size of the badge */
  @Prop() size: BadgeSize = 'sm';
  /** Color variant */
  @Prop() color: BadgeColor = 'sage';
  /** Variant: primary (filled) or secondary (bordered) */
  @Prop() variant: BadgeVariant = 'primary';
  /** Mode: number or icon */
  @Prop() mode: BadgeMode = 'number';
  /** Icon class (Font Awesome) */
  @Prop() icon?: string;

  render() {
    const paletteKey = colorAliases[this.color] ?? this.color;
    const palette = colorTokens[paletteKey as keyof typeof colorTokens] ?? colorTokens.sage;
    const variantTokens = this.variant === 'secondary' ? palette.secondary : palette.primary;
    const sizing = sizeTokens[this.size];

    const labelText = this.number !== undefined ? String(this.number) : undefined;

    const badgeStyle = {
      background: variantTokens.background,
      color: variantTokens.color,
      borderColor: variantTokens.border,
      padding: sizing.padding,
      fontSize: sizing.fontSize,
      width: sizing.width,
      height: sizing.height
    };

    const renderContent = () => {
      if (this.mode === 'icon' && this.icon) {
        return (
          <span class="qa-badge__icon" aria-hidden="true">
            <i class={this.icon}></i>
          </span>
        );
      }
      return <span class="qa-badge__label">{labelText}</span>;
    };

    return (
      <Host>
        {this.icon && (
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        )}
        <span class="qa-badge" style={badgeStyle} role="status" aria-label={labelText ?? 'badge'}>
          {renderContent()}
        </span>
      </Host>
    );
  }
}

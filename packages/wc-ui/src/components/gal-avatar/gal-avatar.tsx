import { Component, Host, Prop, h } from '@stencil/core';

type Size = 'small' | 'medium' | 'large';
type AvatarVariant = 'primary' | 'secondary';
type AvatarColor =
  | 'sage' | 'almond' | 'pink' | 'grey'
  | 'info' | 'error' | 'success' | 'warning'
  | 'indigo' | 'yellow' | 'cherry' | 'cyan'
  | 'orange' | 'green' | 'blue' | 'red';
type Status = 'online' | 'away' | 'busy' | 'offline' | 'none';

// Color tokens structure - same as React Badge/Avatar
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

const colorAliases: Partial<Record<AvatarColor, keyof typeof colorTokens>> = {
  orange: 'warning',
  green: 'success',
  blue: 'info',
  red: 'error'
};

// Figma specs sizes
const sizeSpecs = {
  small: { width: '24px', height: '24px', fontSize: '10px', lineHeight: '1' },
  medium: { width: '32px', height: '32px', fontSize: '13px', lineHeight: '1' },
  large: { width: '48px', height: '48px', fontSize: '18px', lineHeight: '1' }
};

@Component({
  tag: 'gal-avatar',
  styleUrl: 'gal-avatar.css',
  shadow: true
})
export class GalAvatar {
  /** Full name used to generate initials */
  @Prop() name: string = '';
  /** Image URL */
  @Prop() src?: string;
  /** Font Awesome icon class (ex: "fas fa-user") */
  @Prop() icon?: string;
  /** Custom alt text */
  @Prop() alt?: string;
  /** Component size */
  @Prop() size: Size = 'medium';
  /** Variant: primary or secondary */
  @Prop() variant: AvatarVariant = 'primary';
  /** Avatar color (semantic tokens) */
  @Prop() avatarColor: AvatarColor = 'sage';
  /** Status displayed in the badge */
  @Prop() status: Status = 'none';

  private getInitials(): string {
    if (!this.name) return '?';
    const parts = this.name.trim().split(/\s+/).slice(0, 2);
    return parts.map(p => p.charAt(0).toUpperCase()).join('') || '?';
  }

  private getAlt(): string {
    if (this.alt) return this.alt;
    if (this.name) return `Avatar for ${this.name}`;
    if (this.icon) return 'Avatar with icon';
    return 'Avatar';
  }

  render() {
    const initials = this.getInitials();
    const sizing = sizeSpecs[this.size];
    
    // Get color tokens like React
    const paletteKey = colorAliases[this.avatarColor] ?? this.avatarColor;
    const palette = colorTokens[paletteKey as keyof typeof colorTokens] ?? colorTokens.sage;
    const variantTokens = this.variant === 'secondary' ? palette.secondary : palette.primary;
    
    const avatarStyle = {
      width: sizing.width,
      height: sizing.height,
      fontSize: sizing.fontSize,
      lineHeight: sizing.lineHeight,
      background: !this.src ? variantTokens.background : 'transparent',
      color: variantTokens.color
    };

    return (
      <Host>
        {this.icon && (
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        )}
        <div class="qa-avatar" style={avatarStyle} role="img" aria-label={this.getAlt()}>
          <div class="qa-avatar__clip">
            {this.src ? (
              <img class="qa-avatar__img" src={this.src} alt={this.getAlt()} />
            ) : this.icon ? (
              <i class={this.icon} aria-hidden="true"></i>
            ) : (
              <span aria-hidden="true">{initials}</span>
            )}
          </div>

          {this.status !== 'none' && (
            <span
              class={['qa-avatar__status', `qa-status--${this.status}`].join(' ')}
              aria-hidden="true"
            />
          )}
        </div>
      </Host>
    );
  }
}

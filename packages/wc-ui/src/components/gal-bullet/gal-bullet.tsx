import { Component, Host, Prop, h } from '@stencil/core';

type BulletSize = 'xsmall' | 'small' | 'medium';
type BulletVariant = 'primary' | 'secondary';
type BulletColor =
  | 'sage' | 'pink' | 'almond' | 'grey'
  | 'success' | 'warning' | 'info' | 'error';

const sizeTokens: Record<BulletSize, { width: string; height: string }> = {
  xsmall: { width: '6px', height: '6px' },
  small: { width: '10px', height: '10px' },
  medium: { width: '18px', height: '18px' }
};

const colorTokens: Record<
  BulletColor,
  { primary: Record<'background', string>; secondary: Record<'background', string> }
> = {
  sage: {
    primary: { background: 'var(--sage-800)' },
    secondary: { background: 'var(--sage-200)' }
  },
  pink: {
    primary: { background: 'var(--pink-950)' },
    secondary: { background: 'var(--pink-200)' }
  },
  almond: {
    primary: { background: 'var(--almond-800)' },
    secondary: { background: 'var(--almond-200)' }
  },
  grey: {
    primary: { background: 'var(--grey-800)' },
    secondary: { background: 'var(--grey-200)' }
  },
  success: {
    primary: { background: 'var(--green-800)' },
    secondary: { background: 'var(--green-200)' }
  },
  warning: {
    primary: { background: 'var(--orange-800)' },
    secondary: { background: 'var(--orange-200)' }
  },
  info: {
    primary: { background: 'var(--blue-800)' },
    secondary: { background: 'var(--blue-200)' }
  },
  error: {
    primary: { background: 'var(--red-800)' },
    secondary: { background: 'var(--red-200)' }
  }
};

@Component({
  tag: 'gal-bullet',
  styleUrl: 'gal-bullet.css',
  shadow: true
})
export class GalBullet {
  /** Size of the bullet: xsmall (6px), small (10px), medium (18px) */
  @Prop() size: BulletSize = 'small';
  /** Color theme based on semantic tokens */
  @Prop() color: BulletColor = 'sage';
  /** Variant: filled (primary) or light (secondary) */
  @Prop() variant: BulletVariant = 'primary';

  render() {
    const colorStyles = colorTokens[this.color];
    const sizeStyles = sizeTokens[this.size];

    // For xsmall, single circle only
    if (this.size === 'xsmall') {
      const bulletStyle = {
        ...sizeStyles,
        background: this.variant === 'secondary' ? colorStyles.secondary.background : colorStyles.primary.background,
        borderRadius: '50%',
        display: 'inline-block',
        flexShrink: '0'
      };

      return (
        <Host>
          <span
            class={`oc-bullet oc-bullet--${this.size} oc-bullet--${this.variant} oc-bullet--${this.color}`}
            style={bulletStyle}
            role="presentation"
            aria-hidden="true"
          />
        </Host>
      );
    }

    // For small and medium: concentric circles (outer + inner)
    const outerStyle = {
      ...sizeStyles,
      background: colorStyles.secondary.background,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',
      position: 'relative'
    };

    // Inner circle size based on Figma structure
    const innerSize = this.size === 'small' ? '6px' : '10px'; // small: 3px radius = 6px diameter, medium: 5px radius = 10px diameter
    
    const innerStyle = {
      width: innerSize,
      height: innerSize,
      background: colorStyles.primary.background,
      borderRadius: '50%'
    };

    return (
      <Host>
        <span
          class={`oc-bullet oc-bullet--${this.size} oc-bullet--${this.variant} oc-bullet--${this.color}`}
          style={outerStyle}
          role="presentation"
          aria-hidden="true"
        >
          <span style={innerStyle} />
        </span>
      </Host>
    );
  }
}

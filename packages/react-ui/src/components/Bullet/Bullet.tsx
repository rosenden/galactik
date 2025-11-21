import React from 'react';
import './bullet.css';
import bulletSpecs from '../../../../../scripts/figma/specs/bullet-specs.json';

/**
 * Bullet Component - Synchronized with Figma Design System
 * 
 * @example
 * ```tsx
 * import { Bullet } from '@galactik/react-ui/electrons/Bullet';
 * 
 * // Medium bullet (default)
 * <Bullet color="sage" size="medium" />
 * 
 * // Small bullet
 * <Bullet color="info" size="small" />
 * 
 * // Extra small bullet
 * <Bullet color="error" size="xsmall" />
 * 
 * // Different colors
 * <Bullet color="success" />
 * <Bullet color="warning" />
 * <Bullet color="pink" />
 * 
 * // In a list
 * <ul style={{ listStyle: 'none', padding: 0 }}>
 *   <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
 *     <Bullet color="success" size="small" />
 *     <span>List item 1</span>
 *   </li>
 *   <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
 *     <Bullet color="success" size="small" />
 *     <span>List item 2</span>
 *   </li>
 * </ul>
 * ```
 */

type BulletSize = 'xsmall' | 'small' | 'medium';
type BulletVariant = 'primary' | 'secondary';
type BulletColor =
  | 'sage'
  | 'pink'
  | 'almond'
  | 'grey'
  | 'success'
  | 'warning'
  | 'info'
  | 'error';

export interface BulletProps {
  /** Size of the bullet: xsmall (6px), small (10px), medium (18px) - from bullet-specs.json */
  size?: BulletSize;
  /** Color theme based on semantic tokens - from bullet-specs.json */
  color?: BulletColor;
  /** Variant: filled (primary) or light (secondary) - from bullet-specs.json */
  variant?: BulletVariant;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

// Size tokens from Figma extraction (bullet-specs.json)
const sizeTokens: Record<BulletSize, { width: string; height: string }> = {
  xsmall: { width: bulletSpecs.sizes.xsmall.width, height: bulletSpecs.sizes.xsmall.height },
  small: { width: bulletSpecs.sizes.small.width, height: bulletSpecs.sizes.small.height },
  medium: { width: bulletSpecs.sizes.medium.width, height: bulletSpecs.sizes.medium.height }
};

// Color tokens mapped to exact Figma palette tokens
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

export const Bullet: React.FC<BulletProps> = ({
  size = 'small',
  color = 'sage',
  variant = 'primary',
  className = '',
  onClick
}) => {
  const colorStyles = colorTokens[color];
  const sizeStyles = sizeTokens[size];

  // For xsmall, single circle only
  if (size === 'xsmall') {
    const bulletStyle: React.CSSProperties = {
      ...sizeStyles,
      background: variant === 'secondary' ? colorStyles.secondary.background : colorStyles.primary.background,
      borderRadius: '50%',
      display: 'inline-block',
      flexShrink: 0
    };

    return (
      <span
        className={`oc-bullet oc-bullet--${size} oc-bullet--${variant} oc-bullet--${color} ${className}`}
        style={bulletStyle}
        onClick={onClick}
        role="presentation"
        aria-hidden="true"
      />
    );
  }

  // For small and medium: concentric circles (outer + inner)
  const outerStyle: React.CSSProperties = {
    ...sizeStyles,
    background: colorStyles.secondary.background,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    position: 'relative'
  };

  // Inner circle size based on Figma structure
  const innerSize = size === 'small' ? '6px' : '10px'; // small: 3px radius = 6px diameter, medium: 5px radius = 10px diameter
  
  const innerStyle: React.CSSProperties = {
    width: innerSize,
    height: innerSize,
    background: colorStyles.primary.background,
    borderRadius: '50%'
  };

  return (
    <span
      className={`oc-bullet oc-bullet--${size} oc-bullet--${variant} oc-bullet--${color} ${className}`}
      style={outerStyle}
      onClick={onClick}
      role="presentation"
      aria-hidden="true"
    >
      <span style={innerStyle} />
    </span>
  );
};

export default Bullet;

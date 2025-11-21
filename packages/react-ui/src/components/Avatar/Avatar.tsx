import React, { ImgHTMLAttributes } from 'react';
import './avatar.css';
import avatarSpecs from '../../../../../scripts/figma/specs/avatar-specs.json';

/**
 * Avatar Component - Synchronized with Figma Design System via MCP
 * 
 * @example
 * ```tsx
 * import { Avatar } from '@galactik/react-ui/components/Avatar/Avatar';
 * 
 * // Avatar with initials (default Figma colors)
 * <Avatar name="Alice Smith" size="medium" />
 * 
 * // Avatar with custom Figma colors
 * <Avatar 
 *   name="Bob Jones" 
 *   size="large"
 *   background="#445556"
 *   color="#ffffff"
 * />
 * 
 * // Avatar with image
 * <Avatar 
 *   name="Clara White"
 *   src="https://example.com/photo.jpg"
 *   size="large"
 * />
 * 
 * // Avatar with border (Figma Frame header style)
 * <Avatar 
 *   name="David Brown"
 *   size="medium"
 *   background="#e8f0ee"
 *   color="#445556"
 *   strokeWeight={1}
 *   strokeColor="#445556"
 * />
 * 
 * // User profile with avatar
 * <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
 *   <Avatar name="Emma Wilson" size="large" />
 *   <div>
 *     <div style={{ fontWeight: 600 }}>Emma Wilson</div>
 *     <div style={{ fontSize: 12, color: '#666' }}>Designer</div>
 *   </div>
 * </div>
 * 
 * // Figma colors: sauge (#e8f0ee), saugeDark (#445556),
 * // grey (#f2f2f3), accent (#a9c1b8)
 * ```
 */

type AvatarSize = keyof typeof avatarSpecs.sizes;
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
type AvatarType = 'initials' | 'image' | 'icon';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  name?: string;
  src?: string;
  icon?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  avatarColor?: AvatarColor;
  className?: string;
  alt?: string;
}

/** Calculate "AB" from "Alice Bob" */
function getInitials(name?: string) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map(p => p.charAt(0).toUpperCase()).join('') || '?';
}

// Color tokens structure - same as Badge
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

/**
 * Avatar component synchronized with Figma design system
 * Extracted from Figma via MCP server (avatar-specs.json)
 * 
 * @example
 * ```tsx
 * // Avatar with initials and default Figma colors
 * <Avatar name="Alice Smith" size="medium" />
 * 
 * // Avatar with custom colors from Figma
 * <Avatar 
 *   name="Bob Jones" 
 *   size="large" 
 *   background="#445556" 
 *   color="#ffffff"
 *   strokeWeight={1}
 *   strokeColor="#445556"
 * />
 * 
 * // Avatar with image
 * <Avatar name="Emma Wilson" src="/images/emma.jpg" size="large" />
 * ```
 */
export const Avatar: React.FC<AvatarProps> = ({
  name = '',
  src,
  icon,
  alt,
  size = 'medium',
  variant = 'primary',
  avatarColor = 'sage',
  className,
  ...imgProps
}) => {
  const initials = getInitials(name);
  const sizing = avatarSpecs.sizes[size];
  const avatarType: AvatarType = src ? 'image' : icon ? 'icon' : 'initials';
  const computedAlt = alt ?? (name ? `Avatar de ${name}` : icon ? 'Avatar avec icône' : 'Avatar');

  // Couleurs basées sur les CSS variables comme Badge
  const paletteKey = colorAliases[avatarColor] ?? avatarColor;
  const palette = colorTokens[paletteKey as keyof typeof colorTokens] ?? colorTokens.sage;
  const variantTokens = variant === 'secondary' ? palette.secondary : palette.primary;
  
  const background = avatarType !== 'image' ? variantTokens.background : undefined;
  const textColor = avatarType !== 'image' ? variantTokens.color : undefined;

  const avatarStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizing.width,
    height: sizing.height,
    minWidth: sizing.width,
    minHeight: sizing.height,
    fontSize: sizing.fontSize,
    fontWeight: sizing.fontWeight,
    lineHeight: sizing.lineHeight,
    fontFamily: avatarType === 'initials' ? 'Hanken Grotesk, sans-serif' : undefined,
    borderRadius: sizing.borderRadius,
    background: avatarType !== 'image' ? background : 'transparent',
    color: textColor,
    overflow: 'hidden',
    userSelect: 'none',
    flexShrink: 0
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const iconStyle: React.CSSProperties = {
    fontSize: 'inherit',
    lineHeight: 'inherit'
  };

  const classes = ['qa-avatar', `qa-avatar--${size}`, `qa-avatar--${avatarType}`, className || ''].filter(Boolean).join(' ');

  return (
    <span className={classes} style={avatarStyle} role="img" aria-label={computedAlt}>
      {src ? (
        <img style={imgStyle} src={src} alt={computedAlt} {...imgProps} />
      ) : icon ? (
        <i className={icon} style={iconStyle} aria-hidden="true" />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  );
};

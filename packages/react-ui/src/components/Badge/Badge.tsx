import React from 'react';
import './badge.css';

/**
 * Badge Component - Synchronized with Figma Design System via MCP
 * 
 * @example
 * ```tsx
 * import Badge from '@galactik/react-ui/components/Badge';
 * import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 * 
 * // Badge with number (default mode)
 * <Badge label={5} color="sage" style="primary" size="sm" />
 * 
 * // Badge with custom colors
 * <Badge label={12} color="info" style="secondary" size="lg" />
 * 
 * // Badge with icon
 * <Badge 
 *   color="error" 
 *   style="primary" 
 *   size="lg"
 *   mode="icon"
 *   icon={<FontAwesomeIcon icon={['far', 'bell']} />}
 * />
 * 
 * // Badge in a user card
 * <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
 *   <span>Notifications</span>
 *   <Badge label={3} color="cherry" style="primary" size="xs" />
 * </div>
 * 
 * // All available colors:
 * // sage, almond, pink, grey, info, error, success, warning,
 * // indigo, yellow, cherry, cyan
 * ```
 */

type BadgeSize = 'xs' | 'sm' | 'lg' | 'small' | 'medium' | 'large';
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
  | 'cyan'
  | 'orange'
  | 'green'
  | 'blue'
  | 'red';

export interface BadgeProps {
  /** Texte affiché (doit être un nombre). Optionnel uniquement en mode icon. */
  label?: number;
  /** Size token (xs/sm/lg). Legacy aliases (small/medium/large) are accepted and mapped. */
  size?: BadgeSize;
  /** Color theme based on semantic tokens */
  color?: BadgeColor;
  /** Variant: filled (primary) or bordered (secondary) */
  style?: BadgeVariant;
  /** Show a leading icon */
  showIcon?: boolean;
  /** Show flag indicator (deprecated/unused) */
  showFlag?: boolean;
  /** Optional custom icon node (React component, FontAwesome icon, or JSX element) */
  icon?: React.ReactNode;
  /** Badge content mode: 'icon' (icon only) or 'number' (just number) */
  mode?: 'icon' | 'number' | 'text';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const sizeTokens: Record<'xs' | 'sm' | 'lg', { padding: string; fontSize: string }> = {
  xs: { padding: '0', fontSize: '10px' },  // 18px badge
  sm: { padding: '0', fontSize: '12px' },  // 24px badge
  lg: { padding: '0', fontSize: '14px' }   // 36px badge
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

const normalizeSize = (size: BadgeSize = 'sm'): 'xs' | 'sm' | 'lg' => {
  switch (size) {
    case 'xs':
    case 'small':
      return 'xs';
    case 'sm':
    case 'medium':
      return 'sm';
    case 'lg':
    case 'large':
    default:
      return 'lg';
  }
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      label,
      size = 'sm',
      color = 'sage',
      style = 'primary',
      showIcon = false,
      showFlag = false,
      icon,
      mode = 'text',
      className,
      onClick
    },
    ref
  ) => {
    const resolvedSize = normalizeSize(size);
    const paletteKey = colorAliases[color] ?? color;
    const palette = colorTokens[paletteKey as keyof typeof colorTokens] ?? colorTokens.sage;
    const variantTokens = style === 'secondary' ? palette.secondary : palette.primary;
    const sizing = sizeTokens[resolvedSize];

    const classes = ['qa-badge', `qa-badge--${resolvedSize}`, className || ''].join(' ').trim();
    const labelText = label !== undefined ? String(label) : undefined;

    // Determine content based on mode
    const renderContent = () => {
      switch (mode) {
        case 'icon':
          // Icon only mode
          return icon ? <span className="qa-badge__icon" aria-hidden="true">{icon}</span> : null;
        case 'number':
        default:
          // Just the number (label is the number)
          return <span className="qa-badge__label">{labelText}</span>;
      }
    };

    return (
      <span
        ref={ref}
        className={classes}
        style={{
          background: variantTokens.background,
          color: variantTokens.color,
          borderColor: variantTokens.border,
          padding: sizing.padding,
          fontSize: sizing.fontSize
        }}
        role="status"
        aria-label={labelText ?? 'badge'}
        onClick={onClick}
      >
        {renderContent()}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;

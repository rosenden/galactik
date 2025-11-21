import React, { forwardRef } from 'react';
import './button.css';
import buttonSpecs from '../../../../../scripts/figma/specs/button-specs.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLoader } from '@fortawesome/pro-regular-svg-icons';

/**
 * Button Component - Synchronized with Figma Design System
 * 
 * @example
 * ```tsx
 * import Button from '@galactik/react-ui/components/Button';
 * 
 * // Primary filled button
 * <Button variant="filled" colorVariant="primary" size="medium">
 *   Click me
 * </Button>
 * 
 * // Secondary outlined button with icon
 * <Button variant="outlined" colorVariant="secondary" iconLeft={<Icon />}>
 *   Save
 * </Button>
 * 
 * // Text button
 * <Button variant="text" colorVariant="primary" size="small">
 *   Cancel
 * </Button>
 * 
 * // Icon-only button
 * <Button variant="filled" colorVariant="accent" iconOnly>
 *   <Icon />
 * </Button>
 * 
 * // Disabled button
 * <Button variant="filled" colorVariant="primary" disabled>
 *   Disabled
 * </Button>
 * ```
 */

export type ButtonVariant = 'filled' | 'outlined' | 'text';
export type ButtonColorVariant = 'primary' | 'secondary' | 'light-accent' | 'accent';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Style variant of the button */
  variant?: ButtonVariant;
  /** Color theme of the button */
  colorVariant?: ButtonColorVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Icon to display on the left side */
  iconLeft?: React.ReactNode;
  /** Icon to display on the right side */
  iconRight?: React.ReactNode;
  /** If true, only shows icon without text */
  iconOnly?: boolean;
  /** If true, button is disabled */
  disabled?: boolean;
  /** If true, shows loading spinner */
  loading?: boolean;
  /** If true, button takes full width of container */
  fullWidth?: boolean;
  /** HTML button type */
  type?: ButtonType;
  /** Button content */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'filled',
  colorVariant = 'primary',
  size = 'medium',
  iconLeft,
  iconRight,
  iconOnly = false,
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  children,
  className = '',
  onClick,
  ...props
}, ref) => {
  
  const baseClass = 'oc-button';
  const variantClass = `${baseClass}--${variant}`;
  const colorClass = `${baseClass}--${colorVariant}`;
  const sizeClass = `${baseClass}--${size}`;
  const iconOnlyClass = iconOnly ? `${baseClass}--icon-only` : '';
  const fullWidthClass = fullWidth ? `${baseClass}--full-width` : '';
  const loadingClass = loading ? `${baseClass}--loading` : '';
  
  const classes = [
    baseClass,
    variantClass,
    colorClass,
    sizeClass,
    iconOnlyClass,
    fullWidthClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <span className={`${baseClass}__spinner`} aria-hidden="true">
          <FontAwesomeIcon icon={faLoader} className={`${baseClass}__spinner-icon`} />
        </span>
      )}
      {!loading && iconLeft && (
        <span className={`${baseClass}__icon ${baseClass}__icon--left`}>
          {iconLeft}
        </span>
      )}
      {!iconOnly && children && (
        <span className={`${baseClass}__label`}>
          {children}
        </span>
      )}
      {iconOnly && !loading && children}
      {!loading && iconRight && (
        <span className={`${baseClass}__icon ${baseClass}__icon--right`}>
          {iconRight}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;

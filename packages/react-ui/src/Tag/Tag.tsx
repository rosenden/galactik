import React from 'react';
import './Tag.css';

export interface TagProps {
  /**
   * Tag variant (from Figma: oc-tag-primary, oc-tag-secondary)
   */
  variant?: 'primary' | 'secondary';
  /**
   * Tag content
   */
  children: React.ReactNode;
  /**
   * Size of the tag (from Figma specs)
   * small: 18-24px height
   * medium: 36px height
   */
  size?: 'small' | 'medium';
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional icon before label
   */
  icon?: React.ReactNode;
  /**
   * Show close button
   */
  closable?: boolean;
  /**
   * Close button handler
   */
  onClose?: () => void;
  /**
   * Disabled state (from Figma disabled variant)
   */
  disabled?: boolean;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Tag component extracted from Figma "one chaps ui kit"
 * - oc-tag-primary: Uses sage colors (primary background)
 * - oc-tag-secondary: Uses almond colors (secondary background)
 * Implements Figma specs:
 * - Border radius: 9999px (fully rounded)
 * - Padding: 12px horizontal, 4px vertical (medium)
 * - Height: 36px (medium), 18-24px (small)
 */
export const Tag: React.FC<TagProps> = ({
  variant = 'primary',
  children,
  size = 'medium',
  onClick,
  icon,
  closable = false,
  onClose,
  disabled = false,
  className = '',
}) => {
  const baseClass = 'oc-tag';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--${size}`,
    onClick ? `${baseClass}--clickable` : '',
    disabled ? `${baseClass}--disabled` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onClose?.();
    }
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <span className={classes} onClick={handleClick}>
      {icon && <span className={`${baseClass}__icon`}>{icon}</span>}
      <span className={`${baseClass}__label`}>{children}</span>
      {closable && (
        <button
          type="button"
          className={`${baseClass}__close`}
          onClick={handleClose}
          disabled={disabled}
          aria-label="Close"
        >
          ×
        </button>
      )}
    </span>
  );
};

export default Tag;

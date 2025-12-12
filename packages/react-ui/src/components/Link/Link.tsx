import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRight } from '@fortawesome/pro-regular-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './Link.css';

export type LinkSize = 'sm' | 'md' | 'lg';

export interface LinkProps {
  /**
   * Link text content
   */
  children: React.ReactNode;
  /**
   * Target URL
   */
  href: string;
  /**
   * Link size
   * - sm: small (12px)
   * - md: medium (14px)
   * - lg: large (16px)
   * @default 'md'
   */
  size?: LinkSize;
  /**
   * Optional icon on the right (trailing)
   * Default is faArrowUpRight if not specified
   */
  icon?: IconDefinition | null;
  /**
   * Whether the link is disabled
   */
  disabled?: boolean;
  /**
   * Whether the link appears as visited
   */
  visited?: boolean;
  /**
   * Whether the link is active (current page)
   */
  active?: boolean;
  /**
   * Open link in new tab
   */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Click handler
   */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Link component from Figma "OneChaps UI kit"
 * States: default, hovered, pressed, visited, active, focused, disabled
 * 
 * Specifications from Figma oc-link:
 * - Font: Hanken Grotesk, weight 400 (regular)
 * - Sizes: sm (12px), md (14px), lg (16px)
 * - Colors: blue with text decoration underline
 * - States: default, hovered, pressed, visited, active, focused, disabled
 * - Icon: Right-aligned arrow icon
 */
export const Link: React.FC<LinkProps> = ({
  children,
  href,
  size = 'md',
  icon = faArrowUpRight,
  disabled = false,
  visited = false,
  active = false,
  target,
  className = '',
  onClick,
}) => {
  const baseClass = 'oc-link';
  const classes = [
    baseClass,
    `${baseClass}--${size}`,
    visited && `${baseClass}--visited`,
    active && `${baseClass}--active`,
    disabled && `${baseClass}--disabled`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <a
      className={classes}
      href={disabled ? undefined : href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      aria-disabled={disabled}
    >
      <span className={`${baseClass}__label`}>{children}</span>
      {icon && !disabled && (
        <FontAwesomeIcon icon={icon} className={`${baseClass}__icon`} />
      )}
    </a>
  );
};

export default Link;

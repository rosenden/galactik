import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './Tag.css';

// Country codes type for flag support
export type CountryCode = 'FR' | 'US' | 'GB' | 'DE' | 'ES' | 'IT' | 'JP' | 'CN' | 'CA' | 'AU' | 'BR' | 'IN' | 'RU' | 'MX' | 'KR' | 'NL' | 'SE' | 'CH' | 'BE' | 'AT' | 'PL' | 'NO' | 'DK' | 'FI' | 'IE' | 'PT' | 'GR' | 'CZ' | 'HU' | 'RO' | 'BG' | 'HR' | 'SK' | 'SI' | 'LT' | 'LV' | 'EE' | 'LU' | 'MT' | 'CY';

export type TagColor = 'sage' | 'pink' | 'almond' | 'grey' | 'yellow' | 'warning' | 'cherry' | 'success' | 'indigo' | 'info' | 'cyan' | 'error';
export type TagVariant = 'fill' | 'outline';
export type TagSize = 'xsmall' | 'small' | 'medium';

/**
 * Simple flag renderer using country code CSS class
 * This approach doesn't require external library and works with CSS flags
 */
const FlagIcon: React.FC<{ code: CountryCode; className?: string }> = ({ code, className = '' }) => (
  <span className={`flag flag-${code.toLowerCase()} ${className}`} title={code} />
);

export interface TagProps {
  /**
   * Tag color scheme (from Figma oc-tag variants)
   * Colors: sage, pink, almond, grey, yellow, warning, cherry, success, indigo, info, cyan, error
   * @default 'sage'
   */
  color?: TagColor;
  /**
   * Tag variant style
   * - fill: solid background (oc-tag-primary)
   * - outline: border only with colored text (oc-tag-secondary)
   * @default 'fill'
   */
  variant?: TagVariant;
  /**
   * Tag content/label
   */
  children: React.ReactNode;
  /**
   * Size of the tag (from Figma oc-tag component set)
   * - xsmall: 18px height
   * - small: 24px height (default)
   * - medium: 36px height
   * @default 'small'
   */
  size?: TagSize;
  /**
   * FontAwesome icon on the left side
   * Use icons from @fortawesome/pro-regular-svg-icons
   * @example iconLeft={faTag}
   */
  iconLeft?: IconDefinition;
  /**
   * FontAwesome icon on the right side (trailing icon)
   * Use icons from @fortawesome/pro-regular-svg-icons
   * @example iconRight={faChevronDown}
   */
  iconRight?: IconDefinition;
  /**
   * Country flag to display (ISO 3166-1 alpha-2 code)
   * Uses country-flag-icons library
   * @example flag="FR" flag="US" flag="GB"
   */
  flag?: CountryCode;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Tag component from Figma "OneChaps UI kit"
 * Synchronized via MCP extraction (2025-12-08)
 * 
 * Specifications from Figma oc-tag-primary and oc-tag-secondary:
 * - Fill variant (oc-tag-primary): 37 color + size combinations
 * - Outline variant (oc-tag-secondary): 37 color + size combinations
 * - Sizes: xsmall 18px, small 24px, medium 36px
 * - Colors: sage, pink, almond, grey, yellow, warning, cherry, success, indigo, info, cyan, error
 * - Border radius: 9999px (fully rounded pill)
 */
export const Tag: React.FC<TagProps> = ({
  color = 'sage',
  variant = 'fill',
  children,
  size = 'small',
  iconLeft,
  iconRight,
  flag,
  className = '',
}) => {
  const baseClass = 'oc-tag';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--${color}`,
    `${baseClass}--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {iconLeft && (
        <FontAwesomeIcon icon={iconLeft} className={`${baseClass}__icon ${baseClass}__icon--left`} />
      )}
      {flag && (
        <FlagIcon code={flag} className={`${baseClass}__flag`} />
      )}
      <span className={`${baseClass}__label`}>{children}</span>
      {iconRight && (
        <FontAwesomeIcon icon={iconRight} className={`${baseClass}__icon ${baseClass}__icon--right`} />
      )}
    </span>
  );
};

export default Tag;

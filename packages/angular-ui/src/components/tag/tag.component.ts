import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TagColor = 'sage' | 'pink' | 'almond' | 'grey' | 'yellow' | 'warning' | 'cherry' | 'success' | 'indigo' | 'info' | 'cyan' | 'error';
export type TagVariant = 'fill' | 'outline';
export type TagSize = 'xsmall' | 'small' | 'medium';
export type CountryCode = 'FR' | 'US' | 'GB' | 'DE' | 'ES' | 'IT' | 'JP' | 'CN' | 'CA' | 'AU' | 'BR' | 'IN' | 'RU' | 'MX' | 'KR' | 'NL' | 'SE' | 'CH' | 'BE' | 'AT' | 'PL' | 'NO' | 'DK' | 'FI' | 'IE' | 'PT' | 'GR' | 'CZ' | 'HU' | 'RO' | 'BG' | 'HR' | 'SK' | 'SI' | 'LT' | 'LV' | 'EE' | 'LU' | 'MT' | 'CY';

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
 * 
 * @example
 * ```html
 * <!-- Basic tag -->
 * <oc-tag color="sage">Label</oc-tag>
 * 
 * <!-- Tag with left icon -->
 * <oc-tag color="success" iconLeft="fa-solid fa-check">
 *   Verified
 * </oc-tag>
 * 
 * <!-- Tag with right icon -->
 * <oc-tag color="indigo" variant="outline" iconRight="fa-solid fa-chevron-down">
 *   Dropdown
 * </oc-tag>
 * 
 * <!-- Tag with both icons -->
 * <oc-tag color="info" iconLeft="fa-solid fa-tag" iconRight="fa-solid fa-chevron-down">
 *   Tagged
 * </oc-tag>
 * 
 * <!-- Tag with flag -->
 * <oc-tag color="info" flag="FR">France</oc-tag>
 * 
 * <!-- Icons + Flag -->
 * <oc-tag color="warning" iconLeft="fa-solid fa-triangle-exclamation" flag="US">
 *   US Alert
 * </oc-tag>
 * ```
 */
@Component({
  selector: 'oc-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent {
  /**
   * Tag color scheme (from Figma oc-tag variants)
   * Colors: sage, pink, almond, grey, yellow, warning, cherry, success, indigo, info, cyan, error
   * @default 'sage'
   */
  @Input() color: TagColor = 'sage';

  /**
   * Tag variant style
   * - fill: solid background (oc-tag-primary)
   * - outline: border only with colored text (oc-tag-secondary)
   * @default 'fill'
   */
  @Input() variant: TagVariant = 'fill';

  /**
   * Size of the tag (from Figma oc-tag component set)
   * - xsmall: 18px height
   * - small: 24px height (default)
   * - medium: 36px height
   * @default 'small'
   */
  @Input() size: TagSize = 'small';

  /**
   * FontAwesome icon class on the left side
   * Use Font Awesome classes like "fa-solid fa-tag"
   * @example iconLeft="fa-solid fa-tag"
   */
  @Input() iconLeft?: string;

  /**
   * FontAwesome icon class on the right side (trailing icon)
   * Use Font Awesome classes like "fa-solid fa-chevron-down"
   * @example iconRight="fa-solid fa-chevron-down"
   */
  @Input() iconRight?: string;

  /**
   * Country flag to display (ISO 3166-1 alpha-2 code)
   * Uses emoji flags
   * @example flag="FR" flag="US" flag="GB"
   */
  @Input() flag?: CountryCode;

  /**
   * Additional CSS class
   */
  @Input() className?: string;

  get classes(): string {
    const baseClass = 'oc-tag';
    return [
      baseClass,
      `${baseClass}--${this.variant}`,
      `${baseClass}--${this.color}`,
      `${baseClass}--${this.size}`,
      this.className || '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get flagClass(): string {
    return this.flag ? `flag flag-${this.flag.toLowerCase()}` : '';
  }
}

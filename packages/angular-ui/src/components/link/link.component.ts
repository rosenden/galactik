import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LinkSize = 'sm' | 'md' | 'lg';

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
 * 
 * @example
 * ```html
 * <!-- Basic link (default with arrow icon) -->
 * <oc-link href="https://example.com">
 *   Link label
 * </oc-link>
 * 
 * <!-- Different sizes -->
 * <oc-link size="sm" href="https://example.com">Small link</oc-link>
 * <oc-link size="md" href="https://example.com">Medium link</oc-link>
 * <oc-link size="lg" href="https://example.com">Large link</oc-link>
 * 
 * <!-- With custom icons -->
 * <oc-link href="https://example.com" icon="fa-solid fa-external-link" target="_blank">
 *   External link
 * </oc-link>
 * 
 * <!-- Without icon -->
 * <oc-link href="https://example.com" [icon]="null">
 *   No icon
 * </oc-link>
 * 
 * <!-- Visited state -->
 * <oc-link href="https://visited.com" [visited]="true">
 *   Visited link
 * </oc-link>
 * 
 * <!-- Disabled -->
 * <oc-link href="https://example.com" [disabled]="true">
 *   Disabled link
 * </oc-link>
 * ```
 */
@Component({
  selector: 'oc-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent {
  /**
   * Target URL
   */
  @Input() href: string = '';

  /**
   * Link size
   * - sm: small (12px)
   * - md: medium (14px)
   * - lg: large (16px)
   * @default 'md'
   */
  @Input() size: LinkSize = 'md';

  /**
   * Optional icon on the right (trailing)
   * Defaults to "fa-solid fa-arrow-up-right" if not specified
   * Set to empty string or null to hide icon
   */
  @Input() icon?: string | null;

  /**
   * Whether the link is disabled
   */
  @Input() disabled: boolean = false;

  /**
   * Whether the link appears as visited
   */
  @Input() visited: boolean = false;

  /**
   * Whether the link is active (current page)
   */
  @Input() active: boolean = false;

  /**
   * Open link in new tab
   */
  @Input() target?: '_blank' | '_self' | '_parent' | '_top';

  /**
   * Additional CSS class
   */
  @Input() className?: string;

  get classes(): string {
    const baseClass = 'oc-link';
    return [
      baseClass,
      `${baseClass}--${this.size}`,
      this.visited && `${baseClass}--visited`,
      this.active && `${baseClass}--active`,
      this.disabled && `${baseClass}--disabled`,
      this.className || '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get hrefValue(): string | undefined {
    return this.disabled ? undefined : this.href;
  }

  get relValue(): string | undefined {
    return this.target === '_blank' ? 'noopener noreferrer' : undefined;
  }

  get shouldShowIcon(): boolean {
    // Show icon by default (undefined), or if explicitly set to a value
    // Hide icon only if explicitly set to null or empty string, or if disabled
    if (this.disabled) return false;
    if (this.icon === null || this.icon === '') return false;
    return true; // undefined or string value
  }
  
  get displayIcon(): string {
    // If icon is undefined (not set), use default arrow
    // If icon is set to a value, use that value
    // If icon is null or empty string, this won't be called because shouldShowIcon is false
    if (this.icon === undefined || this.icon === null) {
      return 'fa-solid fa-arrow-up-right';
    }
    return this.icon;
  }

  get iconClasses(): string {
    return `${this.displayIcon} oc-link__icon`;
  }

  handleClick(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
    }
  }
}

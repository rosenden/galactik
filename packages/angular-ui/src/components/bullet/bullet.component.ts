import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Bullet Component - Synchronized with Figma Design System
 * 
 * @example
 * ```html
 * <!-- Medium bullet (default) -->
 * <oc-bullet color="sage" size="medium"></oc-bullet>
 * 
 * <!-- Small bullet -->
 * <oc-bullet color="info" size="small"></oc-bullet>
 * 
 * <!-- Extra small bullet -->
 * <oc-bullet color="error" size="xsmall"></oc-bullet>
 * 
 * <!-- In a list -->
 * <ul style="list-style: none; padding: 0">
 *   <li style="display: flex; align-items: center; gap: 8px">
 *     <oc-bullet color="success" size="small"></oc-bullet>
 *     <span>List item 1</span>
 *   </li>
 *   <li style="display: flex; align-items: center; gap: 8px">
 *     <oc-bullet color="success" size="small"></oc-bullet>
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

// Color tokens mapped to exact Figma palette tokens (matching React)
const colorTokens: Record<
  BulletColor,
  { primary: string; secondary: string }
> = {
  sage: {
    primary: 'var(--sage-800)',
    secondary: 'var(--sage-200)'
  },
  pink: {
    primary: 'var(--pink-950)',
    secondary: 'var(--pink-200)'
  },
  almond: {
    primary: 'var(--almond-800)',
    secondary: 'var(--almond-200)'
  },
  grey: {
    primary: 'var(--grey-800)',
    secondary: 'var(--grey-200)'
  },
  success: {
    primary: 'var(--green-800)',
    secondary: 'var(--green-200)'
  },
  warning: {
    primary: 'var(--orange-800)',
    secondary: 'var(--orange-200)'
  },
  info: {
    primary: 'var(--blue-800)',
    secondary: 'var(--blue-200)'
  },
  error: {
    primary: 'var(--red-800)',
    secondary: 'var(--red-200)'
  }
};

@Component({
  selector: 'oc-bullet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- xsmall: single circle -->
    <span 
      *ngIf="size === 'xsmall'"
      class="oc-bullet oc-bullet--xsmall oc-bullet--{{variant}} oc-bullet--{{color}}"
      [ngStyle]="getXSmallStyle()"
      role="presentation"
      aria-hidden="true">
    </span>

    <!-- small/medium: concentric circles (outer + inner) -->
    <span 
      *ngIf="size !== 'xsmall'"
      class="oc-bullet oc-bullet--{{size}} oc-bullet--{{variant}} oc-bullet--{{color}}"
      [ngStyle]="getOuterStyle()"
      role="presentation"
      aria-hidden="true">
      <span [ngStyle]="getInnerStyle()"></span>
    </span>
  `,
  styles: [`
    /**
     * Bullet Component Styles
     * Synchronized with Figma Design System
     * Sizes: xsmall (6px), small (10px), medium (18px)
     */

    .oc-bullet {
      box-sizing: border-box;
      transition: all 0.2s ease-in-out;
    }

    .oc-bullet--xsmall {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      display: inline-block;
      flex-shrink: 0;
    }

    .oc-bullet--small {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      position: relative;
    }

    .oc-bullet--medium {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      position: relative;
    }

    /* Interactive state */
    .oc-bullet[onclick]:hover {
      opacity: 0.8;
      cursor: pointer;
    }

    .oc-bullet[onclick]:active {
      transform: scale(0.95);
    }
  `]
})
export class BulletComponent {
  @Input() color: BulletColor = 'sage';
  @Input() variant: BulletVariant = 'primary';
  @Input() size: BulletSize = 'small';
  @Input() className?: string;

  // For xsmall: single circle
  getXSmallStyle(): Record<string, string> {
    const tokens = colorTokens[this.color];
    const background = this.variant === 'secondary' ? tokens.secondary : tokens.primary;
    
    return {
      background,
      width: '6px',
      height: '6px'
    };
  }

  // For small/medium: outer circle (light color)
  getOuterStyle(): Record<string, string> {
    const tokens = colorTokens[this.color];
    const width = this.size === 'small' ? '10px' : '18px';
    const height = this.size === 'small' ? '10px' : '18px';
    
    return {
      background: tokens.secondary,
      width,
      height
    };
  }

  // For small/medium: inner circle (dark color)
  getInnerStyle(): Record<string, string> {
    const tokens = colorTokens[this.color];
    const innerSize = this.size === 'small' ? '6px' : '10px';
    
    return {
      width: innerSize,
      height: innerSize,
      background: tokens.primary,
      borderRadius: '50%'
    };
  }
}

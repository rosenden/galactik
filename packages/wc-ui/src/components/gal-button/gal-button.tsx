import { Component, Host, Prop, h, Element } from '@stencil/core';

type ButtonVariant = 'filled' | 'outlined' | 'text';
type ButtonColorVariant = 'primary' | 'secondary' | 'light-accent' | 'accent';
type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  tag: 'gal-button',
  styleUrl: 'gal-button.css',
  shadow: true
})
export class GalButton {
  @Element() el!: HTMLElement;

  /** Style variant of the button */
  @Prop() variant: ButtonVariant = 'filled';
  /** Color theme of the button */
  @Prop() colorVariant: ButtonColorVariant = 'primary';
  /** Size of the button */
  @Prop() size: ButtonSize = 'medium';
  /** If true, button is disabled */
  @Prop() disabled: boolean = false;
  /** If true, shows loading spinner */
  @Prop() loading: boolean = false;
  /** If true, button takes full width */
  @Prop() fullWidth: boolean = false;
  /** HTML button type */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  /** If true, only shows icon without text */
  @Prop() iconOnly: boolean = false;

  private hasIcons(): boolean {
    // Always load Font Awesome if loading state (for loader icon)
    if (this.loading) return true;
    
    const iconLeftSlot = this.el.querySelector('[slot="icon-left"]');
    const iconRightSlot = this.el.querySelector('[slot="icon-right"]');
    const defaultSlot = this.el.childNodes;
    
    // Check if any slot has Font Awesome icons
    if (iconLeftSlot || iconRightSlot) return true;
    
    // Check default slot for icon-only buttons
    if (this.iconOnly) {
      for (let i = 0; i < defaultSlot.length; i++) {
        const node = defaultSlot[i];
        if (node.nodeType === 1) { // Element node
          const element = node as Element;
          if (element.tagName === 'I' || element.classList.contains('fa')) {
            return true;
          }
        }
      }
    }
    
    return false;
  }

  render() {
    const baseClass = 'oc-button';
    const classes = [
      baseClass,
      `${baseClass}--${this.variant}`,
      `${baseClass}--${this.colorVariant}`,
      `${baseClass}--${this.size}`,
      this.iconOnly ? `${baseClass}--icon-only` : '',
      this.fullWidth ? `${baseClass}--full-width` : '',
      this.loading ? `${baseClass}--loading` : ''
    ].filter(Boolean).join(' ');

    const loadFontAwesome = this.hasIcons();

    return (
      <Host>
        {loadFontAwesome && (
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        )}
        <button
          type={this.type}
          class={classes}
          disabled={this.disabled || this.loading}
        >
          {this.loading && (
            <span class={`${baseClass}__spinner`} aria-hidden="true">
              <i class={`fa-solid fa-spinner ${baseClass}__spinner-icon`}></i>
            </span>
          )}
          {!this.loading && (
            <slot name="icon-left"></slot>
          )}
          {!this.iconOnly && (
            <span class={`${baseClass}__label`}>
              <slot></slot>
            </span>
          )}
          {this.iconOnly && !this.loading && (
            <slot></slot>
          )}
          {!this.loading && (
            <slot name="icon-right"></slot>
          )}
        </button>
      </Host>
    );
  }
}

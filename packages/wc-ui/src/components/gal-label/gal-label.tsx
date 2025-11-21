import { Component, Element, Host, Prop, State, h } from '@stencil/core';

type LabelSize = 'small' | 'medium';
type LabelColor = 'sage' | 'black' | 'success' | 'error' | 'warning' | 'info';

@Component({
  tag: 'gal-label',
  styleUrl: 'gal-label.css',
  shadow: true
})
export class GalLabel {
  @Element() el!: HTMLElement;

  /** Text rendered inside the label (fallback when no slot) */
  @Prop() text: string = 'Label';
  /** Label size */
  @Prop() size: LabelSize = 'medium';
  /** Palette aligned with the React implementation */
  @Prop() color: LabelColor = 'sage';
  /** Optional Font Awesome class for the icon */
  @Prop() icon?: string;

  @State() hasIconSlot = false;
  @State() hasTextSlot = false;

  private handleIconSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;
    this.hasIconSlot = !!slot && slot.assignedNodes().length > 0;
  };

  private handleTextSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;
    this.hasTextSlot = !!slot && slot.assignedNodes().length > 0;
  };

  private hasProjectedIcon(): boolean {
    if (this.hasIconSlot) return true;
    if (!this.el) return false;
    return !!this.el.querySelector('[slot="icon"]');
  }

  private hasDefaultTextNodes(): boolean {
    if (!this.el) return false;
    const childNodes = Array.from(this.el.childNodes);
    return childNodes.some((node) => {
      if (node.nodeType === 1) {
        const element = node as Element;
        return !element.hasAttribute('slot');
      }
      return Boolean(node.textContent && node.textContent.trim().length);
    });
  }

  private shouldLoadFontAwesome(showIcon: boolean): boolean {
    return showIcon;
  }

  render() {
    const baseClass = 'oc-label';
    const classes = [
      baseClass,
      `${baseClass}--${this.size}`,
      `${baseClass}--${this.color}`,
      `${baseClass}--default`
    ]
      .filter(Boolean)
      .join(' ');

    const hasProjectedIcon = this.hasProjectedIcon();
    const showIcon = Boolean(this.icon) || hasProjectedIcon;
    const shouldLoadFA = this.shouldLoadFontAwesome(showIcon);
    const hasCustomText = this.hasTextSlot || this.hasDefaultTextNodes();

    return (
      <Host>
        {showIcon && shouldLoadFA && (
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          />
        )}
        <span class={classes}>
          {showIcon && (
            <span class="oc-label__icon" aria-hidden="true">
              {this.icon && <i class={this.icon}></i>}
              <slot name="icon" onSlotchange={this.handleIconSlotChange}></slot>
            </span>
          )}
          <span class="oc-label__text">
            <slot onSlotchange={this.handleTextSlotChange}></slot>
            {!hasCustomText && this.text}
          </span>
        </span>
      </Host>
    );
  }
}

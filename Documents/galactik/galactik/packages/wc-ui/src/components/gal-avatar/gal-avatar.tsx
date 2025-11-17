import { Component, Host, Prop, h } from '@stencil/core';

type Size = 'sm' | 'md' | 'lg';
type Variant =
  | 'primary' | 'primaryLight' | 'secondary'
  | 'accent' | 'accentSoft' | 'cherry'
  | 'success' | 'warning' | 'info' | 'error'
  | 'indigo' | 'indigoAlt' | 'neutralDark'
  | 'yellow' | 'cyan';
type Status = 'online' | 'away' | 'busy' | 'offline' | 'none';

@Component({
  tag: 'gal-avatar',
  styleUrl: 'gal-avatar.css',
  shadow: true
})
export class GalAvatar {
  /** Nom complet utilisé pour générer les initiales */
  @Prop() name: string = 'Alex Doe';
  /** URL de l’image */
  @Prop() src?: string;
  /** Texte alternatif personnalisé */
  @Prop() alt?: string;
  /** Taille du composant */
  @Prop() size: Size = 'md';
  /** Variante sémantique */
  @Prop() variant: Variant = 'primary';
  /** Statut affiché dans la pastille */
  @Prop() status: Status = 'none';

  private getInitials(): string {
    if (!this.name) return '??';
    return this.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('') || '??';
  }

  private getAlt(): string {
    if (this.alt) return this.alt;
    if (this.name) return `Avatar de ${this.name}`;
    return 'Avatar';
  }

  render() {
    const classes = [
      'qa-avatar',
      `qa-avatar--${this.size}`,
      `qa-avatar--${this.variant}`
    ].join(' ');

    return (
      <Host>
        <div class={classes} role="img" aria-label={this.getAlt()}>
          <div class="qa-avatar__clip">
            {this.src ? (
              <img class="qa-avatar__img" src={this.src} alt={this.getAlt()} />
            ) : (
              <span aria-hidden="true">{this.getInitials()}</span>
            )}
          </div>

          {this.status !== 'none' && (
            <span
              class={['qa-avatar__status', `qa-status--${this.status}`].join(' ')}
              aria-hidden="true"
            />
          )}
        </div>
      </Host>
    );
  }
}

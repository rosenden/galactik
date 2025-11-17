import { Component, Input, computed, Signal, effect } from '@angular/core';

type Size = 'sm' | 'md' | 'lg';
type Variant =
  | 'primary' | 'primaryLight' | 'secondary'
  | 'accent' | 'accentSoft' | 'cherry'
  | 'success' | 'warning' | 'info' | 'error'
  | 'indigo' | 'indigoAlt' | 'neutralDark' | 'yellow' | 'cyan';
type Status = 'online' | 'away' | 'busy' | 'offline' | 'none';

@Component({
  selector: 'qa-avatar',
  standalone: true,
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  host: {
    class: 'qa-avatar',
    role: 'img',
    '[attr.aria-label]': 'ariaLabel()',
    // tailles
    '[class.qa-avatar--sm]': 'size==="sm"',
    '[class.qa-avatar--md]': 'size==="md"',
    '[class.qa-avatar--lg]': 'size==="lg"',
    // variants
    '[class.qa-avatar--primary]': 'variant==="primary"',
    '[class.qa-avatar--primaryLight]': 'variant==="primaryLight"',
    '[class.qa-avatar--secondary]': 'variant==="secondary"',
    '[class.qa-avatar--accent]': 'variant==="accent"',
    '[class.qa-avatar--accentSoft]': 'variant==="accentSoft"',
    '[class.qa-avatar--cherry]': 'variant==="cherry"',
    '[class.qa-avatar--success]': 'variant==="success"',
    '[class.qa-avatar--warning]': 'variant==="warning"',
    '[class.qa-avatar--info]': 'variant==="info"',
    '[class.qa-avatar--error]': 'variant==="error"',
    '[class.qa-avatar--indigo]': 'variant==="indigo"',
    '[class.qa-avatar--indigoAlt]': 'variant==="indigoAlt"',
    '[class.qa-avatar--neutralDark]': 'variant==="neutralDark"',
    '[class.qa-avatar--yellow]': 'variant==="yellow"',
    '[class.qa-avatar--cyan]': 'variant==="cyan"',
  }
})
export class AvatarComponent {
  /** Nom complet → initiales + accessibilité */
  @Input() name?: string;
  /** URL de l’image ; si absent => fallback initiales */
  @Input() src?: string;
  /** Taille */
  @Input() size: Size = 'md';
  /** Variante sémantique */
  @Input() variant: Variant = 'primary';
  /** Pastille de statut */
  @Input() status: Status = 'none';
  /** Texte alternatif (sinon dérivé du nom) */
  @Input() alt?: string;

  initials(): string {
    const n = (this.name ?? '').trim();
    if (!n) return '??';
    const parts = n.split(/\s+/).slice(0, 2);
    const init = parts.map(p => p.charAt(0).toUpperCase()).join('');
    return init || '??';
  }

  ariaLabel(): string {
    return this.alt ?? (this.name ? `Avatar de ${this.name}` : 'Avatar');
  }
}

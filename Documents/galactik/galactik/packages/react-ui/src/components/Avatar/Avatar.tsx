import React, { ImgHTMLAttributes } from 'react';
import './avatar.css';

type Size = 'sm' | 'md' | 'lg';
type Variant =
  | 'primary' | 'primaryLight' | 'secondary'
  | 'accent' | 'accentSoft' | 'cherry'
  | 'success' | 'warning' | 'info' | 'error'
  | 'indigo' | 'indigoAlt' | 'neutralDark'
  | 'yellow' | 'cyan';

type Status = 'online' | 'away' | 'busy' | 'offline' | 'none';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  /** Nom complet utilisé pour les initiales et l’accessibilité */
  name?: string;
  /** URL de l’image (si vide → fallback initiales) */
  src?: string;
  /** Taille (sm/md/lg) mappée sur --row-h-* */
  size?: Size;
  /** Variante de couleur sémantique */
  variant?: Variant;
  /** Pastille de statut */
  status?: Status;
}

/** Calcule "AB" à partir de "Alice Bob" */
function getInitials(name?: string) {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map(p => p.charAt(0).toUpperCase()).join('') || '??';
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  alt,
  size = 'md',
  variant = 'primary',
  status = 'none',
  className,
  ...imgProps
}) => {
  const initials = getInitials(name);
  const classes = [
    'qa-avatar',
    `qa-avatar--${size}`,
    `qa-avatar--${variant}`,
    className || ''
  ].join(' ').trim();

  // Accessibilité: alt prioritaire, sinon dérivé du nom
  const computedAlt = alt ?? (name ? `Avatar de ${name}` : 'Avatar');

  return (
  <div className={classes} role="img" aria-label={computedAlt}>
    <div className="qa-avatar__clip">
      {src ? (
        <img className="qa-avatar__img" src={src} alt={computedAlt} {...imgProps} />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </div>

    {status !== 'none' && (
      <span className={['qa-avatar__status', `qa-status--${status}`].join(' ')} aria-hidden="true" />
    )}
  </div>
);
};

export default Avatar;

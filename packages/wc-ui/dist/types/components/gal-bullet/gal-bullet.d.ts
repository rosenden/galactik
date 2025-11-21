type BulletSize = 'xsmall' | 'small' | 'medium';
type BulletVariant = 'primary' | 'secondary';
type BulletColor = 'sage' | 'pink' | 'almond' | 'grey' | 'success' | 'warning' | 'info' | 'error';
export declare class GalBullet {
  /** Size of the bullet: xsmall (6px), small (10px), medium (18px) */
  size: BulletSize;
  /** Color theme based on semantic tokens */
  color: BulletColor;
  /** Variant: filled (primary) or light (secondary) */
  variant: BulletVariant;
  render(): any;
}
export {};

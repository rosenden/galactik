import type { Components, JSX } from "../types/components";

interface GalBullet extends Components.GalBullet, HTMLElement {}
export const GalBullet: {
  prototype: GalBullet;
  new (): GalBullet;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

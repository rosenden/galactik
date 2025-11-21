import type { Components, JSX } from "../types/components";

interface GalBadge extends Components.GalBadge, HTMLElement {}
export const GalBadge: {
  prototype: GalBadge;
  new (): GalBadge;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

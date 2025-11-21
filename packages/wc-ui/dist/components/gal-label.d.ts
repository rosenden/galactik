import type { Components, JSX } from "../types/components";

interface GalLabel extends Components.GalLabel, HTMLElement {}
export const GalLabel: {
  prototype: GalLabel;
  new (): GalLabel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

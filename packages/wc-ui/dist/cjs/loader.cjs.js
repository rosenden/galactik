'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4533a219.js');

/*
 Stencil Client Patch Esm v3.4.2 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["gal-avatar.cjs",[[1,"gal-avatar",{"name":[1],"src":[1],"icon":[1],"alt":[1],"size":[1],"variant":[1],"avatarColor":[1,"avatar-color"],"status":[1]}]]],["gal-badge.cjs",[[1,"gal-badge",{"number":[2],"size":[1],"color":[1],"variant":[1],"mode":[1],"icon":[1]}]]],["gal-bullet.cjs",[[1,"gal-bullet",{"size":[1],"color":[1],"variant":[1]}]]],["gal-button.cjs",[[1,"gal-button",{"variant":[1],"colorVariant":[1,"color-variant"],"size":[1],"disabled":[4],"loading":[4],"fullWidth":[4,"full-width"],"type":[1],"iconOnly":[4,"icon-only"]}]]],["gal-checkbox.cjs",[[1,"gal-checkbox",{"checked":[1540],"indeterminate":[516],"disabled":[4],"label":[1],"name":[1],"value":[1],"isFocused":[32],"isKeyboardFocus":[32],"hasLabelSlot":[32]}]]],["gal-label.cjs",[[1,"gal-label",{"text":[1],"size":[1],"color":[1],"icon":[1],"hasIconSlot":[32],"hasTextSlot":[32]}]]]], options);
  });
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map
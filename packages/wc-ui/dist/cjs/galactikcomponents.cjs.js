'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4533a219.js');

/*
 Stencil Client Patch Browser v3.4.2 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('galactikcomponents.cjs.js', document.baseURI).href));
    const opts = {};
    // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
        // TODO(STENCIL-661): Remove code related to the dynamic import shim
        // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["gal-avatar.cjs",[[1,"gal-avatar",{"name":[1],"src":[1],"icon":[1],"alt":[1],"size":[1],"variant":[1],"avatarColor":[1,"avatar-color"],"status":[1]}]]],["gal-badge.cjs",[[1,"gal-badge",{"number":[2],"size":[1],"color":[1],"variant":[1],"mode":[1],"icon":[1]}]]],["gal-bullet.cjs",[[1,"gal-bullet",{"size":[1],"color":[1],"variant":[1]}]]],["gal-button.cjs",[[1,"gal-button",{"variant":[1],"colorVariant":[1,"color-variant"],"size":[1],"disabled":[4],"loading":[4],"fullWidth":[4,"full-width"],"type":[1],"iconOnly":[4,"icon-only"]}]]],["gal-checkbox.cjs",[[1,"gal-checkbox",{"checked":[1540],"indeterminate":[516],"disabled":[4],"label":[1],"name":[1],"value":[1],"isFocused":[32],"isKeyboardFocus":[32],"hasLabelSlot":[32]}]]],["gal-label.cjs",[[1,"gal-label",{"text":[1],"size":[1],"color":[1],"icon":[1],"hasIconSlot":[32],"hasTextSlot":[32]}]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=galactikcomponents.cjs.js.map
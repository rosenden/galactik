import { p as promiseResolve, b as bootstrapLazy } from './index-6872cf30.js';
export { s as setNonce } from './index-6872cf30.js';

/*
 Stencil Client Patch Browser v3.4.2 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
        // TODO(STENCIL-661): Remove code related to the dynamic import shim
        // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["gal-avatar",[[1,"gal-avatar",{"name":[1],"src":[1],"icon":[1],"alt":[1],"size":[1],"variant":[1],"avatarColor":[1,"avatar-color"],"status":[1]}]]],["gal-badge",[[1,"gal-badge",{"number":[2],"size":[1],"color":[1],"variant":[1],"mode":[1],"icon":[1]}]]],["gal-bullet",[[1,"gal-bullet",{"size":[1],"color":[1],"variant":[1]}]]],["gal-button",[[1,"gal-button",{"variant":[1],"colorVariant":[1,"color-variant"],"size":[1],"disabled":[4],"loading":[4],"fullWidth":[4,"full-width"],"type":[1],"iconOnly":[4,"icon-only"]}]]],["gal-checkbox",[[1,"gal-checkbox",{"checked":[1540],"indeterminate":[516],"disabled":[4],"label":[1],"name":[1],"value":[1],"isFocused":[32],"isKeyboardFocus":[32],"hasLabelSlot":[32]}]]],["gal-label",[[1,"gal-label",{"text":[1],"size":[1],"color":[1],"icon":[1],"hasIconSlot":[32],"hasTextSlot":[32]}]]]], options);
});

//# sourceMappingURL=galactikcomponents.js.map
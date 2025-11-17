'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ddef10f9.js');

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
  return index.bootstrapLazy([["gal-avatar.cjs",[[1,"gal-avatar",{"name":[1],"src":[1],"alt":[1],"size":[1],"variant":[1],"status":[1]}]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=galactikcomponents.cjs.js.map
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ddef10f9.js');

/*
 Stencil Client Patch Esm v3.4.2 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["gal-avatar.cjs",[[1,"gal-avatar",{"name":[1],"src":[1],"alt":[1],"size":[1],"variant":[1],"status":[1]}]]]], options);
  });
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map
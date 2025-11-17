import { p as promiseResolve, b as bootstrapLazy } from './index-5172b2ee.js';
export { s as setNonce } from './index-5172b2ee.js';

/*
 Stencil Client Patch Esm v3.4.2 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["gal-avatar",[[1,"gal-avatar",{"name":[1],"src":[1],"alt":[1],"size":[1],"variant":[1],"status":[1]}]]]], options);
  });
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map
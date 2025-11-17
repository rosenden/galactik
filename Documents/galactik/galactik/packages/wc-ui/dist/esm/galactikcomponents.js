import { p as promiseResolve, b as bootstrapLazy } from './index-5172b2ee.js';
export { s as setNonce } from './index-5172b2ee.js';

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
  return bootstrapLazy([["gal-avatar",[[1,"gal-avatar",{"name":[1],"src":[1],"alt":[1],"size":[1],"variant":[1],"status":[1]}]]]], options);
});

//# sourceMappingURL=galactikcomponents.js.map
import type { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'galactikcomponents',
  srcDir: 'src',
  tsconfig: 'tsconfig.json',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-custom-elements'
    },
    {
      type: 'docs-readme'
    }
  ]
};

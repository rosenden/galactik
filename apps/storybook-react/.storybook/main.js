const { mergeConfig } = require('vite');
const path = require('node:path');

const reactUiSrc = path.resolve(__dirname, '../../../packages/react-ui/src');

/** @type {import('@storybook/react-vite').StorybookConfig} */
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-toolbars'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: { 
    autodocs: 'tag',
    defaultName: 'Docs'
  },
  core: { 
    disableTelemetry: true
  },
  refs: {},
  viteFinal: async (baseConfig) =>
    mergeConfig(baseConfig, {
      resolve: {
        alias: {
          'react-ui': reactUiSrc
        }
      }
    })
};

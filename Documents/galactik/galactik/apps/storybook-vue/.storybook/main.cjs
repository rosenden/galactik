const vuePlugin = require('@vitejs/plugin-vue');
const { mergeConfig } = require('vite');
const path = require('node:path');

const vueUiSrc = path.resolve(__dirname, '../../../packages/vue-ui/src');
/** @type {import('@storybook/vue3-vite').StorybookConfig} */
module.exports = {
  stories: ['../../../packages/vue-ui/src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-toolbars'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: { autodocs: 'tag' },
  core: { disableTelemetry: true },
  viteFinal: async (baseConfig) =>
    mergeConfig(baseConfig, {
      plugins: [vuePlugin()],
      resolve: {
        alias: {
          'vue-ui': vueUiSrc,
          '@': vueUiSrc
        }
      },
      server: {
        fs: {
          allow: [vueUiSrc]
        }
      }
    })
};

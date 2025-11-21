/** @type {import('@storybook/web-components-vite').StorybookConfig} */
const config = {
  stories: ['../src/**/*.stories.@(ts|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-toolbars'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  docs: { autodocs: 'tag' },
  core: { disableTelemetry: true }
};

export default config;

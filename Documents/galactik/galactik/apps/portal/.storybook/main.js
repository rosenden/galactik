/** @type {import('@storybook/react-vite').StorybookConfig} */
module.exports = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-toolbars'],
  framework: { name: '@storybook/react-vite', options: {} }
};

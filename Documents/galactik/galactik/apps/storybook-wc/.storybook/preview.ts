import type { Preview } from '@storybook/web-components';
import previewBase from '@galactik/storybook-config/preview-base';
import { defineCustomElements } from 'wc-ui/dist/esm/loader';

defineCustomElements();

const preview: Preview = {
  ...previewBase
};

export default preview;

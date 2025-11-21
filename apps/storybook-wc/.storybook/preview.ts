import type { Preview } from '@storybook/web-components';
import previewBase from '@galactik/storybook-config/preview-base';
import { defineCustomElements } from 'wc-ui/dist/esm/loader';
import '../../../styles/tokens-generated.css';
import '../../../styles/tokens.css';
import '../../../styles/tokens-dark.css';

defineCustomElements();

const preview: Preview = {
  ...previewBase
};

export default preview;

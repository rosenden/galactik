import type { Preview } from '@storybook/web-components';
import previewBase from '@galactik/storybook-config/preview-base';
import { defineCustomElements } from 'wc-ui/dist/esm/loader';
import '../../../styles/tokens-generated.css';
import '../../../styles/tokens.css';
import '../../../styles/tokens-dark.css';

// Ensure WC elements are registered once before stories render; wait for registration in loaders
const wcReady = customElements.get('gal-avatar')
  ? Promise.resolve()
  : defineCustomElements();

const preview: Preview = {
  ...previewBase,
  loaders: [
    ...(previewBase.loaders ?? []),
    async () => {
      await wcReady;
    }
  ]
};

export default preview;

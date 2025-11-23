import type { Preview } from '@storybook/web-components';
import previewBase from '@galactik/storybook-config/preview-base';
import { applyPolyfills, defineCustomElements } from 'wc-ui/dist/esm/loader';
import '../../../styles/tokens-generated.css';
import '../../../styles/tokens.css';
import '../../../styles/tokens-dark.css';

// Ensure WC elements are registered once before stories render
if (!customElements.get('gal-avatar')) {
  applyPolyfills().then(() => defineCustomElements());
}

const preview: Preview = {
  ...previewBase
};

export default preview;

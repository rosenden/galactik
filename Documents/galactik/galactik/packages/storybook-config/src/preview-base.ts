import type { Preview } from '@storybook/types';
import { withDesignTokens } from './tokens-decorator';

// Import design tokens CSS
import '../../../styles/tokens-generated.css';

export const previewBase: Preview = {
  decorators: [withDesignTokens],
  parameters: {
    controls: { expanded: true },
    options: {
      storySort: { method: 'alphabetical' }
    }
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Système de couleurs Galactik',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ],
        dynamicTitle: true
      }
    }
  }
};

export default previewBase;

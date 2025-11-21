import type { Preview } from '@storybook/angular';
import { withDesignTokens } from './tokens-decorator';

export const previewBase: Preview = {
  decorators: [withDesignTokens as any],
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

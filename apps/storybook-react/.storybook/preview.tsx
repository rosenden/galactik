import type { Preview } from '@storybook/react';
import type { DecoratorFunction } from '@storybook/types';
import previewBase from '@galactik/storybook-config/preview-base';
import '../../../styles/tokens-generated.css';
import '../../../styles/tokens.css';
import '../../../styles/tokens-dark.css';

const withReactTheme: DecoratorFunction = (StoryFn, context) => {
  const doc = (globalThis as { document?: Document }).document;
  if (doc) {
    // Apply theme to document root
    doc.documentElement.setAttribute('data-theme', context.globals.theme ?? 'light');
    
    // Apply background color to body
    if (doc.body) {
      doc.body.style.backgroundColor =
        context.globals.theme === 'dark'
          ? 'var(--abs-black)'
          : 'var(--color-background-surface)';
    }
  }
  return StoryFn(context);
};

const preview: Preview = {
  ...previewBase,
  decorators: [withReactTheme, ...(previewBase.decorators ?? [])]
};

export default preview;

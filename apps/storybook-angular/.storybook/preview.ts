import 'zone.js';
import type { Preview } from '@storybook/angular';
import type { DecoratorFunction } from '@storybook/types';
import previewBase from '@galactik/storybook-config/preview-base';

const withAngularBackground: DecoratorFunction = (StoryFn, context) => {
  const doc = (globalThis as { document?: Document }).document;
  if (doc?.body) {
    doc.body.style.backgroundColor =
      context.globals.theme === 'dark'
        ? 'var(--abs-black)'
        : 'var(--color-background-surface)';
  }
  return StoryFn(context);
};

const baseDecorators = Array.isArray(previewBase.decorators) 
  ? previewBase.decorators 
  : previewBase.decorators 
    ? [previewBase.decorators] 
    : [];

const preview: Preview = {
  ...previewBase,
  decorators: [...baseDecorators, withAngularBackground] as any
};

export default preview;

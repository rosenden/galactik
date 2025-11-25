import 'zone.js';
import type { Preview } from '@storybook/angular';
import type { DecoratorFunction, Renderer, StoryContext, StoryFn } from '@storybook/types';
import previewBase from '@galactik/storybook-config/preview-base';

const withAngularBackground: DecoratorFunction<Renderer> = (
  StoryFn: StoryFn<Renderer>,
  context: StoryContext<Renderer>
) => {
  const doc = (globalThis as { document?: Document }).document;
  if (doc?.body) {
    doc.body.style.backgroundColor =
      context.globals.theme === 'dark'
        ? 'var(--abs-black)'
        : 'var(--color-background-surface)';
  }
  return StoryFn({ ...context, ...context.args }, context);
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

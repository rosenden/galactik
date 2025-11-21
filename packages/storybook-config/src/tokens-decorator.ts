import type { DecoratorFunction, Renderer } from '@storybook/types';

export const withDesignTokens: DecoratorFunction<Renderer> = (StoryFn, context) => {
  const doc = (globalThis as { document?: Document }).document;
  if (doc) {
    doc.documentElement.setAttribute('data-theme', context.globals.theme ?? 'light');
  }
  return StoryFn(context);
};

export default withDesignTokens;

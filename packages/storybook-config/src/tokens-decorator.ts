import type { DecoratorFunction, Renderer, StoryContext, StoryFn } from '@storybook/types';

export const withDesignTokens: DecoratorFunction<Renderer> = (
  StoryFn: StoryFn<Renderer>,
  context: StoryContext<Renderer>
) => {
  const doc = (globalThis as { document?: Document }).document;
  if (doc) {
    doc.documentElement.setAttribute('data-theme', context.globals.theme ?? 'light');
  }
  return StoryFn({ ...context, ...context.args }, context);
};

export default withDesignTokens;

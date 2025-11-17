import type { DecoratorFunction } from '@storybook/types';
import '../../../styles/tokens.css';
import '../../../styles/tokens.css';
import '../../../styles/tokens-dark.css';

export const withDesignTokens: DecoratorFunction = (StoryFn, context) => {
  const doc = (globalThis as { document?: Document }).document;
  if (doc) {
    doc.documentElement.setAttribute('data-theme', context.globals.theme ?? 'light');
  }
  return StoryFn(context);
};

export default withDesignTokens;

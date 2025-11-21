import type { Preview } from '@storybook/vue3';
import type { DecoratorFunction } from '@storybook/types';
import previewBase from '@galactik/storybook-config/preview-base';
import '../../../styles/tokens.css';
import '../../../styles/tokens-generated.css';
import '../../../styles/tokens-dark.css';
import '../../../packages/react-ui/src/components/Button/button.css';

const withVueBackground: DecoratorFunction = (StoryFn, context) => {
  const doc = (globalThis as { document?: Document }).document;
  if (doc?.body) {
    doc.body.style.backgroundColor =
      context.globals.theme === 'dark'
        ? 'var(--abs-black)'
        : 'var(--color-background-surface)';
  }
  return StoryFn(context);
};

const preview: Preview = {
  ...previewBase,
  decorators: [...(previewBase.decorators ?? []), withVueBackground],
  parameters: {
    ...previewBase.parameters,
    options: {
      storySort: {
        order: ['Home', 'Electrons'],
      },
    },
  },
};

export default preview;

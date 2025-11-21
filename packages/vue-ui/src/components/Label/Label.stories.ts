import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Label from './Label.vue';
import { ImageIcon, WarningIcon, ErrorIcon, SuccessIcon, InfoIcon } from './LabelIcons';

const meta: Meta<typeof Label> = {
  title: 'Electrons/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `@example
\`\`\`vue
<script setup lang="ts">
import Label from 'vue-ui/components/Label/Label.vue';
import { SuccessIcon } from 'vue-ui/components/Label/LabelIcons';
</script>

<template>
  <Label text="New Feature" color="success" size="medium" :icon="SuccessIcon" />
  <Label text="Beta" color="warning" size="small" :icon="SuccessIcon" />
  <Label text="Tag" color="sage" />
</template>
\`\`\``
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text displayed inside the label'
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Label size'
    },
    color: {
      control: 'select',
      options: ['sage', 'black', 'success', 'error', 'warning', 'info'],
      description: 'Label color based on Figma tokens'
    },
    icon: {
      control: false,
      description: 'Optional component rendered before the text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    text: 'Label',
    size: 'medium',
    color: 'sage',
    icon: ImageIcon
  },
  render: (args) => ({
    components: { Label },
    setup() {
      return { args };
    },
    template: '<Label v-bind="args" />'
  })
};

export const Sizes: Story = {
  args: {
    text: 'Label'
  },
  render: (args) => ({
    components: { Label },
    setup() {
      return { args, ImageIcon };
    },
    template: `
      <div style="display: flex; gap: 24px; align-items: center;">
        <Label :text="args.text" size="medium" color="sage" :icon="ImageIcon" />
        <Label :text="args.text" size="small" color="sage" :icon="ImageIcon" />
      </div>
    `
  })
};

export const Colors: Story = {
  args: {
    text: 'Label'
  },
  render: (args) => ({
    components: { Label },
    setup() {
      return { args, ImageIcon, WarningIcon, ErrorIcon, SuccessIcon, InfoIcon };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Label :text="args.text" color="sage" size="medium" :icon="ImageIcon" />
        <Label :text="args.text" color="black" size="medium" :icon="ImageIcon" />
        <Label :text="args.text" color="warning" size="medium" :icon="WarningIcon" />
        <Label :text="args.text" color="error" size="medium" :icon="ErrorIcon" />
        <Label :text="args.text" color="success" size="medium" :icon="SuccessIcon" />
        <Label :text="args.text" color="info" size="medium" :icon="InfoIcon" />
      </div>
    `
  })
};

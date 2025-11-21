import { reactive, ref, watch } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Checkbox from './Checkbox.vue';

const meta: Meta<typeof Checkbox> = {
  title: 'Electrons/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`vue
<script setup lang="ts">
import Checkbox from 'vue-ui/components/Checkbox/Checkbox.vue';

const checked = ref(false);
const partial = ref(true);
</script>

<template>
  <Checkbox v-model:checked="checked" label="Accept terms" />
  <Checkbox :checked="partial" indeterminate label="Partial selection" />
  <Checkbox checked disabled label="Disabled option" />
</template>
\`\`\``
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is selected'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Displays the indeterminate state icon'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interactions'
    },
    label: {
      control: 'text',
      description: 'Label text displayed to the right of the checkbox'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    label: 'Check me'
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.checked ?? false);
      watch(
        () => args.checked,
        (value) => {
          checked.value = value ?? false;
        }
      );
      const handleChange = (value: boolean) => {
        checked.value = value;
      };
      return { args, checked, handleChange };
    },
    template: '<Checkbox v-bind="args" :checked="checked" @change="handleChange" />'
  })
};

export const SelectionStates: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Checkbox :checked="false" label="Unselected" />
        <Checkbox :checked="true" label="Selected" />
        <Checkbox :checked="false" indeterminate label="Indeterminate (minus)" />
      </div>
    `
  })
};

export const WithLabel: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false);
      const handleChange = (value: boolean) => (checked.value = value);
      return { checked, handleChange };
    },
    template: `
      <Checkbox
        :checked="checked"
        @change="handleChange"
        label="I accept the terms and conditions"
      />
    `
  })
};

export const Disabled: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Checkbox :checked="false" disabled label="Disabled unchecked" />
        <Checkbox :checked="true" disabled label="Disabled checked" />
        <Checkbox :checked="false" indeterminate disabled label="Disabled indeterminate" />
      </div>
    `
  })
};

export const CheckboxGroup: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const options = reactive({
        option1: false,
        option2: true,
        option3: false,
        option4: true
      });

      const handleChange = (key: keyof typeof options) => (value: boolean) => {
        options[key] = value;
      };

      return { options, handleChange };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <h4 style="margin: 0; font-size: 14px; font-weight: 600; color: var(--color-font-neutral-base);">
          Choose your preferences
        </h4>
        <Checkbox :checked="options.option1" @change="handleChange('option1')" label="Email notifications" />
        <Checkbox :checked="options.option2" @change="handleChange('option2')" label="Dark mode" />
        <Checkbox :checked="options.option3" @change="handleChange('option3')" label="Anonymous data sharing" />
        <Checkbox :checked="options.option4" @change="handleChange('option4')" label="Newsletter" />
      </div>
    `
  })
};

export const SelectAllPattern: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const items = reactive({
        item1: false,
        item2: true,
        item3: false
      });

      const allChecked = () => Object.values(items).every(Boolean);
      const someChecked = () => {
        const values = Object.values(items);
        return values.some(Boolean) && !values.every(Boolean);
      };

      const handleSelectAll = (value: boolean) => {
        Object.keys(items).forEach((key) => {
          items[key as keyof typeof items] = value;
        });
      };

      const handleItemChange = (key: keyof typeof items) => (value: boolean) => {
        items[key] = value;
      };

      return {
        items,
        allChecked,
        someChecked,
        handleSelectAll,
        handleItemChange
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px; background-color: var(--color-background-alt); border-radius: var(--radius-md);">
        <Checkbox
          :checked="allChecked()"
          :indeterminate="someChecked()"
          @change="handleSelectAll"
          label="Select all"
        />
        <div style="height: 1px; background-color: var(--color-border-base); margin: 4px 0;"></div>
        <div style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px;">
          <Checkbox :checked="items.item1" @change="handleItemChange('item1')" label="Item 1" />
          <Checkbox :checked="items.item2" @change="handleItemChange('item2')" label="Item 2" />
          <Checkbox :checked="items.item3" @change="handleItemChange('item3')" label="Item 3" />
        </div>
      </div>
    `
  })
};

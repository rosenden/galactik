import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Radio from './Radio.vue';

const meta: Meta<typeof Radio> = {
  title: 'Electrons/Radio',
  component: Radio,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue';
import Radio from 'vue-ui/components/Radio/Radio.vue';

const value = ref('a');
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:12px;">
    <Radio name="group" value="a" :checked="value === 'a'" @update:checked="v => value = v ? 'a' : value" label="Option A" />
    <Radio name="group" value="b" :checked="value === 'b'" @update:checked="v => value = v ? 'b' : value" label="Option B" />
  </div>
</template>
\`\`\`
Semantic tokens: var(--color-stroke-primary-base), var(--color-font-neutral-disabled).`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean', description: 'Checked state' },
    disabled: { control: 'boolean', description: 'Disables the radio' },
    label: { control: 'text', description: 'Label next to the control' },
    name: { control: 'text', description: 'HTML name for grouping' },
    value: { control: 'text', description: 'Associated value' },
    'onUpdate:checked': { action: 'update:checked' },
    change: { action: 'change' }
  }
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Playground: Story = {
  render: (args) => ({
    components: { Radio },
    setup() {
      const state = ref(args.checked ?? false);
      return { args, state };
    },
    template: `
      <Radio v-bind="args" :checked="state" @update:checked="state = $event" />
    `
  }),
  args: {
    checked: false,
    disabled: false,
    label: 'Choose this option'
  }
};

export const SelectionStates: Story = {
  render: () => ({
    components: { Radio },
    template: `
      <div style="display:flex; flex-direction:column; gap:12px;">
        <Radio :checked="false" label="Unchecked" />
        <Radio :checked="true" label="Checked" />
      </div>
    `
  })
};

export const Disabled: Story = {
  render: () => ({
    components: { Radio },
    template: `
      <div style="display:flex; flex-direction:column; gap:12px;">
        <Radio :checked="false" :disabled="true" label="Disabled" />
        <Radio :checked="true" :disabled="true" label="Disabled (checked)" />
      </div>
    `
  })
};

export const RadioGroup: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const value = ref('a');
      const options = [
        { value: 'a', label: 'React', hint: 'Storybook + Vitest' },
        { value: 'b', label: 'Vue', hint: 'Vue 3 + TS' },
        { value: 'c', label: 'Angular', hint: 'Angular 17 + TS' }
      ];
      return { value, options };
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:10px; padding:16px; border:1px solid var(--color-border-base); border-radius:var(--radius-md); background:var(--color-background-alt);">
        <h4 style="margin:0; font-size:14px; font-weight:700; color:var(--color-font-neutral-base);">Pick your Storybook environment</h4>
        <div v-for="opt in options" :key="opt.value" style="display:flex; align-items:center; gap:10px;">
          <Radio
            name="storybook-env"
            :value="opt.value"
            :checked="value === opt.value"
            @update:checked="checked => value = checked ? opt.value : value"
            :label="opt.label"
          />
          <span class="text-tag" style="color: var(--color-font-neutral-muted);">{{ opt.hint }}</span>
        </div>
      </div>
    `
  })
};

export const CardChoices: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const value = ref('portal');
      const cards = [
        { id: 'portal', title: 'Portal', desc: 'Hub + docs', badge: 'Docs' },
        { id: 'vue', title: 'Vue Storybook', desc: 'Storybook + Vitest', badge: 'Vue' },
        { id: 'react', title: 'React Storybook', desc: 'Storybook + Vitest', badge: 'React' }
      ];
      return { value, cards };
    },
    template: `
      <div style="display:grid; gap:12px;">
        <label
          v-for="card in cards"
          :key="card.id"
          style="display:flex; align-items:center; gap:12px; padding:14px 16px; border-radius:var(--radius-card); border:1px solid var(--color-border-base); background:var(--card); box-shadow:var(--elevation-xs, 0 6px 18px rgba(0,0,0,0.06)); cursor:pointer; transition:transform .18s var(--ease-out-expo, cubic-bezier(0.22,1,0.36,1)), border-color .2s;"
        >
          <Radio
            name="radio-card"
            :value="card.id"
            :checked="value === card.id"
            @update:checked="checked => value = checked ? card.id : value"
          />
          <div style="display:flex; flex-direction:column; gap:4px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="text-label-medium" style="color:var(--color-font-primary-base); font-weight:700;">{{ card.title }}</span>
              <span class="text-tag" style="padding:4px 8px; border-radius:var(--radius-sm); background:var(--accent); color:var(--accent-foreground);">{{ card.badge }}</span>
            </div>
            <span class="text-tag" style="color:var(--color-font-neutral-muted);">{{ card.desc }}</span>
          </div>
        </label>
      </div>
    `
  })
};

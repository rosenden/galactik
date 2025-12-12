import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Select from '../../../../packages/vue-ui/src/components/Select/Select.vue';
import { faMessageEdit, faUser, faEnvelope, faBuilding } from '@fortawesome/pro-regular-svg-icons';

const meta: Meta = {
  title: 'Electrons/Select',
  component: Select,
  parameters: { 
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`vue
<!-- Basic select -->
<Select 
  v-model="selectedValue"
  :options="options"
  placeholder="Select an option"
/>

<!-- Different sizes -->
<Select :options="options" size="small" />
<Select :options="options" size="medium" />
<Select :options="options" size="large" />

<!-- With icon -->
<Select 
  :options="options"
  :icon="faUser"
  placeholder="Select user"
/>

<!-- Disabled -->
<Select :options="options" :disabled="true" />

<!-- Readonly -->
<Select :options="options" :readonly="true" modelValue="1" />
\`\`\`
`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size from Figma oc-select variants'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled'
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the select is readonly (no chevron, not clickable)'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown in empty state'
    },
    icon: {
      control: false,
      description: 'FontAwesome icon on the left side'
    }
  },
  args: {
    placeholder: 'Lorem ipsum dolor',
    size: 'medium',
    disabled: false,
    readonly: false
  }
};

export default meta;
type Story = StoryObj;

const sampleOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
];

/**
 * Interactive playground
 */
export const Playground: Story = {
  args: {
    options: sampleOptions
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref('');
      return { value, args };
    },
    template: '<div style="padding: 24px; min-height: 400px;"><Select v-model="value" v-bind="args" /></div>'
  })
};

/**
 * All sizes from Figma
 */
export const AllSizes: Story = {
  render: () => ({
    components: { Select },
    setup() {
      return { sampleOptions, faMessageEdit };
    },
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Small</h3>
          <Select :options="sampleOptions" size="small" placeholder="Small select" :icon="faMessageEdit" />
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Medium (default)</h3>
          <Select :options="sampleOptions" size="medium" placeholder="Medium select" :icon="faMessageEdit" />
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Large</h3>
          <Select :options="sampleOptions" size="large" placeholder="Large select" :icon="faMessageEdit" />
        </div>
      </div>
    `
  })
};

/**
 * Different states
 */
export const AllStates: Story = {
  render: () => ({
    components: { Select },
    setup() {
      return { sampleOptions, faMessageEdit };
    },
    template: `
      <div style="display: flex; gap: 32px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Empty (placeholder)</h3>
          <Select :options="sampleOptions" placeholder="Lorem ipsum dolor" :icon="faMessageEdit" />
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Filled (with value)</h3>
          <Select :options="sampleOptions" modelValue="2" :icon="faMessageEdit" />
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Hovered (hover to see)</h3>
          <Select :options="sampleOptions" placeholder="Hover me" :icon="faMessageEdit" />
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Focus (click to see)</h3>
          <Select :options="sampleOptions" placeholder="Focus me" :icon="faMessageEdit" />
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Readonly</h3>
          <Select :options="sampleOptions" modelValue="3" :readonly="true" :icon="faMessageEdit" />
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Disabled</h3>
          <Select :options="sampleOptions" placeholder="Disabled select" :disabled="true" :icon="faMessageEdit" />
        </div>
      </div>
    `
  })
};

/**
 * With different icons
 */
export const WithIcons: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const userOptions = [
        { value: 'john', label: 'John Doe' },
        { value: 'jane', label: 'Jane Smith' },
        { value: 'bob', label: 'Bob Johnson' },
      ];
      const emailOptions = [
        { value: 'work', label: 'work@company.com' },
        { value: 'personal', label: 'personal@email.com' },
      ];
      const companyOptions = [
        { value: 'acme', label: 'Acme Corp' },
        { value: 'globex', label: 'Globex Inc' },
        { value: 'initech', label: 'Initech' },
      ];
      return { userOptions, emailOptions, companyOptions, faUser, faEnvelope, faBuilding };
    },
    template: `
      <div style="display: flex; gap: 24px; flex-wrap: wrap; width: 100%;">
        <div style="width: 280px;">
          <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #666;">User</h4>
          <Select 
            :options="userOptions"
            :icon="faUser"
            placeholder="Select user"
          />
        </div>
        
        <div style="width: 280px;">
          <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Email</h4>
          <Select 
            :options="emailOptions"
            :icon="faEnvelope"
            placeholder="Select email"
          />
        </div>
        
        <div style="width: 280px;">
          <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Company</h4>
          <Select 
            :options="companyOptions"
            :icon="faBuilding"
            placeholder="Select company"
          />
        </div>
      </div>
    `
  })
};

/**
 * Without icon
 */
export const WithoutIcon: Story = {
  render: () => ({
    components: { Select },
    setup() {
      return { sampleOptions };
    },
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <Select :options="sampleOptions" placeholder="No icon" size="small" />
        <Select :options="sampleOptions" placeholder="No icon" size="medium" />
        <Select :options="sampleOptions" placeholder="No icon" size="large" />
      </div>
    `
  })
};

/**
 * Long options that get truncated
 */
export const LongOptions: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const longOptions = [
        { value: '1', label: 'Short' },
        { value: '2', label: 'This is a very long option that will be truncated' },
        { value: '3', label: 'Another extremely long option text that exceeds the width' },
        { value: '4', label: 'Medium length option' },
        { value: '5', label: 'Lorem ipsum dolor sit amet consectetur adipiscing elit' },
      ];
      return { longOptions, faMessageEdit };
    },
    template: `
      <div style="width: 320px;">
        <Select 
          :options="longOptions"
          placeholder="Select option"
          :icon="faMessageEdit"
        />
      </div>
    `
  })
};

/**
 * Interactive examples with state
 */
export const Interactive: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value1 = ref('');
      const value2 = ref('2');
      const value3 = ref('');
      return { value1, value2, value3, sampleOptions, faMessageEdit, faUser };
    },
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
            Empty state: {{ value1 || 'No selection' }}
          </h4>
          <Select 
            v-model="value1"
            :options="sampleOptions"
            placeholder="Select an option"
            :icon="faMessageEdit"
          />
        </div>
        
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
            Pre-filled: {{ value2 }}
          </h4>
          <Select 
            v-model="value2"
            :options="sampleOptions"
            :icon="faUser"
          />
        </div>
        
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
            No icon: {{ value3 || 'No selection' }}
          </h4>
          <Select 
            v-model="value3"
            :options="sampleOptions"
            placeholder="Pick one"
          />
        </div>
      </div>
    `
  })
};

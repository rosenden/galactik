import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent } from 'angular-ui/components/select/select.component';
import type { SelectSize, SelectOption } from 'angular-ui/components/select/select.component';

const meta: Meta<SelectComponent> = {
  title: 'Electrons/Select',
  component: SelectComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`typescript
// Basic select
import { SelectComponent } from '@galactik/angular-ui';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

<oc-select 
  [options]="options"
  [value]="selectedValue"
  (valueChange)="onValueChange($event)"
  placeholder="Select an option"
></oc-select>

// Different sizes
<oc-select [options]="options" size="small"></oc-select>
<oc-select [options]="options" size="medium"></oc-select>
<oc-select [options]="options" size="large"></oc-select>

// With icon (using Font Awesome class names)
<oc-select 
  [options]="options"
  icon="fa-solid fa-user"
  placeholder="Select user"
></oc-select>

// Disabled
<oc-select [options]="options" [disabled]="true"></oc-select>

// Readonly
<oc-select [options]="options" [readonly]="true" value="1"></oc-select>
\`\`\``,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size from Figma oc-select variants',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the select is readonly (no chevron, not clickable)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown in empty state',
      table: {
        defaultValue: { summary: 'Lorem ipsum dolor' },
      },
    },
    icon: {
      control: 'text',
      description: 'Font Awesome icon classes (e.g. "fa-solid fa-user")',
    },
    options: {
      control: 'object',
      description: 'Array of SelectOption objects with value and label',
    },
    value: {
      control: 'text',
      description: 'Current selected value',
    },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

const sampleOptions: SelectOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
];

export const Playground: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Lorem ipsum dolor',
    size: 'medium',
  },
};

export const AllSizes: Story = {
  args: {
    options: sampleOptions,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Small</h3>
          <oc-select 
            [options]="options" 
            size="small" 
            placeholder="Small select" 
            icon="fa-solid fa-pen-to-square">
          </oc-select>
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Medium (default)</h3>
          <oc-select 
            [options]="options" 
            size="medium" 
            placeholder="Medium select" 
            icon="fa-solid fa-pen-to-square">
          </oc-select>
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Large</h3>
          <oc-select 
            [options]="options" 
            size="large" 
            placeholder="Large select" 
            icon="fa-solid fa-pen-to-square">
          </oc-select>
        </div>
      </div>
    `,
  }),
};

export const AllStates: Story = {
  args: {
    options: sampleOptions,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 32px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Empty (placeholder)</h3>
          <oc-select 
            [options]="options" 
            placeholder="Lorem ipsum dolor" 
            icon="fa-solid fa-pen-to-square">
          </oc-select>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Filled (with value)</h3>
          <oc-select 
            [options]="options" 
            value="2" 
            icon="fa-solid fa-pen-to-square">
          </oc-select>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Hovered (hover to see)</h3>
          <oc-select 
            [options]="options" 
            placeholder="Hover me" 
            icon="fa-solid fa-pen-to-square">
          </oc-select>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Focus (click to see)</h3>
          <oc-select 
            [options]="options" 
            placeholder="Focus me" 
            icon="fa-solid fa-pen-to-square">
          </oc-select>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Readonly</h3>
          <oc-select 
            [options]="options" 
            value="3" 
            [readonly]="true" 
            icon="fa-solid fa-pen-to-square">
          </oc-select>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Disabled</h3>
          <oc-select 
            [options]="options" 
            placeholder="Disabled select" 
            [disabled]="true" 
            icon="fa-solid fa-pen-to-square">
          </oc-select>
        </div>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  args: {
    options: sampleOptions,
  },
  render: (args) => ({
    props: {
      ...args,
      userOptions: [
        { value: 'john', label: 'John Doe' },
        { value: 'jane', label: 'Jane Smith' },
        { value: 'bob', label: 'Bob Johnson' },
      ],
      emailOptions: [
        { value: 'work', label: 'work@company.com' },
        { value: 'personal', label: 'personal@email.com' },
      ],
      companyOptions: [
        { value: 'acme', label: 'Acme Corp' },
        { value: 'globex', label: 'Globex Inc' },
        { value: 'initech', label: 'Initech' },
      ],
    },
    template: `
      <div style="display: flex; gap: 24px; flex-wrap: wrap; width: 100%;">
        <div style="width: 280px;">
          <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #666;">User</h4>
          <oc-select 
            [options]="userOptions"
            icon="fa-solid fa-user"
            placeholder="Select user">
          </oc-select>
        </div>
        
        <div style="width: 280px;">
          <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Email</h4>
          <oc-select 
            [options]="emailOptions"
            icon="fa-solid fa-envelope"
            placeholder="Select email">
          </oc-select>
        </div>
        
        <div style="width: 280px;">
          <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Company</h4>
          <oc-select 
            [options]="companyOptions"
            icon="fa-solid fa-building"
            placeholder="Select company">
          </oc-select>
        </div>
      </div>
    `,
  }),
};

export const WithoutIcon: Story = {
  args: {
    options: sampleOptions,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <oc-select [options]="options" placeholder="No icon" size="small"></oc-select>
        <oc-select [options]="options" placeholder="No icon" size="medium"></oc-select>
        <oc-select [options]="options" placeholder="No icon" size="large"></oc-select>
      </div>
    `,
  }),
};

export const LongOptions: Story = {
  args: {
    options: sampleOptions,
  },
  render: (args) => ({
    props: {
      longOptions: [
        { value: '1', label: 'Short' },
        { value: '2', label: 'This is a very long option that will be truncated' },
        { value: '3', label: 'Another extremely long option text that exceeds the width' },
        { value: '4', label: 'Medium length option' },
        { value: '5', label: 'Lorem ipsum dolor sit amet consectetur adipiscing elit' },
      ],
    },
    template: `
      <div style="width: 320px;">
        <oc-select 
          [options]="longOptions"
          placeholder="Select option"
          icon="fa-solid fa-pen-to-square">
        </oc-select>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  args: {
    options: sampleOptions,
  },
  render: (args) => ({
    props: {
      options: args.options,
      value1: '',
      value2: '2',
      value3: '',
      onValueChange1(value: string) {
        this.value1 = value;
        console.log('Select 1 changed:', value);
      },
      onValueChange2(value: string) {
        this.value2 = value;
        console.log('Select 2 changed:', value);
      },
      onValueChange3(value: string) {
        this.value3 = value;
        console.log('Select 3 changed:', value);
      },
    },
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
            Empty state: {{ value1 || 'No selection' }}
          </h4>
          <oc-select 
            [options]="options"
            [value]="value1"
            (valueChange)="onValueChange1($event)"
            placeholder="Select an option"
            icon="fa-solid fa-pen-to-square">
          </oc-select>
        </div>
        
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
            Pre-filled: {{ value2 }}
          </h4>
          <oc-select 
            [options]="options"
            [value]="value2"
            (valueChange)="onValueChange2($event)"
            icon="fa-solid fa-user">
          </oc-select>
        </div>
        
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
            No icon: {{ value3 || 'No selection' }}
          </h4>
          <oc-select 
            [options]="options"
            [value]="value3"
            (valueChange)="onValueChange3($event)"
            placeholder="Pick one">
          </oc-select>
        </div>
      </div>
    `,
  }),
};

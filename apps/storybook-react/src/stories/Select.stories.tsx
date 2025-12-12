import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from 'react-ui/components/Select';
import type { SelectSize } from 'react-ui/components/Select/Select';
import { faMessageEdit, faUser, faEnvelope, faBuilding } from '@fortawesome/pro-regular-svg-icons';

const meta = {
  title: 'Electrons/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `@example
\`\`\`tsx
// Basic select
import Select from '@galactik/react-ui/components/Select';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

<Select 
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Select an option"
/>

// Different sizes
<Select options={options} size="small" />
<Select options={options} size="medium" />
<Select options={options} size="large" />

// With icon
import { faUser } from '@fortawesome/pro-regular-svg-icons';
<Select 
  options={options}
  icon={faUser}
  placeholder="Select user"
/>

// Disabled
<Select options={options} disabled />

// Readonly
<Select options={options} readonly value="1" />
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
      defaultValue: 'medium',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
      defaultValue: false,
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the select is readonly (no chevron, not clickable)',
      defaultValue: false,
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown in empty state',
      defaultValue: 'Lorem ipsum dolor',
    },
    icon: {
      control: false,
      description: 'FontAwesome icon on the left side',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
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
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', width: '320px' }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>Small</h3>
        <Select options={sampleOptions} size="small" placeholder="Small select" icon={faMessageEdit} />
      </div>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>Medium (default)</h3>
        <Select options={sampleOptions} size="medium" placeholder="Medium select" icon={faMessageEdit} />
      </div>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>Large</h3>
        <Select options={sampleOptions} size="large" placeholder="Large select" icon={faMessageEdit} />
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  args: {
    options: sampleOptions,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexDirection: 'column', width: '320px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Empty (placeholder)</h3>
        <Select options={sampleOptions} placeholder="Lorem ipsum dolor" icon={faMessageEdit} />
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Filled (with value)</h3>
        <Select options={sampleOptions} value="2" icon={faMessageEdit} />
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Hovered (hover to see)</h3>
        <Select options={sampleOptions} placeholder="Hover me" icon={faMessageEdit} />
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Focus (click to see)</h3>
        <Select options={sampleOptions} placeholder="Focus me" icon={faMessageEdit} />
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Readonly</h3>
        <Select options={sampleOptions} value="3" readonly icon={faMessageEdit} />
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Disabled</h3>
        <Select options={sampleOptions} placeholder="Disabled select" disabled icon={faMessageEdit} />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    options: sampleOptions,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', width: '100%' }}>
      <div style={{ width: '280px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>User</h4>
        <Select 
          options={[
            { value: 'john', label: 'John Doe' },
            { value: 'jane', label: 'Jane Smith' },
            { value: 'bob', label: 'Bob Johnson' },
          ]}
          icon={faUser}
          placeholder="Select user"
        />
      </div>
      
      <div style={{ width: '280px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Email</h4>
        <Select 
          options={[
            { value: 'work', label: 'work@company.com' },
            { value: 'personal', label: 'personal@email.com' },
          ]}
          icon={faEnvelope}
          placeholder="Select email"
        />
      </div>
      
      <div style={{ width: '280px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Company</h4>
        <Select 
          options={[
            { value: 'acme', label: 'Acme Corp' },
            { value: 'globex', label: 'Globex Inc' },
            { value: 'initech', label: 'Initech' },
          ]}
          icon={faBuilding}
          placeholder="Select company"
        />
      </div>
    </div>
  ),
};

export const WithoutIcon: Story = {
  args: {
    options: sampleOptions,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', width: '320px' }}>
      <Select options={sampleOptions} placeholder="No icon" size="small" />
      <Select options={sampleOptions} placeholder="No icon" size="medium" />
      <Select options={sampleOptions} placeholder="No icon" size="large" />
    </div>
  ),
};

export const LongOptions: Story = {
  args: {
    options: sampleOptions,
  },
  render: () => (
    <div style={{ width: '320px' }}>
      <Select 
        options={[
          { value: '1', label: 'Short' },
          { value: '2', label: 'This is a very long option that will be truncated' },
          { value: '3', label: 'Another extremely long option text that exceeds the width' },
          { value: '4', label: 'Medium length option' },
          { value: '5', label: 'Lorem ipsum dolor sit amet consectetur adipiscing elit' },
        ]}
        placeholder="Select option"
        icon={faMessageEdit}
      />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    options: sampleOptions,
  },
  render: () => {
    const [value1, setValue1] = React.useState<string>('');
    const [value2, setValue2] = React.useState<string>('2');
    const [value3, setValue3] = React.useState<string>('');

    return (
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', width: '320px' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
            Empty state: {value1 || 'No selection'}
          </h4>
          <Select 
            options={sampleOptions}
            value={value1}
            onChange={setValue1}
            placeholder="Select an option"
            icon={faMessageEdit}
          />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
            Pre-filled: {value2}
          </h4>
          <Select 
            options={sampleOptions}
            value={value2}
            onChange={setValue2}
            icon={faUser}
          />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
            No icon: {value3 || 'No selection'}
          </h4>
          <Select 
            options={sampleOptions}
            value={value3}
            onChange={setValue3}
            placeholder="Pick one"
          />
        </div>
      </div>
    );
  },
};

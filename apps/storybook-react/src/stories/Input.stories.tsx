import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from 'react-ui/components/Input';
import type { InputSize, InputVariant } from 'react-ui/components/Input/Input';
import { faStickyNote, faCircleCheck, faCircleExclamation } from '@fortawesome/pro-regular-svg-icons';

const meta = {
  title: 'Electrons/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`tsx
// Basic input
import Input from '@galactik/react-ui/components/Input';

<Input 
  value={value}
  onChange={setValue}
  placeholder="Enter text"
/>

// Different sizes
<Input size="small" />
<Input size="medium" />
<Input size="large" />

// With icons
import { faStickyNote } from '@fortawesome/pro-regular-svg-icons';
<Input 
  iconLeft={faStickyNote}
  iconRight={[faStickyNote, faStickyNote]}
  placeholder="With icons"
/>

// With character counter
<Input maxLength={320} showCounter />

// Number input with controls
<Input type="number" showNumberControls />

// Variants
<Input variant="success" />
<Input variant="error" />

// States
<Input disabled />
<Input readonly value="Read-only value" />
\`\`\``,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size from Figma oc-input variants',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'error'],
      description: 'Input variant style',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'number', 'email', 'password', 'tel', 'url'],
      description: 'HTML input type',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is readonly',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown in empty state',
      table: {
        defaultValue: { summary: 'Lorem ipsum' },
      },
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length (shows counter)',
    },
    showCounter: {
      control: 'boolean',
      description: 'Show character counter',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showNumberControls: {
      control: 'boolean',
      description: 'Show number up/down controls',
    },
    iconLeft: {
      control: false,
      description: 'FontAwesome icon on the left side',
    },
    iconRight: {
      control: false,
      description: 'FontAwesome icon(s) on the right side (can be array)',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    placeholder: 'Lorem ipsum',
    size: 'medium',
    variant: 'default',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', width: '320px' }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>Small</h3>
        <Input 
          size="small" 
          placeholder="Small input" 
          iconLeft={faStickyNote}
          iconRight={[faStickyNote, faStickyNote]}
          maxLength={320}
        />
      </div>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>Medium (default)</h3>
        <Input 
          size="medium" 
          placeholder="Medium input" 
          iconLeft={faStickyNote}
          iconRight={[faStickyNote, faStickyNote]}
          maxLength={320}
        />
      </div>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>Large</h3>
        <Input 
          size="large" 
          placeholder="Large input" 
          iconLeft={faStickyNote}
          iconRight={[faStickyNote, faStickyNote]}
          maxLength={320}
        />
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexDirection: 'column', width: '320px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Default / Empty</h3>
        <Input 
          placeholder="Lorem ipsum" 
          iconLeft={faStickyNote}
          iconRight={[faStickyNote, faStickyNote]}
          maxLength={320}
        />
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Filled (with value)</h3>
        <Input 
          defaultValue="Lorem Ipsum"
          iconLeft={faStickyNote}
          iconRight={[faStickyNote, faStickyNote]}
          maxLength={320}
        />
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Hovered (hover to see)</h3>
        <Input 
          placeholder="Hover me" 
          iconLeft={faStickyNote}
          iconRight={[faStickyNote, faStickyNote]}
          maxLength={320}
        />
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Focus (click to see)</h3>
        <Input 
          placeholder="Focus me" 
          iconLeft={faStickyNote}
          iconRight={[faStickyNote, faStickyNote]}
          maxLength={320}
        />
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Readonly</h3>
        <Input 
          value="Lorem Ipsum"
          readonly 
          iconLeft={faStickyNote}
          iconRight={[faStickyNote, faStickyNote]}
        />
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Disabled</h3>
        <Input 
          placeholder="Disabled input" 
          disabled 
          iconLeft={faStickyNote}
          iconRight={[faStickyNote, faStickyNote]}
          maxLength={320}
        />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', width: '320px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Default</h4>
        <Input 
          placeholder="Default variant"
          iconLeft={faStickyNote}
          maxLength={320}
        />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Success</h4>
        <Input 
          variant="success"
          defaultValue="Lorem Ipsum"
          iconLeft={faCircleCheck}
          maxLength={320}
        />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Error - Empty</h4>
        <Input 
          variant="error"
          placeholder="Lorem ipsum"
          iconLeft={faCircleExclamation}
          maxLength={320}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Error - Filled</h4>
        <Input 
          variant="error"
          defaultValue="Lorem Ipsum"
          iconLeft={faCircleExclamation}
          maxLength={320}
        />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', width: '100%' }}>
      <div style={{ width: '280px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Left icon only</h4>
        <Input 
          placeholder="With left icon"
          iconLeft={faStickyNote}
        />
      </div>
      
      <div style={{ width: '280px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Right icon only</h4>
        <Input 
          placeholder="With right icon"
          iconRight={faStickyNote}
        />
      </div>
      
      <div style={{ width: '280px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Multiple right icons</h4>
        <Input 
          placeholder="Multiple icons"
          iconLeft={faStickyNote}
          iconRight={[faStickyNote, faStickyNote]}
        />
      </div>
    </div>
  ),
};

export const WithCounter: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', width: '320px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>With maxLength (0/320)</h4>
        <Input 
          placeholder="Type something..."
          maxLength={320}
          iconLeft={faStickyNote}
        />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>With value (12/320)</h4>
        <Input 
          defaultValue="Lorem Ipsum"
          maxLength={320}
          iconLeft={faStickyNote}
        />
      </div>
    </div>
  ),
};

export const NumberInput: Story = {
  render: () => {
    const [value, setValue] = React.useState('0');

    return (
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', width: '320px' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Small - Horizontal controls</h4>
          <Input 
            type="number"
            value={value}
            onChange={setValue}
            size="small"
            showNumberControls
            iconLeft={faStickyNote}
          />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Medium - Vertical controls</h4>
          <Input 
            type="number"
            value={value}
            onChange={setValue}
            size="medium"
            showNumberControls
            iconLeft={faStickyNote}
          />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Large - Vertical controls</h4>
          <Input 
            type="number"
            value={value}
            onChange={setValue}
            size="large"
            showNumberControls
            iconLeft={faStickyNote}
          />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Without controls</h4>
          <Input 
            type="number"
            value={value}
            onChange={setValue}
            showNumberControls={false}
            iconLeft={faStickyNote}
          />
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('Lorem Ipsum');
    const [value3, setValue3] = React.useState('5');

    return (
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', width: '320px' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
            Text input: "{value1}" ({value1.length} chars)
          </h4>
          <Input 
            value={value1}
            onChange={setValue1}
            placeholder="Type something..."
            maxLength={320}
            iconLeft={faStickyNote}
          />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
            Pre-filled: "{value2}" ({value2.length} chars)
          </h4>
          <Input 
            value={value2}
            onChange={setValue2}
            maxLength={320}
            iconLeft={faStickyNote}
          />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
            Number: {value3}
          </h4>
          <Input 
            type="number"
            value={value3}
            onChange={setValue3}
            showNumberControls
            iconLeft={faStickyNote}
          />
        </div>
      </div>
    );
  },
};

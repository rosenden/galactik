import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from 'react-ui/components/Checkbox/Checkbox';
import checkboxSpecs from '../../../../scripts/figma/specs/checkbox-specs.json';

const meta: Meta<typeof Checkbox> = {
  title: 'Electrons/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`tsx
// Simple checkbox
<Checkbox 
  checked={isChecked} 
  onChange={setIsChecked}
  label="I accept the terms"
/>

// Indeterminate checkbox (minus)
<Checkbox 
  checked={false}
  indeterminate={true}
  onChange={handleChange}
  label="Partial selection"
/>

// Disabled checkbox
<Checkbox 
  checked={true}
  disabled={true}
  label="Disabled option"
/>

// Controlled checkbox with form
<Checkbox
  name="newsletter"
  value="subscribe"
  checked={formData.newsletter}
  onChange={(checked) => setFormData({ ...formData, newsletter: checked })}
  label="Subscribe to newsletter"
/>

// Checkbox group
<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
  <Checkbox checked={option1} onChange={setOption1} label="Option 1" />
  <Checkbox checked={option2} onChange={setOption2} label="Option 2" />
  <Checkbox checked={option3} onChange={setOption3} label="Option 3" />
</div>
\`\`\`
`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (shows minus icon)'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled'
    },
    label: {
      control: 'text',
      description: 'Label text displayed next to the checkbox'
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the checkbox state changes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Interactive playground to test all checkbox states
 */
export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(args.checked || false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={setChecked}
      />
    );
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    label: 'Check me'
  }
};

/**
 * All selection states: unchecked, checked, and indeterminate (minus)
 */
export const SelectionStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox checked={false} label="Unselected" />
      <Checkbox checked={true} label="Selected" />
      <Checkbox checked={false} indeterminate={true} label="Indeterminate (minus)" />
    </div>
  )
};

/**
 * Checkbox with label text
 */
export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <Checkbox 
        checked={checked}
        onChange={setChecked}
        label="I accept the terms and conditions"
      />
    );
  }
};

/**
 * Disabled state for both checked and unchecked
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox checked={false} disabled={true} label="Disabled unchecked" />
      <Checkbox checked={true} disabled={true} label="Disabled checked" />
      <Checkbox checked={false} indeterminate={true} disabled={true} label="Disabled indeterminate" />
    </div>
  )
};

/**
 * Group of checkboxes for multiple selection
 */
export const CheckboxGroup: Story = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = React.useState({
      option1: false,
      option2: true,
      option3: false,
      option4: true
    });

    const handleChange = (key: string) => (checked: boolean) => {
      setSelectedOptions(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--color-font-neutral-base)' }}>
          Select your preferences
        </h4>
        <Checkbox 
          checked={selectedOptions.option1}
          onChange={handleChange('option1')}
          label="Receive email notifications"
        />
        <Checkbox 
          checked={selectedOptions.option2}
          onChange={handleChange('option2')}
          label="Enable dark mode"
        />
        <Checkbox 
          checked={selectedOptions.option3}
          onChange={handleChange('option3')}
          label="Share anonymous data"
        />
        <Checkbox 
          checked={selectedOptions.option4}
          onChange={handleChange('option4')}
          label="Subscribe to newsletter"
        />
      </div>
    );
  }
};

/**
 * Select all pattern with indeterminate state
 */
export const SelectAllPattern: Story = {
  render: () => {
    const [items, setItems] = React.useState({
      item1: false,
      item2: true,
      item3: false
    });

    const allChecked = Object.values(items).every(Boolean);
    const someChecked = Object.values(items).some(Boolean) && !allChecked;

    const handleSelectAll = (checked: boolean) => {
      setItems({
        item1: checked,
        item2: checked,
        item3: checked
      });
    };

    const handleItemChange = (key: string) => (checked: boolean) => {
      setItems(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', backgroundColor: 'var(--color-background-alt)', borderRadius: 'var(--radius-md)' }}>
        <Checkbox 
          checked={allChecked}
          indeterminate={someChecked}
          onChange={handleSelectAll}
          label="Select all"
        />
        <div style={{ height: '1px', backgroundColor: 'var(--color-border-base)', margin: '4px 0' }} />
        <div style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Checkbox 
            checked={items.item1}
            onChange={handleItemChange('item1')}
            label="Item 1"
          />
          <Checkbox 
            checked={items.item2}
            onChange={handleItemChange('item2')}
            label="Item 2"
          />
          <Checkbox 
            checked={items.item3}
            onChange={handleItemChange('item3')}
            label="Item 3"
          />
        </div>
      </div>
    );
  }
};

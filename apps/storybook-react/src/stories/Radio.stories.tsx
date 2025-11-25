import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from 'react-ui/components/Radio/Radio';

const meta: Meta<typeof Radio> = {
  title: 'Electrons/Radio',
  component: Radio,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`tsx
// Controlled radio
const [value, setValue] = useState('a');

<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
  <Radio checked={value === 'a'} onChange={() => setValue('a')} label="Option A" />
  <Radio checked={value === 'b'} onChange={() => setValue('b')} label="Option B" />
</div>
\`\`\`

Semantic tokens: colors/radii from design tokens (e.g. var(--color-bg-primary-base), var(--radius-md)).`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checked state'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the radio'
    },
    label: {
      control: 'text',
      description: 'Label next to the control'
    },
    name: { control: 'text', description: 'HTML name for grouping' },
    value: { control: 'text', description: 'Associated value' },
    onChange: {
      action: 'changed',
      description: 'Fired when the radio changes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Radio>;

/** Interactive playground (controlled) */
export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(args.checked ?? false);
    return (
      <Radio
        {...args}
        checked={checked}
        onChange={setChecked}
      />
    );
  },
  args: {
    checked: false,
    disabled: false,
    label: 'Choose this option'
  }
};

/** Main states: unchecked vs checked */
export const SelectionStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <Radio checked={false} label="Unchecked" />
      <Radio checked={true} label="Checked" />
    </div>
  )
};

/** Disabled states */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <Radio checked={false} disabled label="Disabled" />
      <Radio checked={true} disabled label="Disabled (checked)" />
    </div>
  )
};

/** Exclusive group with semantic tokens */
export const RadioGroup: Story = {
  render: () => {
    const [value, setValue] = React.useState('a');
    const options = [
      { value: 'a', label: 'React', hint: 'Storybook + Vitest' },
      { value: 'b', label: 'Vue', hint: 'Vue 3 + TS' },
      { value: 'c', label: 'Angular', hint: 'Angular 17 + TS' }
    ];

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '16px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border-base)',
        background: 'var(--color-background-alt)'
      }}>
        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--color-font-neutral-base)' }}>
          Pick your Storybook environment
        </h4>
        {options.map((opt) => (
          <div key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Radio
              name="storybook-env"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => setValue(opt.value)}
              label={opt.label}
            />
            <span className="text-tag" style={{ color: 'var(--color-font-neutral-muted)' }}>{opt.hint}</span>
          </div>
        ))}
      </div>
    );
  }
};

/** Choice cards with hover */
export const CardChoices: Story = {
  render: () => {
    const [value, setValue] = React.useState('portal');
    const cards = [
      { id: 'portal', title: 'Portal', desc: 'Hub + docs', badge: 'Docs' },
      { id: 'vue', title: 'Vue Storybook', desc: 'Storybook + Vitest', badge: 'Vue' },
      { id: 'react', title: 'React Storybook', desc: 'Storybook + Vitest', badge: 'React' }
    ];

    return (
      <div style={{ display: 'grid', gap: '12px' }}>
        {cards.map((card) => {
          const isSelected = value === card.id;
          return (
            <label
              key={card.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                borderRadius: 'var(--radius-card)',
                border: `1px solid ${isSelected ? 'var(--color-stroke-primary-base)' : 'var(--color-border-base)'}`,
                background: isSelected ? 'color-mix(in srgb, var(--accent) 8%, var(--card))' : 'var(--card)',
                boxShadow: 'var(--elevation-xs, 0 6px 18px rgba(0,0,0,0.06))',
                cursor: 'pointer',
                transition: 'transform 0.18s var(--ease-out-expo, cubic-bezier(0.22,1,0.36,1)), border-color 0.2s'
              }}
            >
              <Radio
                name="radio-card"
                value={card.id}
                checked={isSelected}
                onChange={() => setValue(card.id)}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="text-label-medium" style={{ color: 'var(--color-font-primary-base)', fontWeight: 700 }}>
                    {card.title}
                  </span>
                  <span className="text-tag" style={{
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--accent)',
                    color: 'var(--accent-foreground)'
                  }}>
                    {card.badge}
                  </span>
                </div>
                <span className="text-tag" style={{ color: 'var(--color-font-neutral-muted)' }}>{card.desc}</span>
              </div>
            </label>
          );
        })}
      </div>
    );
  }
};

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
// Radio contrôlé
const [value, setValue] = useState('a');

<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
  <Radio checked={value === 'a'} onChange={() => setValue('a')} label="Option A" />
  <Radio checked={value === 'b'} onChange={() => setValue('b')} label="Option B" />
</div>
\`\`\`

Sémantique : couleurs et rayons issus des tokens (ex. var(--color-bg-primary-base), var(--radius-md)).`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'État sélectionné'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le radio'
    },
    label: {
      control: 'text',
      description: 'Libellé adjacent'
    },
    name: { control: 'text', description: 'Attribut name du groupe' },
    value: { control: 'text', description: 'Valeur associée' },
    onChange: {
      action: 'changed',
      description: 'Callback lors du changement'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Radio>;

/**
 * Interactive playground (contrôlé)
 */
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
    label: 'Choisir cette option'
  }
};

/**
 * États principaux : non sélectionné vs sélectionné
 */
export const SelectionStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <Radio checked={false} label="Non sélectionné" />
      <Radio checked={true} label="Sélectionné" />
    </div>
  )
};

/**
 * États désactivés
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <Radio checked={false} disabled label="Désactivé" />
      <Radio checked={true} disabled label="Désactivé (sélectionné)" />
    </div>
  )
};

/**
 * Groupe exclusif avec tokens sémantiques
 */
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
          Sélectionne ton environnement Storybook
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

/**
 * Carte de choix avec survol
 */
export const CardChoices: Story = {
  render: () => {
    const [value, setValue] = React.useState('portal');
    const cards = [
      { id: 'portal', title: 'Portal', desc: 'Hub + docs', badge: 'Docs' },
      { id: 'wc', title: 'Web Components', desc: 'Stencil + multi-framework', badge: 'WC' },
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

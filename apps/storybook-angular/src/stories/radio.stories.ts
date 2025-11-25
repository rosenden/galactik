import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { RadioComponent } from 'angular-ui/components/radio/radio.component';

const meta: Meta<RadioComponent> = {
  title: 'Electrons/Radio',
  component: RadioComponent,
  decorators: [
    moduleMetadata({
      imports: [RadioComponent]
    })
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`html
<oc-radio name="group" value="a" [checked]="true" label="Option A"></oc-radio>
<oc-radio name="group" value="b" [checked]="false" label="Option B"></oc-radio>
\`\`\`
Semantic tokens: var(--color-stroke-primary-base), var(--color-font-neutral-disabled).`
      }
    }
  },
  argTypes: {
    checked: { control: 'boolean', description: 'Checked state' },
    disabled: { control: 'boolean', description: 'Disables the radio' },
    label: { control: 'text', description: 'Label next to the control' },
    name: { control: 'text', description: 'HTML name for grouping' },
    value: { control: 'text', description: 'Associated value' },
    change: { action: 'changed' }
  }
};

export default meta;
type Story = StoryObj<RadioComponent>;

export const Playground: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Choose this option'
  }
};

export const SelectionStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <oc-radio [checked]="false" label="Unchecked"></oc-radio>
        <oc-radio [checked]="true" label="Checked"></oc-radio>
      </div>
    `
  })
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <oc-radio [checked]="false" [disabled]="true" label="Disabled"></oc-radio>
        <oc-radio [checked]="true" [disabled]="true" label="Disabled (checked)"></oc-radio>
      </div>
    `
  })
};

export const RadioGroup: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 10px; padding: 16px; border: 1px solid var(--color-border-base); border-radius: var(--radius-md); background: var(--color-background-alt);">
        <h4 style="margin:0; font-size:14px; font-weight:700; color:var(--color-font-neutral-base);">Pick your Storybook environment</h4>
        <div style="display:flex; align-items:center; gap:10px;">
          <oc-radio name="storybook-env" value="react" [checked]="true" label="React"></oc-radio>
          <span class="text-tag" style="color: var(--color-font-neutral-muted);">Storybook + Vitest</span>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <oc-radio name="storybook-env" value="vue" [checked]="false" label="Vue"></oc-radio>
          <span class="text-tag" style="color: var(--color-font-neutral-muted);">Vue 3 + TS</span>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <oc-radio name="storybook-env" value="angular" [checked]="false" label="Angular"></oc-radio>
          <span class="text-tag" style="color: var(--color-font-neutral-muted);">Angular 17 + TS</span>
        </div>
      </div>
    `
  })
};

export const CardChoices: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 12px;">
        <label
          *ngFor="let card of cards"
          [style.display]="'flex'"
          [style.alignItems]="'center'"
          [style.gap.px]="12"
          [style.padding]="'14px 16px'"
          [style.borderRadius]="'var(--radius-card)'"
          [style.border]="card.id === selected ? '1px solid var(--color-stroke-primary-base)' : '1px solid var(--color-border-base)'"
          [style.background]="card.id === selected ? 'color-mix(in srgb, var(--accent) 8%, var(--card))' : 'var(--card)'"
          style="box-shadow: var(--elevation-xs, 0 6px 18px rgba(0,0,0,0.06)); cursor: pointer; transition: transform 0.18s var(--ease-out-expo, cubic-bezier(0.22,1,0.36,1)), border-color 0.2s;"
        >
          <oc-radio
            name="radio-card"
            [value]="card.id"
            [checked]="selected === card.id"
            (change)="selected = card.id"
          ></oc-radio>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="text-label-medium" style="color: var(--color-font-primary-base); font-weight: 700;">
                {{ card.title }}
              </span>
              <span class="text-tag" style="padding: 4px 8px; border-radius: var(--radius-sm); background: var(--accent); color: var(--accent-foreground);">
                {{ card.badge }}
              </span>
            </div>
            <span class="text-tag" style="color: var(--color-font-neutral-muted);">
              {{ card.desc }}
            </span>
          </div>
        </label>
      </div>
    `,
    props: {
      selected: 'portal',
      cards: [
        { id: 'portal', title: 'Portal', desc: 'Hub + docs', badge: 'Docs' },
        { id: 'vue', title: 'Vue Storybook', desc: 'Storybook + Vitest', badge: 'Vue' },
        { id: 'react', title: 'React Storybook', desc: 'Storybook + Vitest', badge: 'React' }
      ]
    }
  })
};

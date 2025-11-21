import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CheckboxComponent } from 'angular-ui/components/checkbox/checkbox.component';

type Story = StoryObj<CheckboxComponent>;

const meta: Meta<CheckboxComponent> = {
  title: 'Electrons/Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CheckboxComponent]
    })
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`html
<oc-checkbox [(checked)]="isChecked" label="I accept the terms"></oc-checkbox>
<oc-checkbox [checked]="false" indeterminate label="Partial selection"></oc-checkbox>
<oc-checkbox [checked]="true" disabled label="Disabled option"></oc-checkbox>
\`\`\`
`
      }
    }
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is selected'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Displays the horizontal bar for the indeterminate state'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox'
    },
    label: {
      control: 'text',
      description: 'Text displayed to the right'
    }
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    label: 'Check me'
  }
};

export default meta;

export const Playground: Story = {
  render: (args) => ({
    props: {
      ...args,
      checkedState: args.checked ?? false
    },
    template: `
      <oc-checkbox
        [(checked)]="checkedState"
        [indeterminate]="indeterminate"
        [disabled]="disabled"
        [label]="label"
      ></oc-checkbox>
    `
  })
};

export const SelectionStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <oc-checkbox [checked]="false" label="Unselected"></oc-checkbox>
        <oc-checkbox [checked]="true" label="Selected"></oc-checkbox>
        <oc-checkbox [checked]="false" indeterminate label="Indeterminate (minus)"></oc-checkbox>
      </div>
    `
  })
};

export const WithLabel: Story = {
  render: () => ({
    props: {
      checked: false
    },
    template: `
      <oc-checkbox
        [(checked)]="checked"
        label="I accept the terms and conditions"
      ></oc-checkbox>
    `
  })
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <oc-checkbox [checked]="false" disabled label="Disabled unchecked"></oc-checkbox>
        <oc-checkbox [checked]="true" disabled label="Disabled checked"></oc-checkbox>
        <oc-checkbox [checked]="false" indeterminate disabled label="Disabled indeterminate"></oc-checkbox>
      </div>
    `
  })
};

export const CheckboxGroup: Story = {
  render: () => ({
    props: {
      options: {
        option1: false,
        option2: true,
        option3: false,
        option4: true
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <h4 style="margin: 0; font-size: 14px; font-weight: 600; color: var(--color-font-neutral-base);">
          Choose your preferences
        </h4>
        <oc-checkbox [(checked)]="options.option1" label="Email notifications"></oc-checkbox>
        <oc-checkbox [(checked)]="options.option2" label="Dark mode"></oc-checkbox>
        <oc-checkbox [(checked)]="options.option3" label="Anonymous sharing"></oc-checkbox>
        <oc-checkbox [(checked)]="options.option4" label="Newsletter"></oc-checkbox>
      </div>
    `
  })
};

export const SelectAllPattern: Story = {
  render: () => ({
    props: ((items) => ({
      items,
      allChecked: () => Object.values(items).every(Boolean),
      someChecked: () => {
        const values = Object.values(items);
        return values.some(Boolean) && !values.every(Boolean);
      },
      handleSelectAll: (value: boolean) => {
        Object.keys(items).forEach((key) => {
          items[key as keyof typeof items] = value;
        });
      }
    }))({
      item1: false,
      item2: true,
      item3: false
    }),
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px; background-color: var(--color-background-alt); border-radius: var(--radius-md);">
        <oc-checkbox
          [checked]="allChecked()"
          [indeterminate]="someChecked()"
          (checkedChange)="handleSelectAll($event)"
          label="Select all"
        ></oc-checkbox>
        <div style="height: 1px; background-color: var(--color-border-base); margin: 4px 0;"></div>
        <div style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px;">
          <oc-checkbox [(checked)]="items.item1" label="Item 1"></oc-checkbox>
          <oc-checkbox [(checked)]="items.item2" label="Item 2"></oc-checkbox>
          <oc-checkbox [(checked)]="items.item3" label="Item 3"></oc-checkbox>
        </div>
      </div>
    `
  })
};

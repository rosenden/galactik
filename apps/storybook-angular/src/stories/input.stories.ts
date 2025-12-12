import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from 'angular-ui/components/input/input.component';
import type { InputSize, InputVariant, InputType } from 'angular-ui/components/input/input.component';

const meta: Meta<InputComponent> = {
  title: 'Electrons/Input',
  component: InputComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`typescript
// Basic input
import { InputComponent } from '@galactik/angular-ui';

<oc-input 
  [(value)]="textValue"
  placeholder="Enter text..."
></oc-input>

// Different sizes
<oc-input [(value)]="value" size="small"></oc-input>
<oc-input [(value)]="value" size="medium"></oc-input>
<oc-input [(value)]="value" size="large"></oc-input>

// With icons (using Font Awesome class names)
<oc-input 
  [(value)]="value"
  iconLeft="fa-solid fa-search"
  placeholder="Search..."
></oc-input>

// Number input with controls
<oc-input 
  [(value)]="value"
  type="number"
  [showNumberControls]="true"
></oc-input>

// With character counter
<oc-input 
  [(value)]="value"
  [maxLength]="320"
  placeholder="Enter message"
></oc-input>

// Variants
<oc-input [(value)]="value" variant="success"></oc-input>
<oc-input [(value)]="value" variant="error"></oc-input>

// States
<oc-input [(value)]="value" [disabled]="true"></oc-input>
<oc-input [(value)]="value" [readonly]="true"></oc-input>
\`\`\``,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size from Figma oc-input variants (small: 24px, medium: 36px, large: 44px)',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'error'],
      description: 'Visual variant',
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
      description: 'Placeholder text',
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
      description: 'Show character counter even without maxLength',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showNumberControls: {
      control: 'boolean',
      description: 'Show number increment/decrement controls (default true for type="number")',
    },
    iconLeft: {
      control: 'text',
      description: 'Font Awesome icon classes for left icon (e.g. "fa-solid fa-search")',
    },
    iconRight: {
      control: 'text',
      description: 'Font Awesome icon classes for right icon(s)',
    },
    value: {
      control: 'text',
      description: 'Current input value',
    },
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Playground: Story = {
  args: {
    placeholder: 'Lorem ipsum',
    size: 'medium',
    variant: 'default',
    type: 'text',
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Small (24px)</h3>
          <oc-input 
            size="small" 
            placeholder="Small input" 
            iconLeft="fa-solid fa-search">
          </oc-input>
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Medium (36px) - default</h3>
          <oc-input 
            size="medium" 
            placeholder="Medium input" 
            iconLeft="fa-solid fa-search">
          </oc-input>
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Large (44px)</h3>
          <oc-input 
            size="large" 
            placeholder="Large input" 
            iconLeft="fa-solid fa-search">
          </oc-input>
        </div>
      </div>
    `,
  }),
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Empty (placeholder)</h3>
          <oc-input 
            placeholder="Lorem ipsum" 
            iconLeft="fa-solid fa-search">
          </oc-input>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Filled (with value)</h3>
          <oc-input 
            value="Some text here" 
            iconLeft="fa-solid fa-search">
          </oc-input>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Hover (hover over the input below)</h3>
          <oc-input 
            placeholder="Hover me" 
            iconLeft="fa-solid fa-search">
          </oc-input>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Focus / Active (click or tab to the input)</h3>
          <oc-input 
            placeholder="Click or Tab here" 
            iconLeft="fa-solid fa-search">
          </oc-input>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">Focus (Tab) shows violet outline, Active (click) shows primary border</p>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Disabled</h3>
          <oc-input 
            [disabled]="true" 
            placeholder="Disabled input" 
            iconLeft="fa-solid fa-search">
          </oc-input>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Readonly</h3>
          <oc-input 
            [readonly]="true" 
            value="Readonly text" 
            iconLeft="fa-solid fa-search">
          </oc-input>
        </div>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Default</h3>
          <oc-input 
            variant="default" 
            placeholder="Default input" 
            iconLeft="fa-solid fa-search">
          </oc-input>
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Success</h3>
          <oc-input 
            variant="success" 
            value="Valid input" 
            iconLeft="fa-solid fa-search">
          </oc-input>
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Error</h3>
          <oc-input 
            variant="error" 
            value="Invalid input" 
            iconLeft="fa-solid fa-search">
          </oc-input>
        </div>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Icon left</h3>
          <oc-input 
            iconLeft="fa-solid fa-search" 
            placeholder="Search...">
          </oc-input>
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Email icon</h3>
          <oc-input 
            iconLeft="fa-solid fa-envelope" 
            placeholder="Email address" 
            type="email">
          </oc-input>
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">User icon</h3>
          <oc-input 
            iconLeft="fa-solid fa-user" 
            placeholder="Username">
          </oc-input>
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Password with icon</h3>
          <oc-input 
            iconLeft="fa-solid fa-lock" 
            placeholder="Password" 
            type="password">
          </oc-input>
        </div>
      </div>
    `,
  }),
};

export const WithCounter: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">With maxLength counter</h3>
          <oc-input 
            [maxLength]="320" 
            placeholder="Enter your message...">
          </oc-input>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">Shows "0/320" format</p>
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Tweet (280 chars)</h3>
          <oc-input 
            [maxLength]="280" 
            placeholder="What's happening?">
          </oc-input>
        </div>
      </div>
    `,
  }),
};

export const NumberInput: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Small (horizontal controls)</h3>
          <oc-input 
            type="number" 
            size="small" 
            placeholder="0">
          </oc-input>
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Medium (vertical controls)</h3>
          <oc-input 
            type="number" 
            size="medium" 
            placeholder="0">
          </oc-input>
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Large (vertical controls)</h3>
          <oc-input 
            type="number" 
            size="large" 
            placeholder="0">
          </oc-input>
        </div>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  render: () => ({
    props: {
      username: '',
      email: '',
      password: '',
      message: '',
    },
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 400px; padding: 32px; background: #F8F9FA; border-radius: 12px;">
        <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #333;">Sign Up Form</h2>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #333;">Username</label>
          <oc-input 
            [(value)]="username"
            iconLeft="fa-solid fa-user" 
            placeholder="Choose a username"
            size="large">
          </oc-input>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #333;">Email</label>
          <oc-input 
            [(value)]="email"
            iconLeft="fa-solid fa-envelope" 
            placeholder="your@email.com"
            type="email"
            size="large"
            [variant]="email && email.includes('@') ? 'success' : 'default'">
          </oc-input>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #333;">Password</label>
          <oc-input 
            [(value)]="password"
            iconLeft="fa-solid fa-lock" 
            placeholder="Choose a strong password"
            type="password"
            size="large"
            [variant]="password.length >= 8 ? 'success' : password.length > 0 ? 'error' : 'default'">
          </oc-input>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">Minimum 8 characters</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #333;">Bio</label>
          <oc-input 
            [(value)]="message"
            placeholder="Tell us about yourself..."
            [maxLength]="280"
            size="large">
          </oc-input>
        </div>
        
        <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px; font-size: 14px;">
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Values:</h3>
          <p style="margin: 4px 0;"><strong>Username:</strong> {{ username || '(empty)' }}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> {{ email || '(empty)' }}</p>
          <p style="margin: 4px 0;"><strong>Password:</strong> {{ password ? '•'.repeat(password.length) : '(empty)' }}</p>
          <p style="margin: 4px 0;"><strong>Bio:</strong> {{ message || '(empty)' }} ({{ message.length }}/280)</p>
        </div>
      </div>
    `,
  }),
};

import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import Input from '../../../../packages/vue-ui/src/components/Input/Input.vue';
import { faSearch, faEnvelope, faUser, faLock } from '@fortawesome/pro-regular-svg-icons';

const meta: Meta = {
  title: 'Electrons/Input',
  component: Input,
  parameters: { 
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`vue
<!-- Basic input -->
<Input 
  v-model="value"
  placeholder="Enter text..."
/>

<!-- Different sizes -->
<Input v-model="value" size="small" />
<Input v-model="value" size="medium" />
<Input v-model="value" size="large" />

<!-- With icons -->
<Input 
  v-model="value"
  :iconLeft="faSearch"
  placeholder="Search..."
/>

<!-- Number input with controls -->
<Input 
  v-model="value"
  type="number"
  :showNumberControls="true"
/>

<!-- With character counter -->
<Input 
  v-model="value"
  :maxLength="320"
  placeholder="Enter message"
/>

<!-- Variants -->
<Input v-model="value" variant="success" />
<Input v-model="value" variant="error" />

<!-- States -->
<Input v-model="value" :disabled="true" />
<Input v-model="value" :readonly="true" />
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
      description: 'Size from Figma oc-input variants (small: 24px, medium: 36px, large: 44px)'
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'error'],
      description: 'Visual variant'
    },
    type: {
      control: 'select',
      options: ['text', 'number', 'email', 'password', 'tel', 'url'],
      description: 'HTML input type'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled'
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is readonly'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length (shows counter)'
    },
    showCounter: {
      control: 'boolean',
      description: 'Show character counter even without maxLength'
    },
    showNumberControls: {
      control: 'boolean',
      description: 'Show number increment/decrement controls (default true for type="number")'
    }
  },
  args: {
    placeholder: 'Lorem ipsum',
    size: 'medium',
    variant: 'default',
    type: 'text',
    disabled: false,
    readonly: false,
    showCounter: false
  }
};

export default meta;
type Story = StoryObj;

/**
 * Interactive playground
 */
export const Playground: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value, args };
    },
    template: '<div style="padding: 24px;"><Input v-model="value" v-bind="args" /></div>'
  })
};

/**
 * All sizes from Figma
 */
export const AllSizes: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const valueSmall = ref('');
      const valueMedium = ref('');
      const valueLarge = ref('');
      return { valueSmall, valueMedium, valueLarge, faSearch };
    },
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Small (24px)</h3>
          <Input v-model="valueSmall" size="small" placeholder="Small input" :iconLeft="faSearch" />
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Medium (36px) - default</h3>
          <Input v-model="valueMedium" size="medium" placeholder="Medium input" :iconLeft="faSearch" />
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Large (44px)</h3>
          <Input v-model="valueLarge" size="large" placeholder="Large input" :iconLeft="faSearch" />
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
    components: { Input },
    setup() {
      const emptyValue = ref('');
      const filledValue = ref('Some text here');
      const hoverValue = ref('');
      const focusValue = ref('');
      const disabledValue = ref('');
      const readonlyValue = ref('Readonly text');
      return { emptyValue, filledValue, hoverValue, focusValue, disabledValue, readonlyValue, faSearch };
    },
    template: `
      <div style="display: flex; gap: 32px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Empty (placeholder)</h3>
          <Input v-model="emptyValue" placeholder="Lorem ipsum" :iconLeft="faSearch" />
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Filled (with value)</h3>
          <Input v-model="filledValue" :iconLeft="faSearch" />
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Hover (hover over the input below)</h3>
          <Input v-model="hoverValue" placeholder="Hover me" :iconLeft="faSearch" />
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Focus / Active (click or tab to the input)</h3>
          <Input v-model="focusValue" placeholder="Click or Tab here" :iconLeft="faSearch" />
          <p style="margin-top: 8px; font-size: 12px; color: #666;">Focus (Tab) shows violet outline, Active (click) shows primary border</p>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Disabled</h3>
          <Input v-model="disabledValue" :disabled="true" placeholder="Disabled input" :iconLeft="faSearch" />
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Readonly</h3>
          <Input v-model="readonlyValue" :readonly="true" :iconLeft="faSearch" />
        </div>
      </div>
    `
  })
};

/**
 * Variants
 */
export const Variants: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const defaultValue = ref('');
      const successValue = ref('Valid input');
      const errorValue = ref('Invalid input');
      return { defaultValue, successValue, errorValue, faSearch };
    },
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Default</h3>
          <Input v-model="defaultValue" variant="default" placeholder="Default input" :iconLeft="faSearch" />
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Success</h3>
          <Input v-model="successValue" variant="success" :iconLeft="faSearch" />
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Error</h3>
          <Input v-model="errorValue" variant="error" :iconLeft="faSearch" />
        </div>
      </div>
    `
  })
};

/**
 * With icons
 */
export const WithIcons: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const searchValue = ref('');
      const emailValue = ref('');
      const userValue = ref('');
      const passwordValue = ref('');
      return { searchValue, emailValue, userValue, passwordValue, faSearch, faEnvelope, faUser, faLock };
    },
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Icon left</h3>
          <Input v-model="searchValue" :iconLeft="faSearch" placeholder="Search..." />
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Email icon</h3>
          <Input v-model="emailValue" :iconLeft="faEnvelope" placeholder="Email address" type="email" />
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">User icon</h3>
          <Input v-model="userValue" :iconLeft="faUser" placeholder="Username" />
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Password with icon</h3>
          <Input v-model="passwordValue" :iconLeft="faLock" placeholder="Password" type="password" />
        </div>
      </div>
    `
  })
};

/**
 * With character counter
 */
export const WithCounter: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const messageValue = ref('');
      const tweetValue = ref('');
      return { messageValue, tweetValue };
    },
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">With maxLength counter</h3>
          <Input v-model="messageValue" :maxLength="320" placeholder="Enter your message..." />
          <p style="margin-top: 8px; font-size: 12px; color: #666;">Shows "0/320" format</p>
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Tweet (280 chars)</h3>
          <Input v-model="tweetValue" :maxLength="280" placeholder="What's happening?" />
        </div>
      </div>
    `
  })
};

/**
 * Number input with controls
 */
export const NumberInput: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const quantitySmall = ref('0');
      const quantityMedium = ref('0');
      const quantityLarge = ref('0');
      return { quantitySmall, quantityMedium, quantityLarge };
    },
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 320px;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Small (horizontal controls)</h3>
          <Input v-model="quantitySmall" type="number" size="small" placeholder="0" />
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Medium (vertical controls)</h3>
          <Input v-model="quantityMedium" type="number" size="medium" placeholder="0" />
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Large (vertical controls)</h3>
          <Input v-model="quantityLarge" type="number" size="large" placeholder="0" />
        </div>
      </div>
    `
  })
};

/**
 * Interactive example with real-time feedback
 */
export const Interactive: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const username = ref('');
      const email = ref('');
      const password = ref('');
      const message = ref('');
      return { username, email, password, message, faUser, faEnvelope, faLock };
    },
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column; width: 400px; padding: 32px; background: #F8F9FA; border-radius: 12px;">
        <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #333;">Sign Up Form</h2>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #333;">Username</label>
          <Input 
            v-model="username" 
            :iconLeft="faUser" 
            placeholder="Choose a username"
            size="large"
          />
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #333;">Email</label>
          <Input 
            v-model="email" 
            :iconLeft="faEnvelope" 
            placeholder="your@email.com"
            type="email"
            size="large"
            :variant="email && email.includes('@') ? 'success' : 'default'"
          />
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #333;">Password</label>
          <Input 
            v-model="password" 
            :iconLeft="faLock" 
            placeholder="Choose a strong password"
            type="password"
            size="large"
            :variant="password.length >= 8 ? 'success' : password.length > 0 ? 'error' : 'default'"
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">Minimum 8 characters</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #333;">Bio</label>
          <Input 
            v-model="message" 
            placeholder="Tell us about yourself..."
            :maxLength="280"
            size="large"
          />
        </div>
        
        <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px; font-size: 14px;">
          <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #666;">Values:</h3>
          <p style="margin: 4px 0;"><strong>Username:</strong> {{ username || '(empty)' }}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> {{ email || '(empty)' }}</p>
          <p style="margin: 4px 0;"><strong>Password:</strong> {{ password ? '•'.repeat(password.length) : '(empty)' }}</p>
          <p style="margin: 4px 0;"><strong>Bio:</strong> {{ message || '(empty)' }} ({{ message.length }}/280)</p>
        </div>
      </div>
    `
  })
};

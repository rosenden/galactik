import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Link from '../../../../packages/vue-ui/src/components/Link/Link.vue';
import { faArrowUpRight, faExternalLink, faDownload } from '@fortawesome/pro-regular-svg-icons';

const meta: Meta = {
  title: 'Electrons/Link',
  component: Link,
  parameters: { 
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`vue
<!-- Basic link (default) -->
<Link href="https://example.com">
  Link label
</Link>

<!-- Different sizes -->
<Link size="sm" href="https://example.com">Small link</Link>
<Link size="md" href="https://example.com">Medium link</Link>
<Link size="lg" href="https://example.com">Large link</Link>

<!-- Visited state -->
<Link href="https://visited.com" :visited="true">
  Visited link
</Link>

<!-- Disabled -->
<Link href="https://example.com" :disabled="true">
  Disabled link
</Link>

<!-- With custom icons -->
<Link href="https://example.com" :icon="faExternalLink" target="_blank">
  External link
</Link>
<Link href="/download" :icon="faDownload">
  Download file
</Link>

<!-- Without icon -->
<Link href="https://example.com" :icon="null">
  No icon
</Link>

<!-- With new tab -->
<Link href="https://example.com" target="_blank">
  Open in new tab
</Link>
\`\`\`
`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'Target URL'
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Link size (sm: 12px, md: 14px, lg: 16px)'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the link'
    },
    visited: {
      control: 'boolean',
      description: 'Show as visited state'
    },
    active: {
      control: 'boolean',
      description: 'Show as active state (current page)'
    },
    icon: {
      control: false,
      description: 'FontAwesome icon (defaults to faArrowUpRight)'
    },
    target: {
      control: 'select',
      options: [null, '_blank', '_self', '_parent', '_top'],
      description: 'Target attribute for link'
    }
  },
  args: {
    href: 'https://example.com',
    size: 'md',
    disabled: false,
    visited: false,
    active: false,
    icon: faArrowUpRight
  }
};

export default meta;
type Story = StoryObj;

/**
 * Interactive playground
 */
export const Playground: Story = {
  render: (args) => ({
    components: { Link },
    setup() {
      return { args };
    },
    template: '<Link v-bind="args">Link label</Link>'
  })
};

/**
 * All sizes from Figma
 */
export const AllSizes: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column;">
        <div>
          <span style="font-size: 12px; font-weight: 600; color: #666; margin-right: 12px;">Small</span>
          <Link href="https://example.com" size="sm">Small link</Link>
        </div>
        <div>
          <span style="font-size: 12px; font-weight: 600; color: #666; margin-right: 12px;">Medium (default)</span>
          <Link href="https://example.com" size="md">Medium link</Link>
        </div>
        <div>
          <span style="font-size: 12px; font-weight: 600; color: #666; margin-right: 12px;">Large</span>
          <Link href="https://example.com" size="lg">Large link</Link>
        </div>
      </div>
    `
  })
};

/**
 * Different states
 */
export const States: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; gap: 32px; flex-direction: column;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Default</h3>
          <Link href="https://example.com">Default link</Link>
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Hovered (hover to see)</h3>
          <Link href="https://example.com">Hover link</Link>
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Visited</h3>
          <Link href="https://example.com" :visited="true">Visited link</Link>
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Active (current page)</h3>
          <Link href="https://example.com" :active="true">Active link</Link>
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Focused (Tab key)</h3>
          <Link href="https://example.com">Focused link</Link>
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Disabled</h3>
          <Link href="https://example.com" :disabled="true">Disabled link</Link>
        </div>
      </div>
    `
  })
};

/**
 * Custom icons examples
 */
export const WithCustomIcons: Story = {
  render: () => ({
    components: { Link },
    setup() {
      return { faArrowUpRight, faExternalLink, faDownload };
    },
    template: `
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <Link href="https://example.com" :icon="faArrowUpRight">Default arrow</Link>
        <Link href="https://example.com" :icon="faExternalLink">External link</Link>
        <Link href="/download" :icon="faDownload">Download</Link>
      </div>
    `
  })
};

/**
 * Links without icon
 */
export const WithoutIcon: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <Link href="https://example.com" :icon="null">No icon (small)</Link>
        <Link href="https://example.com" size="md" :icon="null">No icon (medium)</Link>
        <Link href="https://example.com" size="lg" :icon="null">No icon (large)</Link>
      </div>
    `
  })
};

/**
 * External links with new tab
 */
export const ExternalLinks: Story = {
  render: () => ({
    components: { Link },
    setup() {
      return { faExternalLink };
    },
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column;">
        <Link href="https://example.com" target="_blank" :icon="faExternalLink">External link (new tab)</Link>
        <Link href="https://example.com" target="_blank" size="sm" :icon="faExternalLink">Small external</Link>
        <Link href="https://example.com" target="_blank" size="lg" :icon="faExternalLink">Large external</Link>
      </div>
    `
  })
};

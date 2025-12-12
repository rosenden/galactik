import type { Meta, StoryObj } from '@storybook/react';
import { Link } from 'react-ui/components/Link';
import type { LinkSize } from 'react-ui/components/Link/Link';
import { faArrowUpRight, faExternalLink, faDownload } from '@fortawesome/pro-regular-svg-icons';

const meta = {
  title: 'Electrons/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `@example
\`\`\`tsx
// Basic link (default)
<Link href="https://example.com">
  Link label
</Link>

// Different sizes
<Link size="sm" href="https://example.com">Small link</Link>
<Link size="md" href="https://example.com">Medium link</Link>
<Link size="lg" href="https://example.com">Large link</Link>

// With custom icons
import { faExternalLink, faDownload } from '@fortawesome/pro-regular-svg-icons';
<Link href="https://example.com" icon={faExternalLink} target="_blank">
  External link
</Link>
<Link href="/download" icon={faDownload}>
  Download file
</Link>

// Without icon
<Link href="https://example.com" icon={null}>
  No icon
</Link>

// Visited state
<Link href="https://visited.com" visited>
  Visited link
</Link>

// Disabled
<Link href="https://example.com" disabled>
  Disabled link
</Link>

// With new tab
<Link href="https://example.com" target="_blank">
  Open in new tab
</Link>
\`\`\``,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Link text content',
      defaultValue: 'Link label',
    },
    href: {
      control: 'text',
      description: 'Target URL',
      defaultValue: 'https://example.com',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Link size (sm: 12px, md: 14px, lg: 16px)',
      defaultValue: 'md',
    },
    icon: {
      control: false,
      description: 'FontAwesome icon (defaults to faArrowUpRight)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the link',
      defaultValue: false,
    },
    visited: {
      control: 'boolean',
      description: 'Show as visited state (purple color)',
      defaultValue: false,
    },
    target: {
      control: 'select',
      options: [undefined, '_blank', '_self', '_parent', '_top'],
      description: 'Target attribute for link',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    href: 'https://example.com',
    children: 'Link label',
    size: 'md',
  },
};

export const AllSizes: Story = {
  args: {
    href: 'https://example.com',
    children: 'Link',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
      <div>
        <span style={{ fontSize: '12px', fontWeight: '600', color: '#666', marginRight: '12px' }}>Small</span>
        <Link href="https://example.com" size="sm">
          Small link
        </Link>
      </div>
      <div>
        <span style={{ fontSize: '12px', fontWeight: '600', color: '#666', marginRight: '12px' }}>Medium (default)</span>
        <Link href="https://example.com" size="md">
          Medium link
        </Link>
      </div>
      <div>
        <span style={{ fontSize: '12px', fontWeight: '600', color: '#666', marginRight: '12px' }}>Large</span>
        <Link href="https://example.com" size="lg">
          Large link
        </Link>
      </div>
    </div>
  ),
};

export const States: Story = {
  args: {
    href: 'https://example.com',
    children: 'Link',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexDirection: 'column' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Default</h3>
        <Link href="https://example.com">
          Default link
        </Link>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Hovered (hover to see)</h3>
        <Link href="https://example.com">
          Hover link
        </Link>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Visited</h3>
        <Link href="https://example.com" visited>
          Visited link
        </Link>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Active (current page)</h3>
        <Link href="https://example.com" active>
          Active link
        </Link>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Focused (Tab key)</h3>
        <Link href="https://example.com">
          Focused link
        </Link>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Disabled</h3>
        <Link href="https://example.com" disabled>
          Disabled link
        </Link>
      </div>
    </div>
  ),
};

export const WithCustomIcons: Story = {
  args: {
    href: 'https://example.com',
    children: 'Link',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Link href="https://example.com" icon={faArrowUpRight}>
        Default arrow
      </Link>
      <Link href="https://example.com" icon={faExternalLink}>
        External link
      </Link>
      <Link href="/download" icon={faDownload}>
        Download
      </Link>
    </div>
  ),
};

export const WithoutIcon: Story = {
  args: {
    href: 'https://example.com',
    children: 'Link',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Link href="https://example.com" icon={null}>
        No icon (small)
      </Link>
      <Link href="https://example.com" size="md" icon={null}>
        No icon (medium)
      </Link>
      <Link href="https://example.com" size="lg" icon={null}>
        No icon (large)
      </Link>
    </div>
  ),
};

export const ExternalLinks: Story = {
  args: {
    href: 'https://example.com',
    children: 'Link',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
      <Link href="https://example.com" target="_blank" icon={faExternalLink}>
        External link (new tab)
      </Link>
      <Link href="https://example.com" target="_blank" size="sm" icon={faExternalLink}>
        Small external
      </Link>
      <Link href="https://example.com" target="_blank" size="lg" icon={faExternalLink}>
        Large external
      </Link>
    </div>
  ),
};

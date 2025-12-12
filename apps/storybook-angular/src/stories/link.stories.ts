import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LinkComponent } from '../../../../packages/angular-ui/src/components/link/link.component';

const meta: Meta<LinkComponent> = {
  title: 'Electrons/Link',
  component: LinkComponent,
  decorators: [
    moduleMetadata({
      imports: [LinkComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`html
<!-- Basic link (default with arrow icon) -->
<oc-link href="https://example.com">
  Link label
</oc-link>

<!-- Different sizes -->
<oc-link size="sm" href="https://example.com">Small link</oc-link>
<oc-link size="md" href="https://example.com">Medium link</oc-link>
<oc-link size="lg" href="https://example.com">Large link</oc-link>

<!-- With custom icons -->
<oc-link href="https://example.com" icon="fa-solid fa-external-link" target="_blank">
  External link
</oc-link>
<oc-link href="/download" icon="fa-solid fa-download">
  Download file
</oc-link>

<!-- Without icon -->
<oc-link href="https://example.com" [icon]="null">
  No icon
</oc-link>

<!-- Visited state -->
<oc-link href="https://visited.com" [visited]="true">
  Visited link
</oc-link>

<!-- Disabled -->
<oc-link href="https://example.com" [disabled]="true">
  Disabled link
</oc-link>

<!-- With new tab -->
<oc-link href="https://example.com" target="_blank">
  Open in new tab
</oc-link>
\`\`\``,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'Target URL',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Link size (sm: 12px, md: 14px, lg: 16px)',
    },
    icon: {
      control: false,
      description: 'FontAwesome icon (defaults to faArrowUpRight)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the link',
    },
    visited: {
      control: 'boolean',
      description: 'Show as visited state (purple color)',
    },
    active: {
      control: 'boolean',
      description: 'Show as active state (current page)',
    },
    target: {
      control: 'select',
      options: [undefined, '_blank', '_self', '_parent', '_top'],
      description: 'Target attribute for link',
    },
  },
};

export default meta;
type Story = StoryObj<LinkComponent>;

/**
 * Interactive playground
 */
export const Playground: Story = {
  args: {
    href: 'https://example.com',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <oc-link [href]="href" [size]="size">
        Link label
      </oc-link>
    `,
  }),
};

/**
 * All sizes from Figma
 */
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column;">
        <div>
          <span style="font-size: 12px; font-weight: 600; color: #666; margin-right: 12px;">Small</span>
          <oc-link href="https://example.com" size="sm">
            Small link
          </oc-link>
        </div>
        <div>
          <span style="font-size: 12px; font-weight: 600; color: #666; margin-right: 12px;">Medium (default)</span>
          <oc-link href="https://example.com" size="md">
            Medium link
          </oc-link>
        </div>
        <div>
          <span style="font-size: 12px; font-weight: 600; color: #666; margin-right: 12px;">Large</span>
          <oc-link href="https://example.com" size="lg">
            Large link
          </oc-link>
        </div>
      </div>
    `,
  }),
};

/**
 * All interactive states
 */
export const States: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px; flex-direction: column;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Default</h3>
          <oc-link href="https://example.com">
            Default link
          </oc-link>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Hovered (hover to see)</h3>
          <oc-link href="https://example.com">
            Hover link
          </oc-link>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Visited</h3>
          <oc-link href="https://example.com" [visited]="true">
            Visited link
          </oc-link>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Active (current page)</h3>
          <oc-link href="https://example.com" [active]="true">
            Active link
          </oc-link>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Focused (Tab key)</h3>
          <oc-link href="https://example.com">
            Focused link
          </oc-link>
        </div>

        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Disabled</h3>
          <oc-link href="https://example.com" [disabled]="true">
            Disabled link
          </oc-link>
        </div>
      </div>
    `,
  }),
};

/**
 * Links with custom icons
 */
export const WithCustomIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <oc-link href="https://example.com" icon="fa-solid fa-arrow-up-right">
          Default arrow
        </oc-link>
        <oc-link href="https://example.com" icon="fa-solid fa-external-link">
          External link
        </oc-link>
        <oc-link href="/download" icon="fa-solid fa-download">
          Download
        </oc-link>
      </div>
    `,
  }),
};

/**
 * Links without icons
 */
export const WithoutIcon: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <oc-link href="https://example.com" [icon]="null">
          No icon (small)
        </oc-link>
        <oc-link href="https://example.com" size="md" [icon]="null">
          No icon (medium)
        </oc-link>
        <oc-link href="https://example.com" size="lg" [icon]="null">
          No icon (large)
        </oc-link>
      </div>
    `,
  }),
};

/**
 * External links (open in new tab)
 */
export const ExternalLinks: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; flex-direction: column;">
        <oc-link href="https://example.com" target="_blank" icon="fa-solid fa-external-link">
          External link (new tab)
        </oc-link>
        <oc-link href="https://example.com" target="_blank" size="sm" icon="fa-solid fa-external-link">
          Small external
        </oc-link>
        <oc-link href="https://example.com" target="_blank" size="lg" icon="fa-solid fa-external-link">
          Large external
        </oc-link>
      </div>
    `,
  }),
};

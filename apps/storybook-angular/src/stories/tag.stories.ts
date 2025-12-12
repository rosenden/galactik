import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { TagComponent } from '../../../../packages/angular-ui/src/components/tag/tag.component';

const meta: Meta<TagComponent> = {
  title: 'Electrons/Tag',
  component: TagComponent,
  decorators: [
    moduleMetadata({
      imports: [TagComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`typescript
import { faTag, faChevronDown, faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';

// Medium tag with fill variant (default)
<oc-tag color="sage" variant="fill" size="medium">
  Sage Tag
</oc-tag>

// Small outline tag
<oc-tag color="pink" variant="outline" size="small">
  Pink Outline
</oc-tag>

// Different colors and variants
<oc-tag color="success" size="xsmall">Success</oc-tag>
<oc-tag color="error" variant="outline">Error</oc-tag>
<oc-tag color="info" size="small">Info</oc-tag>

// With icons
<oc-tag color="sage" [iconLeft]="faTag">
  Tagged
</oc-tag>
<oc-tag color="indigo" variant="outline" [iconRight]="faChevronDown">
  Dropdown
</oc-tag>

// With country flag
<oc-tag color="info" flag="FR">
  France
</oc-tag>

// Icons + Flag
<oc-tag color="warning" [iconLeft]="faTriangleExclamation" flag="US">
  US Alert
</oc-tag>
\`\`\``,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['sage', 'pink', 'almond', 'grey', 'yellow', 'warning', 'cherry', 'success', 'indigo', 'info', 'cyan', 'error'],
      description: 'Color from Figma oc-tag variants',
    },
    variant: {
      control: 'select',
      options: ['fill', 'outline'],
      description: 'Style variant: fill (solid) or outline (border only)',
    },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium'],
      description: 'Size from Figma specs (xsmall=18px, small=24px, medium=36px)',
    },
    iconLeft: {
      control: false,
      description: 'FontAwesome icon on the left side',
    },
    iconRight: {
      control: false,
      description: 'FontAwesome icon on the right side',
    },
    flag: {
      control: 'text',
      description: 'Country flag (ISO 3166-1 alpha-2 code, e.g. FR, US, GB)',
    },
  },
};

export default meta;
type Story = StoryObj<TagComponent>;

/**
 * Interactive playground
 */
export const Playground: Story = {
  args: {
    color: 'sage',
    variant: 'fill',
    size: 'small',
    iconLeft: 'fa-solid fa-tag',
  },
  render: (args) => ({
    props: args,
    template: `
      <oc-tag [color]="color" [variant]="variant" [size]="size" [iconLeft]="iconLeft">
        Tag label
      </oc-tag>
    `,
  }),
};

/**
 * All sizes from Figma
 */
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <span style="font-size: 12px; font-weight: 600; color: #666;">xSmall (18px)</span>
          <oc-tag color="sage" variant="fill" size="xsmall">Tag label</oc-tag>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <span style="font-size: 12px; font-weight: 600; color: #666;">Small (24px)</span>
          <oc-tag color="sage" variant="fill" size="small">Tag label</oc-tag>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <span style="font-size: 12px; font-weight: 600; color: #666;">Medium (36px)</span>
          <oc-tag color="sage" variant="fill" size="medium">Tag label</oc-tag>
        </div>
      </div>
    `,
  }),
};

/**
 * All 12 colors in fill and outline variants
 */
export const PaletteFill: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 800px;">
        <oc-tag color="sage" variant="fill">Sage</oc-tag>
        <oc-tag color="pink" variant="fill">Pink</oc-tag>
        <oc-tag color="almond" variant="fill">Almond</oc-tag>
        <oc-tag color="grey" variant="fill">Grey</oc-tag>
        <oc-tag color="yellow" variant="fill">Yellow</oc-tag>
        <oc-tag color="warning" variant="fill">Warning</oc-tag>
        <oc-tag color="cherry" variant="fill">Cherry</oc-tag>
        <oc-tag color="success" variant="fill">Success</oc-tag>
        <oc-tag color="indigo" variant="fill">Indigo</oc-tag>
        <oc-tag color="info" variant="fill">Info</oc-tag>
        <oc-tag color="cyan" variant="fill">Cyan</oc-tag>
        <oc-tag color="error" variant="fill">Error</oc-tag>
      </div>
    `,
  }),
};

export const PaletteOutline: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 800px;">
        <oc-tag color="sage" variant="outline">Sage</oc-tag>
        <oc-tag color="pink" variant="outline">Pink</oc-tag>
        <oc-tag color="almond" variant="outline">Almond</oc-tag>
        <oc-tag color="grey" variant="outline">Grey</oc-tag>
        <oc-tag color="yellow" variant="outline">Yellow</oc-tag>
        <oc-tag color="warning" variant="outline">Warning</oc-tag>
        <oc-tag color="cherry" variant="outline">Cherry</oc-tag>
        <oc-tag color="success" variant="outline">Success</oc-tag>
        <oc-tag color="indigo" variant="outline">Indigo</oc-tag>
        <oc-tag color="info" variant="outline">Info</oc-tag>
        <oc-tag color="cyan" variant="outline">Cyan</oc-tag>
        <oc-tag color="error" variant="outline">Error</oc-tag>
      </div>
    `,
  }),
};

/**
 * Tags with FontAwesome icons
 */
export const WithIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #333;">Left Icons</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <oc-tag color="sage" iconLeft="fa-solid fa-tag">
              Tagged
            </oc-tag>
            <oc-tag color="success" iconLeft="fa-solid fa-check">
              Verified
            </oc-tag>
            <oc-tag color="info" iconLeft="fa-solid fa-user">
              User
            </oc-tag>
            <oc-tag color="warning" iconLeft="fa-solid fa-triangle-exclamation">
              Alert
            </oc-tag>
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #333;">Right Icons</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <oc-tag color="sage" iconRight="fa-solid fa-tag">
              Tagged
            </oc-tag>
            <oc-tag color="success" iconRight="fa-solid fa-check">
              Verified
            </oc-tag>
            <oc-tag color="info" iconRight="fa-solid fa-user">
              User
            </oc-tag>
            <oc-tag color="warning" iconRight="fa-solid fa-triangle-exclamation">
              Alert
            </oc-tag>
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #333;">Both Icons</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <oc-tag color="sage" iconLeft="fa-solid fa-tag" iconRight="fa-solid fa-chevron-down">
              Tagged Item
            </oc-tag>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Tags with country flags
 */
export const WithFlags: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <oc-tag color="info" flag="FR">France</oc-tag>
        <oc-tag color="info" flag="US">United States</oc-tag>
        <oc-tag color="info" flag="GB">United Kingdom</oc-tag>
        <oc-tag color="info" flag="DE">Germany</oc-tag>
        <oc-tag color="info" flag="ES">Spain</oc-tag>
        <oc-tag color="info" flag="IT">Italy</oc-tag>
        <oc-tag color="info" flag="JP">Japan</oc-tag>
        <oc-tag color="info" flag="CA">Canada</oc-tag>
      </div>
    `,
  }),
};

/**
 * Complete size matrix for all colors
 */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 40px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">XSmall (18px)</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <oc-tag color="sage" size="xsmall">Sage</oc-tag>
            <oc-tag color="pink" size="xsmall">Pink</oc-tag>
            <oc-tag color="almond" size="xsmall">Almond</oc-tag>
            <oc-tag color="grey" size="xsmall">Grey</oc-tag>
            <oc-tag color="yellow" size="xsmall">Yellow</oc-tag>
            <oc-tag color="warning" size="xsmall">Warning</oc-tag>
            <oc-tag color="cherry" size="xsmall">Cherry</oc-tag>
            <oc-tag color="success" size="xsmall">Success</oc-tag>
            <oc-tag color="indigo" size="xsmall">Indigo</oc-tag>
            <oc-tag color="info" size="xsmall">Info</oc-tag>
            <oc-tag color="cyan" size="xsmall">Cyan</oc-tag>
            <oc-tag color="error" size="xsmall">Error</oc-tag>
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Small (24px)</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <oc-tag color="sage" size="small">Sage</oc-tag>
            <oc-tag color="pink" size="small">Pink</oc-tag>
            <oc-tag color="almond" size="small">Almond</oc-tag>
            <oc-tag color="grey" size="small">Grey</oc-tag>
            <oc-tag color="yellow" size="small">Yellow</oc-tag>
            <oc-tag color="warning" size="small">Warning</oc-tag>
            <oc-tag color="cherry" size="small">Cherry</oc-tag>
            <oc-tag color="success" size="small">Success</oc-tag>
            <oc-tag color="indigo" size="small">Indigo</oc-tag>
            <oc-tag color="info" size="small">Info</oc-tag>
            <oc-tag color="cyan" size="small">Cyan</oc-tag>
            <oc-tag color="error" size="small">Error</oc-tag>
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #333;">Medium (36px)</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <oc-tag color="sage" size="medium">Sage</oc-tag>
            <oc-tag color="pink" size="medium">Pink</oc-tag>
            <oc-tag color="almond" size="medium">Almond</oc-tag>
            <oc-tag color="grey" size="medium">Grey</oc-tag>
            <oc-tag color="yellow" size="medium">Yellow</oc-tag>
            <oc-tag color="warning" size="medium">Warning</oc-tag>
            <oc-tag color="cherry" size="medium">Cherry</oc-tag>
            <oc-tag color="success" size="medium">Success</oc-tag>
            <oc-tag color="indigo" size="medium">Indigo</oc-tag>
            <oc-tag color="info" size="medium">Info</oc-tag>
            <oc-tag color="cyan" size="medium">Cyan</oc-tag>
            <oc-tag color="error" size="medium">Error</oc-tag>
          </div>
        </div>
      </div>
    `,
  }),
};

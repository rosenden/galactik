import type { Meta, StoryObj } from '@storybook/react';
import { Tag, type TagProps } from 'react-ui/components/Tag';
import type { TagColor, TagVariant, TagSize } from 'react-ui/components/Tag/Tag';
import { faTag, faChevronDown, faCheck, faUser, faCircleInfo, faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';

const meta = {
  title: 'Electrons/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `@example
\`\`\`tsx
// Medium tag with fill variant (default)
import { faTag } from '@fortawesome/pro-regular-svg-icons';
<Tag variant="fill" color="sage" size="medium">
  Sage Tag
</Tag>

// Small outline tag
<Tag variant="outline" color="pink" size="small">
  Pink Outline
</Tag>

// Different colors and variants
<Tag variant="fill" color="success" size="xsmall">Success</Tag>
<Tag variant="outline" color="error" size="medium">Error</Tag>
<Tag variant="fill" color="info" size="small">Info</Tag>

// With icons
<Tag variant="fill" color="sage" size="medium" iconLeft={faTag}>
  Tagged
</Tag>
<Tag variant="outline" color="indigo" size="medium" iconRight={faChevronDown}>
  Dropdown
</Tag>

// With country flag
<Tag variant="fill" color="info" size="medium" flag="FR">
  France
</Tag>

// Icons + Flag
<Tag variant="fill" color="warning" size="medium" iconLeft={faTriangleExclamation} flag="US">
  US Alert
</Tag>
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
      defaultValue: 'sage',
    },
    variant: {
      control: 'select',
      options: ['fill', 'outline'],
      description: 'Style variant: fill (solid) or outline (border only)',
      defaultValue: 'fill',
    },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium'],
      description: 'Size from Figma specs (xsmall=18px, small=24px, medium=36px)',
      defaultValue: 'medium',
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
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    color: 'sage',
    variant: 'fill',
    size: 'medium',
    children: 'Tag label',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '12px', fontWeight: '600', color: '#666' }}>xSmall (18px)</span>
        <Tag color="sage" variant="fill" size="xsmall">
          Tag label
        </Tag>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '12px', fontWeight: '600', color: '#666' }}>Small (24px)</span>
        <Tag color="sage" variant="fill" size="small">
          Tag label
        </Tag>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '12px', fontWeight: '600', color: '#666' }}>Medium (36px)</span>
        <Tag color="sage" variant="fill" size="medium">
          Tag label
        </Tag>
      </div>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => {
    const colors: TagColor[] = ['sage', 'pink', 'almond', 'grey', 'yellow', 'warning', 'cherry', 'success', 'indigo', 'info', 'cyan', 'error'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Fill Variant */}
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Fill Variant</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {colors.map((color) => (
              <Tag key={`fill-${color}`} color={color} variant="fill" size="medium">
                {color}
              </Tag>
            ))}
          </div>
        </div>

        {/* Outline Variant */}
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Outline Variant</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {colors.map((color) => (
              <Tag key={`outline-${color}`} color={color} variant="outline" size="medium">
                {color}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const Grid: Story = {
  render: () => {
    const colors: TagColor[] = ['sage', 'pink', 'almond', 'grey', 'yellow', 'warning', 'cherry', 'success', 'indigo', 'info', 'cyan', 'error'];
    const sizes: TagSize[] = ['xsmall', 'small', 'medium'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {['fill', 'outline'].map((variantType) => (
          <div key={variantType}>
            <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', fontWeight: '700', color: '#333', textTransform: 'capitalize' }}>
              {variantType} Variant
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
              {sizes.map((size) => (
                <div key={`${variantType}-${size}`}>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: '#999' }}>
                    {size}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {colors.map((color) => (
                      <Tag key={`${variantType}-${color}-${size}`} color={color} variant={variantType as TagVariant} size={size}>
                        {color}
                      </Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Left Icons</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Tag color="sage" iconLeft={faTag}>
              Tagged
            </Tag>
            <Tag color="success" iconLeft={faCheck}>
              Verified
            </Tag>
            <Tag color="info" iconLeft={faUser}>
              User
            </Tag>
            <Tag color="warning" iconLeft={faTriangleExclamation}>
              Alert
            </Tag>
          </div>
        </div>

        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Right Icons</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Tag color="sage" iconRight={faTag}>
              Tagged
            </Tag>
            <Tag color="success" iconRight={faCheck}>
              Verified
            </Tag>
            <Tag color="info" iconRight={faUser}>
              User
            </Tag>
            <Tag color="warning" iconRight={faTriangleExclamation}>
              Alert
            </Tag>
          </div>
        </div>

        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Both Icons</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Tag color="sage" iconLeft={faTag} iconRight={faChevronDown}>
              Tagged Item
            </Tag>
          </div>
        </div>
      </div>
    );
  },
};

export const WithFlags: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Country Flags</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Tag color="sage" variant="fill" size="medium" flag="FR">
            France
          </Tag>
          <Tag color="info" variant="fill" size="medium" flag="US">
            United States
          </Tag>
          <Tag color="warning" variant="outline" size="medium" flag="GB">
            United Kingdom
          </Tag>
          <Tag color="error" variant="outline" size="medium" flag="DE">
            Germany
          </Tag>
          <Tag color="success" variant="fill" size="small" flag="ES">
            Spain
          </Tag>
          <Tag color="indigo" variant="fill" size="small" flag="IT">
            Italy
          </Tag>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Icons + Flags</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Tag color="info" variant="fill" size="medium" iconLeft={faCircleInfo} flag="FR">
            Info France
          </Tag>
          <Tag color="warning" variant="fill" size="medium" iconLeft={faTriangleExclamation} flag="US">
            US Alert
          </Tag>
          <Tag color="success" variant="outline" size="medium" iconLeft={faCheck} flag="GB">
            UK Verified
          </Tag>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Different Sizes</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag color="sage" variant="fill" size="xsmall" flag="JP">
            Japan
          </Tag>
          <Tag color="info" variant="fill" size="small" flag="CA">
            Canada
          </Tag>
          <Tag color="success" variant="fill" size="medium" flag="AU">
            Australia
          </Tag>
        </div>
      </div>
    </div>
  ),
};


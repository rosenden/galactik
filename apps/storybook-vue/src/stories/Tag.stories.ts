import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Tag from '../../../../packages/vue-ui/src/components/Tag/Tag.vue';

type TagColor = 'sage' | 'pink' | 'almond' | 'grey' | 'yellow' | 'warning' | 'cherry' | 'success' | 'indigo' | 'info' | 'cyan' | 'error';

const colorOptions: TagColor[] = [
  'sage',
  'pink',
  'almond',
  'grey',
  'yellow',
  'warning',
  'cherry',
  'success',
  'indigo',
  'info',
  'cyan',
  'error'
];

const meta: Meta = {
  title: 'Electrons/Tag',
  component: Tag,
  parameters: { 
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`vue
<!-- Tag with fill variant (default) -->
<Tag color="sage">Label</Tag>

<!-- Tag with outline variant -->
<Tag color="success" variant="outline">Success</Tag>

<!-- Tag with different sizes -->
<Tag size="xsmall">XSmall</Tag>
<Tag size="small">Small</Tag>
<Tag size="medium">Medium</Tag>

<!-- Tag with flag -->
<Tag flag="FR">France</Tag>
<Tag flag="US">USA</Tag>

<!-- Tag with colors -->
<Tag color="pink">Pink</Tag>
<Tag color="warning">Warning</Tag>
<Tag color="error">Error</Tag>
\`\`\`
`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: colorOptions,
      description: 'Tag color scheme (from Figma oc-tag variants)'
    },
    variant: {
      control: 'inline-radio',
      options: ['fill', 'outline'],
      description: 'Tag variant style (fill: solid, outline: border)'
    },
    size: {
      control: 'inline-radio',
      options: ['xsmall', 'small', 'medium'],
      description: 'Tag size (xsmall: 18px, small: 24px, medium: 36px)'
    },
    flag: {
      control: 'text',
      description: 'Country flag ISO code (ex: FR, US, GB)'
    }
  },
  args: {
    color: 'sage',
    variant: 'fill',
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj;

/**
 * Interactive playground
 */
export const Playground: Story = {
  render: (args) => ({
    components: { Tag },
    setup() {
      return { args };
    },
    template: '<Tag v-bind="args">Label</Tag>'
  })
};

/**
 * Basic examples (legacy name for compatibility)
 */
export const Examples: Story = {
  render: () => ({
    components: { Tag },
    template: `
      <div style="display:flex; gap:12px; padding: 24px; align-items:center; flex-wrap:wrap;">
        <Tag>Default</Tag>
        <Tag color="pink">Pink</Tag>
        <Tag color="success" variant="outline">Success outline</Tag>
        <Tag color="warning" size="small">Warning small</Tag>
        <Tag color="info" size="xsmall">Info xsmall</Tag>
        <Tag flag="FR">France</Tag>
      </div>
    `
  })
};

/**
 * Fill variant with all colors
 */
export const PaletteFill: Story = {
  name: 'Fill Colors',
  render: () => ({
    components: { Tag },
    setup() {
      return { colorOptions };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
        <Tag v-for="color in colorOptions" :key="color" :color="color" variant="fill">{{ color }}</Tag>
      </div>
    `
  })
};

/**
 * Outline variant with all colors
 */
export const PaletteOutline: Story = {
  name: 'Outline Colors',
  render: () => ({
    components: { Tag },
    setup() {
      return { colorOptions };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
        <Tag v-for="color in colorOptions" :key="color" :color="color" variant="outline">{{ color }}</Tag>
      </div>
    `
  })
};

/**
 * Different sizes from Figma
 */
export const Sizes: Story = {
  render: () => ({
    components: { Tag },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px;">XSmall (18px)</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Tag v-for="color in ['sage', 'pink', 'success', 'warning', 'info', 'error']" 
                 :key="color" 
                 :color="color" 
                 size="xsmall">{{ color }}</Tag>
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px;">Small (24px)</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Tag v-for="color in ['sage', 'pink', 'success', 'warning', 'info', 'error']" 
                 :key="color" 
                 :color="color" 
                 size="small">{{ color }}</Tag>
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px;">Medium (36px)</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Tag v-for="color in ['sage', 'pink', 'success', 'warning', 'info', 'error']" 
                 :key="color" 
                 :color="color" 
                 size="medium">{{ color }}</Tag>
          </div>
        </div>
      </div>
    `
  })
};

/**
 * Tags with Font Awesome icons
 */
export const WithIcons: Story = {
  render: () => ({
    components: { Tag },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #333;">Left Icons</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <Tag color="sage" icon-left="fa-solid fa-tag">Tagged</Tag>
            <Tag color="success" icon-left="fa-solid fa-check">Verified</Tag>
            <Tag color="info" icon-left="fa-solid fa-user">User</Tag>
            <Tag color="warning" icon-left="fa-solid fa-triangle-exclamation">Alert</Tag>
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #333;">Right Icons</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <Tag color="sage" icon-right="fa-solid fa-tag">Tagged</Tag>
            <Tag color="success" icon-right="fa-solid fa-check">Verified</Tag>
            <Tag color="info" icon-right="fa-solid fa-user">User</Tag>
            <Tag color="warning" icon-right="fa-solid fa-triangle-exclamation">Alert</Tag>
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #333;">Both Icons</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <Tag color="sage" icon-left="fa-solid fa-tag" icon-right="fa-solid fa-chevron-down">Tagged Item</Tag>
          </div>
        </div>
      </div>
    `
  })
};

/**
 * Tags with country flags
 */
export const WithFlags: Story = {
  render: () => ({
    components: { Tag },
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <Tag flag="FR" color="sage">France</Tag>
        <Tag flag="US" color="info">USA</Tag>
        <Tag flag="GB" color="indigo">UK</Tag>
        <Tag flag="DE" color="grey">Germany</Tag>
        <Tag flag="ES" color="warning">Spain</Tag>
        <Tag flag="IT" color="success">Italy</Tag>
      </div>
    `
  })
};

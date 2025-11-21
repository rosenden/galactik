import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BulletComponent } from 'angular-ui/components/bullet/bullet.component';

type Story = StoryObj<BulletComponent>;

/**
 * Bullet – Circular list marker
 *
 * Synchronized with the Figma Design System.
 * Use it to build custom bullet lists in different colors and sizes.
 */
const meta: Meta<BulletComponent> = {
  title: 'Electrons/Bullet',
  component: BulletComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BulletComponent]
    })
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `@example
\`\`\`html
<!-- Medium bullet (default) -->
<oc-bullet color="sage" size="medium"></oc-bullet>

<!-- Bullet small -->
<oc-bullet color="info" size="small"></oc-bullet>

<!-- Bullet extra small -->
<oc-bullet color="error" size="xsmall"></oc-bullet>

<!-- Different colors -->
<oc-bullet color="success"></oc-bullet>
<oc-bullet color="warning"></oc-bullet>
<oc-bullet color="pink"></oc-bullet>

<!-- In a list -->
<ul style="list-style: none; padding: 0">
  <li style="display: flex; align-items: center; gap: 8px">
    <oc-bullet color="success" size="small"></oc-bullet>
    <span>Item de liste 1</span>
  </li>
  <li style="display: flex; align-items: center; gap: 8px">
    <oc-bullet color="success" size="small"></oc-bullet>
    <span>Item de liste 2</span>
  </li>
</ul>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium'],
      description: 'Bullet size'
    },
    color: {
      control: 'select',
      options: ['sage', 'pink', 'almond', 'grey', 'success', 'warning', 'info', 'error'],
      description: 'Bullet color'
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Variant (primary: concentric circles, secondary: solid)'
    }
  }
};

export default meta;

/**
 * Playground interactif pour tester le composant
 */
export const Playground: Story = {
  args: {
    size: 'small',
    color: 'sage',
    variant: 'primary'
  }
};

/**
 * Palette de couleurs disponibles
 */
export const Colors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center; width: 100%;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <oc-bullet color="sage" size="medium"></oc-bullet>
          <span style="font-size: 11px; color: var(--color-font-neutral-base);">sage</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <oc-bullet color="pink" size="medium"></oc-bullet>
          <span style="font-size: 11px; color: var(--color-font-neutral-base);">pink</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <oc-bullet color="almond" size="medium"></oc-bullet>
          <span style="font-size: 11px; color: var(--color-font-neutral-base);">almond</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <oc-bullet color="grey" size="medium"></oc-bullet>
          <span style="font-size: 11px; color: var(--color-font-neutral-base);">grey</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <oc-bullet color="success" size="medium"></oc-bullet>
          <span style="font-size: 11px; color: var(--color-font-neutral-base);">success</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <oc-bullet color="warning" size="medium"></oc-bullet>
          <span style="font-size: 11px; color: var(--color-font-neutral-base);">warning</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <oc-bullet color="info" size="medium"></oc-bullet>
          <span style="font-size: 11px; color: var(--color-font-neutral-base);">info</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <oc-bullet color="error" size="medium"></oc-bullet>
          <span style="font-size: 11px; color: var(--color-font-neutral-base);">error</span>
        </div>
      </div>
    `
  })
};

/**
 * Comparaison des tailles
 */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px;">
        <div>
          <h3 style="margin-bottom: 16px; font-size: 14px; font-weight: 600; color: var(--color-font-primary-base);">
            Comparaison des tailles
          </h3>
          <div style="display: flex; align-items: center; gap: 32px;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <oc-bullet size="medium" color="sage"></oc-bullet>
              <div style="text-align: center;">
                <div style="font-size: 12px; font-weight: 600; color: var(--color-font-neutral-base);">medium</div>
                <div style="font-size: 10px; color: var(--color-font-neutral-muted);">18px (r=9px + r=5px)</div>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <oc-bullet size="small" color="sage"></oc-bullet>
              <div style="text-align: center;">
                <div style="font-size: 12px; font-weight: 600; color: var(--color-font-neutral-base);">small</div>
                <div style="font-size: 10px; color: var(--color-font-neutral-muted);">10px (r=5px + r=3px)</div>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <oc-bullet size="xsmall" color="sage"></oc-bullet>
              <div style="text-align: center;">
                <div style="font-size: 12px; font-weight: 600; color: var(--color-font-neutral-base);">xsmall</div>
                <div style="font-size: 10px; color: var(--color-font-neutral-muted);">6px (r=3px)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  })
};

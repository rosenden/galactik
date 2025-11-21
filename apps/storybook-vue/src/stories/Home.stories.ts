import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Avatar from '../../../../packages/vue-ui/src/components/Avatar/Avatar.vue';
import Badge from '../../../../packages/vue-ui/src/components/Badge/Badge.vue';
import Bullet from '../../../../packages/vue-ui/src/components/Bullet/Bullet.vue';
import Button from '../../../../packages/vue-ui/src/components/Button/Button.vue';
import Checkbox from '../../../../packages/vue-ui/src/components/Checkbox/Checkbox.vue';
import Label from '../../../../packages/vue-ui/src/components/Label/Label.vue';
import { SuccessIcon } from '../../../../packages/vue-ui/src/components/Label/LabelIcons';

const meta: Meta = {
  title: 'Home',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

interface Component {
  name: string;
  category: string;
  description: string;
  path: string;
  previewBg: string;
}

const components: Component[] = [
  {
    name: 'Avatar',
    category: 'Electrons',
    description: 'Affiche un avatar avec initiales ou image',
    path: '?path=/docs/electrons-avatar--docs',
    previewBg: 'linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%)'
  },
  {
    name: 'Badge',
    category: 'Electrons',
    description: 'Color-coded badge for statuses or labels',
    path: '?path=/docs/electrons-badge--docs',
    previewBg: 'linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%)'
  },
  {
    name: 'Bullet',
    category: 'Electrons',
    description: 'Colored dot for state indicators',
    path: '?path=/docs/electrons-bullet--docs',
    previewBg: 'linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%)'
  },
  {
    name: 'Button',
    category: 'Electrons',
    description: 'Button with multiple variants and states',
    path: '?path=/docs/electrons-button--docs',
    previewBg: 'linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%)'
  },
  {
    name: 'Label',
    category: 'Electrons',
    description: 'Text/icon label aligned with the React version',
    path: '?path=/docs/electrons-label--docs',
    previewBg: 'linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%)'
  },
  {
    name: 'Checkbox',
    category: 'Electrons',
    description: 'Checkbox with selected and indeterminate states',
    path: '?path=/docs/electrons-checkbox--docs',
    previewBg: 'linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%)'
  },
];

export const Default: Story = {
  render: () => ({
    components: { Avatar, Badge, Bullet, Button, Checkbox, Label },
    setup() {
      const handleNavigation = (path: string) => (e: MouseEvent) => {
        e.preventDefault();
        const url = window.location.origin + '/' + path;
        if (window.top) {
          window.top.location.href = url;
        } else {
          window.location.href = url;
        }
      };

      return {
        components,
        handleNavigation,
        SuccessIcon
      };
    },
    template: `
      <div style="padding: var(--space-4xl); background-color: var(--color-background-surface); min-height: 100vh; font-family: var(--font-family-base);">
        <header style="margin-bottom: var(--space-6xl); text-align: center;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.76 226.69" style="height: 80px; margin-bottom: var(--space-lg);">
            <path d="M161.096.001l-30.224 52.35L100.647.002H-.005L130.872 226.69 261.749 0z" fill="#41b883"/>
            <path d="M161.096.001l-30.224 52.35L100.647.002H52.346l78.526 136.01L209.398.001z" fill="#34495e"/>
          </svg>
          <h1 style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-font-primary-base); margin-bottom: var(--space-md); line-height: var(--line-height-6);">
            Galactik Design System
          </h1>
          <p style="font-size: var(--font-size-lg); color: var(--color-font-neutral-muted); line-height: var(--line-height-4);">
            Vue component library
          </p>
        </header>

        <section style="margin-bottom: var(--space-5xl);">
          <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-semibold); color: var(--color-font-primary-base); margin-bottom: var(--space-3xl); padding-bottom: var(--space-md); border-bottom: var(--stroke-xs) solid var(--color-border-base); line-height: var(--line-height-5);">
            Electrons
          </h2>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-3xl);">
            <a
              v-for="component in components"
              :key="component.name"
              :href="component.path"
              @click="handleNavigation(component.path)"
              style="text-decoration: none; background-color: var(--color-background-alt); border-radius: var(--radius-lg); box-shadow: 0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08); transition: all 0.2s ease; cursor: pointer; border: var(--stroke-xs) solid var(--color-border-base); overflow: hidden; display: flex; flex-direction: column;"
              @mouseenter="(e) => { e.currentTarget.style.boxShadow = '0 var(--space-xs) var(--space-2xl) rgba(0, 0, 0, 0.12)'; e.currentTarget.style.transform = 'translateY(calc(-1 * var(--space-3xs)))'; }"
              @mouseleave="(e) => { e.currentTarget.style.boxShadow = '0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }"
            >
              <div :style="{ padding: 'var(--space-4xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '120px', borderBottom: 'var(--stroke-xs) solid var(--color-border-base)', background: component.previewBg }">
                <Avatar v-if="component.name === 'Avatar'" name="Alice Smith" size="medium" avatar-color="sage" />
                <Badge v-else-if="component.name === 'Badge'" :label="5" color="success" variant="primary" size="sm" />
                <Bullet v-else-if="component.name === 'Bullet'" color="info" size="medium" />
                <Button v-else-if="component.name === 'Button'" variant="filled" color-variant="primary" size="small" icon-left="fa-solid fa-plus">Button</Button>
                <Label v-else-if="component.name === 'Label'" text="Label" color="success" size="medium" :icon="SuccessIcon" />
                <Checkbox v-else-if="component.name === 'Checkbox'" :checked="true" label="Checkbox" />
              </div>

              <div style="padding: var(--space-3xl);">
                <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); color: var(--color-font-primary-base); margin-bottom: var(--space-sm); line-height: var(--line-height-4);">
                  {{ component.name }}
                </h3>
                <p style="font-size: var(--font-size-sm); color: var(--color-font-neutral-muted); line-height: var(--line-height-3); margin-bottom: var(--space-lg);">
                  {{ component.description }}
                </p>
                <div style="font-size: var(--font-size-sm); color: var(--color-font-secondary-base); font-weight: var(--font-weight-semibold);">
                  Voir la documentation →
                </div>
              </div>
            </a>
          </div>
        </section>

        <footer style="margin-top: var(--space-6xl); padding-top: var(--space-3xl); text-align: center; color: var(--color-font-neutral-muted); font-size: var(--font-size-sm); border-top: var(--stroke-xs) solid var(--color-border-base);">
          <p>Total : {{ components.length }} composants</p>
        </footer>
      </div>
    `
  }),
};

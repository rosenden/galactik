import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AvatarComponent } from 'angular-ui/components/avatar/avatar.component';
import { BadgeComponent } from 'angular-ui/components/badge/badge.component';
import { BulletComponent } from 'angular-ui/components/bullet/bullet.component';
import { ButtonComponent } from 'angular-ui/components/button/button.component';
import { LabelComponent } from 'angular-ui/components/label/label.component';
import { CheckboxComponent } from 'angular-ui/components/checkbox/checkbox.component';

interface Component {
  name: string;
  category: string;
  description: string;
  path: string;
  template: string;
}

const components: Component[] = [
  {
    name: 'Avatar',
    category: 'Electrons',
    description: 'Affiche un avatar avec initiales ou image',
    path: '?path=/docs/electrons-avatar--docs',
    template: '<oc-avatar name="Alice Smith" size="medium" avatarColor="sage"></oc-avatar>'
  },
  {
    name: 'Badge',
    category: 'Electrons',
    description: 'Color-coded badge for statuses or labels',
    path: '?path=/docs/electrons-badge--docs',
    template: '<oc-badge label="5" color="success" style="primary" size="sm"></oc-badge>'
  },
  {
    name: 'Bullet',
    category: 'Electrons',
    description: 'Colored dot for state indicators',
    path: '?path=/docs/electrons-bullet--docs',
    template: '<oc-bullet color="info" size="medium"></oc-bullet>'
  },
  {
    name: 'Button',
    category: 'Electrons',
    description: 'Button with multiple variants and states',
    path: '?path=/docs/electrons-button--docs',
    template: '<oc-button variant="filled" colorVariant="primary" size="small"><i class="fa-regular fa-plus"></i> Button</oc-button>'
  },
  {
    name: 'Label',
    category: 'Electrons',
    description: 'Text/icon label aligned with the React version',
    path: '?path=/docs/electrons-label--docs',
    template: '<oc-label text="Label" color="success" size="medium" icon="fa-regular fa-circle-check"></oc-label>'
  },
  {
    name: 'Checkbox',
    category: 'Electrons',
    description: 'Checkbox with selected and indeterminate states',
    path: '?path=/docs/electrons-checkbox--docs',
    template: '<oc-checkbox [checked]="true" label="Checkbox"></oc-checkbox>'
  },
];

const generateCardTemplate = (component: Component): string => {
  return `
    <a 
      href="${component.path}"
      onclick="event.preventDefault(); var url = window.location.origin + '/${component.path}'; if (window.top) { window.top.location.href = url; } else { window.location.href = url; }"
      style="
        text-decoration: none;
        background-color: var(--color-background-alt);
        border-radius: var(--radius-lg);
        box-shadow: 0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08);
        transition: all 0.2s ease;
        cursor: pointer;
        border: var(--stroke-xs) solid var(--color-border-base);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      "
      onmouseenter="this.style.boxShadow='0 var(--space-xs) var(--space-2xl) rgba(0, 0, 0, 0.12)'; this.style.transform='translateY(calc(-1 * var(--space-3xs)))';"
      onmouseleave="this.style.boxShadow='0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08)'; this.style.transform='translateY(0)';"
    >
      <div style="
        padding: var(--space-4xl);
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 120px;
        border-bottom: var(--stroke-xs) solid var(--color-border-base);
        background: linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%);
      ">
        ${component.template}
      </div>

      <div style="padding: var(--space-3xl);">
        <h3 style="
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-font-primary-base);
          margin-bottom: var(--space-sm);
          line-height: var(--line-height-4);
        ">
          ${component.name}
        </h3>
        <p style="
          font-size: var(--font-size-sm);
          color: var(--color-font-neutral-muted);
          line-height: var(--line-height-3);
          margin-bottom: var(--space-lg);
        ">
          ${component.description}
        </p>
        <div style="
          font-size: var(--font-size-sm);
          color: var(--color-font-secondary-base);
          font-weight: var(--font-weight-semibold);
        ">
          Voir la documentation →
        </div>
      </div>
    </a>
  `;
};

const meta: Meta = {
  title: 'Home',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  decorators: [
    moduleMetadata({
      imports: [AvatarComponent, BadgeComponent, BulletComponent, ButtonComponent, LabelComponent, CheckboxComponent]
    })
  ],
  render: () => ({
    template: `
      <div style="
        padding: var(--space-4xl);
        background-color: var(--color-background-surface);
        min-height: 100vh;
        font-family: var(--font-family-base);
      ">
        <header style="
          margin-bottom: var(--space-6xl);
          text-align: center;
        ">
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 250 250'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23E40035'/%3E%3Cstop offset='100%25' stop-color='%23B4003A'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23FF2857'/%3E%3Cstop offset='100%25' stop-color='%23DC004E'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none'%3E%3Cpath fill='url(%23a)' d='M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z'/%3E%3Cpath fill='url(%23b)' d='M125 30v22.2-.1V230l78.9-43.7 14.2-123.1L125 30z'/%3E%3Cpath fill='%23FFF' d='M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2h21.7L125 52.1zm17 83.3h-34l17-40.9 17 40.9z'/%3E%3C/g%3E%3C/svg%3E" 
            alt="Angular Logo" 
            style="
              height: 50px;
              margin-bottom: var(--space-lg);
            " 
          />
          <h1 style="
            font-size: var(--font-size-2xl);
            font-weight: var(--font-weight-bold);
            color: var(--color-font-primary-base);
            margin-bottom: var(--space-md);
            line-height: var(--line-height-6);
          ">
            Galactik Design System
          </h1>
          <p style="
            font-size: var(--font-size-lg);
            color: var(--color-font-neutral-muted);
            line-height: var(--line-height-4);
          ">
            Angular component library
          </p>
        </header>

        <section style="margin-bottom: var(--space-5xl);">
          <h2 style="
            font-size: var(--font-size-xl);
            font-weight: var(--font-weight-semibold);
            color: var(--color-font-primary-base);
            margin-bottom: var(--space-3xl);
            padding-bottom: var(--space-md);
            border-bottom: var(--stroke-xs) solid var(--color-border-base);
            line-height: var(--line-height-5);
          ">
            Electrons
          </h2>
          
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: var(--space-3xl);
          ">
            ${components.map(generateCardTemplate).join('')}
          </div>
        </section>

        <footer style="
          margin-top: var(--space-6xl);
          padding-top: var(--space-3xl);
          text-align: center;
          color: var(--color-font-neutral-muted);
          font-size: var(--font-size-sm);
          border-top: var(--stroke-xs) solid var(--color-border-base);
        ">
          <p>Total: ${components.length} components</p>
        </footer>
      </div>
    `
  }),
};

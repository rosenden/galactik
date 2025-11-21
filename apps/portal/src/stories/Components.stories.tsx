import React from 'react';
import { Avatar } from '../../../../packages/react-ui/src/components/Avatar/Avatar';
import Badge from '../../../../packages/react-ui/src/components/Badge/Badge';
import { Bullet } from '../../../../packages/react-ui/src/components/Bullet/Bullet';
import Button from '../../../../packages/react-ui/src/components/Button/Button';
import { Checkbox } from '../../../../packages/react-ui/src/components/Checkbox/Checkbox';
import Label from '../../../../packages/react-ui/src/components/Label/Label';
import type { Meta, StoryObj } from '@storybook/react';

type ComponentRecord = {
  name: string;
  description?: string;
  source: string;
};

type PackageInventory = {
  id: string;
  label: string;
  workspace: string;
  components: ComponentRecord[];
};

const inventory: PackageInventory[] = [
  {
    id: 'angular',
    label: 'Angular UI',
    workspace: 'angular-ui',
    components: [
      {
        name: 'AvatarComponent',
        description: 'Standalone component to render an avatar with variants and sizes.',
        source: 'packages/angular-ui/src/app/components/avatar/avatar.component.ts'
      }
    ]
  },
  {
    id: 'react',
    label: 'React UI',
    workspace: 'react-ui',
    components: [
      {
        name: 'Avatar',
        description: 'React component to show initials/photo and status.',
        source: 'packages/react-ui/src/components/Avatar/Avatar.tsx'
      }
    ]
  },
  {
    id: 'vue',
    label: 'Vue UI',
    workspace: 'vue-ui',
    components: [
      {
        name: 'QaAvatar',
        description: 'Vue 3 SFC component to display an avatar.',
        source: 'packages/vue-ui/src/components/Avatar/Avatar.vue'
      }
    ]
  },
  {
    id: 'wc',
    label: 'Web Components UI',
    workspace: 'wc-ui',
    components: [
      {
        name: '<gal-avatar>',
        description: 'Stencil-generated web component.',
        source: 'packages/wc-ui/src/components/gal-avatar/gal-avatar.tsx'
      }
    ]
  }
];

const meta: Meta = {
  title: 'Components/Inventory',
  parameters: {
    layout: 'padded'
  }
};

export default meta;

type Story = StoryObj;

export const Catalogue: Story = {
  render: () => {
    const frameworks = ["React", "Vue", "Angular", "Web Components"] as const;
    const components = ["Avatar", "Badge", "Bullet", "Button", "Checkbox", "Label"] as const;

    type Framework = typeof frameworks[number];
    type Component = typeof components[number];

    const links: Record<Framework, Record<Component, string>> = {
      React: {
        Avatar: "https://rosenden.github.io/galactik/react/?path=/story/avatar--default",
        Badge: "https://rosenden.github.io/galactik/react/?path=/story/badge--default",
        Bullet: "https://rosenden.github.io/galactik/react/?path=/story/bullet--default",
        Button: "https://rosenden.github.io/galactik/react/?path=/story/button--default",
        Checkbox: "https://rosenden.github.io/galactik/react/?path=/story/checkbox--default",
        Label: "https://rosenden.github.io/galactik/react/?path=/story/label--default"
      },
      Vue: {
        Avatar: "https://rosenden.github.io/galactik/vue/?path=/story/avatar--default",
        Badge: "https://rosenden.github.io/galactik/vue/?path=/story/badge--default",
        Bullet: "https://rosenden.github.io/galactik/vue/?path=/story/bullet--default",
        Button: "https://rosenden.github.io/galactik/vue/?path=/story/button--default",
        Checkbox: "https://rosenden.github.io/galactik/vue/?path=/story/checkbox--default",
        Label: "https://rosenden.github.io/galactik/vue/?path=/story/label--default"
      },
      Angular: {
        Avatar: "https://rosenden.github.io/galactik/angular/?path=/story/avatar--default",
        Badge: "https://rosenden.github.io/galactik/angular/?path=/story/badge--default",
        Bullet: "https://rosenden.github.io/galactik/angular/?path=/story/bullet--default",
        Button: "https://rosenden.github.io/galactik/angular/?path=/story/button--default",
        Checkbox: "https://rosenden.github.io/galactik/angular/?path=/story/checkbox--default",
        Label: "https://rosenden.github.io/galactik/angular/?path=/story/label--default"
      },
      "Web Components": {
        Avatar: "https://rosenden.github.io/galactik/wc/?path=/story/gal-avatar--default",
        Badge: "https://rosenden.github.io/galactik/wc/?path=/story/gal-badge--default",
        Bullet: "https://rosenden.github.io/galactik/wc/?path=/story/gal-bullet--default",
        Button: "https://rosenden.github.io/galactik/wc/?path=/story/gal-button--default",
        Checkbox: "https://rosenden.github.io/galactik/wc/?path=/story/gal-checkbox--default",
        Label: "https://rosenden.github.io/galactik/wc/?path=/story/gal-label--default"
      }
    };


    // Import React previews (ES imports)
    // These imports must be at the top of the file in ES modules
    // (already imported above)

    const reactPreviews = {
      Avatar: <Avatar name="Preview" size="medium" />,
      Badge: <Badge label={5} color="sage" style="primary" size="sm" />,
      Bullet: <Bullet color="sage" size="medium" />,
      Button: <Button variant="filled" colorVariant="primary" size="medium">Button</Button>,
      Checkbox: <Checkbox label="Preview" checked={true} />,
      Label: <Label text="Preview" color="sage" size="medium" />
    };

    return (
      <div
        style={{
          padding: 'var(--space-4xl)',
          maxWidth: 1200,
          margin: '0 auto',
          fontFamily: 'var(--font-family-base)',
          color: 'var(--color-font-primary-base)',
          background: 'var(--color-background-surface)'
        }}
      >
        <header style={{ marginBottom: 'var(--space-4xl)' }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>Component Inventory</h1>
          <p style={{ margin: 'var(--space-sm) 0 0', color: 'var(--color-font-neutral-muted)' }}>
            Components available in each framework. Click "Available" to view the component in Storybook.
          </p>
        </header>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'var(--color-background-alt)',
            borderRadius: 20,
            overflow: 'hidden',
            border: `1px solid var(--color-border-base)`,
            marginBottom: 40
          }}
        >
          <caption style={{ fontWeight: 'bold', marginBottom: 8 }}>Component Inventory by Framework</caption>
          <thead style={{ background: 'var(--color-background-surface)' }}>
            <tr style={{ textAlign: 'left', color: 'var(--color-font-neutral-muted)' }}>
              <th style={{ padding: '12px 16px' }}>Preview</th>
              <th style={{ padding: '12px 16px' }}>Component</th>
              {frameworks.map((fw) => (
                <th key={fw} style={{ padding: '12px 16px' }}>{fw}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {components.map((comp) => (
              <tr key={comp} style={{ borderTop: `1px solid var(--color-border-base)` }}>
                <td style={{ padding: '12px 16px', background: 'var(--color-background-surface)' }}>
                  {reactPreviews[comp]}
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>{comp}</td>
                {frameworks.map((fw) => (
                  <td key={fw} style={{ padding: '12px 16px' }}>
                    {links[fw as Framework][comp as Component] ? (
                      <a
                        href={links[fw as Framework][comp as Component]}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--sage-600)', textDecoration: 'underline', fontWeight: 500 }}
                      >
                        Available
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

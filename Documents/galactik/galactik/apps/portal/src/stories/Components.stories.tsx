import React from 'react';
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
        description: 'Composant standalone pour afficher un avatar avec variants/taille.',
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
        description: 'Composant React pour afficher initiales/photo et statut.',
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
        description: 'Composant Vue 3 (SFC) pour afficher un avatar.',
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
        description: 'Web Component généré par Stencil.',
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
  render: () => (
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
        <h1 style={{ margin: 0, fontSize: 28 }}>Catalogue des composants</h1>
        <p style={{ margin: 'var(--space-sm) 0 0', color: 'var(--color-font-neutral-muted)' }}>
          Composants disponibles dans chaque package Galactik. Cette liste se base sur la structure actuelle du repo.
        </p>
      </header>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          background: 'var(--color-background-alt)',
          borderRadius: 20,
          overflow: 'hidden',
          border: `1px solid var(--color-border-base)`
        }}
      >
        <thead style={{ background: 'var(--color-background-surface)' }}>
          <tr style={{ textAlign: 'left', color: 'var(--color-font-neutral-muted)' }}>
            <th style={{ padding: '12px 16px' }}>Package</th>
            <th style={{ padding: '12px 16px' }}>Component</th>
            <th style={{ padding: '12px 16px' }}>Description</th>
            <th style={{ padding: '12px 16px' }}>Source</th>
          </tr>
        </thead>
        <tbody>
          {inventory.flatMap((pkg) =>
            pkg.components.map((component) => (
              <tr key={`${pkg.id}-${component.name}`} style={{ borderTop: `1px solid var(--color-border-base)` }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>{pkg.label}</td>
                <td style={{ padding: '12px 16px' }}>{component.name}</td>
                <td style={{ padding: '12px 16px', color: 'var(--color-font-neutral-muted)' }}>
                  {component.description ?? '—'}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <code>{component.source}</code>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
};

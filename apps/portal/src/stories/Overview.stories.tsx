import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { STORYBOOK_REFS } from '../../storybook-refs';

type QuickStep = {
  title: string;
  description: string;
  hint?: string;
};

type Command = {
  label: string;
  description: string;
};

type Resource = {
  title: string;
  description: string;
  href: string;
};

const quickSteps: QuickStep[] = [
  {
    title: '1. Install dependencies',
    description: 'pnpm install',
    hint: 'Workspace spans packages/* and apps/*.'
  },
  {
    title: '2. Launch a targeted Storybook',
    description: 'pnpm storybook:<framework>',
    hint: 'angular · react · vue · wc · portal'
  },
  {
    title: '3. Build every Storybook',
    description: 'pnpm build:storybooks',
    hint: 'Generates dist/storybooks/* plus the Portal aggregate.'
  }
];

const commands: Command[] = [
  { label: 'pnpm storybook:react', description: 'React UI (port 6006) – Vite builder.' },
  { label: 'pnpm storybook:angular', description: 'Angular UI (port 6008) via @storybook/angular.' },
  { label: 'pnpm storybook:vue', description: 'Vue 3 UI (port 6007) using the Vite plugin.' },
  { label: 'pnpm storybook:wc', description: 'Web Components (port 6009) after Stencil build.' },
  { label: 'pnpm --filter portal storybook', description: 'Aggregator portal (port 6010).' },
  { label: 'pnpm preview:storybooks', description: 'Build + static server (port 5000).' }
];

const resources: Resource[] = [
  {
    title: 'Tokens & styles',
    description: 'Typography and color foundations.',
    href: '/styles/tokens.css'
  },
  {
    title: 'Storybook scripts',
    description: 'build-storybooks.mjs & serve-storybooks.mjs',
    href: '/scripts'
  },
  {
    title: 'Chromatic',
    description: 'Visual capture via pnpm chromatic (token required).',
    href: 'https://www.chromatic.com/'
  }
];

const frameworkVersions: Record<string, string> = {
  react: 'React 18.2 + Storybook 8.2.7',
  vue: 'Vue 3.4 + Storybook 8.2.7',
  angular: 'Angular 17.3 + Storybook 8.2.7',
  wc: 'Stencil 3.4 + Storybook 8.2.7'
};

const techMatrix = [
  { tech: 'Storybook', version: '8.2.7 (Vite builder)' },
  { tech: 'React', version: '18.2.0' },
  { tech: 'Vue', version: '3.4.x' },
  { tech: 'Angular', version: '17.3.x' },
  { tech: 'Web Components', version: 'Stencil 3.4.x' },
  { tech: 'TypeScript', version: '5.2.x' },
  { tech: 'Chromatic', version: 'pnpm chromatic' }
];

const frameworkCards = STORYBOOK_REFS.filter((ref) => ref.id !== 'portal').map((ref) => {
  const workspace = ref.workspace ?? ref.packageDir.split('/').pop() ?? ref.id;
  const homeUrl = `http://localhost:${ref.port}/?path=/story/home--default`;
  return {
    id: ref.id,
    label: ref.label,
    stack: frameworkVersions[ref.id] ?? ref.label,
    command: `pnpm --filter ${workspace} storybook`,
    url: homeUrl,
    path: ref.path
  };
});

const meta: Meta = {
  title: 'Introduction',
  parameters: { layout: 'fullscreen' }
};

export default meta;
type Story = StoryObj;

const Card: React.FC<{ title: string; description: string; children?: React.ReactNode }> = ({
  title,
  description,
  children
}) => (
  <div
    style={{
      background: 'var(--color-background-alt)',
      border: `1px solid var(--color-border-base)`,
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-4xl)',
      boxShadow: '0 8px 30px rgba(33,37,41,0.08)'
    }}
  >
    <h4 style={{ margin: '0 0 var(--space-sm)', fontSize: 'var(--font-size-lg)', color: 'var(--color-font-primary-base)' }}>
      {title}
    </h4>
    <p style={{ margin: 0, color: 'var(--color-font-secondary-base)', fontSize: 'var(--font-size-base)', lineHeight: 1.5 }}>
      {description}
    </p>
    {children}
  </div>
);

export const GettingStarted: Story = {
  render: () => (
    <div
      style={{
        fontFamily: 'var(--font-family-base)',
        background: 'var(--color-background-surface)',
        color: 'var(--color-font-primary-base)',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          padding: 'var(--space-7xl) var(--space-5xl) var(--space-7xl)'
        }}
      >
        <section
          style={{
            background: 'linear-gradient(135deg, var(--color-bg-primary-base), var(--color-bg-secondary-light))',
            color: 'var(--color-font-neutral-white)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-5xl)',
            marginBottom: 'var(--space-5xl)',
            boxShadow: '0 16px 48px rgba(15,23,42,0.25)'
          }}
        >
          <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: 1, fontSize: 12 }}>
            Galactik Design System
          </p>
          <h1 style={{ margin: 'var(--space-md) 0 var(--space-sm)', fontSize: '32px', color: 'var(--color-font-neutral-white)' }}>
            Welcome aboard 👋 — Getting started
          </h1>
          <p style={{ margin: 0, fontSize: 'var(--font-size-lg)', maxWidth: 720, lineHeight: 1.6 }}>
            This hub consolidates every single-framework Storybook, the key PNPM commands, and
            the internal links you need to accelerate product integrations.
          </p>
        </section>

        <section
          style={{
            marginBottom: 48,
            background: 'linear-gradient(120deg, var(--color-background-alt), var(--color-bg-primary-light))',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-5xl)',
            boxShadow: '0 20px 50px rgba(34,45,48,0.15)',
            color: 'var(--color-font-primary-base)'
          }}
        >
          <h2 style={{ marginBottom: 'var(--space-2xl)', fontSize: 'var(--font-size-2xl)', color: 'var(--color-font-primary-base)' }}>
            Storybook frameworks
          </h2>
          <div
            style={{
              display: 'grid',
              gap: 20,
              gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))'
            }}
          >
            {frameworkCards.map((fw) => (
              <Card key={fw.id} title={fw.label} description={fw.stack}>
                <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--color-font-secondary-base)' }}>
                  Local Storybook: <code>{fw.url}</code>
                </p>
                <div style={{ marginTop: 12 }}>
                  <small style={{ display: 'block', color: 'var(--color-font-secondary-base)' }}>Commande PNPM</small>
                  <code style={{ fontSize: 13 }}>{fw.command}</code>
                </div>
                <a
                  href={fw.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    marginTop: 12,
                    padding: '6px 14px',
                    borderRadius: 2000,
                    background: 'var(--color-bg-primary-base)',
                    color: 'var(--color-font-neutral-white)',
                    fontSize: 13,
                    textDecoration: 'none'
                  }}
                >
                  Open {fw.label}
                </a>
              </Card>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ marginBottom: 'var(--space-3xl)', fontSize: 'var(--font-size-2xl)', color: 'var(--color-font-primary-base)' }}>
            Getting started checklist
          </h2>
          <div style={{ display: 'grid', gap: 'var(--space-3xl)', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
            {quickSteps.map((step) => (
              <div
                key={step.title}
                style={{
                  padding: 'var(--space-4xl)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-background-alt)',
                  border: `1px solid var(--color-border-base)`
                }}
              >
                <strong style={{ display: 'block', fontSize: 'var(--font-size-lg)' }}>{step.title}</strong>
                <code style={{ display: 'block', marginTop: 'var(--space-sm)', fontSize: 'var(--font-size-base)' }}>
                  {step.description}
                </code>
                {step.hint && (
                  <p style={{ margin: 'var(--space-sm) 0 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-font-secondary-base)' }}>
                    {step.hint}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ marginBottom: 'var(--space-3xl)', fontSize: 'var(--font-size-2xl)', color: 'var(--color-font-primary-base)' }}>
            Quick commands
          </h2>
          <div style={{ display: 'grid', gap: 'var(--space-xl)' }}>
            {commands.map((cmd) => (
              <div
                key={cmd.label}
                style={{
                  background: 'var(--color-background-alt)',
                  border: `1px solid var(--color-border-base)`,
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3xl)'
                }}
              >
                <code style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-font-primary-base)' }}>
                  {cmd.label}
                </code>
                <p style={{ margin: 'var(--space-xs) 0 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-font-secondary-base)' }}>
                  {cmd.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ marginBottom: 'var(--space-3xl)', fontSize: 'var(--font-size-2xl)', color: 'var(--color-font-primary-base)' }}>
            Tech parity
          </h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'var(--color-background-alt)',
              borderRadius: 16,
              overflow: 'hidden',
              border: `1px solid var(--color-border-base)`
            }}
          >
            <thead style={{ background: 'var(--color-background-surface)' }}>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', fontSize: 14, color: 'var(--color-font-secondary-base)' }}>Stack</th>
                <th style={{ padding: '12px 16px', fontSize: 14, color: 'var(--color-font-secondary-base)' }}>Version/Notes</th>
              </tr>
            </thead>
            <tbody>
              {techMatrix.map((row, index) => (
                <tr
                  key={row.tech}
                  style={{
                    borderTop: `1px solid var(--color-border-base)`,
                    background: index % 2 === 0 ? 'var(--color-background-alt)' : 'var(--color-background-surface)'
                  }}
                >
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-font-primary-base)' }}>{row.tech}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <code>{row.version}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>


        <section>
          <h2 style={{ marginBottom: 16, fontSize: 22, color: 'var(--color-font-primary-base)' }}>Galactik resources</h2>
          <div
            style={{
              display: 'grid',
              gap: 16,
              gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))'
            }}
          >
            {resources.map((resource) => (
              <Card key={resource.title} title={resource.title} description={resource.description}>
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    marginTop: 12,
                    color: 'var(--color-font-info-base)',
                    fontSize: 13
                  }}
                >
                  Open ↗
                </a>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
};

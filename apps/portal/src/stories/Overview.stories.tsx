import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import logoReact from '../../.storybook/assets/logo-react.svg';
import logoVue from '../../.storybook/assets/logo-vue.svg';
import logoAngular from '../../.storybook/assets/logo-angular.svg';
import logoChaps from '../../.storybook/assets/logo-chapsvision.svg';
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
    hint: 'angular · react · vue · portal'
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
  angular: 'Angular 17.3 + Storybook 8.2.7'
};

const techMatrix = [
  { tech: 'Storybook', version: '8.2.7 (Vite builder)' },
  { tech: 'React', version: '18.2.0' },
  { tech: 'Vue', version: '3.4.x' },
  { tech: 'Angular', version: '17.3.x' },
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
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-4xl)',
      boxShadow: 'var(--shadow-md)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <h4 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', margin: `0 0 var(--space-sm)`, fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-lg)', fontWeight: 600, color: 'var(--color-font-primary-base)' }}>
      {title === 'React UI' && (
        <img src={logoReact} alt="React Logo" style={{ height: 24 }} />
      )}
      {title === 'Vue UI' && (
        <img src={logoVue} alt="Vue Logo" style={{ height: 24 }} />
      )}
      {title === 'Angular UI' && (
        <img src={logoAngular} alt="Angular Logo" style={{ height: 24 }} />
      )}
      {title}
    </h4>
    <p style={{ margin: 0, color: 'var(--color-font-secondary-base)', fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height-relaxed)', fontFamily: 'var(--font-family-base)' }}>
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
          padding: `var(--space-7xl) var(--space-5xl)`
        }}
      >
        <section
          style={{
            background: 'var(--color-bg-primary-base)',
            color: 'var(--color-font-neutral-white)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-5xl)',
            marginBottom: 'var(--space-5xl)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'var(--space-4xl)'
          }}
        >
          <img src={logoChaps} alt="Chapsvision Logo" style={{ height: 60, flexShrink: 0, marginTop: 'var(--space-sm)' }} />
          <div>
            <h1 style={{ margin: `0 0 var(--space-sm)`, fontSize: 'var(--font-size-4xl)', fontWeight: 700, color: 'var(--color-font-neutral-white)', fontFamily: 'var(--font-family-base)', lineHeight: 'var(--line-height-tight)' }}>
              Welcome aboard 👋 — Getting started
            </h1>
            <p style={{ margin: 0, fontSize: 'var(--font-size-lg)', maxWidth: 720, lineHeight: 'var(--line-height-relaxed)', fontFamily: 'var(--font-family-base)' }}>
              This hub consolidates every single-framework Storybook, the key PNPM commands, and
              the internal links you need to accelerate product integrations.
            </p>
          </div>
        </section>

        <section
          style={{
            marginBottom: 'var(--space-5xl)',
            background: 'var(--color-background-alt)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-5xl)',
            boxShadow: 'var(--shadow-md)',
            color: 'var(--color-font-primary-base)'
          }}
        >
          <h2 style={{ marginBottom: 'var(--space-2xl)', fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-font-primary-base)', fontFamily: 'var(--font-family-base)', lineHeight: 'var(--line-height-tight)' }}>
            Storybook frameworks
          </h2>
          <div
            style={{
              display: 'grid',
              gap: 'var(--space-xl)',
              gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))'
            }}
          >
            {frameworkCards.map((fw) => (
              <Card key={fw.id} title={fw.label} description={fw.stack}>
                <p style={{ margin: `var(--space-md) 0 0`, fontSize: 'var(--font-size-sm)', color: 'var(--color-font-secondary-base)', fontFamily: 'var(--font-family-base)' }}>
                  Local Storybook:{' '}
                  <a href={fw.url} target="_blank" rel="noreferrer" style={{ color: 'var(--color-font-info-base)', textDecoration: 'underline' }}>
                    {fw.url}
                  </a>
                </p>
                <div style={{ marginTop: 'var(--space-lg)' }}>
                  <small style={{ display: 'block', color: 'var(--color-font-secondary-base)', fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-base)' }}>Commande PNPM</small>
                  <code style={{ fontSize: 'var(--font-size-sm)', fontFamily: 'monospace', display: 'block', marginTop: 'var(--space-xs)' }}>{fw.command}</code>
                </div>
                <a
                  href={'https://rosenden.github.io/galactik' + fw.path + (fw.id === 'portal' ? '/?path=/story/introduction--getting-started' : '/?path=/story/home--default')}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    marginTop: 'var(--space-lg)',
                    padding: `var(--space-xs) var(--space-lg)`,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-bg-primary-base)',
                    color: 'var(--color-font-neutral-white)',
                    fontSize: 'var(--font-size-sm)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-family-base)',
                    fontWeight: 500
                  }}
                >
                  Open {fw.label}
                </a>
              </Card>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 'var(--space-5xl)' }}>
          <h2 style={{ marginBottom: 'var(--space-3xl)', fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-font-primary-base)', fontFamily: 'var(--font-family-base)', lineHeight: 'var(--line-height-tight)' }}>
            Applications & status
          </h2>
          <div style={{ display: 'grid', gap: 'var(--space-lg)', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
            {STORYBOOK_REFS.map((app) => (
              <Card
                key={app.id}
                title={`${app.label}${app.id === 'portal' ? ' (Portal)' : ''}`}
                description={`Workspace: ${app.workspace} • Port: ${app.port}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginTop: 'var(--space-md)', color: 'var(--color-font-secondary-base)', fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-family-base)' }}>
                  {app.id === 'react' && <img src={logoReact} alt="React" style={{ height: 20 }} />}
                  {app.id === 'vue' && <img src={logoVue} alt="Vue" style={{ height: 20 }} />}
                  {app.id === 'angular' && <img src={logoAngular} alt="Angular" style={{ height: 20 }} />}
                  {app.id === 'portal' && <img src={logoChaps} alt="Portal" style={{ height: 20 }} />}
                  <span>Base path: {app.path}</span>
                </div>
                <a
                  href={`https://rosenden.github.io/galactik${app.path}/?path=/story/${app.id === 'portal' ? 'introduction--getting-started' : 'home--default'}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    marginTop: 'var(--space-lg)',
                    padding: `var(--space-sm) var(--space-lg)`,
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--color-bg-secondary-base)',
                    color: 'var(--color-font-neutral-white)',
                    fontSize: 'var(--font-size-sm)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-family-base)',
                    fontWeight: 500
                  }}
                >
                  Ouvrir dans un nouvel onglet ↗
                </a>
              </Card>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 'var(--space-5xl)' }}>
          <h2 style={{ marginBottom: 'var(--space-3xl)', fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-font-primary-base)', fontFamily: 'var(--font-family-base)', lineHeight: 'var(--line-height-tight)' }}>
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
                  border: `1px solid var(--color-border-base)`,
                  fontFamily: 'var(--font-family-base)'
                }}
              >
                <strong style={{ display: 'block', fontSize: 'var(--font-size-lg)', fontWeight: 600, color: 'var(--color-font-primary-base)' }}>{step.title}</strong>
                <code style={{ display: 'block', marginTop: 'var(--space-sm)', fontSize: 'var(--font-size-base)', fontFamily: 'monospace', color: 'var(--color-font-secondary-base)' }}>
                  {step.description}
                </code>
                {step.hint && (
                  <p style={{ margin: `var(--space-sm) 0 0`, fontSize: 'var(--font-size-sm)', color: 'var(--color-font-secondary-base)', fontFamily: 'var(--font-family-base)' }}>
                    {step.hint}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 'var(--space-5xl)' }}>
          <h2 style={{ marginBottom: 'var(--space-3xl)', fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-font-primary-base)', fontFamily: 'var(--font-family-base)', lineHeight: 'var(--line-height-tight)' }}>
            Quick commands
          </h2>
          <div style={{ display: 'grid', gap: 'var(--space-2xl)' }}>
            {commands.map((cmd) => (
              <div
                key={cmd.label}
                style={{
                  background: 'var(--color-background-alt)',
                  border: `1px solid var(--color-border-base)`,
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3xl)',
                  fontFamily: 'var(--font-family-base)'
                }}
              >
                <code style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-font-primary-base)', fontFamily: 'monospace' }}>
                  {cmd.label}
                </code>
                <p style={{ margin: `var(--space-xs) 0 0`, fontSize: 'var(--font-size-sm)', color: 'var(--color-font-secondary-base)', fontFamily: 'var(--font-family-base)' }}>
                  {cmd.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 'var(--space-5xl)' }}>
          <h2 style={{ marginBottom: 'var(--space-3xl)', fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-font-primary-base)', fontFamily: 'var(--font-family-base)', lineHeight: 'var(--line-height-tight)' }}>
            Tech parity
          </h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'var(--color-background-alt)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: `1px solid var(--color-border-base)`,
              fontFamily: 'var(--font-family-base)'
            }}
          >
            <thead style={{ background: 'var(--color-background-surface)' }}>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: 'var(--space-lg) var(--space-2xl)', fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-font-secondary-base)' }}>Stack</th>
                <th style={{ padding: 'var(--space-lg) var(--space-2xl)', fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-font-secondary-base)' }}>Version/Notes</th>
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
                  <td style={{ padding: 'var(--space-lg) var(--space-2xl)', fontWeight: 600, color: 'var(--color-font-primary-base)', fontSize: 'var(--font-size-base)' }}>{row.tech}</td>
                  <td style={{ padding: 'var(--space-lg) var(--space-2xl)', fontSize: 'var(--font-size-base)' }}>
                    <code style={{ fontFamily: 'monospace', color: 'var(--color-font-secondary-base)' }}>{row.version}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 style={{ marginBottom: 'var(--space-2xl)', fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-font-primary-base)', fontFamily: 'var(--font-family-base)', lineHeight: 'var(--line-height-tight)' }}>Galactik resources</h2>
          <div
            style={{
              display: 'grid',
              gap: 'var(--space-lg)',
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
                    marginTop: 'var(--space-lg)',
                    color: 'var(--color-font-info-base)',
                    fontSize: 'var(--font-size-sm)',
                    textDecoration: 'underline',
                    fontFamily: 'var(--font-family-base)'
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

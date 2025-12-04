import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Tokens/Figma Styles',
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: true }
  }
};
export default meta;

type Story = StoryObj;

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section
    style={{
      marginBlock: '32px',
      background: 'var(--color-background-alt)',
      padding: 'var(--space-4xl)',
      borderRadius: 'var(--radius-2xl)',
      border: `1px solid var(--color-border-base)`
    }}
  >
    <h2 style={{ margin: 0, fontSize: '20px', lineHeight: '28px', color: 'var(--color-font-primary-base)' }}>
      {title}
    </h2>
    <div style={{ marginTop: 12 }}>{children}</div>
  </section>
);

const TypographyPreview: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
  <div
    style={{
      padding: 'var(--space-3xl)',
      background: 'var(--color-background-surface)',
      borderRadius: 'var(--radius-md)',
      border: `1px solid var(--color-border-base)`,
      marginBottom: 'var(--space-2xl)'
    }}
  >
    <div className={className} style={{ fontSize: '18px', marginBottom: 'var(--space-md)' }}>
      The quick brown fox jumps over the lazy dog
    </div>
    <code
      style={{
        fontSize: '12px',
        color: 'var(--color-font-neutral-muted)',
        padding: 'var(--space-xs)',
        background: 'var(--color-background-alt)',
        borderRadius: 'var(--radius-xs)'
      }}
    >
      {name}
    </code>
  </div>
);

export const FigmaTypographyStyles: Story = {
  name: 'Typography Styles',
  render: () => (
    <div
      style={{
        padding: 'var(--space-4xl)',
        maxWidth: 1280,
        margin: '0 auto',
        fontFamily: 'var(--font-family-base)',
        background: 'var(--color-background-surface)'
      }}
    >
      <h1 style={{ margin: 0, fontSize: 24, lineHeight: '31px', color: 'var(--color-font-primary-base)' }}>
        Figma Typography Styles
      </h1>
      <p style={{ color: 'var(--color-font-neutral-muted)', marginBottom: 'var(--space-4xl)' }}>
        Styles synchronized from the Figma "Solary Version Onechaps" file.
      </p>

      <Section title="Heading Styles">
        <div>
          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            h1
          </h3>
          <TypographyPreview name="h1" />

          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            h2
          </h3>
          <TypographyPreview name="h2" />

          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            h3-bold
          </h3>
          <TypographyPreview name="h3-bold" />

          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            h3-medium
          </h3>
          <TypographyPreview name="h3-medium" />

          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            h3-regular
          </h3>
          <TypographyPreview name="h3-regular" />
        </div>
      </Section>

      <Section title="Paragraph Styles">
        <div>
          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            p-base-bold
          </h3>
          <TypographyPreview name="p-base-bold" />

          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            p-base-medium
          </h3>
          <TypographyPreview name="p-base-medium" />

          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            p-base-regular
          </h3>
          <TypographyPreview name="p-base-regular" />

          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            p-sm-bold
          </h3>
          <TypographyPreview name="p-sm-bold" />

          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            p-sm-medium
          </h3>
          <TypographyPreview name="p-sm-medium" />

          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            p-sm-regular
          </h3>
          <TypographyPreview name="p-sm-regular" />

          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            p-xs-bold
          </h3>
          <TypographyPreview name="p-xs-bold" />

          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            p-xs-medium
          </h3>
          <TypographyPreview name="p-xs-medium" />

          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            p-xs-regular
          </h3>
          <TypographyPreview name="p-xs-regular" />
        </div>
      </Section>

      <Section title="Additional Styles">
        <div>
          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            Body 3
          </h3>
          <TypographyPreview name="Body 3" />

          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            Body/Body small medium
          </h3>
          <TypographyPreview name="Body/Body small medium" />

          <h3 style={{ margin: '0 0 var(--space-2xl)', fontSize: 16, color: 'var(--color-font-primary-base)' }}>
            text/text-base/regular
          </h3>
          <TypographyPreview name="text/text-base/regular" />
        </div>
      </Section>
    </div>
  )
};

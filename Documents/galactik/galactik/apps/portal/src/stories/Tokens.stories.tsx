import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Tokens/Tokens',
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: true }
  }
};
export default meta;

type Story = StoryObj;

const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    : '';

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

const Swatch: React.FC<{ token: string; label?: string }> = ({ token, label }) => {
  const value = cssVar(token);
  return (
    <div
      style={{
        border: `1px solid var(--color-border-base)`,
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        width: 160,
        background: 'var(--color-background-alt)'
      }}
    >
      <div
        style={{
          height: 72,
          background: `var(${token})`,
          borderBottom: '1px solid var(--color-border-base)'
        }}
      />
      <div style={{ padding: 'var(--space-md)' }}>
        <div style={{ fontSize: 12, color: 'var(--color-font-primary-base)', fontWeight: 600 }}>
          {label ?? token.replace('--', '')}
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-font-neutral-muted)', marginTop: 4 }}>{value || '—'}</div>
      </div>
    </div>
  );
};

const Grid: React.FC<{ cols?: number; children: React.ReactNode }> = ({ cols = 6, children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, minmax(140px, 1fr))`,
      gap: 12
    }}
  >
    {children}
  </div>
);

const scale = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const colorFamilies = [
  'pink',
  'grey',
  'yellow',
  'orange',
  'green',
  'red',
  'cherry',
  'indigo',
  'blue',
  'cyan',
  'sage',
  'almond'
];

const renderColorFamily = (family: string) => (
  <div key={family} style={{ marginBottom: 16 }}>
    <h3 style={{ margin: '12px 0 8px', fontSize: 16, color: 'var(--color-font-primary-base)' }}>{family}</h3>
    <Grid cols={6}>
      {scale.map((step) => (
        <Swatch key={`${family}-${step}`} token={`--${family}-${step}`} />
      ))}
    </Grid>
  </div>
);

const TypeRow: React.FC<{ name: string; sizeVar: string; lhVar: string; weightVar?: string }> = ({
  name,
  sizeVar,
  lhVar,
  weightVar = '--font-weight-regular'
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '220px 1fr 140px 140px 140px',
      gap: 12,
      alignItems: 'center',
      padding: '10px 0',
      borderTop: `1px solid var(--color-border-base)`
    }}
  >
    <div style={{ color: 'var(--color-font-neutral-muted)', fontSize: 12 }}>{name}</div>
    <div
      style={{
        fontSize: `var(${sizeVar})`,
        lineHeight: `var(${lhVar})`,
        fontWeight: `var(${weightVar})` as React.CSSProperties['fontWeight'],
        fontFamily: 'var(--font-family-base)'
      }}
    >
      The quick brown fox jumps over the lazy dog
    </div>
    <code style={{ fontSize: 12, color: 'var(--color-font-neutral-muted)' }}>{sizeVar}</code>
    <code style={{ fontSize: 12, color: 'var(--color-font-neutral-muted)' }}>{lhVar}</code>
    <code style={{ fontSize: 12, color: 'var(--color-font-neutral-muted)' }}>{weightVar}</code>
  </div>
);

const SpacingBar: React.FC<{ token: string }> = ({ token }) => {
  const px = cssVar(token);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 160 }}>
        <code style={{ fontSize: 12, color: 'var(--color-font-neutral-base)' }}>{token}</code>
      </div>
      <div style={{ flex: 1, background: 'var(--color-background-alt)', height: 10, position: 'relative' }}>
        <div style={{ width: `var(${token})`, height: '100%', background: 'var(--color-font-info-base)' }} />
      </div>
      <div style={{ width: 60, textAlign: 'right', fontSize: 12, color: 'var(--color-font-neutral-muted)' }}>
        {px || '—'}
      </div>
    </div>
  );
};

const RadiusCard: React.FC<{ token: string }> = ({ token }) => (
  <div style={{ width: 140 }}>
    <div
      style={{
        height: 72,
        background: 'var(--color-background-alt)',
        border: `1px solid var(--color-border-base)`,
        borderRadius: `var(${token})`
      }}
    />
    <div style={{ marginTop: 6 }}>
      <code style={{ fontSize: 12, color: 'var(--color-font-neutral-muted)' }}>{token}</code>
    </div>
  </div>
);

const IconCircle: React.FC<{ token: string }> = ({ token }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <div
      style={{
        width: `var(${token})`,
        height: `var(${token})`,
        borderRadius: 9999,
        background: 'var(--color-background-alt)',
        border: `1px solid var(--color-border-base)`
      }}
    />
    <code style={{ fontSize: 12, color: 'var(--color-font-neutral-muted)' }}>{token}</code>
  </div>
);

const StrokeBox: React.FC<{ token: string }> = ({ token }) => (
  <div style={{ width: 160 }}>
    <div
      style={{
        height: 72,
        background: 'transparent',
        border: `var(${token}) solid var(--color-border-base)`,
        borderRadius: 8
      }}
    />
    <div style={{ marginTop: 6 }}>
      <code style={{ fontSize: 12, color: 'var(--color-font-neutral-muted)' }}>{token}</code>
    </div>
  </div>
);

const BlurBox: React.FC<{ token: string }> = ({ token }) => (
  <div style={{ width: 180, display: 'flex', alignItems: 'center', gap: 12 }}>
    <div
      style={{
        width: 120,
        height: 48,
        background: 'var(--color-font-info-base)',
        filter: `blur(var(${token}))`,
        borderRadius: 8
      }}
    />
    <code style={{ fontSize: 12, color: 'var(--color-font-neutral-muted)' }}>{token}</code>
  </div>
);

export const AllTokens: Story = {
  name: 'Overview',
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
        Design Tokens
      </h1>
      <p style={{ color: 'var(--color-font-neutral-muted)' }}>
        Visualisation de toutes les variables exposées par <code>tokens.css</code>.
      </p>

      <Section title="Palette">
        {colorFamilies.map(renderColorFamily)}
        <h3 style={{ margin: '20px 0 8px', fontSize: 16 }}>Couleurs extraites de Figma</h3>
        <Grid cols={6}>
          {[
            '--colors-figma-color',
            '--colors-figma-spacing-scale',
            '--colors-figma-font-tokens',
            '--colors-figma-frame-header',
            '--colors-figma-sectionheader'
          ].map((t) => (
            <Swatch key={t} token={t} label={t.replace('--colors-figma-', '').replace(/-/g, ' ')} />
          ))}
        </Grid>
        <h3 style={{ margin: '20px 0 8px', fontSize: 16 }}>Absolute / Neutres</h3>
        <Grid cols={6}>
          {['--abs-pure-white', '--abs-white', '--abs-black', '--abs-transparent'].map((t) => (
            <Swatch key={t} token={t} />
          ))}
        </Grid>
      </Section>

      <Section title="Typographie">
        <div style={{ marginBottom: 8, color: '#6b7280', fontSize: 12 }}>
          Famille: <code>var(--font-family-base)</code> – Poids: <code>regular / semibold / bold</code>
        </div>
        <TypeRow name="Body / Base" sizeVar="--font-size-base" lhVar="--line-height-5" />
        <TypeRow name="Small" sizeVar="--font-size-sm" lhVar="--line-height-3" />
        <TypeRow name="XS" sizeVar="--font-size-xs" lhVar="--line-height-2" />
        <TypeRow name="Large" sizeVar="--font-size-lg" lhVar="--line-height-4" weightVar="--font-weight-semibold" />
        <TypeRow name="XL" sizeVar="--font-size-xl" lhVar="--line-height-6" weightVar="--font-weight-bold" />
        <TypeRow name="2XL" sizeVar="--font-size-2xl" lhVar="--line-height-6" weightVar="--font-weight-bold" />
      </Section>

      <Section title="Espacements">
      <div style={{ display: 'grid', gap: 10 }}>
          {[
            '--space-4xs',
            '--space-3xs',
            '--space-2xs',
            '--space-xs',
            '--space-sm',
            '--space-md',
            '--space-lg',
            '--space-xl',
            '--space-2xl',
            '--space-3xl',
            '--space-4xl',
            '--space-5xl',
            '--space-6xl',
            '--space-7xl'
          ].map((t) => (
            <SpacingBar key={t} token={t} />
          ))}
        </div>
      </Section>

      <Section title="Rayons (Border Radius)">
        <Grid cols={6}>
          {[
            '--radius-none',
            '--radius-xs',
            '--radius-sm',
            '--radius-md',
            '--radius-lg',
            '--radius-xl',
            '--radius-2xl',
            '--radius-3xl',
            '--radius-4xl',
            '--radius-rounded'
          ].map((t) => (
            <RadiusCard key={t} token={t} />
          ))}
        </Grid>
      </Section>

      <Section title="Tailles d’icônes">
        <div style={{ display: 'grid', gap: 10 }}>
          {['--icon-2xs', '--icon-xs', '--icon-md', '--icon-l', '--icon-xl', '--icon-xxl'].map((t) => (
            <IconCircle key={t} token={t} />
          ))}
        </div>
      </Section>

      <Section title="Traits (Stroke width)">
        <Grid cols={6}>
          {['--stroke-none', '--stroke-2xs', '--stroke-xs', '--stroke-sm', '--stroke-md'].map((t) => (
            <StrokeBox key={t} token={t} />
          ))}
        </Grid>
      </Section>

      <Section title="Blur (filtres)">
        <div style={{ display: 'grid', gap: 12 }}>
          {['--blur-xs', '--blur-sm', '--blur-md', '--blur-lg', '--blur-xl', '--blur-2xl', '--blur-3xl'].map((t) => (
            <BlurBox key={t} token={t} />
          ))}
        </div>
      </Section>
    </div>
  )
};

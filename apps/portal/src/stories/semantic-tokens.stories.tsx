import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Tokens/Semantic Tokens',
  parameters: {
    layout: 'padded'
  }
};
export default meta;

type Story = StoryObj;

const semanticTokens: Array<{ group: string; tokens: string[] }> = [
  {
    group: 'Fond / Background',
    tokens: [
      '--color-background-surface',
      '--color-background-alt',
      '--color-border-base',
      '--color-bg-primary-base',
      '--color-bg-primary-hovered',
      '--color-bg-primary-pressed',
      '--color-bg-primary-light',
      '--color-bg-primary-lighter',
      '--color-bg-primary-lightest',
      '--color-bg-secondary-base',
      '--color-bg-secondary-base-alt',
      '--color-bg-secondary-active',
      '--color-bg-secondary-light',
      '--color-bg-secondary-lighter',
      '--color-bg-secondary-lightest',
      '--color-bg-accent-base',
      '--color-bg-accent-base-alt',
      '--color-bg-accent-hover',
      '--color-bg-accent-pressed',
      '--color-bg-neutral-base',
      '--color-bg-neutral-disabled',
      '--color-bg-neutral-white',
      '--color-bg-neutral-base-alt',
      '--color-bg-warning-base',
      '--color-bg-warning-base-alt',
      '--color-bg-success-base',
      '--color-bg-success-base-alt',
      '--color-bg-info-base',
      '--color-bg-info-base-alt',
      '--color-bg-error-base',
      '--color-bg-error-base-alt',
      '--color-bg-cherry-base',
      '--color-bg-cherry-base-alt',
      '--color-bg-indigo-base',
      '--color-bg-indigo-base-alt',
      '--color-bg-yellow-base',
      '--color-bg-yellow-base-alt',
      '--color-bg-cyan-base',
      '--color-bg-cyan-base-alt'
    ]
  },
  {
    group: 'Texte primaire',
    tokens: [
      '--color-font-primary-base',
      '--color-font-primary-hovered',
      '--color-font-primary-pressed',
      '--color-font-primary-light',
      '--color-font-primary-dark'
    ]
  },
  {
    group: 'Texte secondaire',
    tokens: [
      '--color-font-secondary-base',
      '--color-font-secondary-hovered',
      '--color-font-secondary-pressed',
      '--color-font-secondary-base-alt'
    ]
  },
  {
    group: 'Texte accent',
    tokens: [
      '--color-font-accent-base',
      '--color-font-accent-light',
      '--color-font-accent-muted',
      '--color-font-success-base',
      '--color-font-success-light',
      '--color-font-success-muted',
      '--color-font-warning-base',
      '--color-font-warning-light',
      '--color-font-warning-muted',
      '--color-font-info-base',
      '--color-font-info-light',
      '--color-font-info-muted',
      '--color-font-error-base',
      '--color-font-error-light',
      '--color-font-error-muted',
      '--color-font-cherry-base',
      '--color-font-cherry-muted',
      '--color-font-indigo-base',
      '--color-font-indigo-muted',
      '--color-font-yellow-base',
      '--color-font-yellow-muted',
      '--color-font-cyan-base',
      '--color-font-cyan-muted'
    ]
  },
  {
    group: 'Texte neutre',
    tokens: [
      '--color-font-neutral-base',
      '--color-font-neutral-muted',
      '--color-font-neutral-light',
      '--color-font-neutral-white',
      '--color-font-neutral-black'
    ]
  },
  {
    group: 'Traits / Stroke',
    tokens: [
      '--color-stroke-focus',
      '--color-stroke-primary-base',
      '--color-stroke-primary-hovered',
      '--color-stroke-primary-pressed',
      '--color-stroke-primary-light',
      '--color-stroke-primary-lighter',
      '--color-stroke-secondary-base',
      '--color-stroke-secondary-dark',
      '--color-stroke-accent-base',
      '--color-stroke-yellow-base',
      '--color-stroke-cherry-base',
      '--color-stroke-indigo-base',
      '--color-stroke-cyan-base',
      '--color-stroke-warning-base',
      '--color-stroke-info-base',
      '--color-stroke-neutral-disabled',
      '--color-stroke-neutral-white',
      '--color-stroke-neutral-dark',
      '--color-stroke-neutral-black',
      '--color-stroke-success-base',
      '--color-stroke-error-base'
    ]
  }
];

const getTokenValue = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    : '';

const getAlias = (name: string) => {
  if (typeof window === 'undefined') return '';
  const theme = document.documentElement.getAttribute('data-theme') ?? 'light';
  const styles = Array.from(document.styleSheets) as CSSStyleSheet[];

  const selectors = [
    `:root[data-theme='${theme}']`,
    `:root[data-theme="${theme}"]`,
    ':root'
  ];

  for (const selector of selectors) {
    for (const sheet of styles) {
      let rules: CSSRuleList;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of Array.from(rules)) {
        if (!(rule instanceof CSSStyleRule)) continue;
        if (!rule.selectorText?.split(',').map((s) => s.trim()).includes(selector)) continue;
        const raw = rule.style.getPropertyValue(name)?.trim();
        if (!raw) continue;
        const match = raw.match(/var\((--[a-zA-Z0-9-]+)\)/);
        if (match) return match[1];
      }
    }
  }
  return '';
};

const SemanticList: React.FC = () => {
  const [, forceRefresh] = useState(0);
  useEffect(() => {
    const observer = new MutationObserver(() => forceRefresh((x) => x + 1));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      {semanticTokens.map(({ group, tokens }) => (
        <div key={group}>
          <h4 style={{ margin: '0 0 8px', fontSize: 16 }}>{group}</h4>
          <div style={{ display: 'grid', gap: 8 }}>
            {tokens.map((token) => (
              <div
                key={token}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  background: 'var(--color-background-alt)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {token.startsWith('--color-stroke-') ? (
                    <span
                      style={{
                        width: 42,
                        height: 24,
                        borderRadius: 6,
                        border: `2px solid var(${token})`,
                        background: 'transparent'
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        border: '1px solid rgba(15,23,42,0.12)',
                        background: `var(${token})`
                      }}
                    />
                  )}
                  <code style={{ fontSize: 13 }}>{token}</code>
                </div>
                  <div style={{ textAlign: 'right', minWidth: 110 }}>
                    <div style={{ fontSize: 13 }}>{getTokenValue(token) || '—'}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>
                      {getAlias(token).replace('--', '') || '—'}
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const SemanticOverview: Story = {
  name: 'Overview',
  render: () => (
    <div
      style={{
        padding: 24,
        maxWidth: 960,
        margin: '0 auto',
        fontFamily: 'var(--font-family-base)',
        background: 'var(--color-background-alt)',
        borderRadius: 24,
        border: `1px solid var(--color-border-base)`
      }}
    >
      <h1 style={{ margin: 0, fontSize: 24 }}>Semantic variables</h1>
      <p style={{ color: 'var(--color-font-neutral-base)' }}>
        These values adapt automatically when you switch Storybook themes (Light/Dark).
      </p>
      <SemanticList />
    </div>
  )
};

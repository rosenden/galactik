import type { Meta, StoryObj } from '@storybook/react';

/**
 * Design Tokens Preview
 * 
 * Affiche tous les tokens de couleurs, spacing, et radii disponibles
 * Merges tokens from:
 * - Base colors (color palettes: pink, grey, yellow, orange, green, red, cherry, indigo, blue, cyan, sage, almond)
 * - Figma extracted colors
 * - Semantic theme colors (light theme)
 */

// Import token variables
import { designTokens } from '../../../styles/tokens-generated-vars.js';

const meta: Meta = {
  title: 'Design System/Tokens',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Color Palette Story
 */
export const Colors: Story = {
  render: () => {
    const colors = designTokens.base.colors || {};

    return (
      <div style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
        <h1>Design System - Color Palettes</h1>

        {Object.entries(colors).map(([paletteKey, palette]: any) => (
          <div key={paletteKey} style={{ marginBottom: '3rem' }}>
            <h2 style={{ textTransform: 'capitalize', marginBottom: '1rem' }}>
              {paletteKey}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '1rem',
              }}
            >
              {typeof palette === 'object' && palette !== null
                ? Object.entries(palette).map(([colorKey, colorValue]: any) => (
                    <div
                      key={`${paletteKey}-${colorKey}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '80px',
                          backgroundColor: colorValue?.value || colorValue,
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '12px',
                          textAlign: 'center',
                          fontWeight: 500,
                        }}
                      >
                        {colorKey}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#666',
                          fontFamily: 'monospace',
                        }}
                      >
                        {colorValue?.value || colorValue}
                      </span>
                    </div>
                  ))
                : null}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Spacing Scale Story
 */
export const Spacing: Story = {
  render: () => {
    const spacing = designTokens.base.spacing || {};

    return (
      <div style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
        <h1>Design System - Spacing Scale</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {Object.entries(spacing).map(([key, value]: any) => {
            const sizeValue = value?.value || value;
            return (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    width: '150px',
                    fontWeight: 600,
                    fontFamily: 'monospace',
                  }}
                >
                  {key}
                </div>
                <div
                  style={{
                    height: '20px',
                    backgroundColor: '#3498db',
                    width: sizeValue,
                    borderRadius: '2px',
                  }}
                />
                <span style={{ fontSize: '14px', color: '#666' }}>
                  {sizeValue}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

/**
 * Border Radius Story
 */
export const Radii: Story = {
  render: () => {
    const radii = designTokens.base.radii || {};

    return (
      <div style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
        <h1>Design System - Border Radius</h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '2rem',
          }}
        >
          {Object.entries(radii).map(([key, value]: any) => {
            const radiusValue = value?.value || value;
            return (
              <div key={key} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#9b59b6',
                    borderRadius: radiusValue,
                    margin: '0 auto 1rem',
                  }}
                />
                <div style={{ fontWeight: 600, fontFamily: 'monospace' }}>
                  {key}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {radiusValue}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

/**
 * Theme Colors Story
 */
export const ThemeColors: Story = {
  render: () => {
    const theme = designTokens.theme?.light || {};

    return (
      <div style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
        <h1>Design System - Theme Colors (Light)</h1>

        {Object.entries(theme).map(([categoryKey, categoryColors]: any) => (
          <div key={categoryKey} style={{ marginBottom: '2rem' }}>
            <h3 style={{ textTransform: 'capitalize', marginBottom: '1rem' }}>
              {categoryKey}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '1rem',
              }}
            >
              {typeof categoryColors === 'object' && categoryColors !== null
                ? Object.entries(categoryColors).map(([colorKey, colorValue]: any) => (
                    <div key={`${categoryKey}-${colorKey}`}>
                      <div
                        style={{
                          width: '100%',
                          height: '60px',
                          backgroundColor: colorValue?.value || colorValue,
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          marginBottom: '0.5rem',
                        }}
                      />
                      <div style={{ fontSize: '12px', fontWeight: 500 }}>
                        {colorKey}
                      </div>
                      <div
                        style={{
                          fontSize: '10px',
                          color: '#666',
                          fontFamily: 'monospace',
                        }}
                      >
                        {colorValue?.value || colorValue}
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

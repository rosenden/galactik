import React, { useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Accessibility/Color Contrast',
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false }
  }
};
export default meta;

type Story = StoryObj;

// WCAG contrast ratio calculation
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(x => {
    x = x / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(rgb1: string, rgb2: string): number {
  const parseRGB = (rgb: string) => {
    const match = rgb.match(/\d+/g);
    return match ? [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])] : [0, 0, 0];
  };
  
  const [r1, g1, b1] = parseRGB(rgb1);
  const [r2, g2, b2] = parseRGB(rgb2);
  
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

function getWCAGLevel(ratio: number): 'AAA' | 'AA' | 'Fail' {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  return 'Fail';
}

const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    : '';

// Color tokens
const colorFamilies = [
  'sage',
  'almond',
  'pink',
  'grey',
  'yellow',
  'orange',
  'green',
  'red',
  'cherry',
  'indigo',
  'blue',
  'cyan'
];

const colorShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

const ContrastCell: React.FC<{
  bgColor: string;
  textColor: string;
  bgLabel: string;
  textLabel: string;
  ratio: number;
  level: 'AAA' | 'AA' | 'Fail';
}> = ({ bgColor, textColor, bgLabel, textLabel, ratio, level }) => {
  const levelColors = {
    'AAA': '#22c55e',
    'AA': '#eab308',
    'Fail': '#ef4444'
  };

  return (
    <div
      style={{
        padding: '12px',
        borderRadius: '8px',
        background: bgColor,
        color: textColor,
        border: `2px solid ${levelColors[level]}`,
        textAlign: 'center',
        minHeight: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ fontSize: '12px', fontWeight: 600 }}>
        {bgLabel}
        <br />
        {textLabel}
      </div>
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
        {level === 'AAA' && '✓'}
        {level === 'AA' && '⚠'}
        {level === 'Fail' && '✗'} {ratio.toFixed(2)}
      </div>
    </div>
  );
};

export const AllCombinations: Story = {
  name: 'Valid Combinations (WCAG AA+)',
  render: () => {
    const validCombinations = useMemo(() => {
      const combinations: any[] = [];
      
      for (const bgFamily of colorFamilies) {
        for (const bgShade of colorShades) {
          for (const textFamily of colorFamilies) {
            for (const textShade of colorShades) {
              const bgToken = `--${bgFamily}-${bgShade}`;
              const textToken = `--${textFamily}-${textShade}`;
              
              const bgColor = cssVar(bgToken);
              const textColor = cssVar(textToken);
              
              if (!bgColor || !textColor) continue;
              
              const ratio = getContrastRatio(bgColor, textColor);
              const level = getWCAGLevel(ratio);
              
              if (level === 'AA' || level === 'AAA') {
                combinations.push({
                  bgFamily,
                  bgShade,
                  textFamily,
                  textShade,
                  ratio,
                  level,
                  bgColor,
                  textColor
                });
              }
            }
          }
        }
      }
      
      return combinations.sort((a, b) => b.ratio - a.ratio);
    }, []);

    return (
      <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '16px', fontSize: '28px', fontWeight: 'bold' }}>
          ✓ Valid Color Combinations (WCAG AA & AAA)
        </h1>
        <p style={{ marginBottom: '32px', color: '#666', fontSize: '14px' }}>
          Showing all {validCombinations.length} valid background/text color pairs with sufficient contrast
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '8px'
          }}
        >
          {validCombinations.slice(0, 100).map((combo, idx) => (
            <ContrastCell
              key={idx}
              bgColor={combo.bgColor}
              textColor={combo.textColor}
              bgLabel={`${combo.bgFamily}-${combo.bgShade}`}
              textLabel={`${combo.textFamily}-${combo.textShade}`}
              ratio={combo.ratio}
              level={combo.level}
            />
          ))}
        </div>

        <div style={{ marginTop: '32px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
          <strong>Total valid combinations:</strong> {validCombinations.length}
          <br />
          <strong>AAA (7:1 or higher):</strong> {validCombinations.filter(c => c.level === 'AAA').length}
          <br />
          <strong>AA (4.5:1 to 7:1):</strong> {validCombinations.filter(c => c.level === 'AA').length}
        </div>
      </div>
    );
  }
};

export const ForbiddenCombinations: Story = {
  name: 'Forbidden Combinations (Below WCAG AA)',
  render: () => {
    const forbiddenCombinations = useMemo(() => {
      const combinations: any[] = [];
      
      for (const bgFamily of colorFamilies) {
        for (const bgShade of colorShades) {
          for (const textFamily of colorFamilies) {
            for (const textShade of colorShades) {
              const bgToken = `--${bgFamily}-${bgShade}`;
              const textToken = `--${textFamily}-${textShade}`;
              
              const bgColor = cssVar(bgToken);
              const textColor = cssVar(textToken);
              
              if (!bgColor || !textColor) continue;
              
              const ratio = getContrastRatio(bgColor, textColor);
              const level = getWCAGLevel(ratio);
              
              if (level === 'Fail') {
                combinations.push({
                  bgFamily,
                  bgShade,
                  textFamily,
                  textShade,
                  ratio,
                  level,
                  bgColor,
                  textColor
                });
              }
            }
          }
        }
      }
      
      return combinations.sort((a, b) => a.ratio - b.ratio);
    }, []);

    return (
      <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '16px', fontSize: '28px', fontWeight: 'bold', color: '#ef4444' }}>
          ✗ Forbidden Combinations (Below WCAG AA)
        </h1>
        <p style={{ marginBottom: '32px', color: '#666', fontSize: '14px' }}>
          Showing all {forbiddenCombinations.length} invalid background/text color pairs with insufficient contrast
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '8px'
          }}
        >
          {forbiddenCombinations.slice(0, 100).map((combo, idx) => (
            <ContrastCell
              key={idx}
              bgColor={combo.bgColor}
              textColor={combo.textColor}
              bgLabel={`${combo.bgFamily}-${combo.bgShade}`}
              textLabel={`${combo.textFamily}-${combo.textShade}`}
              ratio={combo.ratio}
              level={combo.level}
            />
          ))}
        </div>

        <div style={{ marginTop: '32px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
          <strong>Total forbidden combinations:</strong> {forbiddenCombinations.length}
          <br />
          <strong>Showing:</strong> {Math.min(100, forbiddenCombinations.length)} combinations
        </div>
      </div>
    );
  }
};

const ContrastTable: React.FC<{ bgFamily: string }> = ({ bgFamily }) => {
  const combinations = useMemo(() => {
    const combs: any[] = [];
    
    for (const bgShade of colorShades) {
      for (const textFamily of colorFamilies) {
        for (const textShade of colorShades) {
          const bgToken = `--${bgFamily}-${bgShade}`;
          const textToken = `--${textFamily}-${textShade}`;
          
          const bgColor = cssVar(bgToken);
          const textColor = cssVar(textToken);
          
          if (!bgColor || !textColor) continue;
          
          const ratio = getContrastRatio(bgColor, textColor);
          const level = getWCAGLevel(ratio);
          
          combs.push({
            bgShade,
            textFamily,
            textShade,
            ratio,
            level,
            bgColor,
            textColor
          });
        }
      }
    }
    
    return combs.sort((a, b) => b.ratio - a.ratio);
  }, [bgFamily]);

  return (
    <div style={{ marginBottom: '48px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', textTransform: 'capitalize' }}>
        Background: {bgFamily}
      </h2>
      
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '12px',
          border: '1px solid #ddd'
        }}
      >
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: '8px', textAlign: 'left', borderRight: '1px solid #ddd' }}>Background</th>
            <th style={{ padding: '8px', textAlign: 'left', borderRight: '1px solid #ddd' }}>Text Color</th>
            <th style={{ padding: '8px', textAlign: 'center', borderRight: '1px solid #ddd' }}>Ratio</th>
            <th style={{ padding: '8px', textAlign: 'center' }}>Level</th>
          </tr>
        </thead>
        <tbody>
          {combinations.map((combo, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px', borderRight: '1px solid #ddd' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      background: combo.bgColor,
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }}
                  />
                  <span>{bgFamily}-{combo.bgShade}</span>
                </div>
              </td>
              <td style={{ padding: '8px', borderRight: '1px solid #ddd' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      background: combo.textColor,
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }}
                  />
                  <span>{combo.textFamily}-{combo.textShade}</span>
                </div>
              </td>
              <td
                style={{
                  padding: '8px',
                  textAlign: 'center',
                  borderRight: '1px solid #ddd',
                  fontWeight: 'bold'
                }}
              >
                {combo.ratio.toFixed(2)}:1
              </td>
              <td
                style={{
                  padding: '8px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color:
                    combo.level === 'AAA'
                      ? '#22c55e'
                      : combo.level === 'AA'
                        ? '#eab308'
                        : '#ef4444'
                }}
              >
                {combo.level}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const DetailedContrastTable: Story = {
  name: 'Detailed Contrast Table',
  render: () => (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '32px', fontSize: '28px', fontWeight: 'bold' }}>
        WCAG Contrast Ratio Details by Background Color
      </h1>
      <p style={{ marginBottom: '32px', color: '#666' }}>
        Detailed table showing all text color combinations for each background color with WCAG compliance levels
      </p>

      {colorFamilies.map(family => (
        <ContrastTable key={family} bgFamily={family} />
      ))}
    </div>
  )
};

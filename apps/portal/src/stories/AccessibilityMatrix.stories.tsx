import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useMemo } from 'react';
import validRatios from '../data/contrast-ratios-valid.json';
import forbiddenRatios from '../data/contrast-ratios-forbidden.json';

const meta: Meta = {
  title: 'Accessibility/Contrast Matrix',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface ContrastData {
  background: {
    family: string;
    shade: string;
    hex: string;
  };
  text: {
    family: string;
    shade: string;
    hex: string;
  };
  ratio: number;
  level: 'AAA' | 'AA' | 'Fail';
}

const ContrastMatrixViewer: React.FC<{ data: any; title: string; showLevel?: string }> = ({
  data,
  title,
  showLevel,
}) => {
  const [selectedBg, setSelectedBg] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState<'ratio' | 'name'>('ratio');

  const filteredData = useMemo(() => {
    let items = data.validCombinations
      ? [
          ...(data.validCombinations.AAA || []),
          ...(data.validCombinations.AA || []),
        ]
      : data.forbiddenCombinations || [];

    if (showLevel === 'AAA') {
      items = items.filter((c: ContrastData) => c.level === 'AAA');
    } else if (showLevel === 'AA') {
      items = items.filter((c: ContrastData) => c.level === 'AA');
    }

    if (searchText) {
      items = items.filter(
        (c: ContrastData) =>
          c.background.family.includes(searchText.toLowerCase()) ||
          c.background.shade.includes(searchText.toLowerCase()) ||
          c.text.family.includes(searchText.toLowerCase()) ||
          c.text.shade.includes(searchText.toLowerCase())
      );
    }

    if (sortBy === 'ratio') {
      items.sort((a: ContrastData, b: ContrastData) => b.ratio - a.ratio);
    } else {
      items.sort((a: ContrastData, b: ContrastData) =>
        `${a.background.family}-${a.background.shade}`.localeCompare(
          `${b.background.family}-${b.background.shade}`
        )
      );
    }

    return items;
  }, [data, searchText, sortBy, showLevel]);

  const stats = useMemo(() => {
    const AAA = filteredData.filter((c: ContrastData) => c.level === 'AAA').length;
    const AA = filteredData.filter((c: ContrastData) => c.level === 'AA').length;
    return { total: filteredData.length, AAA, AA };
  }, [filteredData]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0' }}>{title}</h1>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
          {`Showing: ${stats.total.toLocaleString()} combinations | AAA: ${stats.AAA.toLocaleString()} | AA: ${stats.AA.toLocaleString()}`}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search color family or shade..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '0.9rem',
            flex: 1,
            minWidth: '250px',
          }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'ratio' | 'name')}
          style={{
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '0.9rem',
          }}
        >
          <option value="ratio">Sort by Ratio (Highest)</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1rem',
        }}
      >
        {filteredData.slice(0, 100).map((combo: ContrastData, idx: number) => {
          const bgKey = `${combo.background.family}-${combo.background.shade}`;
          const textKey = `${combo.text.family}-${combo.text.shade}`;
          const isSelected = selectedBg === bgKey;
          const bgColor = combo.background.hex?.startsWith('#') ? combo.background.hex : `#${combo.background.hex}`;
          const textColor = combo.text.hex?.startsWith('#') ? combo.text.hex : `#${combo.text.hex}`;

          return (
            <div
              key={idx}
              onClick={() => setSelectedBg(isSelected ? null : bgKey)}
              style={{
                padding: '0',
                border: isSelected ? '3px solid #0066cc' : '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  backgroundColor: bgColor,
                  padding: '1.5rem 1rem',
                  minHeight: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    color: textColor,
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Sample Text
                </div>
              </div>

              <div style={{ 
                padding: '0.75rem 1rem',
                backgroundColor: 'white',
                borderTop: '1px solid #e0e0e0'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                  <div><strong>BG:</strong> {bgKey}</div>
                  <div><strong>Text:</strong> {textKey}</div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 'bold',
                      color: combo.level === 'AAA' ? '#0d8f40' : combo.level === 'AA' ? '#2f5c0f' : '#cc0000',
                    }}
                  >
                    {combo.ratio}:1
                  </span>
                  <span
                    style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      backgroundColor:
                        combo.level === 'AAA' ? '#d4edda' : combo.level === 'AA' ? '#d1ecf1' : '#f8d7da',
                      color:
                        combo.level === 'AAA' ? '#155724' : combo.level === 'AA' ? '#0c5460' : '#721c24',
                    }}
                  >
                    {combo.level}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '2rem', color: '#666', fontSize: '0.9rem' }}>
        Showing {Math.min(100, filteredData.length)} of {filteredData.length} combinations
      </div>
    </div>
  );
};

export const AllValidCombinations: Story = {
  render: () => <ContrastMatrixViewer data={validRatios} title="All Valid Combinations (WCAG AA+)" />,
};

export const AAACombinations: Story = {
  render: () => (
    <ContrastMatrixViewer data={validRatios} title="AAA Combinations (7.0:1+)" showLevel="AAA" />
  ),
};

export const AACombinations: Story = {
  render: () => (
    <ContrastMatrixViewer data={validRatios} title="AA Combinations (4.5:1+)" showLevel="AA" />
  ),
};

export const ForbiddenCombinations: Story = {
  render: () => (
    <ContrastMatrixViewer data={forbiddenRatios} title="Forbidden Combinations (< 4.5:1)" />
  ),
};

// Statistics Dashboard
const StatsDashboard: React.FC = () => {
  const stats = validRatios.statistics;
  const statsPercentage = (validRatios.statistics as any)?.validPercentage || '0%';

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Accessibility Statistics Dashboard</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
            {(stats.total as number).toLocaleString()}
          </div>
          <div style={{ color: '#666', marginTop: '0.5rem' }}>Total Combinations</div>
        </div>

        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#d4edda',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#155724' }}>
            {statsPercentage}
          </div>
          <div style={{ color: '#155724', marginTop: '0.5rem' }}>Valid (AA+)</div>
        </div>

        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#d1ecf1',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0c5460' }}>
            {(stats.validAAA as number).toLocaleString()}
          </div>
          <div style={{ color: '#0c5460', marginTop: '0.5rem' }}>AAA (7.0:1+)</div>
        </div>

        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#cfe2ff',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#084298' }}>
            {(stats.validAA as number).toLocaleString()}
          </div>
          <div style={{ color: '#084298', marginTop: '0.5rem' }}>AA (4.5:1+)</div>
        </div>

        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#f8d7da',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#721c24' }}>
            {(stats.forbidden as number).toLocaleString()}
          </div>
          <div style={{ color: '#721c24', marginTop: '0.5rem' }}>Forbidden</div>
        </div>
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '1.5rem', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>WCAG 2.1 Standards</h2>
        <ul style={{ margin: 0 }}>
          <li>
            <strong>AAA (Enhanced):</strong> 7.0:1 or higher for all text sizes
          </li>
          <li>
            <strong>AA (Standard):</strong> 4.5:1 or higher for normal text, 3:1 for large text
          </li>
          <li>
            <strong>Fail:</strong> Less than 4.5:1 insufficient for WCAG AA compliance
          </li>
        </ul>
      </div>
    </div>
  );
};

export const Statistics: Story = {
  render: () => <StatsDashboard />,
};

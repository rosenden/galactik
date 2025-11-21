import React, { useMemo, useState, ChangeEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { library, IconDefinition, IconLookup } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const iconEntries = Object.values(far).reduce<IconDefinition[]>((acc, icon) => {
  if (typeof icon === 'object' && icon && 'iconName' in icon) {
    if (!acc.some((existing) => existing.iconName === icon.iconName)) {
      acc.push(icon as IconDefinition);
    }
  }
  return acc;
}, []);

// Register all icons once so <FontAwesomeIcon> can render them.
library.add(...iconEntries);

const meta: Meta = {
  title: 'Resources/FontAwesome Icons',
  parameters: {
    layout: 'fullscreen'
  }
};

type Story = StoryObj;

export default meta;

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  border: `1px solid var(--color-border-base)`,
  borderRadius: 20,
  overflow: 'hidden',
  background: 'var(--color-background-surface)'
};

const headerCellStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: 'var(--space-sm) var(--space-md)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-font-neutral-muted)',
  background: 'var(--color-background-alt)'
};

const rowCellStyle: React.CSSProperties = {
  padding: 'var(--space-sm) var(--space-md)',
  borderTop: `1px solid var(--color-border-base)`
};

const formatLabel = (icon: IconDefinition) => {
  if (!icon.iconName) return 'icon';
  return icon.iconName.replace(/-/g, ' ');
};

const matchesQuery = (icon: IconDefinition, term: string) => {
  if (!term) return true;
  const slug = icon.iconName?.toLowerCase() ?? '';
  const readable = formatLabel(icon).toLowerCase();
  const haystack = `${slug} ${readable}`;
  return haystack.includes(term);
};

const highlightMatch = (label: string, term: string) => {
  if (!term) return label;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(${escaped})`, 'ig');
  return label.replace(pattern, '<mark>$1</mark>');
};

const IconLibrary = () => {
  const [query, setQuery] = useState('');

  const filteredIcons = useMemo(() => {
    const safeQuery = query.trim().toLowerCase();
    if (!safeQuery) return iconEntries;
    return iconEntries.filter((icon) => matchesQuery(icon, safeQuery));
  }, [query]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div
      style={{
        padding: 'var(--space-4xl)',
        fontFamily: 'var(--font-family-base)',
        color: 'var(--color-font-primary-base)',
        background: 'var(--color-background-surface)'
      }}
    >
      <header style={{ marginBottom: 'var(--space-3xl)' }}>
        <h1 style={{ margin: 0, fontSize: 'var(--font-size-4xl)' }}>Icon library (Font Awesome Regular)</h1>
        <p style={{ marginTop: 'var(--space-sm)', color: 'var(--color-font-neutral-base)' }}>
          Complete set of Font Awesome Classic Regular icons. Use the search bar to filter by name.
        </p>
      </header>

      <div
        style={{
          marginBottom: 'var(--space-2xl)',
          display: 'flex',
          gap: 'var(--space-md)',
          alignItems: 'center'
        }}
      >
        <label htmlFor="icon-search" style={{ fontWeight: 600 }}>
          Search
        </label>
        <input
          id="icon-search"
          type="text"
          placeholder="e.g. user, arrow, calendar…"
          value={query}
          onChange={handleChange}
          style={{
            flex: 1,
            minWidth: 240,
            padding: 'var(--space-sm) var(--space-md)',
            borderRadius: 12,
            border: `1px solid var(--color-border-base)`,
            background: 'var(--color-background-alt)',
            color: 'var(--color-font-primary-base)',
            fontSize: 'var(--font-size-base)'
          }}
        />
        <span style={{ color: 'var(--color-font-neutral-muted)', fontSize: 'var(--font-size-sm)' }}>
          {filteredIcons.length} icons
        </span>
      </div>

      <div style={{ maxHeight: '75vh', overflow: 'auto', borderRadius: 20, border: `1px solid var(--color-border-base)` }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerCellStyle}>Preview</th>
              <th style={headerCellStyle}>Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredIcons.map((icon) => (
              <tr key={icon.iconName} style={{ background: 'var(--color-background-surface)' }}>
                <td style={{ ...rowCellStyle, width: 120 }}>
                  <FontAwesomeIcon icon={['far', icon.iconName] as IconLookup} size="lg" />
                </td>
                <td style={{ ...rowCellStyle, fontWeight: 600, textTransform: 'capitalize' }}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightMatch(formatLabel(icon), query.trim().toLowerCase())
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Library: Story = {
  render: () => <IconLibrary />
};

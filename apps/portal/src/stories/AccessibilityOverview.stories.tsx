import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Accessibility/Overview',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Overview: React.FC = () => (
  <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
    <h1>Accessibility Guidelines</h1>
    
    <div style={{ backgroundColor: '#f0f7ff', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', borderLeft: '4px solid #0066cc' }}>
      <h2 style={{ marginTop: 0 }}>Welcome to Galactik Design System Accessibility</h2>
      <p>
        This section provides comprehensive tools to help designers and developers build accessible interfaces that comply with WCAG 2.1 standards.
      </p>
    </div>

    <section style={{ marginBottom: '2rem' }}>
      <h2>Available Tools</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <a 
          href="?path=/story/accessibility-color-contrast--valid-combinations"
          style={{
            padding: '1.5rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            textDecoration: 'none',
            border: '1px solid #ddd',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e8f5e9';
            e.currentTarget.style.borderColor = '#4caf50';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.borderColor = '#ddd';
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>✓ Color Contrast Checker</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
            Quick overview of valid and forbidden color combinations with real-time calculations.
          </p>
        </a>

        <a 
          href="?path=/story/accessibility-contrast-matrix--all-valid-combinations"
          style={{
            padding: '1.5rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            textDecoration: 'none',
            border: '1px solid #ddd',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e3f2fd';
            e.currentTarget.style.borderColor = '#2196f3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.borderColor = '#ddd';
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>📊 Contrast Matrix</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
            Interactive matrix showing all 17,689 color combinations with search and filtering.
          </p>
        </a>

        <a 
          href="?path=/story/accessibility-contrast-matrix--statistics"
          style={{
            padding: '1.5rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            textDecoration: 'none',
            border: '1px solid #ddd',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#fff3e0';
            e.currentTarget.style.borderColor = '#ff9800';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.borderColor = '#ddd';
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>📈 Statistics Dashboard</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
            Overview of all contrast statistics and compliance percentages.
          </p>
        </a>
      </div>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2>Key Metrics</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333' }}>17,689</div>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>Total Combinations</div>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#d4edda', borderRadius: '8px' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#155724' }}>5,770</div>
          <div style={{ color: '#155724', fontSize: '0.9rem' }}>Valid (AA+) - 32.62%</div>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#d1ecf1', borderRadius: '8px' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0c5460' }}>3,564</div>
          <div style={{ color: '#0c5460', fontSize: '0.9rem' }}>AAA Level</div>
        </div>
      </div>
    </section>

    <section style={{ marginBottom: '2rem' }}>
      <h2>WCAG 2.1 Standards</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ padding: '1.5rem', backgroundColor: '#d1ecf1', borderRadius: '8px', borderLeft: '4px solid #0c5460' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>AAA (Enhanced Contrast)</h3>
          <p style={{ margin: 0, color: '#0c5460' }}>
            <strong>7.0:1 ratio</strong> or higher for all text sizes. Recommended for maximum accessibility, especially for users with low vision.
          </p>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: '#cfe2ff', borderRadius: '8px', borderLeft: '4px solid #084298' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>AA (Standard Compliance)</h3>
          <p style={{ margin: 0, color: '#084298' }}>
            <strong>4.5:1 ratio</strong> for normal text, <strong>3.0:1 ratio</strong> for large text. Required for legal compliance in most jurisdictions.
          </p>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: '#f8d7da', borderRadius: '8px', borderLeft: '4px solid #721c24' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Fail (Below Standards)</h3>
          <p style={{ margin: 0, color: '#721c24' }}>
            <strong>Less than 4.5:1 ratio</strong> is insufficient for WCAG AA compliance and should be avoided for all body text.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2>Best Practices</h2>
      <ul style={{ lineHeight: 1.8, color: '#333' }}>
        <li>Always test color combinations with real content in your design</li>
        <li>Use the Contrast Matrix to find compatible foreground/background pairs</li>
        <li>Aim for AAA (7.0:1) for critical information like alerts and errors</li>
        <li>Remember that AA (4.5:1) is the minimum legal requirement</li>
        <li>Test with color blindness simulators to ensure your design works for all users</li>
        <li>Use these tools during design review and QA phases</li>
      </ul>
    </section>
  </div>
);

export const AccessibilityOverview: Story = {
  render: () => <Overview />,
};

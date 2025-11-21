import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from 'react-ui/components/Avatar/Avatar';
import Badge from 'react-ui/components/Badge/Badge';
import Bullet from 'react-ui/components/Bullet/Bullet';
import Button from 'react-ui/components/Button/Button';
import Checkbox from 'react-ui/components/Checkbox/Checkbox';
import Label from 'react-ui/components/Label';
import { SuccessIcon } from 'react-ui/components/Label/LabelIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';

const meta: Meta = {
  title: 'Home',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

interface Component {
  name: string;
  category: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  previewBg: string;
}

const components: Component[] = [
  {
    name: 'Avatar',
    category: 'Electrons',
    description: 'Display avatar with initials or image',
    path: '?path=/docs/electrons-avatar--docs',
    icon: <Avatar name="Alice Smith" size="medium" avatarColor="sage" />,
    previewBg: 'linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%)'
  },
  {
    name: 'Badge',
    category: 'Electrons',
    description: 'Colored badge to display status or labels',
    path: '?path=/docs/electrons-badge--docs',
    icon: <Badge label={5} color="success" style="primary" size="sm" />,
    previewBg: 'linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%)'
  },
  {
    name: 'Bullet',
    category: 'Electrons',
    description: 'Color dot to indicate states',
    path: '?path=/docs/electrons-bullet--docs',
    icon: <Bullet color="info" size="medium" />,
    previewBg: 'linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%)'
  },
  {
    name: 'Button',
    category: 'Electrons',
    description: 'Button with multiple variants and states',
    path: '?path=/docs/electrons-button--docs',
    icon: <Button variant="filled" colorVariant="primary" size="small" iconLeft={<FontAwesomeIcon icon={faPlus} />}>Button</Button>,
    previewBg: 'linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%)'
  },
  {
    name: 'Label',
    category: 'Electrons',
    description: 'Label with icon and colored text',
    path: '?path=/docs/electrons-label--docs',
    icon: <Label text="New" color="success" size="medium" icon={<SuccessIcon />} />,
    previewBg: 'linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%)'
  },
  {
    name: 'Checkbox',
    category: 'Electrons',
    description: 'Checkbox with indeterminate state',
    path: '?path=/docs/electrons-checkbox--docs',
    icon: <Checkbox checked={true} label="Option" />,
    previewBg: 'linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%)'
  },
];

const HomePage = () => {
  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const url = window.location.origin + '/' + path;
    if (window.top) {
      window.top.location.href = url;
    } else {
      window.location.href = url;
    }
  };

  return (
    <div style={{
      padding: 'var(--space-4xl)',
      backgroundColor: 'var(--color-background-surface)',
      minHeight: '100vh',
      fontFamily: 'var(--font-family-base)'
    }}>
      <header style={{
        marginBottom: 'var(--space-6xl)',
        textAlign: 'center'
      }}>
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 841.9 595.3'%3E%3Cg fill='%2361DAFB'%3E%3Cpath d='M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z'/%3E%3Ccircle cx='420.9' cy='296.5' r='45.7'/%3E%3Cpath d='M520.5 78.1z'/%3E%3C/g%3E%3C/svg%3E" 
          alt="React Logo" 
          style={{
            height: '50px',
            marginBottom: 'var(--space-lg)'
          }} 
        />
        <h1 style={{
          fontSize: 'var(--font-size-2xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-font-neutral-base)',
          marginBottom: 'var(--space-md)',
          lineHeight: 'var(--line-height-6)'
        }}>
          Galactik Design System
        </h1>
        <p style={{
          fontSize: 'var(--font-size-lg)',
          color: 'var(--color-font-neutral-muted)',
          lineHeight: 'var(--line-height-4)',
          marginBottom: 'var(--space-sm)'
        }}>
          React Component Library
        </p>
        <p style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-font-neutral-muted)',
          lineHeight: 'var(--line-height-2)'
        }}>
          React 18.2.0 • TypeScript 5.x • Storybook 8.2.7
        </p>
      </header>

      <section style={{ marginBottom: 'var(--space-5xl)' }}>
        <h2 style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-font-neutral-base)',
          marginBottom: 'var(--space-3xl)',
          paddingBottom: 'var(--space-md)',
          borderBottom: 'var(--stroke-xs) solid var(--color-border-base)',
          lineHeight: 'var(--line-height-5)'
        }}>
          Electrons
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-3xl)'
        }}>
          {components.map((component) => (
            <a
              key={component.name}
              href={component.path}
              onClick={handleNavigation(component.path)}
              style={{
                textDecoration: 'none',
                backgroundColor: 'var(--color-background-alt)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                border: 'var(--stroke-xs) solid var(--color-border-base)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 var(--space-xs) var(--space-2xl) rgba(0, 0, 0, 0.12)';
                e.currentTarget.style.transform = 'translateY(calc(-1 * var(--space-3xs)))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                padding: 'var(--space-4xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '120px',
                borderBottom: 'var(--stroke-xs) solid var(--color-border-base)',
                background: component.previewBg
              }}>
                {component.icon}
              </div>

              <div style={{ padding: 'var(--space-3xl)' }}>
                <span style={{
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-font-neutral-base)',
                  marginBottom: 'var(--space-3xs)',
                  lineHeight: 'var(--line-height-4)'
                }}>
                  {component.name}
                </span>
                <p style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-font-neutral-muted)',
                  lineHeight: 'var(--line-height-3)',
                  marginBottom: 'var(--space-lg)'
                }}>
                  {component.description}
                </p>
                <div style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-font-secondary-base)',
                  fontWeight: 'var(--font-weight-semibold)'
                }}>
                  Voir la documentation →
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer style={{
        marginTop: 'var(--space-6xl)',
        paddingTop: 'var(--space-3xl)',
        textAlign: 'center',
        color: 'var(--color-font-neutral-muted)',
        fontSize: 'var(--font-size-sm)',
        borderTop: 'var(--stroke-xs) solid var(--color-border-base)'
      }}>
        <p>Total: {components.length} components</p>
      </footer>
    </div>
  );
};

export const Default: Story = {
  render: () => <HomePage />,
};

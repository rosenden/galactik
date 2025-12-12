import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../../../packages/react-ui/src/components/Input/Input';
import Button from '../../../../packages/react-ui/src/components/Button/Button';
import { Link } from '../../../../packages/react-ui/src/components/Link/Link';
import { faEnvelope, faLock } from '@fortawesome/pro-regular-svg-icons';

const meta: Meta = {
  title: 'Layout/Login',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Login attempt:', { email, password });
    };

    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(./bg1-light.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          fontFamily: 'var(--font-family-base)',
          padding: 'var(--space-4xl)',
        }}
      >
        <div
          style={{
            background: 'var(--color-background-alt)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: '0 var(--space-md) var(--space-4xl) rgba(0, 0, 0, 0.1)',
            padding: 'var(--space-6xl)',
            width: '100%',
            maxWidth: '420px',
            border: '1px solid var(--color-border-base)',
          }}
        >
          <form onSubmit={handleSubmit}>
            <header style={{ marginBottom: 'var(--space-4xl)', textAlign: 'center' }}>
              <img 
                src="./logo-chapsvision.svg" 
                alt="ChapsVision Logo" 
                style={{ 
                  height: '40px',
                  width: 'auto',
                  marginBottom: 'var(--space-3xl)',
                }} 
              />
              <h1
                style={{
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-font-primary-base)',
                  marginBottom: 'var(--space-md)',
                  lineHeight: 'var(--line-height-6)',
                }}
              >
                Welcome Back
              </h1>
              <p
                style={{
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-font-neutral-muted)',
                  lineHeight: 'var(--line-height-3)',
                  margin: 0,
                }}
              >
                Sign in to your account to continue
              </p>
            </header>

            <div style={{ marginBottom: 'var(--space-xl)', width: '100%' }}>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  marginBottom: 'var(--space-2xs)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-font-primary-base)',
                }}
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(value) => setEmail(value)}
                placeholder="your@email.com"
                size="medium"
                iconLeft={faEnvelope}
                required
              />
            </div>

            <div style={{ marginBottom: 'var(--space-3xl)', width: '100%' }}>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  marginBottom: 'var(--space-2xs)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-font-primary-base)',
                }}
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(value) => setPassword(value)}
                placeholder="Enter your password"
                size="medium"
                iconLeft={faLock}
                required
              />
            </div>

            <Button
              type="submit"
              variant="filled"
              colorVariant="primary"
              size="small"
              style={{ width: '100%', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-3xl)' }}
            >
              Sign In
            </Button>

            <footer style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-font-neutral-muted)',
                  lineHeight: 'var(--line-height-2)',
                  margin: 0,
                }}
              >
                Don't have an account?{' '}
                <Link
                  href="#"
                  size="md"
                >
                  Sign up
                </Link>
              </p>
            </footer>
          </form>
        </div>
      </div>
    );
  },
};

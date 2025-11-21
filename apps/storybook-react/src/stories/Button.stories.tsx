import type { Meta, StoryObj } from '@storybook/react';
import Button from 'react-ui/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faHeart, 
  faArrowRight, 
  faPlus,
  faCheck,
  faDownload,
  faPaperPlane,
  faUser
} from '@fortawesome/pro-regular-svg-icons';

const meta = {
  title: 'Electrons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `@example
\`\`\`tsx
// Button filled primary
<Button variant="filled" colorVariant="primary" size="medium">
  Click me
</Button>

// Button outlined secondary
<Button variant="outlined" colorVariant="secondary" size="medium">
  Outlined
</Button>

// Button text
<Button variant="text" colorVariant="primary" size="small">
  Text Button
</Button>

// Button with icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/pro-regular-svg-icons';
<Button 
  variant="filled" 
  colorVariant="primary"
  iconLeft={<FontAwesomeIcon icon={faPlay} />}
>
  Play
</Button>

// Button disabled
<Button variant="filled" colorVariant="primary" disabled>
  Disabled
</Button>

// Button loading
<Button variant="filled" colorVariant="primary" loading>
  Loading...
</Button>

// Button full width
<Button variant="filled" colorVariant="primary" fullWidth>
  Full Width
</Button>
\`\`\``,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text'],
      description: 'The style variant of the button',
    },
    colorVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'light-accent', 'accent'],
      description: 'The color variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes full width',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// PRIMARY COLOR VARIANT
// ============================================

export const PrimaryFilled: Story = {
  args: {
    children: 'Primary Button',
    variant: 'filled',
    colorVariant: 'primary',
    size: 'medium',
  },
};

export const PrimaryOutlined: Story = {
  args: {
    children: 'Primary Outlined',
    variant: 'outlined',
    colorVariant: 'primary',
    size: 'medium',
  },
};

export const PrimaryText: Story = {
  args: {
    children: 'Primary Text',
    variant: 'text',
    colorVariant: 'primary',
    size: 'medium',
  },
};

// ============================================
// SECONDARY COLOR VARIANT
// ============================================

export const SecondaryFilled: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'filled',
    colorVariant: 'secondary',
    size: 'medium',
  },
};

export const SecondaryOutlined: Story = {
  args: {
    children: 'Secondary Outlined',
    variant: 'outlined',
    colorVariant: 'secondary',
    size: 'medium',
  },
};

export const SecondaryText: Story = {
  args: {
    children: 'Secondary Text',
    variant: 'text',
    colorVariant: 'secondary',
    size: 'medium',
  },
};

// ============================================
// LIGHT ACCENT COLOR VARIANT
// ============================================

export const LightAccentFilled: Story = {
  args: {
    children: 'Light Accent Button',
    variant: 'filled',
    colorVariant: 'light-accent',
    size: 'medium',
  },
};

export const LightAccentOutlined: Story = {
  args: {
    children: 'Light Accent Outlined',
    variant: 'outlined',
    colorVariant: 'light-accent',
    size: 'medium',
  },
};

export const LightAccentText: Story = {
  args: {
    children: 'Light Accent Text',
    variant: 'text',
    colorVariant: 'light-accent',
    size: 'medium',
  },
};

// ============================================
// ACCENT COLOR VARIANT
// ============================================

export const AccentFilled: Story = {
  args: {
    children: 'Accent Button',
    variant: 'filled',
    colorVariant: 'accent',
    size: 'medium',
  },
};

export const AccentOutlined: Story = {
  args: {
    children: 'Accent Outlined',
    variant: 'outlined',
    colorVariant: 'accent',
    size: 'medium',
  },
};

export const AccentText: Story = {
  args: {
    children: 'Accent Text',
    variant: 'text',
    colorVariant: 'accent',
    size: 'medium',
  },
};

// ============================================
// SIZES
// ============================================

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center' }}>
      <Button variant="filled" colorVariant="primary" size="small">
        Small
      </Button>
      <Button variant="filled" colorVariant="primary" size="medium">
        Medium
      </Button>
      <Button variant="filled" colorVariant="primary" size="large">
        Large
      </Button>
    </div>
  ),
};

// ============================================
// WITH ICONS
// ============================================

export const WithLeftIcon: Story = {
  args: {
    children: 'With Icon',
    variant: 'filled',
    colorVariant: 'primary',
    size: 'medium',
    iconLeft: <FontAwesomeIcon icon={faPlay} />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'With Icon',
    variant: 'filled',
    colorVariant: 'primary',
    size: 'medium',
    iconRight: <FontAwesomeIcon icon={faArrowRight} />,
  },
};

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center' }}>
      <Button
        variant="filled"
        colorVariant="primary"
        size="small"
        iconOnly
        aria-label="Small icon button"
      >
        <FontAwesomeIcon icon={faHeart} />
      </Button>
      <Button
        variant="filled"
        colorVariant="primary"
        size="medium"
        iconOnly
        aria-label="Medium icon button"
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <Button
        variant="filled"
        colorVariant="primary"
        size="large"
        iconOnly
        aria-label="Large icon button"
      >
        <FontAwesomeIcon icon={faCheck} />
      </Button>
    </div>
  ),
};

// ============================================
// STATES
// ============================================

export const DisabledState: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center' }}>
      <Button variant="filled" colorVariant="primary" size="medium" disabled>
        Filled Disabled
      </Button>
      <Button variant="outlined" colorVariant="primary" size="medium" disabled>
        Outlined Disabled
      </Button>
      <Button variant="text" colorVariant="primary" size="medium" disabled>
        Text Disabled
      </Button>
    </div>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center' }}>
      <Button variant="filled" colorVariant="primary" size="medium" loading>
        Loading
      </Button>
      <Button variant="outlined" colorVariant="primary" size="medium" loading>
        Loading
      </Button>
      <Button variant="text" colorVariant="primary" size="medium" loading>
        Loading
      </Button>
    </div>
  ),
};

// ============================================
// FULL WIDTH
// ============================================

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    variant: 'filled',
    colorVariant: 'primary',
    size: 'medium',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// ============================================
// ALL VARIANTS SHOWCASE
// ============================================

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      <div>
        <h3 style={{ marginBottom: 'var(--space-lg)', fontFamily: 'var(--font-family-base)' }}>
          Actions communes
        </h3>
        <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
          <Button variant="filled" colorVariant="primary" size="medium" iconLeft={<FontAwesomeIcon icon={faPlus} />}>
            Ajouter
          </Button>
          <Button variant="filled" colorVariant="primary" size="medium" iconRight={<FontAwesomeIcon icon={faDownload} />}>
            Télécharger
          </Button>
          <Button variant="filled" colorVariant="accent" size="medium" iconRight={<FontAwesomeIcon icon={faPaperPlane} />}>
            Envoyer
          </Button>
          <Button variant="outlined" colorVariant="secondary" size="medium" iconLeft={<FontAwesomeIcon icon={faUser} />}>
            Profil
          </Button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 'var(--space-lg)', fontFamily: 'var(--font-family-base)' }}>
          Icon-only actions
        </h3>
        <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
          <Button variant="filled" colorVariant="primary" size="medium" iconOnly aria-label="Like">
            <FontAwesomeIcon icon={faHeart} />
          </Button>
          <Button variant="outlined" colorVariant="secondary" size="medium" iconOnly aria-label="Add">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          <Button variant="text" colorVariant="light-accent" size="medium" iconOnly aria-label="Play">
            <FontAwesomeIcon icon={faPlay} />
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* Primary */}
      <div>
        <h3 style={{ marginBottom: 'var(--space-lg)', fontFamily: 'var(--font-family-base)' }}>
          Primary
        </h3>
        <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
          <Button variant="filled" colorVariant="primary" size="medium">
            Filled
          </Button>
          <Button variant="outlined" colorVariant="primary" size="medium">
            Outlined
          </Button>
          <Button variant="text" colorVariant="primary" size="medium">
            Text
          </Button>
        </div>
      </div>

      {/* Secondary */}
      <div>
        <h3 style={{ marginBottom: 'var(--space-lg)', fontFamily: 'var(--font-family-base)' }}>
          Secondary
        </h3>
        <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
          <Button variant="filled" colorVariant="secondary" size="medium">
            Filled
          </Button>
          <Button variant="outlined" colorVariant="secondary" size="medium">
            Outlined
          </Button>
          <Button variant="text" colorVariant="secondary" size="medium">
            Text
          </Button>
        </div>
      </div>

      {/* Light Accent */}
      <div>
        <h3 style={{ marginBottom: 'var(--space-lg)', fontFamily: 'var(--font-family-base)' }}>
          Light Accent
        </h3>
        <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
          <Button variant="filled" colorVariant="light-accent" size="medium">
            Filled
          </Button>
          <Button variant="outlined" colorVariant="light-accent" size="medium">
            Outlined
          </Button>
          <Button variant="text" colorVariant="light-accent" size="medium">
            Text
          </Button>
        </div>
      </div>

      {/* Accent */}
      <div>
        <h3 style={{ marginBottom: 'var(--space-lg)', fontFamily: 'var(--font-family-base)' }}>
          Accent
        </h3>
        <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
          <Button variant="filled" colorVariant="accent" size="medium">
            Filled
          </Button>
          <Button variant="outlined" colorVariant="accent" size="medium">
            Outlined
          </Button>
          <Button variant="text" colorVariant="accent" size="medium">
            Text
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

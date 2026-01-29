import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'md',
    showLabel: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showLabel: {
      control: 'boolean',
    },
    toggleShortcut: {
      control: 'text',
      description: 'Keyboard shortcut to toggle theme (e.g., "ctrl+shift+t")',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

/** Default theme toggle button */
export const Default: Story = {};

/** Small size variant */
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

/** Large size variant */
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

/** With visible label */
export const WithLabel: Story = {
  args: {
    showLabel: true,
  },
};

/** With keyboard shortcut (press Ctrl+Shift+T to toggle) */
export const WithKeyboardShortcut: Story = {
  args: {
    toggleShortcut: 'ctrl+shift+t',
  },
  parameters: {
    docs: {
      description: {
        story: 'Press `Ctrl+Shift+T` to toggle the theme using keyboard.',
      },
    },
  },
};

/** All sizes comparison */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ThemeToggle size="sm" />
      <ThemeToggle size="md" />
      <ThemeToggle size="lg" />
    </div>
  ),
};

/** All sizes with labels */
export const AllSizesWithLabels: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <ThemeToggle size="sm" showLabel />
      <ThemeToggle size="md" showLabel />
      <ThemeToggle size="lg" showLabel />
    </div>
  ),
};

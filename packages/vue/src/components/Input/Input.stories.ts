import type { Meta, StoryObj } from '@storybook/vue3';
import Input from './Input.vue';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  decorators: [
    () => ({
      template: '<div style="width: 320px;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Input },
    template: '<Input placeholder="Enter text..." />',
  }),
};

export const WithLabel: Story = {
  render: () => ({
    components: { Input },
    template: '<Input label="Email" placeholder="you@example.com" />',
  }),
};

export const WithHint: Story = {
  render: () => ({
    components: { Input },
    template: '<Input label="Password" type="password" hint="Must be at least 8 characters" />',
  }),
};

export const WithError: Story = {
  render: () => ({
    components: { Input },
    template:
      '<Input label="Email" placeholder="you@example.com" error="Please enter a valid email address" modelValue="invalid-email" />',
  }),
};

export const Success: Story = {
  render: () => ({
    components: { Input },
    template: '<Input label="Username" state="success" modelValue="available_username" />',
  }),
};

export const Small: Story = {
  render: () => ({
    components: { Input },
    template: '<Input size="sm" placeholder="Small input" />',
  }),
};

export const Large: Story = {
  render: () => ({
    components: { Input },
    template: '<Input size="lg" placeholder="Large input" />',
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Input },
    template: '<Input label="Disabled" disabled modelValue="Cannot edit" />',
  }),
};

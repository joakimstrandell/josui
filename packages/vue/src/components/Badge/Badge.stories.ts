import type { Meta, StoryObj } from '@storybook/vue3';
import Badge from './Badge.vue';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Default</Badge>',
  }),
};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Primary</Badge>',
  }),
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Success</Badge>',
  }),
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Warning</Badge>',
  }),
};

export const Error: Story = {
  args: {
    variant: 'error',
  },
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Error</Badge>',
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        <Badge variant="default">Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>
    `,
  }),
};

export const StatusBadges: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <Badge variant="success">Active</Badge>
          <span>User is currently online</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <Badge variant="warning">Pending</Badge>
          <span>Awaiting approval</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <Badge variant="error">Failed</Badge>
          <span>Payment declined</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <Badge variant="primary">New</Badge>
          <span>Just released</span>
        </div>
      </div>
    `,
  }),
};

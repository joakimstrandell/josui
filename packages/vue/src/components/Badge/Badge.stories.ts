import type { Meta, StoryObj } from '@storybook/vue3';
import Badge from './Badge.vue';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
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
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Badge },
    template: '<Badge>Badge</Badge>',
  }),
};

export const Primary: Story = {
  render: () => ({
    components: { Badge },
    template: '<Badge variant="primary">Primary</Badge>',
  }),
};

export const Success: Story = {
  render: () => ({
    components: { Badge },
    template: '<Badge variant="success">Success</Badge>',
  }),
};

export const Warning: Story = {
  render: () => ({
    components: { Badge },
    template: '<Badge variant="warning">Warning</Badge>',
  }),
};

export const Error: Story = {
  render: () => ({
    components: { Badge },
    template: '<Badge variant="error">Error</Badge>',
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>
    `,
  }),
};

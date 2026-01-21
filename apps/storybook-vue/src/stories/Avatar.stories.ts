import type { Meta, StoryObj } from '@storybook/vue3';
import { Avatar } from '@josui/vue';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  render: () => ({
    components: { Avatar },
    template:
      '<Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" alt="John Doe" />',
  }),
};

export const WithFallback: Story = {
  render: () => ({
    components: { Avatar },
    template: '<Avatar fallback="JD" alt="John Doe" />',
  }),
};

export const Small: Story = {
  render: () => ({
    components: { Avatar },
    template: '<Avatar fallback="SM" size="sm" />',
  }),
};

export const Large: Story = {
  render: () => ({
    components: { Avatar },
    template: '<Avatar fallback="LG" size="lg" />',
  }),
};

export const ExtraLarge: Story = {
  render: () => ({
    components: { Avatar },
    template: '<Avatar fallback="XL" size="xl" />',
  }),
};

export const AllSizes: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar size="sm" fallback="SM" />
        <Avatar size="md" fallback="MD" />
        <Avatar size="lg" fallback="LG" />
        <Avatar size="xl" fallback="XL" />
      </div>
    `,
  }),
};

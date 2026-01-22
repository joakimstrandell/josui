import type { Meta, StoryObj } from '@storybook/vue3';
import Spinner from './Spinner.vue';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'current', 'white'],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Spinner },
    template: '<Spinner />',
  }),
};

export const Small: Story = {
  render: () => ({
    components: { Spinner },
    template: '<Spinner size="sm" />',
  }),
};

export const Large: Story = {
  render: () => ({
    components: { Spinner },
    template: '<Spinner size="lg" />',
  }),
};

export const Primary: Story = {
  render: () => ({
    components: { Spinner },
    template: '<Spinner color="primary" />',
  }),
};

export const OnDarkBackground: Story = {
  render: () => ({
    components: { Spinner },
    template: `
      <div class="rounded-lg bg-gray-900 p-8">
        <Spinner color="white" />
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    components: { Spinner },
    template: `
      <div class="flex items-center gap-4">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
    `,
  }),
};

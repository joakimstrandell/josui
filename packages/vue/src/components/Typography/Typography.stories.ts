import type { Meta, StoryObj } from '@storybook/vue3';
import Typography from './Typography.vue';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'body-sm', 'caption'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'success', 'warning', 'error'],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  render: () => ({
    components: { Typography },
    template: '<Typography variant="h1">Heading 1</Typography>',
  }),
};

export const Heading2: Story = {
  render: () => ({
    components: { Typography },
    template: '<Typography variant="h2">Heading 2</Typography>',
  }),
};

export const Heading3: Story = {
  render: () => ({
    components: { Typography },
    template: '<Typography variant="h3">Heading 3</Typography>',
  }),
};

export const Body: Story = {
  render: () => ({
    components: { Typography },
    template:
      '<Typography variant="body">This is body text. It is used for most content.</Typography>',
  }),
};

export const Muted: Story = {
  render: () => ({
    components: { Typography },
    template: '<Typography variant="body" color="muted">This text is muted.</Typography>',
  }),
};

export const AllHeadings: Story = {
  render: () => ({
    components: { Typography },
    template: `
      <div class="space-y-4">
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="h4">Heading 4</Typography>
        <Typography variant="h5">Heading 5</Typography>
        <Typography variant="h6">Heading 6</Typography>
      </div>
    `,
  }),
};

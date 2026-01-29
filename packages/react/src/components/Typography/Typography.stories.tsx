import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from './Typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'This is body text. It is used for most content.',
  },
};

export const BodySmall: Story = {
  args: {
    variant: 'body-sm',
    children: 'This is small body text.',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'This is caption text.',
  },
};

export const Muted: Story = {
  args: {
    variant: 'body',
    color: 'muted',
    children: 'This text is muted.',
  },
};

export const PrimaryColor: Story = {
  args: {
    variant: 'body',
    color: 'primary',
    children: 'This text uses the primary color.',
  },
};

export const AllHeadings: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
};

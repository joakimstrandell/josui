import type { Meta, StoryObj } from '@storybook/react-vite';
import { AspectRatio } from './AspectRatio';

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="bg-muted-background overflow-hidden rounded-md">
        <div className="text-muted-foreground flex h-full items-center justify-center">16:9</div>
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1} className="bg-muted-background overflow-hidden rounded-md">
        <div className="text-muted-foreground flex h-full items-center justify-center">1:1</div>
      </AspectRatio>
    </div>
  ),
};

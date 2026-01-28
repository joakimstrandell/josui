import type { Meta, StoryObj } from '@storybook/react-vite';
import { CellGrid } from './CellGrid';
import { Button } from '../Button';

const meta = {
  title: 'Components/CellGrid',
  component: CellGrid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    cellSize: 24,
    fadeRate: 0.045,
    maxCells: 200,
    gridColor: 'color-foreground',
    gridOpacity: 0.1,
    cellColor: 'color-primary-500',
    cellOpacity: 0.3,
  },
} satisfies Meta<typeof CellGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="h-screen">
      <CellGrid {...args}>
        <div className="flex min-h-screen items-center justify-center p-8">
          <div className="max-w-2xl space-y-8 text-center">
            <h1 className="text-4xl font-bold">Interactive CellGrid</h1>
            <p className="text-gray-600">
              Move your mouse around to see the grid cells illuminate. The effect fades when
              hovering over interactive elements.
            </p>
            <div className="flex justify-center gap-4">
              <Button>Hover me</Button>
              <Button variant="secondary">Another button</Button>
            </div>
          </div>
        </div>
      </CellGrid>
    </div>
  ),
};

export const SmallCells: Story = {
  args: {
    cellSize: 12,
    gridColor: 'red',
    gridOpacity: 0.5,
    cellColor: 'blue',
    cellOpacity: 0.8,
  },
  render: (args) => (
    <div className="h-screen">
      <CellGrid {...args}>
        <div className="flex min-h-screen items-center justify-center p-8">
          <div className="max-w-2xl space-y-8 text-center">
            <h1 className="text-4xl font-bold">Small CellGrid Cells</h1>
            <p className="text-gray-600">This grid uses smaller 12px cells for a finer pattern.</p>
          </div>
        </div>
      </CellGrid>
    </div>
  ),
};

export const LargeCells: Story = {
  args: {
    cellSize: 48,
  },
  render: (args) => (
    <div className="h-screen">
      <CellGrid {...args}>
        <div className="flex min-h-screen items-center justify-center p-8">
          <div className="max-w-2xl space-y-8 text-center">
            <h1 className="text-4xl font-bold">Large CellGrid Cells</h1>
            <p className="text-gray-600">This grid uses larger 48px cells for a bolder pattern.</p>
          </div>
        </div>
      </CellGrid>
    </div>
  ),
};

export const SlowFade: Story = {
  args: {
    fadeRate: 0.01,
  },
  render: (args) => (
    <div className="h-screen">
      <CellGrid {...args}>
        <div className="flex min-h-screen items-center justify-center p-8">
          <div className="max-w-2xl space-y-8 text-center">
            <h1 className="text-4xl font-bold">Slow Fade</h1>
            <p className="text-gray-600">
              This grid has a slower fade rate, keeping cells visible longer.
            </p>
          </div>
        </div>
      </CellGrid>
    </div>
  ),
};

export const FastFade: Story = {
  args: {
    fadeRate: 0.1,
  },
  render: (args) => (
    <div className="h-screen">
      <CellGrid {...args}>
        <div className="flex min-h-screen items-center justify-center p-8">
          <div className="prose max-w-2xl space-y-8 text-center">
            <h1 className="text-4xl font-bold">Fast Fade</h1>
            <p className="text-gray-600">This grid has a faster fade rate for quick cell decay.</p>
          </div>
        </div>
      </CellGrid>
    </div>
  ),
};

export const WithInteractiveContent: Story = {
  render: (args) => (
    <div className="h-screen">
      <CellGrid {...args}>
        <div className="flex min-h-screen items-center justify-center p-8">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-4xl font-bold">Interactive Content</h1>
            <p className="text-gray-600">
              Notice how the grid effect pauses when hovering over interactive elements below.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button>Button 1</Button>
              <Button variant="secondary">Button 2</Button>
              <Button variant="outline">Button 3</Button>
            </div>
            <div className="space-y-2">
              <a href="#" className="text-primary-500 hover:underline">
                This is a link
              </a>
              <p>
                Regular text with an{' '}
                <a href="#" className="text-primary-500 hover:underline">
                  inline link
                </a>{' '}
                inside.
              </p>
            </div>
            <div
              data-interactive
              className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
            >
              <p className="font-medium">Custom interactive area</p>
              <p className="text-sm text-gray-500">This div has data-interactive attribute</p>
            </div>
          </div>
        </div>
      </CellGrid>
    </div>
  ),
};

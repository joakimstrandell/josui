import type { Meta, StoryObj } from '@storybook/react';
import { CustomCursor } from './CustomCursor';
import { Button } from '../Button';

const meta = {
  title: 'Components/CustomCursor',
  component: CustomCursor,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="relative min-h-screen cursor-none bg-gray-50 p-8">
        <Story />
        <div className="mx-auto max-w-2xl space-y-8">
          <h1 className="text-2xl font-bold">Custom Cursor Demo</h1>
          <p className="text-gray-600">
            Move your mouse around to see the custom cursor. Hover over interactive elements to see
            the activation effect.
          </p>
          <div className="flex gap-4">
            <Button>Hover me</Button>
            <Button variant="secondary">Another button</Button>
            <Button variant="outline">Outline</Button>
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
    ),
  ],
} satisfies Meta<typeof CustomCursor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomScale: Story = {
  args: {
    options: {
      interactiveScale: 4,
    },
  },
};

export const CustomEasing: Story = {
  args: {
    options: {
      easing: 'elastic.out(1, 0.3)',
      interactiveDuration: 0.5,
    },
  },
};

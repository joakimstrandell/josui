import type { Meta, StoryObj } from '@storybook/react-vite';
import { toast } from 'sonner';
import { Toaster } from './Sonner';

const meta = {
  title: 'Components/Sonner',
  component: Toaster,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <button
      className="rounded-md border px-4 py-2 text-sm"
      onClick={() =>
        toast('Event has been created', { description: 'Sunday, December 03, 2023 at 9:00 AM' })
      }
    >
      Show Toast
    </button>
  ),
};

export const Success: Story = {
  render: () => (
    <button
      className="rounded-md border px-4 py-2 text-sm"
      onClick={() => toast.success('Successfully saved!')}
    >
      Show Success
    </button>
  ),
};

export const Error: Story = {
  render: () => (
    <button
      className="rounded-md border px-4 py-2 text-sm"
      onClick={() => toast.error('Something went wrong')}
    >
      Show Error
    </button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <button
      className="rounded-md border px-4 py-2 text-sm"
      onClick={() =>
        toast('Event has been created', {
          action: { label: 'Undo', onClick: () => console.log('Undo') },
        })
      }
    >
      Show With Action
    </button>
  ),
};

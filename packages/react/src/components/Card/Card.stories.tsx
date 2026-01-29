import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '../Button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the card content. You can put anything here.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    children: (
      <>
        <CardHeader>
          <CardTitle>Bordered Card</CardTitle>
          <CardDescription>A card with a border.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content inside a bordered card variant.</p>
        </CardContent>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    shadow: 'lg',
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>A card with elevation shadow.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content inside an elevated card with large shadow.</p>
        </CardContent>
      </>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    variant: 'bordered',
    children: (
      <img
        src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800"
        alt="Gradient"
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem' }}
      />
    ),
  },
};

export const Interactive: Story = {
  args: {
    variant: 'bordered',
    className: 'cursor-pointer transition-shadow hover:shadow-md',
    children: (
      <>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Hover to see the effect.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card responds to hover interactions.</p>
        </CardContent>
      </>
    ),
  },
};

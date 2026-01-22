import type { Meta, StoryObj } from '@storybook/vue3';
import Card from './Card.vue';
import CardHeader from './CardHeader.vue';
import CardTitle from './CardTitle.vue';
import CardDescription from './CardDescription.vue';
import CardContent from './CardContent.vue';
import CardFooter from './CardFooter.vue';
import Button from '../Button/Button.vue';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
  decorators: [
    () => ({
      template: '<div style="width: 400px;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button },
    template: `
      <Card>
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
      </Card>
    `,
  }),
};

export const Bordered: Story = {
  render: () => ({
    components: { Card, CardHeader, CardTitle, CardDescription, CardContent },
    template: `
      <Card variant="bordered">
        <CardHeader>
          <CardTitle>Bordered Card</CardTitle>
          <CardDescription>A card with a border.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content inside a bordered card variant.</p>
        </CardContent>
      </Card>
    `,
  }),
};

export const Elevated: Story = {
  render: () => ({
    components: { Card, CardHeader, CardTitle, CardDescription, CardContent },
    template: `
      <Card variant="elevated" shadow="lg">
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>A card with elevation shadow.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content inside an elevated card with large shadow.</p>
        </CardContent>
      </Card>
    `,
  }),
};

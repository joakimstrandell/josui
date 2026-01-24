import type { Meta, StoryObj } from '@storybook/vue3';
import Card from './Card.vue';
import CardHeader from './CardHeader.vue';
import CardTitle from './CardTitle.vue';
import CardDescription from './CardDescription.vue';
import CardContent from './CardContent.vue';
import CardFooter from './CardFooter.vue';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
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
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => ({
    components: { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content of the card. It can contain any content you want.</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    `,
  }),
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
  },
  render: (args) => ({
    components: { Card, CardHeader, CardTitle, CardDescription, CardContent },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args">
        <CardHeader>
          <CardTitle>Bordered Card</CardTitle>
          <CardDescription>A card with a thicker border</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content inside a bordered card variant.</p>
        </CardContent>
      </Card>
    `,
  }),
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
  },
  render: (args) => ({
    components: { Card, CardHeader, CardTitle, CardDescription, CardContent },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args">
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>A card with a shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content inside an elevated card variant.</p>
        </CardContent>
      </Card>
    `,
  }),
};

export const Padding: Story = {
  render: () => ({
    components: { Card, CardContent },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Card padding="none">
          <CardContent>No padding</CardContent>
        </Card>
        <Card padding="sm">
          <CardContent>Small padding</CardContent>
        </Card>
        <Card padding="md">
          <CardContent>Medium padding (default)</CardContent>
        </Card>
        <Card padding="lg">
          <CardContent>Large padding</CardContent>
        </Card>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Card, CardHeader, CardTitle, CardContent },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <Card variant="default" style="width: 250px;">
          <CardHeader>
            <CardTitle>Default</CardTitle>
          </CardHeader>
          <CardContent>Default card variant</CardContent>
        </Card>
        <Card variant="bordered" style="width: 250px;">
          <CardHeader>
            <CardTitle>Bordered</CardTitle>
          </CardHeader>
          <CardContent>Bordered card variant</CardContent>
        </Card>
        <Card variant="elevated" style="width: 250px;">
          <CardHeader>
            <CardTitle>Elevated</CardTitle>
          </CardHeader>
          <CardContent>Elevated card variant</CardContent>
        </Card>
      </div>
    `,
  }),
};

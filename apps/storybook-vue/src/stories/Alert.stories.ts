import type { Meta, StoryObj } from '@storybook/vue3';
import { Alert } from '@josui/vue';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    dismissible: {
      control: 'boolean',
    },
  },
  decorators: [
    () => ({
      template: '<div style="width: 400px;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  render: () => ({
    components: { Alert },
    template: '<Alert variant="info" title="Information">This is an informational alert message.</Alert>',
  }),
};

export const Success: Story = {
  render: () => ({
    components: { Alert },
    template: '<Alert variant="success" title="Success">Your changes have been saved successfully.</Alert>',
  }),
};

export const Warning: Story = {
  render: () => ({
    components: { Alert },
    template:
      '<Alert variant="warning" title="Warning">Please review the following issues before continuing.</Alert>',
  }),
};

export const Error: Story = {
  render: () => ({
    components: { Alert },
    template: '<Alert variant="error" title="Error">There was a problem processing your request.</Alert>',
  }),
};

export const Dismissible: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <Alert variant="success" title="Dismissible Alert" :dismissible="true" @dismiss="onDismiss">
        Click the X button to dismiss this alert.
      </Alert>
    `,
    methods: {
      onDismiss() {
        alert('Dismissed!');
      },
    },
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="space-y-4">
        <Alert variant="info" title="Information">This is an informational message.</Alert>
        <Alert variant="success" title="Success">Your action was successful.</Alert>
        <Alert variant="warning" title="Warning">Please be aware of this issue.</Alert>
        <Alert variant="error" title="Error">Something went wrong.</Alert>
      </div>
    `,
  }),
};

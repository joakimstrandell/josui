import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 60 },
  render: (args) => <Progress {...args} className="w-[60%]" />,
};

export const Empty: Story = {
  args: { value: 0 },
  render: (args) => <Progress {...args} className="w-[60%]" />,
};

export const Full: Story = {
  args: { value: 100 },
  render: (args) => <Progress {...args} className="w-[60%]" />,
};

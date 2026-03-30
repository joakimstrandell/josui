import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "./Toggle";
import { Bold } from "lucide-react";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Toggle" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Toggle" },
};

export const WithIcon: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};

export const Small: Story = {
  args: { size: "sm", children: "Small" },
};

export const Large: Story = {
  args: { size: "lg", children: "Large" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
};

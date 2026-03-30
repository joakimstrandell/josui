import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Type your message here." },
};

export const Disabled: Story = {
  args: { placeholder: "Disabled textarea", disabled: true },
};

export const WithError: Story = {
  args: { placeholder: "Error state", error: true },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <label htmlFor="message" className="text-sm font-medium">
        Your message
      </label>
      <Textarea placeholder="Type your message here." id="message" />
      <p className="text-muted-foreground text-sm">
        Your message will be copied to the support team.
      </p>
    </div>
  ),
};

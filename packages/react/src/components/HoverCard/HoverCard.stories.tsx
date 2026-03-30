import type { Meta, StoryObj } from "@storybook/react-vite";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";

const meta = {
  title: "Components/HoverCard",
  component: HoverCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#" className="text-sm font-medium underline underline-offset-4">
          @nextjs
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@nextjs</h4>
          <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
          <div className="flex items-center pt-2">
            <span className="text-muted-foreground text-xs">Joined December 2021</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

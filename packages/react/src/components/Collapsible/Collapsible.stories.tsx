import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./Collapsible";
import { ChevronsUpDown } from "lucide-react";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

const CollapsibleDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
        <CollapsibleTrigger asChild>
          <button className="hover:bg-muted-background rounded-md p-1">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 text-sm">@radix-ui/primitives</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm">@radix-ui/colors</div>
        <div className="rounded-md border px-4 py-3 text-sm">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export const Default: Story = {
  render: () => <CollapsibleDemo />,
};

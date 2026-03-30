import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="rounded-md border px-4 py-2 text-sm">Open Drawer</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>Make changes to your profile here.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-muted-foreground text-sm">Drawer content goes here.</p>
        </div>
        <DrawerFooter>
          <button className="bg-primary-500 rounded-md px-4 py-2 text-sm text-white">Submit</button>
          <DrawerClose asChild>
            <button className="rounded-md border px-4 py-2 text-sm">Cancel</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

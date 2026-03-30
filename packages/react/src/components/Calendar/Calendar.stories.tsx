import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "./Calendar";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const CalendarDemo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
  );
};

export const Default: Story = {
  render: () => <CalendarDemo />,
};

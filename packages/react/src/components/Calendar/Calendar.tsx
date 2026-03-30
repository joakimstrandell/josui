import { type ComponentProps } from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@josui/core-web";

export type CalendarProps = ComponentProps<typeof DayPicker>;

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    className={cn("p-3", className)}
    classNames={{
      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
      month: "space-y-4",
      month_caption: "flex justify-center pt-1 relative items-center",
      caption_label: "text-sm font-medium",
      nav: "space-x-1 flex items-center",
      button_previous: cn(
        "absolute left-1 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
        "hover:bg-accent-background hover:text-accent-foreground",
        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
      ),
      button_next: cn(
        "absolute right-1 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
        "hover:bg-accent-background hover:text-accent-foreground",
        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
      ),
      month_grid: "w-full border-collapse space-y-1",
      weekdays: "flex",
      weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
      week: "flex w-full mt-2",
      day: cn(
        "h-9 w-9 text-center text-sm p-0 relative",
        "[&:has([aria-selected].day-range-end)]:rounded-r-md",
        "[&:has([aria-selected].day-outside)]:bg-accent-background/50",
        "[&:has([aria-selected])]:bg-accent-background",
        "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
        "focus-within:relative focus-within:z-20",
      ),
      day_button: cn(
        "inline-flex items-center justify-center rounded-md text-sm ring-offset-background transition-colors",
        "hover:bg-accent-background hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
      ),
      range_end: "day-range-end",
      selected:
        "bg-primary-500 text-white hover:bg-primary-500 hover:text-white focus:bg-primary-500 focus:text-white",
      today: "bg-accent-background text-accent-foreground",
      outside:
        "day-outside text-muted-foreground aria-selected:bg-accent-background/50 aria-selected:text-muted-foreground",
      disabled: "text-muted-foreground opacity-50",
      range_middle: "aria-selected:bg-accent-background aria-selected:text-accent-foreground",
      hidden: "invisible",
      ...classNames,
    }}
    components={{
      Chevron: ({ orientation }) => {
        const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
        return <Icon className="h-4 w-4" />;
      },
    }}
    {...props}
  />
);

Calendar.displayName = "Calendar";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@josui/core-web";

export type SeparatorProps = ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>;

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref as React.Ref<HTMLDivElement>}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  ),
);

Separator.displayName = "Separator";

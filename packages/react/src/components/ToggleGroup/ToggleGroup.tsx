import { forwardRef, type ComponentPropsWithoutRef, createContext, useContext } from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@josui/core-web";

const ToggleGroupContext = createContext<{
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline";
}>({
  size: "default",
  variant: "default",
});

export type ToggleGroupProps = ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
  /** Visual variant */
  variant?: "default" | "outline";
  /** Size */
  size?: "sm" | "default" | "lg";
};

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("flex items-center justify-center gap-1", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  ),
);
ToggleGroup.displayName = "ToggleGroup";

const sizeStyles = {
  sm: "h-9 px-2.5",
  default: "h-10 px-3",
  lg: "h-11 px-5",
};

const variantStyles = {
  default: "bg-transparent",
  outline:
    "border border-input bg-transparent hover:bg-accent-background hover:text-accent-foreground",
};

export type ToggleGroupItemProps = ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>;

export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(ToggleGroupContext);
    return (
      <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(
          "ring-offset-background inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          "hover:bg-muted-background hover:text-muted-foreground",
          "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          "data-[state=on]:bg-accent-background data-[state=on]:text-accent-foreground",
          variantStyles[context.variant || "default"],
          sizeStyles[context.size || "default"],
          className,
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    );
  },
);
ToggleGroupItem.displayName = "ToggleGroupItem";

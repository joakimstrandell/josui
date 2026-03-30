import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@josui/core-web";

export type ContainerPadding = "top" | "bottom" | "top-bottom" | "none";
export type ContainerPaddingSize = "sm" | "md" | "lg";
export type ContainerWidth =
  | "narrowest"
  | "narrower"
  | "narrow"
  | "wide"
  | "wider"
  | "widest"
  | "full";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Vertical padding sides */
  padding?: ContainerPadding;
  /** Vertical padding amount */
  paddingSize?: ContainerPaddingSize;
  /** Max-width constraint */
  width?: ContainerWidth;
  /** Render as child element */
  asChild?: boolean;
  children: ReactNode;
}

const paddingStyles: Record<ContainerPadding, string> = {
  top: "pb-0",
  bottom: "pt-0",
  "top-bottom": "",
  none: "py-0",
};

const paddingSizeStyles: Record<ContainerPaddingSize, string> = {
  sm: "py-12",
  md: "py-24",
  lg: "py-32",
};

const widthStyles: Record<ContainerWidth, string> = {
  narrowest: "max-w-md",
  narrower: "max-w-xl",
  narrow: "max-w-3xl",
  wide: "max-w-6xl",
  wider: "max-w-7xl",
  widest: "max-w-8xl",
  full: "max-w-full",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ asChild = false, className, padding = "none", paddingSize = "lg", width, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-5xl space-y-6 px-6",
          paddingSizeStyles[paddingSize],
          paddingStyles[padding],
          width && widthStyles[width],
          className,
        )}
        {...props}
      />
    );
  },
);

Container.displayName = "Container";

"use client";

import {
  forwardRef,
  Children,
  cloneElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@josui/core-web";

export interface BracketButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: "default" | "primary" | "secondary" | "ghost";
  /** Size variant */
  size?: "default" | "sm" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg";
  /** Render as child element */
  asChild?: boolean;
}

const baseStyles = cn(
  "group relative inline-flex shrink-0 items-center justify-center whitespace-nowrap",
  "text-foreground/70 hover:text-accent-foreground text-sm font-medium",
  "border-foreground/50 hover:border-accent-foreground/60",
  "cursor-pointer transition-all outline-none disabled:pointer-events-none disabled:opacity-50",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
);

const variantStyles: Record<NonNullable<BracketButtonProps["variant"]>, string> = {
  default: "border-gray-300 bg-gray-50 text-gray-950 hover:border-gray-300 hover:bg-gray-100/70",
  primary:
    "border-primary-500 hover:bg-primary-200/70 text-primary-950 hover:border-primary-500 bg-primary-100",
  secondary:
    "border-secondary-300 hover:bg-secondary-100/70 text-secondary-950 hover:border-secondary-300 bg-secondary-50/70",
  ghost: "text-inherit",
};

const sizeStyles: Record<NonNullable<BracketButtonProps["size"]>, string> = {
  default: "h-10 px-4 py-2 has-[>svg]:px-3",
  sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
  lg: "text-md h-12 px-6 has-[>svg]:px-4",
  xl: "h-14 px-8 text-lg has-[>svg]:px-6",
  icon: "size-9",
  "icon-sm": "size-8",
  "icon-lg": "size-10",
};

function BracketButtonContent({
  children,
  variant,
}: {
  children: ReactNode;
  variant: BracketButtonProps["variant"];
}) {
  return (
    <>
      <span
        className={cn(
          "absolute inset-y-0 left-0 flex flex-col justify-between border-l",
          "border-inherit opacity-50 transition-all duration-200 ease-in-out",
          variant === "ghost" ? "w-0 opacity-0" : "w-2",
          "group-hover:w-1/2 group-hover:opacity-100",
        )}
      >
        <span className="block w-full border-t border-inherit" />
        <span className="block w-full border-b border-inherit" />
      </span>
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      <span
        className={cn(
          "absolute inset-y-0 right-0 flex flex-col justify-between border-r",
          "border-inherit opacity-50 transition-all duration-200 ease-in-out",
          variant === "ghost" ? "w-0 opacity-0" : "w-2",
          "group-hover:w-1/2 group-hover:opacity-100",
        )}
      >
        <span className="block w-full border-t border-inherit" />
        <span className="block w-full border-b border-inherit" />
      </span>
      {variant !== "ghost" && (
        <span className="absolute inset-0 block border border-inherit opacity-10" />
      )}
    </>
  );
}

export const BracketButton = forwardRef<HTMLButtonElement, BracketButtonProps>(
  (
    { className, variant = "default", size = "default", asChild = false, children, ...props },
    ref,
  ) => {
    const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    if (asChild) {
      const child = Children.only(children) as ReactElement<{
        className?: string;
        children?: ReactNode;
      }>;
      const mergedClassName = cn(classes, child.props.className);

      return cloneElement(
        child,
        { ...props, className: mergedClassName },
        <BracketButtonContent variant={variant}>{child.props.children}</BracketButtonContent>,
      );
    }

    return (
      <button ref={ref} data-slot="bracket-button" className={classes} {...props}>
        <BracketButtonContent variant={variant}>{children}</BracketButtonContent>
      </button>
    );
  },
);

BracketButton.displayName = "BracketButton";

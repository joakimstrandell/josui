import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@josui/core-web";

export type NavigationMenuProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>;

export const NavigationMenu = forwardRef<HTMLElement, NavigationMenuProps>(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  ),
);
NavigationMenu.displayName = "NavigationMenu";

export type NavigationMenuListProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>;

export const NavigationMenuList = forwardRef<HTMLUListElement, NavigationMenuListProps>(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
      {...props}
    />
  ),
);
NavigationMenuList.displayName = "NavigationMenuList";

export type NavigationMenuItemProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>;
export const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle =
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent-background hover:text-accent-foreground focus:bg-accent-background focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent-background/50 data-[state=open]:bg-accent-background/50";

export { navigationMenuTriggerStyle };

export type NavigationMenuTriggerProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Trigger
>;

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(navigationMenuTriggerStyle, "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDown
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  ),
);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export type NavigationMenuContentProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Content
>;

export const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out top-0 left-0 w-full",
        "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
        "md:absolute md:w-auto",
        className,
      )}
      {...props}
    />
  ),
);
NavigationMenuContent.displayName = "NavigationMenuContent";

export type NavigationMenuLinkProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>;
export const NavigationMenuLink = NavigationMenuPrimitive.Link;

export type NavigationMenuViewportProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Viewport
>;

export const NavigationMenuViewport = forwardRef<HTMLDivElement, NavigationMenuViewportProps>(
  ({ className, ...props }, ref) => (
    <div className={cn("absolute top-full left-0 flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        className={cn(
          "origin-top-center bg-popover-background text-popover-foreground relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
          "md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  ),
);
NavigationMenuViewport.displayName = "NavigationMenuViewport";

export type NavigationMenuIndicatorProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Indicator
>;

export const NavigationMenuIndicator = forwardRef<HTMLDivElement, NavigationMenuIndicatorProps>(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        className,
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  ),
);
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

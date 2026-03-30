import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@josui/core-web";

export type ContextMenuProps = ContextMenuPrimitive.ContextMenuProps;
export const ContextMenu = ContextMenuPrimitive.Root;

export type ContextMenuTriggerProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

export type ContextMenuGroupProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Group>;
export const ContextMenuGroup = ContextMenuPrimitive.Group;

export type ContextMenuPortalProps = ContextMenuPrimitive.ContextMenuPortalProps;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;

export type ContextMenuSubProps = ContextMenuPrimitive.ContextMenuSubProps;
export const ContextMenuSub = ContextMenuPrimitive.Sub;

export type ContextMenuRadioGroupProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.RadioGroup
>;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

export type ContextMenuSubTriggerProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubTrigger
> & { inset?: boolean };

export const ContextMenuSubTrigger = forwardRef<HTMLDivElement, ContextMenuSubTriggerProps>(
  ({ className, inset, children, ...props }, ref) => (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none",
        "focus:bg-accent-background focus:text-accent-foreground data-[state=open]:bg-accent-background data-[state=open]:text-accent-foreground",
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </ContextMenuPrimitive.SubTrigger>
  ),
);
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

export type ContextMenuSubContentProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubContent
>;

export const ContextMenuSubContent = forwardRef<HTMLDivElement, ContextMenuSubContentProps>(
  ({ className, ...props }, ref) => (
    <ContextMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-dropdown bg-popover-background text-popover-foreground min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  ),
);
ContextMenuSubContent.displayName = "ContextMenuSubContent";

export type ContextMenuContentProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>;

export const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className, ...props }, ref) => (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cn(
          "z-dropdown bg-popover-background text-popover-foreground min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
          "animate-in fade-in-80",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  ),
);
ContextMenuContent.displayName = "ContextMenuContent";

export type ContextMenuItemProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean;
};

export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, inset, ...props }, ref) => (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none",
        "focus:bg-accent-background focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  ),
);
ContextMenuItem.displayName = "ContextMenuItem";

export type ContextMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.CheckboxItem
>;

export const ContextMenuCheckboxItem = forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  ({ className, children, checked, ...props }, ref) => (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none",
        "focus:bg-accent-background focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  ),
);
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

export type ContextMenuRadioItemProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.RadioItem
>;

export const ContextMenuRadioItem = forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
  ({ className, children, ...props }, ref) => (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none",
        "focus:bg-accent-background focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  ),
);
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

export type ContextMenuLabelProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean;
};

export const ContextMenuLabel = forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  ({ className, inset, ...props }, ref) => (
    <ContextMenuPrimitive.Label
      ref={ref}
      className={cn(
        "text-foreground px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  ),
);
ContextMenuLabel.displayName = "ContextMenuLabel";

export type ContextMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Separator
>;

export const ContextMenuSeparator = forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  ),
);
ContextMenuSeparator.displayName = "ContextMenuSeparator";

export type ContextMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

export const ContextMenuShortcut = ({ className, ...props }: ContextMenuShortcutProps) => (
  <span
    className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
    {...props}
  />
);
ContextMenuShortcut.displayName = "ContextMenuShortcut";

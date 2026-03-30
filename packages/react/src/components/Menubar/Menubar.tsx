import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@josui/core-web";

export type MenubarMenuProps = MenubarPrimitive.MenubarMenuProps;
export const MenubarMenu: React.FC<MenubarMenuProps> = MenubarPrimitive.Menu;

export type MenubarGroupProps = ComponentPropsWithoutRef<typeof MenubarPrimitive.Group>;
export const MenubarGroup = MenubarPrimitive.Group;

export type MenubarPortalProps = MenubarPrimitive.MenubarPortalProps;
export const MenubarPortal = MenubarPrimitive.Portal;

export type MenubarSubProps = MenubarPrimitive.MenubarSubProps;
export const MenubarSub = MenubarPrimitive.Sub;

export type MenubarRadioGroupProps = ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioGroup>;
export const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

export type MenubarProps = ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>;

export const Menubar = forwardRef<HTMLDivElement, MenubarProps>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "bg-background flex h-10 items-center space-x-1 rounded-md border p-1",
      className,
    )}
    {...props}
  />
));
Menubar.displayName = "Menubar";

export type MenubarTriggerProps = ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>;

export const MenubarTrigger = forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  ({ className, ...props }, ref) => (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex cursor-default items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none select-none",
        "focus:bg-accent-background focus:text-accent-foreground data-[state=open]:bg-accent-background data-[state=open]:text-accent-foreground",
        className,
      )}
      {...props}
    />
  ),
);
MenubarTrigger.displayName = "MenubarTrigger";

export type MenubarSubTriggerProps = ComponentPropsWithoutRef<
  typeof MenubarPrimitive.SubTrigger
> & { inset?: boolean };

export const MenubarSubTrigger = forwardRef<HTMLDivElement, MenubarSubTriggerProps>(
  ({ className, inset, children, ...props }, ref) => (
    <MenubarPrimitive.SubTrigger
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
    </MenubarPrimitive.SubTrigger>
  ),
);
MenubarSubTrigger.displayName = "MenubarSubTrigger";

export type MenubarSubContentProps = ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>;

export const MenubarSubContent = forwardRef<HTMLDivElement, MenubarSubContentProps>(
  ({ className, ...props }, ref) => (
    <MenubarPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-dropdown bg-popover-background text-popover-foreground min-w-[8rem] overflow-hidden rounded-md border p-1",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  ),
);
MenubarSubContent.displayName = "MenubarSubContent";

export type MenubarContentProps = ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>;

export const MenubarContent = forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-dropdown bg-popover-background text-popover-foreground min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md",
          "data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  ),
);
MenubarContent.displayName = "MenubarContent";

export type MenubarItemProps = ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
  inset?: boolean;
};

export const MenubarItem = forwardRef<HTMLDivElement, MenubarItemProps>(
  ({ className, inset, ...props }, ref) => (
    <MenubarPrimitive.Item
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
MenubarItem.displayName = "MenubarItem";

export type MenubarCheckboxItemProps = ComponentPropsWithoutRef<
  typeof MenubarPrimitive.CheckboxItem
>;

export const MenubarCheckboxItem = forwardRef<HTMLDivElement, MenubarCheckboxItemProps>(
  ({ className, children, checked, ...props }, ref) => (
    <MenubarPrimitive.CheckboxItem
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
        <MenubarPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  ),
);
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

export type MenubarRadioItemProps = ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>;

export const MenubarRadioItem = forwardRef<HTMLDivElement, MenubarRadioItemProps>(
  ({ className, children, ...props }, ref) => (
    <MenubarPrimitive.RadioItem
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
        <MenubarPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  ),
);
MenubarRadioItem.displayName = "MenubarRadioItem";

export type MenubarLabelProps = ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
  inset?: boolean;
};

export const MenubarLabel = forwardRef<HTMLDivElement, MenubarLabelProps>(
  ({ className, inset, ...props }, ref) => (
    <MenubarPrimitive.Label
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
      {...props}
    />
  ),
);
MenubarLabel.displayName = "MenubarLabel";

export type MenubarSeparatorProps = ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>;

export const MenubarSeparator = forwardRef<HTMLDivElement, MenubarSeparatorProps>(
  ({ className, ...props }, ref) => (
    <MenubarPrimitive.Separator
      ref={ref}
      className={cn("bg-muted-background -mx-1 my-1 h-px", className)}
      {...props}
    />
  ),
);
MenubarSeparator.displayName = "MenubarSeparator";

export type MenubarShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

export const MenubarShortcut = ({ className, ...props }: MenubarShortcutProps) => (
  <span
    className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
    {...props}
  />
);
MenubarShortcut.displayName = "MenubarShortcut";

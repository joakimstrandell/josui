import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@josui/core-web";

export type SheetProps = SheetPrimitive.DialogProps;
export const Sheet = SheetPrimitive.Root;

export type SheetTriggerProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Trigger>;
export const SheetTrigger = SheetPrimitive.Trigger;

export type SheetCloseProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Close>;
export const SheetClose = SheetPrimitive.Close;

export type SheetPortalProps = SheetPrimitive.DialogPortalProps;
export const SheetPortal = SheetPrimitive.Portal;

export type SheetOverlayProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>;

export const SheetOverlay = forwardRef<HTMLDivElement, SheetOverlayProps>(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Overlay
      className={cn(
        "z-modal fixed inset-0 bg-black/80",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
      ref={ref}
    />
  ),
);
SheetOverlay.displayName = "SheetOverlay";

const sheetVariants = {
  top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
  bottom:
    "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
  left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
  right:
    "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
};

export interface SheetContentProps extends ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  /** Side from which the sheet slides in */
  side?: "top" | "bottom" | "left" | "right";
}

export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(
          "z-modal bg-background fixed gap-4 p-6 shadow-lg transition ease-in-out",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          sheetVariants[side],
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-muted-background absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
);
SheetContent.displayName = "SheetContent";

export type SheetHeaderProps = HTMLAttributes<HTMLDivElement>;

export const SheetHeader = ({ className, ...props }: SheetHeaderProps) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

export type SheetFooterProps = HTMLAttributes<HTMLDivElement>;

export const SheetFooter = ({ className, ...props }: SheetFooterProps) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

export type SheetTitleProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Title>;

export const SheetTitle = forwardRef<HTMLHeadingElement, SheetTitleProps>(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Title
      ref={ref}
      className={cn("text-foreground text-lg font-semibold", className)}
      {...props}
    />
  ),
);
SheetTitle.displayName = "SheetTitle";

export type SheetDescriptionProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Description>;

export const SheetDescription = forwardRef<HTMLParagraphElement, SheetDescriptionProps>(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Description
      ref={ref}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  ),
);
SheetDescription.displayName = "SheetDescription";

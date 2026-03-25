import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '@josui/core-web';

export type DrawerProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>;
export const Drawer = ({ shouldScaleBackground = true, ...props }: DrawerProps) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = 'Drawer';

export type DrawerTriggerProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>;
export const DrawerTrigger = DrawerPrimitive.Trigger;

export type DrawerPortalProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Portal>;
export const DrawerPortal = DrawerPrimitive.Portal;

export type DrawerCloseProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Close>;
export const DrawerClose = DrawerPrimitive.Close;

export type DrawerOverlayProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>;

export const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ className, ...props }, ref) => (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn('z-modal fixed inset-0 bg-black/80', className)}
      {...props}
    />
  )
);
DrawerOverlay.displayName = 'DrawerOverlay';

export type DrawerContentProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>;

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, ...props }, ref) => (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          'z-modal bg-background fixed inset-x-0 bottom-0 mt-24 flex h-auto flex-col rounded-t-[10px] border',
          className
        )}
        {...props}
      >
        <div className="bg-muted-background mx-auto mt-4 h-2 w-[100px] rounded-full" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
);
DrawerContent.displayName = 'DrawerContent';

export type DrawerHeaderProps = HTMLAttributes<HTMLDivElement>;

export const DrawerHeader = ({ className, ...props }: DrawerHeaderProps) => (
  <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

export type DrawerFooterProps = HTMLAttributes<HTMLDivElement>;

export const DrawerFooter = ({ className, ...props }: DrawerFooterProps) => (
  <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

export type DrawerTitleProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>;

export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, ...props }, ref) => (
    <DrawerPrimitive.Title
      ref={ref}
      className={cn('text-lg leading-none font-semibold tracking-tight', className)}
      {...props}
    />
  )
);
DrawerTitle.displayName = 'DrawerTitle';

export type DrawerDescriptionProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>;

export const DrawerDescription = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ className, ...props }, ref) => (
    <DrawerPrimitive.Description
      ref={ref}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
);
DrawerDescription.displayName = 'DrawerDescription';

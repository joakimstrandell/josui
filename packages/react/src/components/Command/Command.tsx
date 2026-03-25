import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { cn } from '@josui/core-web';
import type { DialogProps } from '../Dialog';

export type CommandProps = ComponentPropsWithoutRef<typeof CommandPrimitive>;

export const Command = forwardRef<HTMLDivElement, CommandProps>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'bg-popover-background text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
      className
    )}
    {...props}
  />
));
Command.displayName = 'Command';

export type CommandDialogProps = DialogProps;

export type CommandInputProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Input>;

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => (
    <div className="flex items-center border-b px-3" data-cmdk-input-wrapper="">
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none',
          'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  )
);
CommandInput.displayName = 'CommandInput';

export type CommandListProps = ComponentPropsWithoutRef<typeof CommandPrimitive.List>;

export const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.List
      ref={ref}
      className={cn('max-h-[300px] overflow-x-hidden overflow-y-auto', className)}
      {...props}
    />
  )
);
CommandList.displayName = 'CommandList';

export type CommandEmptyProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>;

export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />
));
CommandEmpty.displayName = 'CommandEmpty';

export type CommandGroupProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Group>;

export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        'text-foreground overflow-hidden p-1',
        '[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
        className
      )}
      {...props}
    />
  )
);
CommandGroup.displayName = 'CommandGroup';

export type CommandSeparatorProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>;

export const CommandSeparator = forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn('bg-border -mx-1 h-px', className)}
      {...props}
    />
  )
);
CommandSeparator.displayName = 'CommandSeparator';

export type CommandItemProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Item>;

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none',
        'data-[selected=true]:bg-accent-background data-[selected=true]:text-accent-foreground',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
        className
      )}
      {...props}
    />
  )
);
CommandItem.displayName = 'CommandItem';

export type CommandShortcutProps = HTMLAttributes<HTMLSpanElement>;

export const CommandShortcut = ({ className, ...props }: CommandShortcutProps) => (
  <span
    className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
    {...props}
  />
);
CommandShortcut.displayName = 'CommandShortcut';

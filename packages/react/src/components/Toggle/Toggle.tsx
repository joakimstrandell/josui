import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cn } from '@josui/core-web';

export interface ToggleProps extends ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  /** Visual variant */
  variant?: 'default' | 'outline';
  /** Size */
  size?: 'sm' | 'default' | 'lg';
}

const variantStyles = {
  default: 'bg-transparent',
  outline:
    'border border-input bg-transparent hover:bg-accent-background hover:text-accent-foreground',
};

const sizeStyles = {
  sm: 'h-9 px-2.5',
  default: 'h-10 px-3',
  lg: 'h-11 px-5',
};

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        'ring-offset-background inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
        'hover:bg-muted-background hover:text-muted-foreground',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[state=on]:bg-accent-background data-[state=on]:text-accent-foreground',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  )
);

Toggle.displayName = 'Toggle';

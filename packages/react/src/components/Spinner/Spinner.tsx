import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@josui/core-web';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color */
  color?: 'primary' | 'current' | 'white';
}

const sizeStyles = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-3',
};

const colorStyles = {
  primary: 'border-primary-500 border-t-transparent',
  current: 'border-current border-t-transparent',
  white: 'border-white border-t-transparent',
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', color = 'current', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          'inline-block animate-spin rounded-full',
          sizeStyles[size],
          colorStyles[color],
          className
        )}
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

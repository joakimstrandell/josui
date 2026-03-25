import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@josui/core-web';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error state */
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'bg-background flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm',
        'ring-offset-background placeholder:text-muted-foreground',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error ? 'border-error-500 focus-visible:ring-error-500' : 'border-input',
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = 'Textarea';

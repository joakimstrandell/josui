import { forwardRef, type HTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@josui/core-web';

export interface ChecklistProps extends HTMLAttributes<HTMLUListElement> {
  /** List of items to display */
  items: string[];
}

export const Checklist = forwardRef<HTMLUListElement, ChecklistProps>(
  ({ items, className, ...props }, ref) => (
    <ul ref={ref} className={cn('space-y-2 text-sm md:text-base', className)} {...props}>
      {items.map((item, index) => (
        <li key={index} className="flex items-baseline gap-2">
          <Check className="text-muted-foreground size-3.5 shrink-0 translate-y-0.5" />
          {item}
        </li>
      ))}
    </ul>
  )
);

Checklist.displayName = 'Checklist';

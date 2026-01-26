import { forwardRef, type HTMLAttributes, type ElementType } from 'react';
import { cn } from '@josui/core-web';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-sm' | 'caption';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Typography variant */
  variant?: TypographyVariant;
  /** Override the rendered element */
  as?: ElementType;
  /** Font weight */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Text color */
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-5xl font-bold leading-tight tracking-tight',
  h2: 'text-4xl font-bold leading-tight tracking-tight',
  h3: 'text-3xl font-semibold leading-snug',
  h4: 'text-2xl font-semibold leading-snug',
  h5: 'text-xl font-semibold leading-normal',
  h6: 'text-lg font-semibold leading-normal',
  body: 'text-base leading-relaxed',
  'body-sm': 'text-sm leading-relaxed',
  caption: 'text-xs leading-normal',
};

const variantElements: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
};

const weightStyles = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorStyles = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  primary: 'text-primary-600',
  success: 'text-success-foreground',
  warning: 'text-warning-foreground',
  error: 'text-error-foreground',
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'body', as, weight, color = 'default', children, ...props }, ref) => {
    const Component = as || variantElements[variant];

    return (
      <Component
        ref={ref}
        className={cn(
          variantStyles[variant],
          weight && weightStyles[weight],
          colorStyles[color],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

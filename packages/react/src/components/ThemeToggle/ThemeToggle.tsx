'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@josui/core-web/src';
import { useTheme, type UseThemeOptions } from '../../hooks/useTheme';

export interface ThemeToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>, UseThemeOptions {
  /** Size of the toggle button */
  size?: 'sm' | 'md' | 'lg';
  /** Show label text alongside icon */
  showLabel?: boolean;
}

const sizeStyles = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
};

const icons = {
  light: (
    <svg
      className="h-[1.2em] w-[1.2em]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  dark: (
    <svg
      className="h-[1.2em] w-[1.2em]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  system: (
    <svg
      className="h-[1.2em] w-[1.2em]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
};

const labels = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

/**
 * A button component for toggling between light, dark, and system themes.
 *
 * @example
 * <ThemeToggle />
 *
 * @example
 * // With keyboard shortcut
 * <ThemeToggle toggleShortcut="ctrl+shift+t" />
 *
 * @example
 * // With label
 * <ThemeToggle showLabel size="lg" />
 */
export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, size = 'md', showLabel = false, toggleShortcut, ...props }, ref) => {
    const { theme, toggle } = useTheme({ toggleShortcut });

    return (
      <button
        ref={ref}
        type="button"
        onClick={toggle}
        className={cn(
          'inline-flex items-center justify-center rounded-md',
          'text-foreground hover:bg-muted-background bg-transparent',
          'transition-colors focus-visible:ring-2 focus-visible:outline-none',
          'focus-visible:ring-ring focus-visible:ring-offset-2',
          sizeStyles[size],
          showLabel && 'w-auto gap-2 px-3',
          className
        )}
        aria-label={`Current theme: ${labels[theme]}. Click to toggle.`}
        {...props}
      >
        {icons[theme]}
        {showLabel && <span>{labels[theme]}</span>}
      </button>
    );
  }
);

ThemeToggle.displayName = 'ThemeToggle';

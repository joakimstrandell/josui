// Components
export { Button, type ButtonProps } from './components/Button';
export { CustomCursor, type CustomCursorProps } from './components/CustomCursor';
export { CellGrid, type CellGridProps } from './components/CellGrid';

// Hooks
export { useIsTouchDevice } from './hooks/useIsTouchDevice';
export { useInteractiveState } from './hooks/useInteractiveState';
export { useScrollDirection } from './hooks/useScrollDirection';
export { useTheme, type UseThemeOptions, type UseThemeReturn } from './hooks/useTheme';
export { useKeyboardShortcut, type UseKeyboardShortcutOptions } from './hooks/useKeyboardShortcut';
export { useScrollProgress } from './hooks/useScrollProgress';
export { Input, type InputProps } from './components/Input';
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
  type CardHeaderProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardContentProps,
  type CardFooterProps,
} from './components/Card';
export { Badge, type BadgeProps } from './components/Badge';
export { Typography, type TypographyProps } from './components/Typography';
export { Avatar, type AvatarProps } from './components/Avatar';
export { Spinner, type SpinnerProps } from './components/Spinner';
export { Alert, type AlertProps } from './components/Alert';
export { ThemeToggle, type ThemeToggleProps } from './components/ThemeToggle';

// Re-export theme types from core-web for convenience
export type { Theme, ResolvedTheme, ThemeState } from './hooks/useTheme';

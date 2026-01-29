'use client';

import { useSyncExternalStore, useEffect } from 'react';
import { themeState, createKeyboardShortcut, parseShortcut } from '@josui/core-web/src';
import type { Theme, ResolvedTheme, ThemeState, KeyboardShortcut } from '@josui/core-web/src';

export type { Theme, ResolvedTheme, ThemeState };

export interface UseThemeOptions {
  /** Keyboard shortcut to toggle theme. Set to null to disable. Default: null */
  toggleShortcut?: string | KeyboardShortcut | null;
}

export interface UseThemeReturn extends ThemeState {
  setTheme: (theme: Theme) => void;
  toggle: () => void;
}

const serverSnapshot: ThemeState = { theme: 'system', resolvedTheme: 'light' };

/**
 * React hook for managing theme state.
 * Uses useSyncExternalStore for proper hydration handling.
 *
 * @example
 * const { theme, resolvedTheme, setTheme, toggle } = useTheme();
 *
 * @example
 * // With keyboard shortcut
 * const { toggle } = useTheme({ toggleShortcut: 'ctrl+shift+t' });
 */
export function useTheme(options: UseThemeOptions = {}): UseThemeReturn {
  const { toggleShortcut = null } = options;

  const state = useSyncExternalStore(
    (callback) => themeState.subscribe(callback),
    () => themeState.getState(),
    () => serverSnapshot
  );

  // Set up keyboard shortcut
  useEffect(() => {
    if (!toggleShortcut) return;

    const shortcut =
      typeof toggleShortcut === 'string' ? parseShortcut(toggleShortcut) : toggleShortcut;

    return createKeyboardShortcut({
      shortcut,
      onTrigger: () => themeState.toggle(),
    });
  }, [toggleShortcut]);

  return {
    ...state,
    setTheme: (theme: Theme) => themeState.setTheme(theme),
    toggle: () => themeState.toggle(),
  };
}

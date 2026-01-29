'use client';

import { useEffect } from 'react';
import { createKeyboardShortcut, parseShortcut } from '@josui/core-web/src';
import type { KeyboardShortcut } from '@josui/core-web/src';

export interface UseKeyboardShortcutOptions {
  /** Shortcut as string (e.g., "ctrl+k") or KeyboardShortcut object */
  shortcut: string | KeyboardShortcut;
  /** Callback when shortcut is triggered */
  onTrigger: () => void;
  /** Whether the shortcut is enabled. Default: true */
  enabled?: boolean;
  /** Whether to prevent default browser behavior. Default: true */
  preventDefault?: boolean;
}

/**
 * React hook for handling keyboard shortcuts.
 * Automatically cleans up listener on unmount.
 *
 * @example
 * useKeyboardShortcut({
 *   shortcut: 'ctrl+k',
 *   onTrigger: () => openCommandPalette(),
 * });
 */
export function useKeyboardShortcut(options: UseKeyboardShortcutOptions): void {
  const { shortcut, onTrigger, enabled = true, preventDefault = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const parsed = typeof shortcut === 'string' ? parseShortcut(shortcut) : shortcut;

    return createKeyboardShortcut({
      shortcut: parsed,
      onTrigger,
      preventDefault,
    });
  }, [shortcut, onTrigger, enabled, preventDefault]);
}

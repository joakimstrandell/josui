/**
 * Keyboard shortcut utilities for handling keyboard events
 */

export interface KeyboardShortcut {
  /** The key to match (e.g., 't', 'Escape', 'k') */
  key: string;
  /** Modifier keys that must be pressed */
  modifiers?: {
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    /** Cmd on Mac, Win on Windows */
    meta?: boolean;
  };
}

export interface KeyboardShortcutOptions {
  shortcut: KeyboardShortcut;
  onTrigger: () => void;
  /** Whether the shortcut is active. Default: true */
  enabled?: boolean;
  /** Whether to call preventDefault on the event. Default: true */
  preventDefault?: boolean;
}

function matchesShortcut(event: KeyboardEvent, shortcut: KeyboardShortcut): boolean {
  const { key, modifiers = {} } = shortcut;

  if (event.key.toLowerCase() !== key.toLowerCase()) return false;
  if (!!modifiers.ctrl !== event.ctrlKey) return false;
  if (!!modifiers.alt !== event.altKey) return false;
  if (!!modifiers.shift !== event.shiftKey) return false;
  if (!!modifiers.meta !== event.metaKey) return false;

  return true;
}

/**
 * Creates a keyboard shortcut listener.
 * Returns a cleanup function to remove the listener.
 */
export function createKeyboardShortcut(options: KeyboardShortcutOptions): () => void {
  const { shortcut, onTrigger, enabled = true, preventDefault = true } = options;

  if (typeof document === 'undefined' || !enabled) {
    return () => {};
  }

  const handleKeyDown = (event: KeyboardEvent): void => {
    // Don't trigger when typing in inputs
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    if (matchesShortcut(event, shortcut)) {
      if (preventDefault) event.preventDefault();
      onTrigger();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}

/**
 * Parses a shortcut string like "ctrl+shift+t" into a KeyboardShortcut object.
 * Supported modifiers: ctrl, control, alt, option, shift, meta, cmd, command
 */
export function parseShortcut(shortcutString: string): KeyboardShortcut {
  const parts = shortcutString.toLowerCase().split('+');
  const key = parts.pop()!;
  const modifiers: KeyboardShortcut['modifiers'] = {};

  for (const part of parts) {
    if (part === 'ctrl' || part === 'control') modifiers.ctrl = true;
    else if (part === 'alt' || part === 'option') modifiers.alt = true;
    else if (part === 'shift') modifiers.shift = true;
    else if (part === 'meta' || part === 'cmd' || part === 'command') modifiers.meta = true;
  }

  return { key, modifiers };
}

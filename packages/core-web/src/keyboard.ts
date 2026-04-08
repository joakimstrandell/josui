/**
 * Keyboard shortcut utilities for handling keyboard events,
 * formatting hotkeys for display, and generating ARIA labels.
 *
 * Built on @tanstack/react-hotkeys for cross-platform support.
 */

import {
  detectPlatform,
  formatForDisplay,
  MAC_MODIFIER_SYMBOLS,
  WINDOWS_MODIFIER_LABELS,
  parseHotkey,
  type Hotkey,
} from "@tanstack/react-hotkeys";

export type { Hotkey };
export { detectPlatform };

// ─── Legacy API (kept for backward compatibility) ───

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

  if (typeof document === "undefined" || !enabled) {
    return () => {};
  }

  const handleKeyDown = (event: KeyboardEvent): void => {
    const target = event.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
      return;
    }

    if (matchesShortcut(event, shortcut)) {
      if (preventDefault) event.preventDefault();
      onTrigger();
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}

/**
 * Parses a shortcut string like "ctrl+shift+t" into a KeyboardShortcut object.
 * Supported modifiers: ctrl, control, alt, option, shift, meta, cmd, command
 */
export function parseShortcut(shortcutString: string): KeyboardShortcut {
  const parts = shortcutString.toLowerCase().split("+");
  const key = parts.pop()!;
  const modifiers: KeyboardShortcut["modifiers"] = {};

  for (const part of parts) {
    if (part === "ctrl" || part === "control") modifiers.ctrl = true;
    else if (part === "alt" || part === "option") modifiers.alt = true;
    else if (part === "shift") modifiers.shift = true;
    else if (part === "meta" || part === "cmd" || part === "command" || part === "mod")
      modifiers.meta = true;
  }

  return { key, modifiers };
}

// ─── Hotkey Display Formatting ───

const ariaModifierLabels: Record<string, string> = {
  alt: "Alt",
  ctrl: "Control",
  meta: "Meta",
  shift: "Shift",
};

const ariaKeyLabels: Record<string, string> = {
  " ": "Space",
  down: "ArrowDown",
  end: "End",
  enter: "Enter",
  esc: "Escape",
  home: "Home",
  left: "ArrowLeft",
  pagedown: "PageDown",
  pageup: "PageUp",
  right: "ArrowRight",
  tab: "Tab",
  up: "ArrowUp",
};

const formatAriaKey = (key: string) => {
  const normalized = key.toLowerCase();
  if (ariaKeyLabels[normalized]) {
    return ariaKeyLabels[normalized];
  }
  return key.length === 1 ? key.toUpperCase() : key;
};

/**
 * Converts a hotkey string into display parts for rendering.
 * Platform-aware: shows ⌘ on Mac, Ctrl on Windows/Linux.
 *
 * @example
 * getShortcutParts('Mod+C') // Mac: ['⌘', 'C'], Windows: ['Ctrl', 'C']
 * getShortcutParts('Shift+Alt+T') // Mac: ['⇧', '⌥', 'T'], Windows: ['Shift', 'Alt', 'T']
 */
export function getShortcutParts(
  hotkey?: Hotkey | (string & {}),
  platform = detectPlatform(),
): string[] {
  if (!hotkey) {
    return [];
  }

  try {
    const parsed = parseHotkey(hotkey, platform);
    const modifierParts = parsed.modifiers.map((modifier) =>
      platform === "mac" ? MAC_MODIFIER_SYMBOLS[modifier] : WINDOWS_MODIFIER_LABELS[modifier],
    );

    return [...modifierParts, formatForDisplay(parsed.key, { platform })];
  } catch {
    return [hotkey];
  }
}

/**
 * Converts a hotkey string into an ARIA-compliant keyboard shortcut string.
 *
 * @example
 * getAriaKeyShortcuts('Mod+C') // 'Meta+C' (Mac) or 'Control+C' (Windows)
 */
export function getAriaKeyShortcuts(
  hotkey?: Hotkey | (string & {}),
  platform = detectPlatform(),
): string | undefined {
  if (!hotkey) {
    return undefined;
  }

  try {
    const parsed = parseHotkey(hotkey, platform);
    const modifierParts = parsed.modifiers.map((modifier) => {
      const normalizedModifier = String(modifier).toLowerCase();
      return ariaModifierLabels[normalizedModifier] ?? String(modifier);
    });
    const keyPart = formatAriaKey(parsed.key);

    return [...modifierParts, keyPart].join("+");
  } catch {
    return undefined;
  }
}

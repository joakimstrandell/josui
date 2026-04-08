"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn, getShortcutParts, detectPlatform, type Hotkey } from "@josui/core-web";

export type ShortcutProps = Omit<ComponentProps<"span">, "children"> & {
  hotkey?: Hotkey | (string & {});
  children?: ReactNode;
};

const keyCapClasses =
  "bg-muted-background rounded-sm px-1 py-0.5 inline-flex items-center justify-center align-middle text-[0.65rem] border border-border leading-none text-muted-foreground";

/**
 * Renders a keyboard shortcut as styled key caps.
 * Platform-aware: shows ⌘ on Mac, Ctrl on Windows/Linux.
 *
 * @example
 * <Shortcut hotkey="Mod+C" />
 *
 * @example
 * <Shortcut>Delete</Shortcut>
 */
export function Shortcut({ className, hotkey, children, ...props }: ShortcutProps) {
  const platform = detectPlatform();

  let shortcutParts: string[] = [];

  if (hotkey) {
    shortcutParts = getShortcutParts(hotkey, platform);
  } else if (children) {
    shortcutParts = [String(children)];
  }

  return (
    <span
      data-slot="shortcut"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {shortcutParts.map((part, index) => (
        <span key={`${part}-${index}`} className={keyCapClasses}>
          {part}
        </span>
      ))}
    </span>
  );
}

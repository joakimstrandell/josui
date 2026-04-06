"use client";

import { useSyncExternalStore } from "react";
import { elementState } from "@josui/core-web";
import type { ElementState } from "@josui/core-web";

const SERVER_STATE: ElementState = { type: "idle", interactive: false };

/**
 * React hook that tracks what type of element the cursor is over.
 *
 * @returns ElementState with `type` ("clickable" | "text" | "idle") and `interactive` (boolean)
 */
export function useElementState(): ElementState {
  return useSyncExternalStore(
    (callback) => elementState.subscribe(callback),
    () => elementState.getState(),
    () => SERVER_STATE,
  );
}

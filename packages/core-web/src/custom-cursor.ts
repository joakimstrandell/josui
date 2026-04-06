import { classifyElement, DEFAULT_CLICKABLE_SELECTORS } from "./interactive";
import type { ElementType } from "./interactive";

export interface CustomCursorOptions {
  offset?: number;
  clickableSelectors?: string;
  /** Additional elements positioned and synced alongside the cursor */
  extraElements?: HTMLElement[];
}

export interface CustomCursorState {
  readonly type: ElementType;
  readonly interactive: boolean;
  readonly clicking: boolean;
  readonly visible: boolean;
  readonly x: number;
  readonly y: number;
}

export interface CustomCursorInstance {
  readonly state: CustomCursorState;
  destroy: () => void;
}

const DEFAULTS = {
  offset: 0,
  clickableSelectors: DEFAULT_CLICKABLE_SELECTORS,
  extraElements: [] as HTMLElement[],
} satisfies Required<CustomCursorOptions>;

export function createCustomCursor(
  cursorElement: HTMLElement,
  options?: CustomCursorOptions,
): CustomCursorInstance {
  const noopState: CustomCursorState = {
    type: "idle",
    interactive: false,
    clicking: false,
    visible: false,
    x: 0,
    y: 0,
  };

  if (typeof window === "undefined" || !cursorElement) {
    return { state: noopState, destroy: () => {} };
  }

  const opts = { ...DEFAULTS, ...options };

  // state
  let lastX = 0;
  let lastY = 0;
  let firstMove = true;
  let elementType: ElementType = "idle";
  let isClicking = false;
  let clickTimeout: number | null = null;
  let isVisible = false;

  const allElements = [cursorElement, ...opts.extraElements];

  function syncState() {
    for (const el of allElements) {
      el.toggleAttribute("data-interactive", elementType !== "idle");
      el.toggleAttribute("data-clickable", elementType === "clickable");
      el.toggleAttribute("data-text", elementType === "text");
      el.toggleAttribute("data-clicking", isClicking);
      el.toggleAttribute("data-visible", isVisible);
    }
  }

  // Functional styles required for cursor behavior
  for (const el of allElements) {
    Object.assign(el.style, {
      position: "fixed",
      pointerEvents: "none",
      zIndex: "9999",
      translate: "-50% -50%",
      opacity: "0",
    });
  }
  syncState();

  function showCursor(x: number, y: number) {
    for (const el of allElements) {
      el.style.left = `${x - opts.offset}px`;
      el.style.top = `${y - opts.offset}px`;
      el.style.opacity = "1";
    }
    isVisible = true;
    syncState();
  }

  function hideCursor() {
    for (const el of allElements) {
      el.style.opacity = "0";
    }
    isVisible = false;
    syncState();
  }

  const onPointerMove = (e: PointerEvent) => {
    lastX = e.clientX;
    lastY = e.clientY;

    const target = e.target as Element;
    const classified = classifyElement(target, opts.clickableSelectors);

    if (classified.type !== elementType) {
      elementType = classified.type;
      syncState();
    }

    if (firstMove) {
      firstMove = false;
      showCursor(lastX, lastY);
      return;
    }

    for (const el of allElements) {
      el.style.left = `${lastX - opts.offset}px`;
      el.style.top = `${lastY - opts.offset}px`;
    }

    if (!isVisible) {
      showCursor(lastX, lastY);
    }
  };

  const onPointerLeaveDoc = () => {
    hideCursor();

    if (elementType !== "idle") elementType = "idle";

    if (isClicking) {
      isClicking = false;
      if (clickTimeout) {
        clearTimeout(clickTimeout);
        clickTimeout = null;
      }
    }

    syncState();
  };

  const onPointerDown = (e: PointerEvent) => {
    const target = e.target as Element;
    const classified = classifyElement(target, opts.clickableSelectors);
    if (classified.interactive) {
      isClicking = true;
      syncState();
    }
  };

  const onPointerUp = () => {
    if (isClicking) {
      isClicking = false;
      clickTimeout = window.setTimeout(() => {
        syncState();
      }, 50);
    }
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerleave", onPointerLeaveDoc);
  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("pointerup", onPointerUp);

  const onVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      hideCursor();
    } else {
      showCursor(lastX, lastY);
    }
  };
  document.addEventListener("visibilitychange", onVisibilityChange);

  const onWindowBlur = () => hideCursor();
  const onWindowFocus = () => showCursor(lastX, lastY);
  window.addEventListener("blur", onWindowBlur);
  window.addEventListener("focus", onWindowFocus);

  return {
    get state(): CustomCursorState {
      return {
        type: elementType,
        interactive: elementType !== "idle",
        clicking: isClicking,
        visible: isVisible,
        x: lastX,
        y: lastY,
      };
    },
    destroy: () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeaveDoc);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("focus", onWindowFocus);
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
    },
  };
}

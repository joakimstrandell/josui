/**
 * Element Classification
 *
 * Shared utilities for classifying what type of element the pointer is over.
 * Used by custom cursor, cell grid, and any consumer that needs to react
 * to the element under the pointer.
 */
import { isTouchDevice } from "./utils";

export type ElementType = "clickable" | "text" | "idle";

export interface ElementState {
  /** Specific classification of the element under the pointer */
  readonly type: ElementType;
  /** True when type is not "idle" — the element is interactive in some way */
  readonly interactive: boolean;
}

type Subscriber = (state: ElementState) => void;

const IDLE_STATE: ElementState = { type: "idle", interactive: false };

function makeState(type: ElementType): ElementState {
  return { type, interactive: type !== "idle" };
}

/**
 * Default CSS selectors for clickable elements
 */
export const DEFAULT_CLICKABLE_SELECTORS = [
  "a",
  "button",
  "input",
  "select",
  "textarea",
  '[role="button"]',
  "[data-interactive]",
].join(", ");

/**
 * Checks if an element is clickable (or has a clickable ancestor)
 */
export function isClickableElement(
  element: Element | null,
  selectors: string = DEFAULT_CLICKABLE_SELECTORS,
): boolean {
  if (!element) return false;
  return element.matches?.(selectors) || !!element.closest?.(selectors);
}

/**
 * Checks if an element contains selectable text content
 */
export function isSelectableText(element: Element | null): boolean {
  if (!element) return false;
  const style = window.getComputedStyle(element);
  if (style.userSelect === "none") return false;

  for (const node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      return true;
    }
  }
  return false;
}

/**
 * Classify an element by what it is.
 * Priority: clickable > text > idle
 */
export function classifyElement(
  element: Element | null,
  clickableSelectors: string = DEFAULT_CLICKABLE_SELECTORS,
): ElementState {
  if (!element) return IDLE_STATE;
  if (isClickableElement(element, clickableSelectors)) return makeState("clickable");
  if (isSelectableText(element)) return makeState("text");
  return IDLE_STATE;
}

/**
 * Element State Manager
 *
 * A singleton that tracks what type of element the cursor is over.
 * Uses a single document-level event listener for optimal performance.
 */
class ElementStateManager {
  private current: ElementState = IDLE_STATE;
  private subscribers = new Set<Subscriber>();
  private isInitialized = false;

  private handleMouseMove = (e: MouseEvent) => {
    const target = e.target as Element | null;
    const next = classifyElement(target);

    if (next.type !== this.current.type) {
      this.current = next;
      this.notifySubscribers();
    }
  };

  private handleMouseLeave = () => {
    if (this.current.type !== "idle") {
      this.current = IDLE_STATE;
      this.notifySubscribers();
    }
  };

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback(this.current));
  }

  private initialize() {
    if (this.isInitialized || typeof document === "undefined") return;

    if (isTouchDevice()) {
      this.isInitialized = true;
      return;
    }

    document.addEventListener("mousemove", this.handleMouseMove, { passive: true, capture: true });
    document.addEventListener("mouseleave", this.handleMouseLeave);

    this.isInitialized = true;
  }

  public getState(): ElementState {
    this.initialize();
    return this.current;
  }

  public subscribe(callback: Subscriber): () => void {
    this.initialize();
    this.subscribers.add(callback);
    callback(this.current);
    return () => this.subscribers.delete(callback);
  }

  public unsubscribe(callback: Subscriber): void {
    this.subscribers.delete(callback);
  }

  public destroy(): void {
    if (!this.isInitialized) return;
    document.removeEventListener("mousemove", this.handleMouseMove, { capture: true });
    document.removeEventListener("mouseleave", this.handleMouseLeave);
    this.subscribers.clear();
    this.current = IDLE_STATE;
    this.isInitialized = false;
  }
}

// Singleton instance
export const elementState = new ElementStateManager();

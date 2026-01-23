/**
 * Interactive Element Detection
 *
 * Shared utilities for detecting interactive elements and tracking
 * interactive state across the application.
 */
import { isTouchDevice } from './utils';

type Subscriber = (isOverInteractive: boolean) => void;

/**
 * Default CSS selectors for interactive elements
 */
export const DEFAULT_INTERACTIVE_SELECTORS = [
  'a',
  'button',
  'input',
  'select',
  'textarea',
  '[role="button"]',
  '[data-interactive]',
].join(', ');

/**
 * Checks if an element is interactive
 * @param element - The element to check
 * @param selectors - CSS selectors to match against (defaults to DEFAULT_INTERACTIVE_SELECTORS)
 * @returns true if the element or any ancestor matches the selectors
 */
export function isInteractiveElement(
  element: Element | null,
  selectors: string = DEFAULT_INTERACTIVE_SELECTORS
): boolean {
  if (!element) return false;
  return element.matches?.(selectors) || !!element.closest?.(selectors);
}

/**
 * Interactive State Manager
 *
 * A singleton that tracks whether the cursor is over an interactive element.
 * Uses a single document-level event listener for optimal performance.
 */
class InteractiveStateManager {
  private isOverInteractive = false;
  private subscribers = new Set<Subscriber>();
  private isInitialized = false;

  private handleMouseMove = (e: MouseEvent) => {
    const target = e.target as Element | null;
    const newState = isInteractiveElement(target);

    if (newState !== this.isOverInteractive) {
      this.isOverInteractive = newState;
      this.notifySubscribers();
    }
  };

  private handleMouseLeave = () => {
    if (this.isOverInteractive) {
      this.isOverInteractive = false;
      this.notifySubscribers();
    }
  };

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback(this.isOverInteractive));
  }

  private initialize() {
    if (this.isInitialized || typeof document === 'undefined') return;

    if (isTouchDevice()) {
      this.isInitialized = true;
      return;
    }

    document.addEventListener('mousemove', this.handleMouseMove, { passive: true, capture: true });
    document.addEventListener('mouseleave', this.handleMouseLeave);

    this.isInitialized = true;
  }

  public getState(): boolean {
    this.initialize();
    return this.isOverInteractive;
  }

  public subscribe(callback: Subscriber): () => void {
    this.initialize();
    this.subscribers.add(callback);
    callback(this.isOverInteractive);
    return () => this.subscribers.delete(callback);
  }

  public unsubscribe(callback: Subscriber): void {
    this.subscribers.delete(callback);
  }

  public destroy(): void {
    if (!this.isInitialized) return;
    document.removeEventListener('mousemove', this.handleMouseMove, { capture: true });
    document.removeEventListener('mouseleave', this.handleMouseLeave);
    this.subscribers.clear();
    this.isOverInteractive = false;
    this.isInitialized = false;
  }
}

// Singleton instance
export const interactiveState = new InteractiveStateManager();

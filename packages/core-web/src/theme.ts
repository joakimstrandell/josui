/**
 * Theme management utilities for dark/light/system mode
 */

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeState {
  /** User preference (what's stored) */
  theme: Theme;
  /** Actual applied theme */
  resolvedTheme: ResolvedTheme;
}

type ThemeSubscriber = (state: ThemeState) => void;

export interface ThemeManager {
  getState(): ThemeState;
  setTheme(theme: Theme): void;
  /** Cycles: light → dark → system → light */
  toggle(): void;
  subscribe(callback: ThemeSubscriber): () => void;
}

const STORAGE_KEY = 'josui-theme';
const ATTRIBUTE = 'data-theme';

class ThemeStateManager implements ThemeManager {
  private theme: Theme = 'system';
  private resolvedTheme: ResolvedTheme = 'light';
  private subscribers = new Set<ThemeSubscriber>();
  private mediaQuery: MediaQueryList | null = null;
  private isInitialized = false;
  // Cached state object to prevent useSyncExternalStore infinite loops
  private cachedState: ThemeState = { theme: 'system', resolvedTheme: 'light' };

  private getSystemTheme(): ResolvedTheme {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private resolveTheme(theme: Theme): ResolvedTheme {
    return theme === 'system' ? this.getSystemTheme() : theme;
  }

  private applyTheme(resolved: ResolvedTheme): void {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute(ATTRIBUTE, resolved);
    // Also set class for Tailwind dark: variant compatibility
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolved);
  }

  private persist(theme: Theme): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage may be unavailable (private browsing, etc.)
    }
  }

  private loadFromStorage(): Theme {
    if (typeof localStorage === 'undefined') return 'system';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    } catch {
      // Ignore storage errors
    }
    return 'system';
  }

  private handleSystemChange = (): void => {
    if (this.theme === 'system') {
      this.resolvedTheme = this.getSystemTheme();
      this.applyTheme(this.resolvedTheme);
      this.notifySubscribers();
    }
  };

  private updateCachedState(): void {
    this.cachedState = { theme: this.theme, resolvedTheme: this.resolvedTheme };
  }

  private notifySubscribers(): void {
    this.updateCachedState();
    this.subscribers.forEach((cb) => cb(this.cachedState));
  }

  private initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    // Load persisted preference
    this.theme = this.loadFromStorage();
    this.resolvedTheme = this.resolveTheme(this.theme);
    this.applyTheme(this.resolvedTheme);
    this.updateCachedState();

    // Listen for system preference changes
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQuery.addEventListener('change', this.handleSystemChange);

    this.isInitialized = true;
  }

  public getState(): ThemeState {
    this.initialize();
    return this.cachedState;
  }

  public setTheme(theme: Theme): void {
    this.initialize();
    this.theme = theme;
    this.resolvedTheme = this.resolveTheme(theme);
    this.applyTheme(this.resolvedTheme);
    this.persist(theme);
    this.notifySubscribers();
  }

  public toggle(): void {
    const order: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = order.indexOf(this.theme);
    const nextTheme = order[(currentIndex + 1) % order.length];
    this.setTheme(nextTheme);
  }

  public subscribe(callback: ThemeSubscriber): () => void {
    this.initialize();
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }
}

/** Singleton theme state manager */
export const themeState: ThemeManager = new ThemeStateManager();

/**
 * Returns a blocking script string to prevent theme flash on SSR.
 * Add to <head> before any content renders.
 *
 * @example
 * // Next.js app/layout.tsx
 * <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
 */
export function getThemeScript(): string {
  return `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}')||'system';var r=t;if(t==='system'){r=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('${ATTRIBUTE}',r);document.documentElement.classList.add(r);}catch(e){}})();`;
}

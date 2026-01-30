import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTheme } from './useTheme';

const mockSubscribe = vi.fn();
const mockGetState = vi.fn();
const mockSetTheme = vi.fn();
const mockToggle = vi.fn();
const mockCreateKeyboardShortcut = vi.fn(() => vi.fn());
const mockParseShortcut = vi.fn((s: string) => ({ key: s }));

vi.mock('@josui/core-web/src', () => ({
  themeState: {
    subscribe: (callback: () => void) => mockSubscribe(callback),
    getState: () => mockGetState(),
    setTheme: (theme: string) => mockSetTheme(theme),
    toggle: () => mockToggle(),
  },
  createKeyboardShortcut: (opts: unknown) => mockCreateKeyboardShortcut(opts),
  parseShortcut: (s: string) => mockParseShortcut(s),
}));

describe('useTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSubscribe.mockReturnValue(() => {});
    mockGetState.mockReturnValue({ theme: 'system', resolvedTheme: 'light' });
  });

  it('returns current theme state', () => {
    mockGetState.mockReturnValue({ theme: 'dark', resolvedTheme: 'dark' });
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('dark');
    expect(result.current.resolvedTheme).toBe('dark');
  });

  it('provides setTheme function', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme('dark');
    });

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('provides toggle function', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggle();
    });

    expect(mockToggle).toHaveBeenCalled();
  });

  it('subscribes to theme state on mount', () => {
    renderHook(() => useTheme());
    expect(mockSubscribe).toHaveBeenCalled();
  });

  it('unsubscribes on unmount', () => {
    const unsubscribe = vi.fn();
    mockSubscribe.mockReturnValue(unsubscribe);

    const { unmount } = renderHook(() => useTheme());
    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });

  it('updates when theme state changes', () => {
    let subscriber: (() => void) | null = null;
    mockSubscribe.mockImplementation((callback: () => void) => {
      subscriber = callback;
      return () => {};
    });
    mockGetState.mockReturnValue({ theme: 'system', resolvedTheme: 'light' });

    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('system');

    // Simulate state change
    mockGetState.mockReturnValue({ theme: 'dark', resolvedTheme: 'dark' });
    act(() => {
      subscriber?.();
    });

    expect(result.current.theme).toBe('dark');
  });

  it('sets up keyboard shortcut when toggleShortcut is provided', () => {
    renderHook(() => useTheme({ toggleShortcut: 'ctrl+shift+t' }));

    expect(mockParseShortcut).toHaveBeenCalledWith('ctrl+shift+t');
    expect(mockCreateKeyboardShortcut).toHaveBeenCalledWith(
      expect.objectContaining({
        shortcut: expect.any(Object),
        onTrigger: expect.any(Function),
      })
    );
  });

  it('does not set up keyboard shortcut when toggleShortcut is null', () => {
    renderHook(() => useTheme({ toggleShortcut: null }));
    expect(mockCreateKeyboardShortcut).not.toHaveBeenCalled();
  });

  it('does not set up keyboard shortcut by default', () => {
    renderHook(() => useTheme());
    expect(mockCreateKeyboardShortcut).not.toHaveBeenCalled();
  });

  it('cleans up keyboard shortcut on unmount', () => {
    const cleanup = vi.fn();
    mockCreateKeyboardShortcut.mockReturnValue(cleanup);

    const { unmount } = renderHook(() => useTheme({ toggleShortcut: 'ctrl+t' }));
    unmount();

    expect(cleanup).toHaveBeenCalled();
  });
});

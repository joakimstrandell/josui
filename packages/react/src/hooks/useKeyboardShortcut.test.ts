import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useKeyboardShortcut } from './useKeyboardShortcut';

const mockCleanup = vi.fn();
const mockCreateKeyboardShortcut = vi.fn(() => mockCleanup);
const mockParseShortcut = vi.fn((s: string) => ({
  key: s,
  ctrl: false,
  alt: false,
  shift: false,
  meta: false,
}));

vi.mock('@josui/core-web/src', () => ({
  createKeyboardShortcut: (opts: unknown) => mockCreateKeyboardShortcut(opts),
  parseShortcut: (s: string) => mockParseShortcut(s),
}));

describe('useKeyboardShortcut', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates keyboard shortcut on mount', () => {
    const onTrigger = vi.fn();
    renderHook(() =>
      useKeyboardShortcut({
        shortcut: 'ctrl+k',
        onTrigger,
      })
    );

    expect(mockParseShortcut).toHaveBeenCalledWith('ctrl+k');
    expect(mockCreateKeyboardShortcut).toHaveBeenCalledWith({
      shortcut: expect.any(Object),
      onTrigger,
      preventDefault: true,
    });
  });

  it('cleans up on unmount', () => {
    const onTrigger = vi.fn();
    const { unmount } = renderHook(() =>
      useKeyboardShortcut({
        shortcut: 'ctrl+k',
        onTrigger,
      })
    );

    unmount();
    expect(mockCleanup).toHaveBeenCalled();
  });

  it('does not create shortcut when disabled', () => {
    const onTrigger = vi.fn();
    renderHook(() =>
      useKeyboardShortcut({
        shortcut: 'ctrl+k',
        onTrigger,
        enabled: false,
      })
    );

    expect(mockCreateKeyboardShortcut).not.toHaveBeenCalled();
  });

  it('passes preventDefault option', () => {
    const onTrigger = vi.fn();
    renderHook(() =>
      useKeyboardShortcut({
        shortcut: 'ctrl+k',
        onTrigger,
        preventDefault: false,
      })
    );

    expect(mockCreateKeyboardShortcut).toHaveBeenCalledWith(
      expect.objectContaining({
        preventDefault: false,
      })
    );
  });

  it('accepts KeyboardShortcut object directly', () => {
    const onTrigger = vi.fn();
    const shortcut = { key: 'k', ctrl: true, alt: false, shift: false, meta: false };

    renderHook(() =>
      useKeyboardShortcut({
        shortcut,
        onTrigger,
      })
    );

    expect(mockParseShortcut).not.toHaveBeenCalled();
    expect(mockCreateKeyboardShortcut).toHaveBeenCalledWith(
      expect.objectContaining({
        shortcut,
      })
    );
  });

  it('recreates shortcut when dependencies change', () => {
    const onTrigger1 = vi.fn();
    const onTrigger2 = vi.fn();

    const { rerender } = renderHook(
      ({ onTrigger }) =>
        useKeyboardShortcut({
          shortcut: 'ctrl+k',
          onTrigger,
        }),
      { initialProps: { onTrigger: onTrigger1 } }
    );

    expect(mockCreateKeyboardShortcut).toHaveBeenCalledTimes(1);

    rerender({ onTrigger: onTrigger2 });

    expect(mockCleanup).toHaveBeenCalled();
    expect(mockCreateKeyboardShortcut).toHaveBeenCalledTimes(2);
  });
});

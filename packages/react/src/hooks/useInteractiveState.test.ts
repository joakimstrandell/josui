import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useInteractiveState } from './useInteractiveState';

const mockSubscribe = vi.fn();
const mockGetState = vi.fn();

vi.mock('@josui/core-web', () => ({
  interactiveState: {
    subscribe: (callback: () => void) => mockSubscribe(callback),
    getState: () => mockGetState(),
  },
}));

describe('useInteractiveState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSubscribe.mockReturnValue(() => {});
    mockGetState.mockReturnValue(false);
  });

  it('returns false when no interactive element is hovered', () => {
    mockGetState.mockReturnValue(false);
    const { result } = renderHook(() => useInteractiveState());
    expect(result.current).toBe(false);
  });

  it('returns true when interactive element is hovered', () => {
    mockGetState.mockReturnValue(true);
    const { result } = renderHook(() => useInteractiveState());
    expect(result.current).toBe(true);
  });

  it('subscribes to interactiveState on mount', () => {
    renderHook(() => useInteractiveState());
    expect(mockSubscribe).toHaveBeenCalled();
  });

  it('unsubscribes on unmount', () => {
    const unsubscribe = vi.fn();
    mockSubscribe.mockReturnValue(unsubscribe);

    const { unmount } = renderHook(() => useInteractiveState());
    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });

  it('updates when state changes', () => {
    let subscriber: (() => void) | null = null;
    mockSubscribe.mockImplementation((callback: () => void) => {
      subscriber = callback;
      return () => {};
    });
    mockGetState.mockReturnValue(false);

    const { result } = renderHook(() => useInteractiveState());
    expect(result.current).toBe(false);

    // Simulate state change
    mockGetState.mockReturnValue(true);
    act(() => {
      subscriber?.();
    });

    expect(result.current).toBe(true);
  });
});

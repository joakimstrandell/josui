import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useScrollDirection } from './useScrollDirection';

describe('useScrollDirection', () => {
  let scrollY = 0;

  beforeEach(() => {
    scrollY = 0;
    Object.defineProperty(window, 'scrollY', {
      get: () => scrollY,
      configurable: true,
    });
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns initial state correctly', () => {
    const { result } = renderHook(() => useScrollDirection());

    expect(result.current.scrolledDown).toBe(false);
    expect(result.current.scrolledUp).toBe(true);
    expect(result.current.isAtTop).toBe(true);
    expect(result.current.scrollY).toBe(0);
  });

  it('detects scroll down after threshold', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.scrolledDown).toBe(true);
    expect(result.current.scrolledUp).toBe(false);
    expect(result.current.isAtTop).toBe(false);
  });

  it('detects scroll up', () => {
    const { result } = renderHook(() => useScrollDirection());

    // First scroll down
    act(() => {
      scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    // Then scroll up
    act(() => {
      scrollY = 50;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.scrolledDown).toBe(false);
    expect(result.current.scrolledUp).toBe(true);
  });

  it('considers top when scrollY is less than 10', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      scrollY = 5;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isAtTop).toBe(true);

    act(() => {
      scrollY = 15;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isAtTop).toBe(false);
  });

  it('does not set scrolledDown until past threshold of 50', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      scrollY = 30;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.scrolledDown).toBe(false);

    act(() => {
      scrollY = 60;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.scrolledDown).toBe(true);
  });

  it('removes event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useScrollDirection());
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});

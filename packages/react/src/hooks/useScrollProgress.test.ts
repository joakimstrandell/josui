import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useScrollProgress } from './useScrollProgress';

describe('useScrollProgress', () => {
  const mockGetBoundingClientRect = vi.fn();
  let originalInnerHeight: number;

  beforeEach(() => {
    originalInnerHeight = window.innerHeight;
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1000,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    });
    vi.restoreAllMocks();
  });

  it('returns 0 when element is below viewport', () => {
    const element = document.createElement('div');
    mockGetBoundingClientRect.mockReturnValue({
      top: 1000, // At viewport bottom
      height: 500,
    });
    element.getBoundingClientRect = mockGetBoundingClientRect;

    const ref = { current: element };
    const { result } = renderHook(() => useScrollProgress(ref));

    expect(result.current).toBe(0);
  });

  it('returns 1 when element is above viewport', () => {
    const element = document.createElement('div');
    mockGetBoundingClientRect.mockReturnValue({
      top: -500, // Element bottom at viewport top
      height: 500,
    });
    element.getBoundingClientRect = mockGetBoundingClientRect;

    const ref = { current: element };
    const { result } = renderHook(() => useScrollProgress(ref));

    expect(result.current).toBe(1);
  });

  it('returns 0.5 when element is halfway through viewport', () => {
    const element = document.createElement('div');
    mockGetBoundingClientRect.mockReturnValue({
      top: 250, // Halfway point for 1000px viewport and 500px element
      height: 500,
    });
    element.getBoundingClientRect = mockGetBoundingClientRect;

    const ref = { current: element };
    const { result } = renderHook(() => useScrollProgress(ref));

    expect(result.current).toBe(0.5);
  });

  it('clamps progress to 0 when element is far below viewport', () => {
    const element = document.createElement('div');
    mockGetBoundingClientRect.mockReturnValue({
      top: 2000,
      height: 500,
    });
    element.getBoundingClientRect = mockGetBoundingClientRect;

    const ref = { current: element };
    const { result } = renderHook(() => useScrollProgress(ref));

    expect(result.current).toBe(0);
  });

  it('clamps progress to 1 when element is far above viewport', () => {
    const element = document.createElement('div');
    mockGetBoundingClientRect.mockReturnValue({
      top: -2000,
      height: 500,
    });
    element.getBoundingClientRect = mockGetBoundingClientRect;

    const ref = { current: element };
    const { result } = renderHook(() => useScrollProgress(ref));

    expect(result.current).toBe(1);
  });

  it('returns 0 when ref is null', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useScrollProgress(ref));

    expect(result.current).toBe(0);
  });

  it('adds and removes scroll event listener', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const element = document.createElement('div');
    mockGetBoundingClientRect.mockReturnValue({ top: 500, height: 500 });
    element.getBoundingClientRect = mockGetBoundingClientRect;

    const ref = { current: element };
    const { unmount } = renderHook(() => useScrollProgress(ref));

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), {
      passive: true,
    });
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function), {
      passive: true,
    });

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});

import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useIsTouchDevice } from './useIsTouchDevice';

vi.mock('@josui/core-web', () => ({
  isTouchDevice: vi.fn(),
}));

import { isTouchDevice } from '@josui/core-web';

describe('useIsTouchDevice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns false initially (before effect runs)', () => {
    vi.mocked(isTouchDevice).mockReturnValue(true);
    const { result } = renderHook(() => useIsTouchDevice());
    // After effect runs, it should be true
    expect(result.current).toBe(true);
  });

  it('returns true when device is touch device', () => {
    vi.mocked(isTouchDevice).mockReturnValue(true);
    const { result } = renderHook(() => useIsTouchDevice());
    expect(result.current).toBe(true);
  });

  it('returns false when device is not touch device', () => {
    vi.mocked(isTouchDevice).mockReturnValue(false);
    const { result } = renderHook(() => useIsTouchDevice());
    expect(result.current).toBe(false);
  });

  it('calls isTouchDevice from core-web', () => {
    vi.mocked(isTouchDevice).mockReturnValue(false);
    renderHook(() => useIsTouchDevice());
    expect(isTouchDevice).toHaveBeenCalled();
  });
});

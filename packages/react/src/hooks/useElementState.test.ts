import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useElementState } from "./useElementState";
import type { ElementState } from "@josui/core-web";

const mockSubscribe = vi.fn();
const mockGetState = vi.fn();

const IDLE: ElementState = { type: "idle", interactive: false };
const CLICKABLE: ElementState = { type: "clickable", interactive: true };
const TEXT: ElementState = { type: "text", interactive: true };

vi.mock("@josui/core-web", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@josui/core-web")>()),
  elementState: {
    subscribe: (callback: () => void) => mockSubscribe(callback),
    getState: () => mockGetState(),
  },
}));

describe("useElementState", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSubscribe.mockReturnValue(() => {});
    mockGetState.mockReturnValue(IDLE);
  });

  it("returns idle state when no interactive element is hovered", () => {
    const { result } = renderHook(() => useElementState());
    expect(result.current).toEqual(IDLE);
    expect(result.current.interactive).toBe(false);
  });

  it("returns clickable state when clickable element is hovered", () => {
    mockGetState.mockReturnValue(CLICKABLE);
    const { result } = renderHook(() => useElementState());
    expect(result.current.type).toBe("clickable");
    expect(result.current.interactive).toBe(true);
  });

  it("returns text state when text element is hovered", () => {
    mockGetState.mockReturnValue(TEXT);
    const { result } = renderHook(() => useElementState());
    expect(result.current.type).toBe("text");
    expect(result.current.interactive).toBe(true);
  });

  it("subscribes to elementState on mount", () => {
    renderHook(() => useElementState());
    expect(mockSubscribe).toHaveBeenCalled();
  });

  it("unsubscribes on unmount", () => {
    const unsubscribe = vi.fn();
    mockSubscribe.mockReturnValue(unsubscribe);

    const { unmount } = renderHook(() => useElementState());
    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });

  it("updates when state changes", () => {
    let subscriber: (() => void) | null = null;
    mockSubscribe.mockImplementation((callback: () => void) => {
      subscriber = callback;
      return () => {};
    });
    mockGetState.mockReturnValue(IDLE);

    const { result } = renderHook(() => useElementState());
    expect(result.current.type).toBe("idle");

    mockGetState.mockReturnValue(CLICKABLE);
    act(() => {
      subscriber?.();
    });

    expect(result.current.type).toBe("clickable");
    expect(result.current.interactive).toBe(true);
  });
});

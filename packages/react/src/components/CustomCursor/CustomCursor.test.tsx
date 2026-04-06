import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CustomCursor } from "./CustomCursor";

// Mock @josui/core-web
const mockDestroy = vi.fn();
const mockCreateCustomCursor = vi.fn(() => ({ destroy: mockDestroy }));

vi.mock("@josui/core-web", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@josui/core-web")>()),
  createCustomCursor: (el: HTMLElement, opts: unknown) => mockCreateCustomCursor(el, opts),
  isTouchDevice: vi.fn(() => false),
}));

// Mock the hook
vi.mock("../../hooks/useIsTouchDevice", () => ({
  useIsTouchDevice: vi.fn(() => false),
}));

import { useIsTouchDevice } from "../../hooks/useIsTouchDevice";

describe("CustomCursor", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders cursor element on non-touch devices", () => {
    render(<CustomCursor />);
    const cursor = document.querySelector('div[class*="mix-blend-multiply"]');
    expect(cursor).toBeInTheDocument();
  });

  it("does not render on touch devices", () => {
    vi.mocked(useIsTouchDevice).mockReturnValue(true);
    render(<CustomCursor />);
    const cursor = document.querySelector('div[class*="mix-blend-multiply"]');
    expect(cursor).not.toBeInTheDocument();
  });

  it("calls createCustomCursor on mount", () => {
    vi.mocked(useIsTouchDevice).mockReturnValue(false);
    render(<CustomCursor />);
    expect(mockCreateCustomCursor).toHaveBeenCalledTimes(1);
  });

  it("calls destroy on unmount", () => {
    vi.mocked(useIsTouchDevice).mockReturnValue(false);
    const { unmount } = render(<CustomCursor />);
    unmount();
    expect(mockDestroy).toHaveBeenCalledTimes(1);
  });

  it("passes options to createCustomCursor", () => {
    vi.mocked(useIsTouchDevice).mockReturnValue(false);
    const options = { offset: 5 };
    render(<CustomCursor options={options} />);
    expect(mockCreateCustomCursor).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({ offset: 5 }),
    );
  });

  it("applies custom className", () => {
    vi.mocked(useIsTouchDevice).mockReturnValue(false);
    render(<CustomCursor className="custom-cursor-class" />);
    const cursor = document.querySelector(".custom-cursor-class");
    expect(cursor).toBeInTheDocument();
  });

  it("renders both fill and border elements", () => {
    vi.mocked(useIsTouchDevice).mockReturnValue(false);
    render(<CustomCursor />);
    const fill = document.querySelector('div[class*="mix-blend-multiply"]');
    const border = document.querySelector('div[class*="border-primary-500"]');
    expect(fill).toBeInTheDocument();
    expect(border).toBeInTheDocument();
    expect(fill).toHaveClass("bg-primary-500");
    expect(border).toHaveClass("rounded-sm");
  });

  it("does not call createCustomCursor on touch devices", () => {
    vi.mocked(useIsTouchDevice).mockReturnValue(true);
    render(<CustomCursor />);
    expect(mockCreateCustomCursor).not.toHaveBeenCalled();
  });
});

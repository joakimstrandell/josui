import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CellGrid } from './CellGrid';

// Mock controller methods
const mockStart = vi.fn();
const mockStop = vi.fn();
const mockDestroy = vi.fn();
const mockResize = vi.fn();
const mockHandleMouseMove = vi.fn();
const mockHandleMouseLeave = vi.fn();
const mockTriggerFastFade = vi.fn();

const mockCreateCellGridController = vi.fn(() => ({
  start: mockStart,
  stop: mockStop,
  destroy: mockDestroy,
  resize: mockResize,
  handleMouseMove: mockHandleMouseMove,
  handleMouseLeave: mockHandleMouseLeave,
  triggerFastFade: mockTriggerFastFade,
}));

// Mock @josui/core-web
vi.mock('@josui/core-web', () => ({
  createCellGridController: (canvas: HTMLCanvasElement, config: unknown) =>
    mockCreateCellGridController(canvas, config),
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
  isTouchDevice: vi.fn(() => false),
}));

// Mock the hook
vi.mock('../../hooks/useInteractiveState', () => ({
  useInteractiveState: vi.fn(() => false),
}));

// Mock ResizeObserver
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

vi.stubGlobal(
  'ResizeObserver',
  vi.fn(() => ({
    observe: mockObserve,
    disconnect: mockDisconnect,
    unobserve: vi.fn(),
  }))
);

describe('CellGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders container and canvas elements', () => {
    render(<CellGrid />);
    const container = document.querySelector('div[class*="relative"]');
    const canvas = document.querySelector('canvas');
    expect(container).toBeInTheDocument();
    expect(canvas).toBeInTheDocument();
  });

  it('renders children inside the grid', () => {
    render(
      <CellGrid>
        <div data-testid="child">Child content</div>
      </CellGrid>
    );
    const child = document.querySelector('[data-testid="child"]');
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent('Child content');
  });

  it('applies custom className to container', () => {
    render(<CellGrid className="custom-grid-class" />);
    const container = document.querySelector('.custom-grid-class');
    expect(container).toBeInTheDocument();
  });

  it('sets up ResizeObserver on mount', () => {
    render(<CellGrid />);
    expect(mockObserve).toHaveBeenCalled();
  });

  it('disconnects ResizeObserver on unmount', () => {
    const { unmount } = render(<CellGrid />);
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('canvas has correct accessibility attributes', () => {
    render(<CellGrid />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toHaveAttribute('aria-hidden', 'true');
  });

  it('canvas has pointer-events-none class', () => {
    render(<CellGrid />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toHaveClass('pointer-events-none');
  });

  it('children container has higher z-index than canvas', () => {
    render(
      <CellGrid>
        <div>Content</div>
      </CellGrid>
    );
    const canvas = document.querySelector('canvas');
    const childContainer = document.querySelector('div[class*="z-10"]');
    expect(canvas).toHaveClass('z-0');
    expect(childContainer).toBeInTheDocument();
  });
});

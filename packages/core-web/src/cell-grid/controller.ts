import type { CellGridController, CellGridControllerConfig } from './types';
import { createCellManager } from './manager';
import { drawCellGridLines, drawCells, clearCanvas } from './renderer';

/**
 * Creates the main controller for the cell grid animation
 * Handles mouse events, animation loop, and coordinates between managers
 *
 * @param canvas HTML canvas element to render on
 * @param config Configuration options for the cell grid
 * @returns CellGridController interface
 */
export const createCellGridController = (
  canvas: HTMLCanvasElement,
  config: CellGridControllerConfig = {}
): CellGridController => {
  const {
    cellSize = 24,
    fadeRate = 0.015,
    maxCells = 200,
    gridColor = '#000',
    cellColor = '#000',
  } = config;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas 2D context');
  }

  // Create cell manager
  const cellManager = createCellManager(maxCells, cellSize);

  // Animation state
  let animationFrameId: number | null = null;
  let isRunning = false;
  let previousMousePos = { x: 0, y: 0 };
  let canvasWidth = canvas.width;
  let canvasHeight = canvas.height;
  let isFirstMouseMove = true;
  let currentFadeRate = fadeRate;
  const fastFadeRate = 0.15;

  /**
   * Main animation loop
   */
  const animate = () => {
    if (!isRunning) return;

    // Update cell intensities
    cellManager.updateCells(currentFadeRate);

    // Gradually return to normal fade rate
    if (currentFadeRate > fadeRate) {
      currentFadeRate = Math.max(fadeRate, currentFadeRate * 0.95);
    }

    // Clear and redraw
    clearCanvas(ctx, canvasWidth, canvasHeight);
    drawCellGridLines(ctx, canvasWidth, canvasHeight, cellSize, gridColor);
    drawCells(ctx, cellManager.getCells(), cellSize, cellColor);

    animationFrameId = requestAnimationFrame(animate);
  };

  const start = (): void => {
    if (isRunning) return;
    isRunning = true;
    animate();
  };

  const stop = (): void => {
    isRunning = false;
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  const handleMouseMove = (x: number, y: number, isOverInteractive = false): void => {
    if (x < 0 || x > canvasWidth || y < 0 || y > canvasHeight) {
      return;
    }

    if (isOverInteractive) {
      cellManager.clearHoverCell();
      return;
    }

    const newPos = { x, y };
    const prevPos = previousMousePos;

    cellManager.setHoverCell(x, y);

    if (isFirstMouseMove) {
      cellManager.addCell(x, y);
      isFirstMouseMove = false;
    } else {
      cellManager.addCellsAlongPath(prevPos.x, prevPos.y, x, y);
    }

    previousMousePos = newPos;
  };

  const handleMouseLeave = (): void => {
    cellManager.clear();
    cellManager.clearHoverCell();
    isFirstMouseMove = true;
    currentFadeRate = fadeRate;
  };

  const triggerFastFade = (): void => {
    cellManager.clear();
    cellManager.clearHoverCell();
    isFirstMouseMove = true;
    currentFadeRate = fastFadeRate;
  };

  const resize = (width: number, height: number): void => {
    canvas.width = width;
    canvas.height = height;
    canvasWidth = width;
    canvasHeight = height;
  };

  const destroy = (): void => {
    stop();
    cellManager.clear();
  };

  return {
    start,
    stop,
    handleMouseMove,
    handleMouseLeave,
    triggerFastFade,
    resize,
    destroy,
  };
};

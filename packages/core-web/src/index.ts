// @josui/core-web
// Shared web utilities for UI rendering, cursors, canvas, and more

export { cn } from './cn';
export { isTouchDevice } from './utils';
export {
  createCustomCursor,
  type CustomCursorOptions,
  type CustomCursorInstance,
} from './custom-cursor';
export {
  DEFAULT_INTERACTIVE_SELECTORS,
  isInteractiveElement,
  interactiveState,
} from './interactive';
export {
  createCellGridController,
  createCellManager,
  drawCellGridLines,
  drawCells,
  clearCanvas,
  type CellState,
  type CellManager,
  type CellGridController,
  type CellGridControllerConfig,
} from './cell-grid';

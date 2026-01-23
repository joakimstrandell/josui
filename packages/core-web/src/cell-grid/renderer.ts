import type { CellState } from './types';
import { withAlpha } from '@josui/core';

/**
 * Draws the static cell grid lines on the canvas
 *
 * @param ctx Canvas 2D rendering context
 * @param width Canvas width
 * @param height Canvas height
 * @param cellSize Size of each grid cell in pixels
 * @param color Color for the grid lines
 */
export const drawCellGridLines = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cellSize: number,
  color: string
): void => {
  const gridColor = withAlpha(color, 0.1) ?? color;
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 0.5;
  ctx.globalAlpha = 1;

  // Draw vertical lines
  for (let x = 0; x <= width; x += cellSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Draw horizontal lines
  for (let y = 0; y <= height; y += cellSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
};

/**
 * Draws all active cells with their current intensity values
 *
 * @param ctx Canvas 2D rendering context
 * @param cells Map of cell keys to their state objects
 * @param cellSize Size of each grid cell in pixels
 * @param color Base color for the cells
 */
export const drawCells = (
  ctx: CanvasRenderingContext2D,
  cells: ReadonlyMap<string, CellState>,
  cellSize: number,
  color: string
): void => {
  const padding = 1;

  cells.forEach((cell) => {
    const alpha = cell.intensity * 0.3;
    const cellColor = withAlpha(color, alpha) ?? color;

    ctx.fillStyle = cellColor;
    ctx.globalAlpha = 1;

    ctx.fillRect(
      cell.x + padding,
      cell.y + padding,
      cellSize - padding * 2,
      cellSize - padding * 2
    );
  });
};

/**
 * Clears the entire canvas to prepare for the next frame
 *
 * @param ctx Canvas 2D rendering context
 * @param width Canvas width
 * @param height Canvas height
 */
export const clearCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
  ctx.clearRect(0, 0, width, height);
};

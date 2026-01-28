/**
 * Color utilities powered by culori
 * @see https://culorijs.org/
 */
import { parse, formatRgb, formatHex, type Color } from 'culori';

export { parse, formatRgb, formatHex };
export type { Color };

/**
 * Parses a color string and returns RGB format
 *
 * @param color - Any valid CSS color string
 * @returns RGB string like "rgb(255, 0, 0)" or null if invalid
 */
export function toRgb(color: string | null | undefined): string | null {
  if (!color) return null;
  const parsed = parse(color);
  if (!parsed) return null;
  return formatRgb(parsed);
}

/**
 * Parses a color string and returns hex format
 *
 * @param color - Any valid CSS color string
 * @returns Hex string like "#ff0000" or null if invalid
 */
export function toHex(color: string | null | undefined): string | null {
  if (!color) return null;
  const parsed = parse(color);
  if (!parsed) return null;
  return formatHex(parsed);
}

/**
 * Adds or modifies alpha on any color
 *
 * @param color - Any valid CSS color string
 * @param alpha - Alpha value (0-1)
 * @returns RGBA string or null if invalid
 */
export function withAlpha(color: string | null | undefined, alpha: number): string | null {
  if (!color) return null;
  const parsed = parse(color);
  if (!parsed) return null;
  const clamped = Math.max(0, Math.min(1, alpha));
  return formatRgb({ ...parsed, alpha: clamped });
}

/**
 * Converts any CSS color to canvas-compatible RGB format
 * Canvas 2D context doesn't support oklch or other modern color spaces
 *
 * @param color - Any valid CSS color string
 * @param alpha - Optional alpha value (0-1)
 * @returns RGB/RGBA string compatible with canvas, or original color if conversion fails
 */
export function toCanvasColor(color: string, alpha?: number): string {
  if (alpha !== undefined) {
    return withAlpha(color, alpha) ?? toRgb(color) ?? color;
  }
  return toRgb(color) ?? color;
}

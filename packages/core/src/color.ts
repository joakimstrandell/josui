/**
 * Color utilities powered by culori
 * @see https://culorijs.org/
 */
import { parse, formatRgb, formatHex, type Color } from 'culori';

export { parse, formatRgb, formatHex };
export type { Color };

/**
 * Parses a color string and returns RGB format
 * Useful for canvas which doesn't support oklch or other modern color spaces
 *
 * @param color - Any valid CSS color string
 * @param alpha - Optional alpha value (0-1) to apply
 * @returns RGB/RGBA string like "rgb(255, 0, 0)" or null if invalid
 */
export function toRgb(color: string | null | undefined, alpha?: number): string | null {
  if (!color) return null;
  const parsed = parse(color);
  if (!parsed) return null;
  if (alpha !== undefined) {
    const clamped = Math.max(0, Math.min(1, alpha));
    return formatRgb({ ...parsed, alpha: clamped });
  }
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

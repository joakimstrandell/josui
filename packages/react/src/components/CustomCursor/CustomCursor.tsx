"use client";
import { useEffect, useRef } from "react";
import { createCustomCursor, type CustomCursorOptions } from "@josui/core-web";
import { useIsTouchDevice } from "../../hooks/useIsTouchDevice";
import { cn } from "@josui/core-web";

export interface CustomCursorProps {
  /** Options for cursor behavior (offset, selectors) */
  options?: CustomCursorOptions;
  className?: string;
  /** Additional class for the fill layer (has mix-blend-multiply) */
  fillClassName?: string;
}

export function CustomCursor({ options, className, fillClassName }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (isTouch) return;
    const cursorElement = cursorRef.current;
    const fillElement = fillRef.current;
    if (!cursorElement) return;

    const extraElements = fillElement ? [fillElement] : [];
    const instance = createCustomCursor(cursorElement, { ...options, extraElements });
    return () => instance.destroy();
  }, [isTouch, options]);

  if (isTouch) return null;

  const sharedShape = cn(
    "size-3.5 rounded-sm",
    "transition-transform duration-150 ease-out",
    "data-interactive:scale-[2.5] data-interactive:rounded-full",
    "[&[data-interactive][data-clicking]:not([data-text])]:scale-200",
    "data-text:origin-center data-text:scale-y-[calc(20/14)] data-text:rounded-none",
  );

  return (
    <>
      {/* Fill — independent stacking context, blends with page */}
      <div
        ref={fillRef}
        className={cn(
          sharedShape,
          "data-interactive:bg-primary-500 mix-blend-multiply data-text:scale-x-[calc(2/14)]",
          fillClassName,
        )}
      />
      {/* Border — solid, no blend */}
      <div
        ref={cursorRef}
        className={cn(
          sharedShape,
          "data-interactive:border-[0.5px] border-primary-500 border data-text:scale-x-[calc(3/14)] data-text:border-3 data-text:border-y-0",
          className,
        )}
      />
    </>
  );
}

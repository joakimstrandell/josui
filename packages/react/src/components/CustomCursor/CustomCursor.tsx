'use client';
import { useEffect, useRef } from 'react';
import { createCustomCursor, type CustomCursorOptions } from '@josui/core-web';
import { useIsTouchDevice } from '../../hooks/useIsTouchDevice';

export interface CustomCursorProps {
  options?: CustomCursorOptions;
  className?: string;
}

export function CustomCursor({ options, className }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (isTouch) return;
    const cursorElement = cursorRef.current;
    if (!cursorElement) return;
    const instance = createCustomCursor(cursorElement, options);
    return () => instance.destroy();
  }, [isTouch, options]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className={
        className ??
        'pointer-events-none fixed left-0 top-0 z-[9999] h-5 w-5 border border-primary-500 mix-blend-difference'
      }
    />
  );
}

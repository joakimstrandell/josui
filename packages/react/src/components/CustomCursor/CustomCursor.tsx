'use client';
import { useEffect, useRef } from 'react';
import { createCustomCursor, type CustomCursorOptions } from '@josui/core-web';
import { useIsTouchDevice } from '../../hooks/useIsTouchDevice';
import { cn } from '@josui/core-web/src';

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
      className={cn(
        'border-primary-500 pointer-events-none fixed top-0 left-0 z-9999 size-4 border-2 opacity-5 mix-blend-multiply',
        className
      )}
    />
  );
}

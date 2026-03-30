"use client";

import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@josui/core-web";

export interface RotatingTextProps {
  /** Array of words to rotate through */
  words: string[];
  /** Interval between rotations in seconds */
  interval?: number;
  /** Additional class names */
  className?: string;
}

export const RotatingText = forwardRef<HTMLSpanElement, RotatingTextProps>(
  ({ words, interval = 2.5, className }, ref) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const currentIndex = useRef(0);

    // Merge refs
    const setRef = (el: HTMLSpanElement | null) => {
      (containerRef as React.MutableRefObject<HTMLSpanElement | null>).current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLSpanElement | null>).current = el;
    };

    useEffect(() => {
      const container = containerRef.current;
      if (!container || words.length === 0) return;

      const wordElements = container.querySelectorAll(".rotating-word");

      // Set initial state — first word visible, others hidden below
      gsap.set(wordElements, { yPercent: 100, opacity: 0 });
      gsap.set(wordElements[0], { yPercent: 0, opacity: 1 });

      const rotateWords = () => {
        const current = wordElements[currentIndex.current];
        const nextIndex = (currentIndex.current + 1) % words.length;
        const next = wordElements[nextIndex];

        gsap.to(current, {
          yPercent: -100,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });

        gsap.fromTo(
          next,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.inOut" },
        );

        currentIndex.current = nextIndex;
      };

      const intervalId = setInterval(rotateWords, interval * 1000);
      return () => clearInterval(intervalId);
    }, [words, interval]);

    // Use the longest word for sizing
    const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), "");

    return (
      <span
        className={cn("relative inline-block overflow-hidden align-bottom", className)}
        ref={setRef}
      >
        {/* Invisible word for sizing */}
        <span className="invisible">{longestWord}</span>
        {/* Actual rotating words */}
        {words.map((word, index) => (
          <span key={index} className="rotating-word absolute inset-0 flex">
            {word}
          </span>
        ))}
      </span>
    );
  },
);

RotatingText.displayName = "RotatingText";

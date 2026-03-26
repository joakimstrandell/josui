'use client';

import { forwardRef, useEffect, useRef, type HTMLAttributes } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@josui/core-web';

export interface AnimateContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Animation type */
  animationType?:
    | 'fadeUp'
    | 'fadeIn'
    | 'fadeLeft'
    | 'fadeRight'
    | 'slideUp'
    | 'slideLeft'
    | 'slideRight';
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Animation duration (seconds) */
  duration?: number;
  /** ScrollTrigger start position */
  start?: string;
  /** ScrollTrigger end position */
  end?: string;
  /** Whether animation scrubs with scroll position */
  scrub?: boolean;
  /** Delay between sequential in-viewport elements (seconds) */
  sequenceDelay?: number;
}

const initialClassMap: Record<NonNullable<AnimateContentProps['animationType']>, string> = {
  fadeUp: 'opacity-0 translate-y-[40px]',
  fadeIn: 'opacity-0',
  fadeLeft: 'opacity-0 translate-x-[40px]',
  fadeRight: 'opacity-0 -translate-x-[40px]',
  slideUp: 'translate-y-[100px]',
  slideLeft: 'translate-x-[100px]',
  slideRight: '-translate-x-[100px]',
};

export const AnimateContent = forwardRef<HTMLDivElement, AnimateContentProps>(
  (
    {
      children,
      className,
      animationType = 'fadeUp',
      delay = 0,
      duration = 1,
      start = 'top bottom',
      end = 'top center',
      scrub = true,
      sequenceDelay = 0.1,
      ...props
    },
    ref
  ) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Merge refs
    const setRef = (el: HTMLDivElement | null) => {
      (sectionRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    };

    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);

      const element = sectionRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        // Sequence elements already visible on mount
        const allElements = document.querySelectorAll('[data-animate-content]');
        const visibleElements = Array.from(allElements)
          .filter((el) => {
            const elRect = el.getBoundingClientRect();
            return elRect.top < window.innerHeight && elRect.bottom > 0;
          })
          .sort((a, b) => {
            const aRect = a.getBoundingClientRect();
            const bRect = b.getBoundingClientRect();
            return aRect.top - bRect.top;
          });

        const elementIndex = visibleElements.indexOf(element);
        const calculatedSequenceDelay = elementIndex * sequenceDelay;

        gsap.to(element, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          delay: delay + calculatedSequenceDelay,
        });
      } else {
        const animation = gsap.to(element, {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          scrollTrigger: { trigger: element, start, end, scrub },
        });

        const refreshTimer = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);

        return () => {
          clearTimeout(refreshTimer);
          animation.kill();
          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.trigger === element) {
              trigger.kill();
            }
          });
        };
      }
    }, [animationType, delay, duration, start, end, scrub, sequenceDelay]);

    return (
      <div
        ref={setRef}
        className={cn('block w-full', initialClassMap[animationType], className)}
        data-animate-content
        {...props}
      >
        {children}
      </div>
    );
  }
);

AnimateContent.displayName = 'AnimateContent';

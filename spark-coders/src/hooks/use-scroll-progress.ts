'use client';

import { useEffect, type RefObject } from 'react';
import { clamp } from '@/utils/math';

/**
 * Calls `onProgress` with how far a tall (sticky) section has been scrolled through:
 * 0 when its top meets the viewport top, 1 when its bottom meets the viewport bottom.
 * Runs at most once per animation frame and never triggers React renders by itself.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onProgress: (progress: number) => void,
): void {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      onProgress(travel <= 0 ? 0 : clamp(-rect.top / travel));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ref, onProgress]);
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { useFinePointer } from '@/hooks/use-fine-pointer';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/utils/cn';

/**
 * Soft brand-coloured cursor follower for mouse users. It grows over links and buttons and shows
 * the label of any element carrying `data-cursor="…"`. The native cursor stays visible.
 */
export function CustomCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine || reduced) return;
    const dot = dotRef.current;
    if (!dot) return;
    let x = -100;
    let y = -100;
    let tx = x;
    let ty = y;
    let frame = 0;

    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      setVisible(true);
      if (!frame) frame = requestAnimationFrame(loop);
      const target = event.target instanceof Element ? event.target : null;
      const labelled = target?.closest<HTMLElement>('[data-cursor]');
      setLabel(labelled?.dataset.cursor ?? null);
      setActive(Boolean(target?.closest('a, button, [role="tab"], label')));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed top-0 left-0 z-[70] -mt-2 -ml-2 transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div
        className={cn(
          'grid size-4 place-items-center rounded-full bg-grad mix-blend-screen transition-transform duration-350 ease-brand',
          label ? 'scale-[5.5]' : active ? 'scale-[2.6] opacity-60' : 'scale-100',
        )}
      />
      {label ? (
        <span className="absolute top-1/2 left-1/2 -translate-1/2 font-display text-sm font-extrabold whitespace-nowrap text-ink">
          {label}
        </span>
      ) : null}
    </div>
  );
}

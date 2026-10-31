'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/utils/cn';

/** Peak tilt at the card's edges, in degrees. */
const MAX_TILT = 14;

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  cardClassName?: string;
}

/**
 * transitions.dev "card hover tilt": the card leans toward the pointer in 3D with a
 * cursor-tracked glare, then eases back flat. The outer element never transforms, so it stays a
 * stable hit area; a touch drag tilts it too.
 */
export function TiltCard({ children, className, cardClassName }: TiltCardProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const track = (event: PointerEvent<HTMLDivElement>) => {
    const outer = outerRef.current;
    const card = cardRef.current;
    if (reduced || !outer || !card) return;
    const rect = outer.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const py = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    outer.dataset.hover = '';
    card.dataset.tilting = '';
    card.style.setProperty('--tilt-ry', `${((px - 0.5) * MAX_TILT).toFixed(2)}deg`);
    card.style.setProperty('--tilt-rx', `${((0.5 - py) * MAX_TILT).toFixed(2)}deg`);
    card.style.setProperty('--tilt-gx', `${(px * 100).toFixed(1)}%`);
    card.style.setProperty('--tilt-gy', `${(py * 100).toFixed(1)}%`);
  };

  const reset = () => {
    const outer = outerRef.current;
    const card = cardRef.current;
    if (!outer || !card) return;
    delete outer.dataset.hover;
    delete card.dataset.tilting;
    card.style.setProperty('--tilt-rx', '0deg');
    card.style.setProperty('--tilt-ry', '0deg');
  };

  return (
    <div
      ref={outerRef}
      onPointerDown={(event) => {
        if (event.pointerType !== 'mouse') event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={track}
      onPointerUp={(event) => event.pointerType !== 'mouse' && reset()}
      onPointerCancel={reset}
      onPointerLeave={(event) => event.pointerType === 'mouse' && reset()}
      className={cn('group/tilt touch-none', className)}
    >
      <div
        ref={cardRef}
        className={cn(
          'relative overflow-hidden [transform:perspective(1000px)_rotateX(var(--tilt-rx,0deg))_rotateY(var(--tilt-ry,0deg))] transition-transform duration-1000 ease-brand transform-3d data-tilting:duration-400 motion-reduce:transform-none',
          cardClassName,
        )}
      >
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_95px_at_var(--tilt-gx,50%)_var(--tilt-gy,50%),rgb(255_255_255/0.48),rgb(255_255_255/0.06)_52%,transparent_84%),radial-gradient(circle_220px_at_var(--tilt-gx,50%)_var(--tilt-gy,50%),rgb(255_255_255/0.2),transparent_78%)] opacity-0 mix-blend-screen transition-opacity duration-300 ease-brand group-data-hover/tilt:opacity-[0.32]"
        />
      </div>
    </div>
  );
}

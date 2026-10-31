'use client';

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { ArrowIcon } from '@/components/ui/icons';
import { Pill } from '@/components/ui/pill';
import { Reveal } from '@/components/ui/reveal';
import { useFinePointer } from '@/hooks/use-fine-pointer';
import { gsap } from '@/lib/gsap';
import { cn } from '@/utils/cn';
import type { ProjectRow } from '../types';
import { ProjectArt } from './project-art';

interface WorkListProps {
  rows: readonly ProjectRow[];
  detailsLabel: string;
}

/**
 * Project rows; on mouse devices a preview card follows the pointer and shows the hovered project.
 * Touch devices get a thumbnail in each row instead.
 */
export function WorkList({ rows, detailsLabel }: WorkListProps) {
  const fine = useFinePointer();
  const previewRef = useRef<HTMLDivElement>(null);
  const movers = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);
  const [hovered, setHovered] = useState<ProjectRow | null>(null);

  useEffect(() => {
    const node = previewRef.current;
    if (!fine || !node) return;
    movers.current = {
      x: gsap.quickTo(node, 'x', { duration: 0.45, ease: 'power3.out' }),
      y: gsap.quickTo(node, 'y', { duration: 0.45, ease: 'power3.out' }),
    };
    return () => {
      movers.current = null;
      gsap.killTweensOf(node);
    };
  }, [fine]);

  const onMove = (event: ReactPointerEvent) => {
    const move = movers.current;
    if (!move) return;
    // Jump straight to the pointer when the card first appears, then glide.
    if (!hovered && previewRef.current) gsap.set(previewRef.current, { x: event.clientX, y: event.clientY });
    move.x(event.clientX);
    move.y(event.clientY);
  };

  return (
    <>
      <ul
        className="mb-12 border-t border-line-strong"
        onPointerMove={fine ? onMove : undefined}
        onPointerLeave={() => setHovered(null)}
      >
        {rows.map((row, index) => (
          <Reveal as="li" key={row.key} index={index}>
            <a
              href={row.href}
              onPointerEnter={() => setHovered(row)}
              className="group/row grid grid-cols-[136px_1fr_auto_auto] items-center gap-x-6 gap-y-4 border-b border-line-strong py-5 transition-[padding] duration-400 ease-brand hover:px-4 focus-visible:px-4 max-sm:grid-cols-[96px_1fr] max-sm:grid-rows-[auto_auto] max-sm:gap-x-4 max-sm:gap-y-1.5"
            >
              <ProjectArt
                accent={row.accent}
                image={row.image}
                alt={row.alt}
                sizes="(max-width: 640px) 96px, 136px"
                className="aspect-[4/3] w-full rounded-xl transition-transform duration-500 ease-brand group-hover/row:scale-[1.04] max-sm:row-span-2"
              />
              <h3 className="font-display text-[clamp(1.25rem,2.6vw,2rem)] leading-[1.35] font-semibold transition-colors duration-300 group-hover/row:text-aqua">
                {row.title}
              </h3>
              <Pill className="max-sm:justify-self-start">{row.category}</Pill>
              <span className="inline-flex translate-x-3 items-center gap-2 text-sm text-aqua opacity-0 transition-[opacity,translate] duration-[300ms,400ms] ease-brand group-hover/row:translate-x-0 group-hover/row:opacity-100 group-focus-visible/row:translate-x-0 group-focus-visible/row:opacity-100 max-sm:hidden ltr:-translate-x-3">
                {detailsLabel}
                <ArrowIcon />
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
      {fine ? (
        <div ref={previewRef} aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-30">
          <div
            className={cn(
              'relative aspect-[4/3] w-[440px] -translate-1/2 overflow-hidden rounded-card shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] transition-[opacity,scale] duration-[300ms,400ms] ease-brand',
              hovered ? 'scale-100 opacity-100' : 'scale-[0.85] opacity-0',
            )}
          >
            {hovered ? (
              <ProjectArt
                accent={hovered.accent}
                image={hovered.image}
                alt=""
                sizes="440px"
                className="absolute inset-0"
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

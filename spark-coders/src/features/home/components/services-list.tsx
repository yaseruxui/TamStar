'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { ArrowIcon } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/reveal';
import { useFinePointer } from '@/hooks/use-fine-pointer';
import { gsap } from '@/lib/gsap';
import { cn } from '@/utils/cn';
import type { ServiceKey } from '../types';

export interface ServiceRow {
  key: ServiceKey;
  title: string;
  body: string;
  image: string;
  alt: string;
}

/**
 * Duotone line icons on a 48px grid: a soft filled shape (`.duo`) under a crisp stroke, with one
 * aqua accent each. Drawn inline so nothing is fetched.
 */
const ICONS: Record<ServiceKey, ReactNode> = {
  website: (
    <>
      <rect className="duo" x="5" y="8" width="38" height="30" rx="5" />
      <rect x="5" y="8" width="38" height="30" rx="5" />
      <path d="M5 16h38" />
      <path className="accent" d="M10.5 12h.01M14.5 12h.01M18.5 12h.01" />
      <path className="accent" d="m19 23-4.5 4 4.5 4M29 23l4.5 4-4.5 4M26 21.5l-4 11" />
      <path d="M17 43h14" />
    </>
  ),
  store: (
    <>
      <path className="duo" d="M11 16h32l-3.6 15.2a3 3 0 0 1-2.9 2.3H17.3a3 3 0 0 1-2.9-2.4Z" />
      <path d="M4 7h4.2a2 2 0 0 1 2 1.6L14.4 31a3 3 0 0 0 2.9 2.5h19.2a3 3 0 0 0 2.9-2.3L43 16H11.3" />
      <circle cx="19" cy="40.5" r="2.5" />
      <circle cx="35" cy="40.5" r="2.5" />
      <path className="accent" d="m22 23.5 3 3 6-6" />
    </>
  ),
  app: (
    <>
      <rect className="duo" x="12" y="4" width="24" height="40" rx="6" />
      <rect x="12" y="4" width="24" height="40" rx="6" />
      <path d="M21 8.5h6M21.5 39h5" />
      <rect className="accent" x="17" y="15" width="6" height="6" rx="1.8" />
      <rect className="accent" x="25" y="15" width="6" height="6" rx="1.8" />
      <rect className="accent" x="17" y="23" width="6" height="6" rx="1.8" />
      <rect x="25" y="23" width="6" height="6" rx="1.8" />
    </>
  ),
  systems: (
    <>
      <rect className="duo" x="5" y="6" width="38" height="36" rx="5" />
      <rect x="5" y="6" width="38" height="36" rx="5" />
      <path d="M17 6v36M17 15h26" />
      <path d="M9.5 11h3M9.5 20h3M9.5 26h3" />
      <path className="accent" d="m22 34 5-6 4 3 7-8" />
    </>
  ),
  branding: (
    <>
      <path
        className="duo"
        d="M24 5C13.5 5 5 13 5 23s8.5 19 18.5 19c2.4 0 3.6-2 2.7-4-1.2-2.6.6-5 3.3-5H35a8 8 0 0 0 8-8C43 13.7 34.5 5 24 5Z"
      />
      <path d="M24 5C13.5 5 5 13 5 23s8.5 19 18.5 19c2.4 0 3.6-2 2.7-4-1.2-2.6.6-5 3.3-5H35a8 8 0 0 0 8-8C43 13.7 34.5 5 24 5Z" />
      <circle className="accent" cx="14.5" cy="22" r="2.6" />
      <circle cx="19.5" cy="13.5" r="2.6" />
      <circle className="accent" cx="29.5" cy="13" r="2.6" />
      <circle cx="35.5" cy="20.5" r="2.6" />
    </>
  ),
  seo: (
    <>
      <circle className="duo" cx="21" cy="21" r="15" />
      <circle cx="21" cy="21" r="15" />
      <path d="m32 32 11 11" />
      <path className="accent" d="m13.5 25.5 5-5 4 4 6.5-7" />
      <path className="accent" d="M25 17.5h4v4" />
    </>
  ),
};

interface ServicesListProps {
  rows: readonly ServiceRow[];
  ctaLabel: string;
}

/**
 * Service rows separated by dividers. On mouse devices a picture of the hovered service follows the
 * pointer (the same preview the project list used); touch devices just get the rows.
 */
export function ServicesList({ rows, ctaLabel }: ServicesListProps) {
  const fine = useFinePointer();
  const previewRef = useRef<HTMLDivElement>(null);
  const movers = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);
  const [hovered, setHovered] = useState<ServiceRow | null>(null);

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
    // Jump straight to the pointer when the picture first appears, then glide.
    if (!hovered && previewRef.current) gsap.set(previewRef.current, { x: event.clientX, y: event.clientY });
    move.x(event.clientX);
    move.y(event.clientY);
  };

  return (
    <>
      <ul
        className="border-t border-white/30"
        onPointerMove={fine ? onMove : undefined}
        onPointerLeave={() => setHovered(null)}
      >
        {rows.map((row, index) => (
          <Reveal as="li" key={row.key} index={index}>
            <a
              href="#contact"
              onPointerEnter={() => setHovered(row)}
              className="group/row grid grid-cols-[auto_1fr_auto] items-center gap-x-[clamp(16px,3vw,40px)] gap-y-1 border-b border-white/30 py-[clamp(18px,2.4vw,28px)] transition-[padding,background-color] duration-400 ease-brand hover:bg-ink/20 hover:px-5 focus-visible:px-5 max-sm:grid-cols-[auto_1fr]"
            >
              <span className="service-icon grid size-[clamp(52px,5.6vw,72px)] place-items-center text-white transition-[scale,rotate,color] duration-500 ease-brand group-hover/row:scale-[1.1] group-hover/row:-rotate-6 group-hover/row:text-aqua max-sm:row-span-2 max-sm:self-start">
                <svg
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                  className="size-full overflow-visible drop-shadow-[0_8px_18px_rgb(7_5_26/0.45)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[row.key]}
                </svg>
              </span>
              <span className="grid gap-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10">
                <h3 className="font-display text-[clamp(1.25rem,2.4vw,1.9rem)] leading-[1.35] font-semibold transition-colors duration-300 group-hover/row:text-aqua">
                  {row.title}
                </h3>
                <span className="text-[0.9375rem] text-text/80 sm:text-base">{row.body}</span>
              </span>
              <span className="inline-flex translate-x-3 items-center gap-2 text-sm font-semibold text-aqua opacity-0 transition-[opacity,translate] duration-[300ms,400ms] ease-brand group-hover/row:translate-x-0 group-hover/row:opacity-100 group-focus-visible/row:translate-x-0 group-focus-visible/row:opacity-100 max-sm:hidden ltr:-translate-x-3">
                {ctaLabel}
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
              'relative aspect-[4/3] w-[400px] -translate-1/2 overflow-hidden rounded-card shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] outline outline-1 -outline-offset-1 outline-white/15 transition-[opacity,scale] duration-[300ms,400ms] ease-brand',
              hovered ? 'scale-100 opacity-100' : 'scale-[0.85] opacity-0',
            )}
          >
            {/* Every picture stays mounted so switching rows never waits on a fetch. */}
            {rows.map((row) => (
              <Image
                key={row.key}
                src={row.image}
                alt=""
                fill
                sizes="400px"
                className={cn(
                  'object-cover transition-opacity duration-300',
                  hovered?.key === row.key ? 'opacity-100' : 'opacity-0',
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

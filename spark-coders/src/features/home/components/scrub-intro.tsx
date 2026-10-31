'use client';

import dynamic from 'next/dynamic';
import { useCallback, useRef } from 'react';
import { CanvasSkeleton } from '@/components/feedback/canvas-skeleton';
import { ErrorBoundary } from '@/components/feedback/error-boundary';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { clamp } from '@/utils/math';

const SparkScene = dynamic(() => import('./spark-scene'), {
  ssr: false,
  loading: () => <CanvasSkeleton />,
});

interface ScrubIntroProps {
  ariaLabel: string;
  paragraphs: readonly string[];
  scrollHint: string;
}

/** Share of each paragraph's scroll segment spent filling its text (the rest is a hold). */
const FILL_SHARE = 0.7;

/**
 * Tall sticky section: the 3D mark turns while each sentence fills in, one after another.
 * All per-frame updates write styles directly; React never re-renders while scrolling.
 */
export function ScrubIntro({ ariaLabel, paragraphs, scrollHint }: ScrubIntroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const count = paragraphs.length;

  const onProgress = useCallback(
    (progress: number) => {
      progressRef.current = progress;
      const position = progress * count;
      paragraphRefs.current.forEach((node, index) => {
        if (!node) return;
        const local = position - index;
        const isLast = index === count - 1;
        const current = (local >= 0 && local < 1) || (isLast && local >= 1) || (index === 0 && local < 0);
        node.style.setProperty('--fill', `${clamp(local / FILL_SHARE) * 100}%`);
        node.style.opacity = current ? '1' : '0';
        node.style.transform = current ? 'none' : `translateY(${local < 0 ? 24 : -24}px)`;
      });
      if (hintRef.current) hintRef.current.style.opacity = progress > 0.04 ? '0' : '1';
    },
    [count],
  );

  useScrollProgress(sectionRef, onProgress);

  return (
    <section ref={sectionRef} aria-label={ariaLabel} className="relative" style={{ height: `${count * 100 + 60}svh` }}>
      <div className="sticky top-0 grid h-svh items-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_25%_50%,rgb(110_41_172/0.28),transparent_70%),radial-gradient(35%_40%_at_70%_70%,rgb(12_142_199/0.18),transparent_70%)] rtl:-scale-x-100"
        />
        <div className="container-site relative grid h-full items-center gap-6 pt-(--header-h) max-lg:grid-rows-[1fr_auto] lg:grid-cols-2">
          <div className="relative h-full min-h-[38svh] lg:order-2">
            <ErrorBoundary fallback={<CanvasSkeleton />}>
              <SparkScene progressRef={progressRef} />
            </ErrorBoundary>
          </div>
          <div className="relative grid pb-[12svh] lg:pb-0">
            {paragraphs.map((text, index) => (
              <p
                key={text}
                ref={(node) => {
                  paragraphRefs.current[index] = node;
                }}
                className="col-start-1 row-start-1 font-display text-[clamp(1.9rem,4.4vw,4rem)] leading-[1.4] font-extrabold transition-[opacity,transform] duration-500 ease-brand"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <span className="scrub-fill">{text}</span>
              </p>
            ))}
          </div>
        </div>
        <p
          ref={hintRef}
          className="eyebrow absolute bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-500"
        >
          {scrollHint} ↓
        </p>
      </div>
    </section>
  );
}

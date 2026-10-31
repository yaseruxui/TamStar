'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { CanvasSkeleton } from '@/components/feedback/canvas-skeleton';
import { ErrorBoundary } from '@/components/feedback/error-boundary';
import { gsap, motionQueries, useGSAP } from '@/lib/gsap';

const SparkScene = dynamic(() => import('./spark-scene'), {
  ssr: false,
  loading: () => <CanvasSkeleton />,
});

interface ScrubIntroProps {
  ariaLabel: string;
  paragraphs: readonly string[];
  scrollHint: string;
}

/** Scroll distance per sentence, in viewport heights. */
const SCREENS_PER_SENTENCE = 1;

/**
 * The page's authored moment: the section pins, the 3D mark turns with the scroll, and each
 * sentence fills in line by line before handing over to the next. A scrubbed GSAP timeline drives
 * everything (`scrub: 1` lets it catch up smoothly), and its progress feeds the 3D scene.
 * Reduced motion: no pin; all sentences are shown, filled, one under another.
 */
export function ScrubIntro({ ariaLabel, paragraphs, scrollHint }: ScrubIntroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const mm = gsap.matchMedia();

      mm.add(motionQueries.full, () => {
        const items = gsap.utils.toArray<HTMLElement>('[data-sentence]', section);
        const hint = section.querySelector('[data-scroll-hint]');
        gsap.set(items, { autoAlpha: 0, y: 24, filter: 'blur(6px)' });
        gsap.set(items[0] ?? [], { autoAlpha: 1, y: 0, filter: 'blur(0px)' });

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${window.innerHeight * SCREENS_PER_SENTENCE * items.length}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
          onUpdate() {
            progressRef.current = timeline.progress();
          },
        });

        if (hint) timeline.to(hint, { autoAlpha: 0, duration: 0.15 }, 0);
        items.forEach((item, index) => {
          timeline.to(item, { '--fill': '100%', duration: 0.7 });
          const next = items[index + 1];
          if (!next) {
            timeline.to({}, { duration: 0.3 });
            return;
          }
          timeline
            .to(item, { autoAlpha: 0, y: -24, filter: 'blur(6px)', duration: 0.3, ease: 'power2.in' })
            .to(next, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.3, ease: 'power2.out' }, '<0.1');
        });
      });

      mm.add(motionQueries.reduced, () => {
        progressRef.current = 0.15;
        gsap.set(section.querySelectorAll('[data-sentence]'), { '--fill': '100%' });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} aria-label={ariaLabel} className="relative h-svh overflow-hidden motion-reduce:h-auto">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_25%_50%,rgb(110_41_172/0.28),transparent_70%),radial-gradient(35%_40%_at_70%_70%,rgb(12_142_199/0.18),transparent_70%)] rtl:-scale-x-100"
      />
      <div className="container-site relative grid h-full items-center gap-6 pt-(--header-h) max-lg:grid-rows-[1fr_auto] lg:grid-cols-2 motion-reduce:py-24">
        <div className="relative h-full min-h-[38svh] lg:order-2">
          <ErrorBoundary fallback={<CanvasSkeleton />}>
            <SparkScene progressRef={progressRef} />
          </ErrorBoundary>
        </div>
        <div className="relative grid pb-[12svh] lg:pb-0 motion-reduce:gap-8 motion-reduce:pb-0">
          {paragraphs.map((text) => (
            <p
              key={text}
              data-sentence=""
              className="col-start-1 row-start-1 font-display text-[clamp(1.9rem,4.4vw,4rem)] leading-[1.4] font-extrabold motion-reduce:row-auto"
            >
              <span className="scrub-fill">{text}</span>
            </p>
          ))}
        </div>
      </div>
      <p data-scroll-hint="" className="label-sm absolute bottom-6 left-1/2 -translate-x-1/2 motion-reduce:hidden">
        {scrollHint} ↓
      </p>
    </section>
  );
}

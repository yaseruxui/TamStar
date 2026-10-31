'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, motionQueries, useGSAP } from '@/lib/gsap';

export interface CodeStageCopy {
  /** Labels on the two outputs. */
  website: string;
  app: string;
  /** Text shown inside the generated store. */
  storeName: string;
  storeHeadline: string;
  storeCta: string;
  products: readonly [string, string, string];
  price: string;
  checkoutTitle: string;
  checkoutTotal: string;
  checkoutPay: string;
}

type Token = readonly [kind: 'kw' | 'tag' | 'attr' | 'str' | 'num' | 'pun' | 'txt', text: string];

/** The component being "written": a small store page, highlighted with brand colours. */
function codeLines(headline: string): readonly (readonly Token[])[] {
  return [
    [
      ['kw', 'import'],
      ['pun', ' { '],
      ['tag', 'Hero'],
      ['pun', ', '],
      ['tag', 'Products'],
      ['pun', ', '],
      ['tag', 'Checkout'],
      ['pun', ' } '],
      ['kw', 'from'],
      ['str', " '@/ui'"],
      ['pun', ';'],
    ],
    [],
    [
      ['kw', 'export default function'],
      ['txt', ' Store'],
      ['pun', '() {'],
    ],
    [
      ['kw', '  return'],
      ['pun', ' ('],
    ],
    [
      ['pun', '    <'],
      ['tag', 'Hero'],
      ['attr', ' title'],
      ['pun', '='],
      ['str', `"${headline}"`],
      ['pun', ' />'],
    ],
    [
      ['pun', '    <'],
      ['tag', 'Products'],
      ['attr', ' columns'],
      ['pun', '={'],
      ['num', '3'],
      ['pun', '} />'],
    ],
    [
      ['pun', '    <'],
      ['tag', 'Checkout'],
      ['attr', ' pay'],
      ['pun', '='],
      ['str', '"mada"'],
      ['pun', ' />'],
    ],
    [['pun', '  );']],
    [['pun', '}']],
  ];
}

const TOKEN_CLASS: Record<Token[0], string> = {
  kw: 'text-[#c79bff]',
  tag: 'text-aqua',
  attr: 'text-[#8fb4ff]',
  str: 'text-[#ffcb8b]',
  num: 'text-[#ff9db5]',
  pun: 'text-[#8a84b8]',
  txt: 'text-text',
};

/** Seconds the first-visit logo intro covers the page (matches HeroIntro). */
const LOADER_HOLD = 1.55;

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#faf7f3] text-[#1d1a17] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.85),0_0_0_1px_rgb(255_255_255/0.12)]">
      <div dir="ltr" className="flex h-7 items-center gap-1.5 bg-[#ece6dd] px-3">
        <i className="size-2 rounded-full bg-[#ff5f57]" />
        <i className="size-2 rounded-full bg-[#febc2e]" />
        <i className="size-2 rounded-full bg-[#28c840]" />
        <span className="ms-3 flex h-4 flex-1 items-center rounded bg-white px-2 text-[9px] text-[#8a8178]">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

/**
 * Hero visual: code is typed into an editor, then "ships" — the editor steps back and the
 * resulting website and app rise in front of it. Loops while visible; reduced motion shows the
 * finished result. Purely illustrative, so it is hidden from assistive tech.
 */
export function HeroCodeStage({ copy }: { copy: CodeStageCopy }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lines = codeLines(copy.storeHeadline);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add(motionQueries.full, () => {
        const codeLineEls = q('[data-code-line]');
        const carets = q('[data-caret]');
        const editor = q('[data-editor]');
        const site = q('[data-site]');
        const phone = q('[data-phone]');
        const tags = q('[data-output-tag]');
        const delay = document.documentElement.dataset.intro === 'playing' ? LOADER_HOLD + 0.6 : 0.7;

        gsap.set(root, { visibility: 'visible' });
        gsap.set(codeLineEls, { clipPath: 'inset(0 100% 0 0)' });
        gsap.set(carets, { autoAlpha: 0 });
        gsap.set([site, phone], { autoAlpha: 0, y: 60, scale: 0.94 });
        gsap.set(tags, { autoAlpha: 0, y: 8 });

        const tl = gsap.timeline({ delay, repeat: -1, repeatDelay: 0.6 });
        tl.from(editor, { autoAlpha: 0, y: 40, duration: 0.8, ease: 'expo.out' });
        codeLineEls.forEach((line, index) => {
          const chars = Math.max(1, line.textContent?.length ?? 1);
          const caret = carets[index];
          if (caret) tl.set(caret, { autoAlpha: 1 });
          tl.to(line, { clipPath: 'inset(0 0% 0 0)', duration: Math.min(1.1, chars * 0.028), ease: `steps(${chars})` });
          if (caret) tl.set(caret, { autoAlpha: 0 });
        });
        tl.to(
          editor,
          { scale: 0.88, x: -24, y: -28, autoAlpha: 0.45, filter: 'blur(2px)', duration: 0.9, ease: 'expo.inOut' },
          '+=0.35',
        )
          .to(site, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: 'expo.out' }, '<0.25')
          .to(phone, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: 'expo.out' }, '<0.18')
          .to(tags, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '<0.4')
          .to({}, { duration: 3.2 })
          .to([site, phone, tags], { autoAlpha: 0, y: 30, duration: 0.6, ease: 'power2.in' })
          .to(codeLineEls, { clipPath: 'inset(0 100% 0 0)', duration: 0.01 })
          .to(
            editor,
            { scale: 1, x: 0, y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.7, ease: 'expo.out' },
            '<',
          );

        const io = new IntersectionObserver(([entry]) => {
          if (entry?.isIntersecting) tl.resume();
          else tl.pause();
        });
        io.observe(root);
        return () => io.disconnect();
      });

      mm.add(motionQueries.reduced, () => {
        gsap.set(root, { visibility: 'visible' });
        gsap.set(q('[data-editor]'), { scale: 0.88, x: -24, y: -28, opacity: 0.45 });
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      data-hero-reveal=""
      aria-hidden="true"
      className="pointer-events-none relative mx-auto mt-12 mb-24 aspect-[5/4] w-full max-w-[520px] select-none lg:mb-0 lg:absolute lg:end-(--gutter) lg:top-[calc(var(--header-h)+clamp(24px,5vw,56px))] lg:mt-0 lg:w-[44%] lg:max-w-[580px]"
    >
      {/* Editor */}
      <div
        data-editor=""
        dir="ltr"
        className="absolute inset-x-0 top-0 overflow-hidden rounded-2xl bg-[#0d0a24] shadow-[0_40px_90px_-40px_rgb(0_0_0/0.9),0_0_0_1px_rgb(178_108_255/0.28)]"
      >
        <div className="flex h-9 items-center gap-2 border-b border-white/5 bg-[#120e2c] px-4">
          <i className="size-2.5 rounded-full bg-[#ff5f57]" />
          <i className="size-2.5 rounded-full bg-[#febc2e]" />
          <i className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ms-3 rounded-md bg-[#1b1640] px-2.5 py-0.5 font-mono text-[11px] text-muted">Store.tsx</span>
        </div>
        <pre className="m-0 p-4 font-mono text-[clamp(9px,1.05vw,13px)] leading-[1.75] sm:p-5">
          {lines.map((tokens, index) => (
            <div key={index} className="flex">
              <span className="w-7 shrink-0 text-end text-[#4b4578] tabular-nums">{index + 1}</span>
              <span className="relative ms-4 whitespace-pre">
                <span data-code-line="" className="inline-block">
                  {tokens.length
                    ? tokens.map(([kind, text], i) => (
                        <span key={i} className={TOKEN_CLASS[kind]} dir={kind === 'str' ? 'auto' : undefined}>
                          {text}
                        </span>
                      ))
                    : ' '}
                </span>
                <span data-caret="" className="absolute -end-1.5 top-[0.2em] h-[1.2em] w-[2px] animate-pulse bg-aqua" />
              </span>
            </div>
          ))}
        </pre>
      </div>

      {/* Website output */}
      <div data-site="" className="absolute start-[4%] top-[30%] w-[78%]">
        <span
          data-output-tag=""
          className="absolute -top-3 end-4 z-10 rounded-full bg-aqua px-3 py-0.5 font-display text-xs font-extrabold text-ink"
        >
          {copy.website}
        </span>
        <Frame label="lamsa-store.com">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <b className="font-display text-sm">{copy.storeName}</b>
              <span className="rounded-full bg-[#1d1a17] px-2.5 py-0.5 text-[9px] text-white">{copy.storeCta}</span>
            </div>
            <div className="mt-3 rounded-xl bg-[linear-gradient(120deg,#c9a98a,#8c6a52)] p-4 text-white">
              <b className="font-display text-[clamp(13px,1.4vw,18px)] leading-snug">{copy.storeHeadline}</b>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {copy.products.map((name, index) => (
                <div key={name}>
                  <div
                    className={[
                      'aspect-square rounded-lg',
                      index === 0 ? 'bg-[#e6d9cb]' : index === 1 ? 'bg-[#dfe3e6]' : 'bg-[#efe2d5]',
                    ].join(' ')}
                  />
                  <div className="mt-1 truncate text-[9px] font-semibold">{name}</div>
                  <div className="text-[9px] text-[#b5523b]">{copy.price}</div>
                </div>
              ))}
            </div>
          </div>
        </Frame>
      </div>

      {/* App output */}
      <div data-phone="" className="absolute end-0 top-[50%] w-[28%] lg:-end-[3%]">
        <span
          data-output-tag=""
          className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-violet px-3 py-0.5 font-display text-xs font-extrabold text-white"
        >
          {copy.app}
        </span>
        <div className="rounded-[26px] bg-[#0d0d10] p-1.5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]">
          <div className="overflow-hidden rounded-[21px] bg-[#faf7f3] p-3 pt-5 text-[#1d1a17]">
            <b className="font-display text-[11px]">{copy.checkoutTitle}</b>
            {copy.products.slice(0, 2).map((name) => (
              <div key={name} className="mt-2 flex items-center gap-2">
                <span className="size-7 shrink-0 rounded-md bg-[#e6d9cb]" />
                <span className="truncate text-[9px]">{name}</span>
              </div>
            ))}
            <div className="mt-3 flex justify-between border-t border-[#ece4da] pt-2 text-[9px]">
              <span>{copy.checkoutTotal}</span>
              <b>{copy.price}</b>
            </div>
            <div className="mt-2 rounded-lg bg-[#1d1a17] py-1.5 text-center text-[9px] font-semibold text-white">
              {copy.checkoutPay}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

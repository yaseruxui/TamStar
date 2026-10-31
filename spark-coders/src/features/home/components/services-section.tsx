import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { ArrowIcon } from '@/components/ui/icons';
import { Kashida } from '@/components/ui/kashida';
import { Reveal } from '@/components/ui/reveal';
import { services } from '../data/content';
import type { ServiceKey } from '../types';

/** Line icons (24px grid, 1.8 stroke) drawn inline so nothing is fetched. */
const ICONS: Record<ServiceKey, ReactNode> = {
  website: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 14l-2 1.5L8 17M16 14l2 1.5-2 1.5M13 13l-2 5" />
    </>
  ),
  store: <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2M10 21h.01M17 21h.01" />,
  app: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="3" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  systems: (
    <>
      <rect x="3" y="3" width="7.5" height="9" rx="2" />
      <rect x="13.5" y="3" width="7.5" height="5" rx="2" />
      <rect x="13.5" y="11" width="7.5" height="10" rx="2" />
      <rect x="3" y="15" width="7.5" height="6" rx="2" />
    </>
  ),
  branding: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.9 1.2-1.8-.5-1.2.3-2.2 1.5-2.2H17a4 4 0 0 0 4-4c0-5.5-4-10-9-10Z" />
      <path d="M7.5 11h.01M10 7h.01M15 7.5h.01" />
    </>
  ),
  seo: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4M8 12.5l2-2 1.5 1.5L14 9" />
    </>
  ),
};

/**
 * What we do: one row per service in the style of a project list, on the brand gradient. Hovering
 * a row opens it up, lights the title and slides in the call to action; each row leads to the form.
 */
export async function ServicesSection() {
  const t = await getTranslations('home.services');

  return (
    <section
      id="services"
      aria-label={t('aria')}
      className="relative overflow-hidden bg-[radial-gradient(60%_80%_at_100%_0%,rgb(178_108_255/0.35),transparent_60%),radial-gradient(60%_80%_at_0%_100%,rgb(127_238_250/0.2),transparent_60%),var(--grad-soft)] py-[clamp(80px,12vw,160px)]"
    >
      <div className="container-site">
        <div className="mb-[clamp(32px,5vw,56px)] flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-xl">
            <Kashida text={t('title')} />
          </h2>
          <p className="max-w-[26rem] text-text/85">{t('lead')}</p>
        </div>
        <ul className="border-t border-white/30">
          {services.map((key, index) => (
            <Reveal as="li" key={key} index={index}>
              <a
                href="#contact"
                className="group/row grid grid-cols-[auto_1fr_auto] items-center gap-x-[clamp(16px,3vw,40px)] gap-y-1 border-b border-white/30 py-[clamp(18px,2.4vw,28px)] transition-[padding,background-color] duration-400 ease-brand hover:bg-ink/20 hover:px-5 focus-visible:px-5 max-sm:grid-cols-[auto_1fr]"
              >
                <span className="grid size-[clamp(52px,5vw,68px)] place-items-center rounded-2xl bg-ink/45 text-aqua shadow-[inset_0_0_0_1px_rgb(255_255_255/0.18)] transition-[scale,background-color,color] duration-500 ease-brand group-hover/row:scale-[1.06] group-hover/row:bg-ink group-hover/row:text-white max-sm:row-span-2 max-sm:self-start">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-[55%]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[key]}
                  </svg>
                </span>
                <span className="grid gap-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10">
                  <h3 className="font-display text-[clamp(1.25rem,2.6vw,2rem)] leading-[1.35] font-semibold transition-colors duration-300 group-hover/row:text-aqua">
                    {t(`items.${key}.title`)}
                  </h3>
                  <span className="text-[0.9375rem] text-text/80 sm:text-base">{t(`items.${key}.body`)}</span>
                </span>
                <span className="inline-flex translate-x-3 items-center gap-2 text-sm font-semibold text-aqua opacity-0 transition-[opacity,translate] duration-[300ms,400ms] ease-brand group-hover/row:translate-x-0 group-hover/row:opacity-100 group-focus-visible/row:translate-x-0 group-focus-visible/row:opacity-100 max-sm:hidden ltr:-translate-x-3">
                  {t('cta')}
                  <ArrowIcon />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

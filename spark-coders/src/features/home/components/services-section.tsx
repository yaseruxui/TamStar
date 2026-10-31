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

/** What we do: six service cards, each leading to the contact form. */
export async function ServicesSection() {
  const t = await getTranslations('home.services');

  return (
    <section
      id="services"
      aria-label={t('aria')}
      className="relative overflow-hidden border-t border-line py-[clamp(80px,12vw,160px)] bg-[radial-gradient(50%_60%_at_100%_0%,rgb(110_41_172/0.28),transparent_70%),radial-gradient(45%_55%_at_0%_100%,rgb(12_142_199/0.18),transparent_70%)]"
    >
      <div className="container-site">
        <div className="mb-[clamp(32px,5vw,56px)] flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-xl">
            <Kashida text={t('title')} />
          </h2>
          <p className="max-w-[26rem] text-muted">{t('lead')}</p>
        </div>
        <ul className="grid gap-[clamp(14px,1.6vw,22px)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((key, index) => (
            <Reveal as="li" key={key} index={index} className="flex">
              <a
                href="#contact"
                className="group/service relative flex w-full flex-col overflow-hidden rounded-panel bg-ink-2/80 p-[clamp(22px,2.4vw,32px)] shadow-[inset_0_0_0_1px_var(--color-line)] transition-[translate,box-shadow] duration-400 ease-brand hover:-translate-y-1.5 hover:shadow-[inset_0_0_0_1px_var(--color-line-strong),0_30px_60px_-30px_rgb(178_108_255/0.45)] focus-visible:-translate-y-1.5"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -end-16 -top-16 size-44 rounded-full bg-[radial-gradient(closest-side,rgb(178_108_255/0.35),transparent)] opacity-0 transition-opacity duration-500 group-hover/service:opacity-100"
                />
                <span
                  className={
                    index % 2
                      ? 'mb-6 grid size-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--color-aqua),var(--color-ocean))] text-ink'
                      : 'mb-6 grid size-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--color-violet),var(--color-plum))] text-white'
                  }
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[key]}
                  </svg>
                </span>
                <h3 className="font-display text-[clamp(1.25rem,1.8vw,1.5rem)] leading-[1.4] font-bold">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-2 mb-6 text-muted">{t(`items.${key}.body`)}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-aqua">
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

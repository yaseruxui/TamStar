import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';

const STEPS = ['submitted', 'review', 'sourcing', 'quotation'] as const;

export async function RfqSection() {
  const [t, tBom, locale] = await Promise.all([
    getTranslations('home.rfqFlow'),
    getTranslations('home.bom'),
    getLocale(),
  ]);
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section aria-labelledby="home-rfq" className="container-site pb-14 sm:pb-20">
      <div className="relative isolate overflow-hidden rounded-2xl bg-navy-950 text-navy-on">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_120%_at_0%_100%,rgb(252_144_37/0.45),transparent_60%)] rtl:bg-[radial-gradient(70%_120%_at_100%_100%,rgb(252_144_37/0.45),transparent_60%)]"
        />
        <div className="grid gap-10 p-7 sm:p-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold text-brand">{t('eyebrow')}</p>
            <h2 id="home-rfq" className="mt-3 text-[1.75rem] leading-snug text-white sm:text-[2.5rem] sm:leading-[1.2]">
              {tBom('title')}
            </h2>
            <p className="mt-4 max-w-lg text-md leading-8 text-navy-on/90">{tBom('body')}</p>
            <ButtonLink href="/rfq" size="lg" className="mt-8">
              {tBom('cta')}
              <Arrow aria-hidden />
            </ButtonLink>
          </div>
          <ol className="flex flex-col gap-3">
            {STEPS.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-4 rounded-lg bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-b from-brand-light to-brand font-display text-sm font-bold text-navy-950 tabular">
                  {index + 1}
                </span>
                <span>
                  <span className="block font-semibold text-white">{t(`${step}.title`)}</span>
                  <span className="mt-1 block text-sm leading-6">{t(`${step}.body`)}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

import { ClipboardList } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';

const STEPS = ['submitted', 'review', 'sourcing', 'quotation'] as const;

export async function RfqSection() {
  const [t, tBom] = await Promise.all([getTranslations('home.rfqFlow'), getTranslations('home.bom')]);

  return (
    <section aria-labelledby="home-rfq" className="container-site py-12 sm:py-16">
      <div className="overflow-hidden rounded-xl bg-navy text-navy-on">
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium text-brand">{t('eyebrow')}</p>
            <h2 id="home-rfq" className="mt-3 text-2xl text-white sm:text-3xl">
              {tBom('title')}
            </h2>
            <p className="mt-4 text-base leading-7">{tBom('body')}</p>
            <ButtonLink href="/rfq" size="lg" className="mt-7">
              <ClipboardList aria-hidden />
              {tBom('cta')}
            </ButtonLink>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {STEPS.map((step, index) => (
              <li key={step} className="rounded-lg bg-white/[0.06] p-5 ring-1 ring-white/10">
                <span className="grid size-8 place-items-center rounded-full bg-brand font-display text-sm font-semibold text-navy-950 tabular">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-md text-white">{t(`${step}.title`)}</h3>
                <p className="mt-1.5 text-sm leading-6">{t(`${step}.body`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

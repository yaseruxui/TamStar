import { FileUp } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ValveDrawing } from '@/components/illustrations/valve-drawing';
import { ButtonLink } from '@/components/ui/button-link';

const STEPS = ['submitted', 'review', 'sourcing', 'quotation'] as const;

export async function RfqSection() {
  const [t, tBom] = await Promise.all([getTranslations('home.rfqFlow'), getTranslations('home.bom')]);

  return (
    <section aria-labelledby="home-rfq" className="border-y border-paper-line bg-surface">
      <div className="reveal container-site py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-2 text-xs font-medium text-brand-ink">
              <span aria-hidden className="h-px w-8 bg-brand" />
              {t('eyebrow')}
            </p>
            <h2 id="home-rfq" className="mt-5 text-2xl sm:text-3xl">
              {t('title')}
            </h2>
          </div>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {STEPS.map((step, index) => (
            <li key={step} className="relative lg:pe-8">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-navy font-mono text-xs text-navy tabular">
                  {index + 1}
                </span>
                {index < STEPS.length - 1 ? (
                  <span aria-hidden className="hidden h-px flex-1 bg-paper-line lg:block" />
                ) : null}
              </div>
              <h3 className="mt-5 text-md font-medium">{t(`${step}.title`)}</h3>
              <p className="mt-2 text-sm leading-6">{t(`${step}.body`)}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid overflow-hidden rounded-xs bg-brand lg:grid-cols-12">
          <div className="p-8 sm:p-10 lg:col-span-6">
            <h3 className="text-xl text-ink-strong sm:text-2xl">{tBom('title')}</h3>
            <p className="mt-4 max-w-lg text-base leading-7 text-ink-strong/80">{tBom('body')}</p>
            <ButtonLink href="/rfq" size="lg" variant="navy" className="mt-8">
              <FileUp aria-hidden />
              {tBom('cta')}
            </ButtonLink>
          </div>
          <div className="relative hidden border-s border-ink/10 bg-brand-tint p-8 lg:col-span-6 lg:block">
            <ValveDrawing className="h-auto w-full text-navy-950" />
          </div>
        </div>
      </div>
    </section>
  );
}

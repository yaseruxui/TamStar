import { ClipboardList } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';
import { SectionHeading } from '@/components/ui/section-heading';

const STEPS = ['submitted', 'review', 'sourcing', 'quotation'] as const;

export async function RfqFlowSection() {
  const t = await getTranslations('home.rfqFlow');

  return (
    <section aria-labelledby="home-rfq-flow" className="border-y border-line bg-surface">
      <div className="container-site py-16 sm:py-20">
        <SectionHeading
          id="home-rfq-flow"
          eyebrow={t('eyebrow')}
          title={t('title')}
          action={
            <ButtonLink href="/rfq">
              <ClipboardList aria-hidden />
              {t('cta')}
            </ButtonLink>
          }
        />
        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step} className="bg-surface p-5">
              <span className="tabular font-mono text-xs font-semibold text-muted">0{index + 1}</span>
              <h3 className="mt-3 text-md font-semibold">{t(`${step}.title`)}</h3>
              <p className="mt-1.5 text-sm leading-6">{t(`${step}.body`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

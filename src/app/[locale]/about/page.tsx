import { CircleCheck, Eye, Target } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactBand } from '@/components/common/contact-band';
import { PageHeader } from '@/components/common/page-header';
import { SectionHeading } from '@/components/ui/section-heading';
import { ClientsStrip } from '@/features/company/components/clients-strip';
import { ProcessSteps } from '@/features/company/components/process-steps';
import { StatsRow } from '@/features/company/components/stats-row';
import { ValuesGrid } from '@/features/company/components/values-grid';
import { resolveLocale } from '@/lib/i18n/resolve-locale';
import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return buildPageMetadata({
    locale,
    pathname: '/about',
    title: t('about.title'),
    description: t('about.description'),
    siteName: t('siteName'),
  });
}

const CAPABILITIES = ['global', 'local', 'models', 'departments', 'sustainable'] as const;

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  setRequestLocale(resolveLocale((await params).locale));
  const [t, tHome] = await Promise.all([getTranslations('about'), getTranslations('home')]);

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} crumbs={[{ label: t('eyebrow') }]} />

      <section className="container-site grid gap-4 py-12 md:grid-cols-2">
        {(
          [
            { key: 'mission', icon: Target },
            { key: 'vision', icon: Eye },
          ] as const
        ).map(({ key, icon: Icon }) => (
          <div key={key} className="rounded-lg border border-line bg-surface p-6 shadow-card">
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-ink">
              <Icon aria-hidden className="size-4" />
              {t(`${key}.label`)}
            </p>
            <p className="mt-3 text-lg leading-8 font-medium text-ink">{t(`${key}.body`)}</p>
          </div>
        ))}
        <StatsRow tone="light" className="md:col-span-2" />
      </section>

      <section aria-labelledby="about-process" className="border-y border-line bg-surface">
        <div className="container-site py-16">
          <SectionHeading id="about-process" eyebrow={t('processEyebrow')} title={t('processTitle')} />
          <div className="mt-10">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section aria-labelledby="about-values" className="container-site py-16">
        <SectionHeading id="about-values" eyebrow={t('valuesEyebrow')} title={t('valuesTitle')} />
        <div className="mt-10">
          <ValuesGrid />
        </div>
      </section>

      <section aria-labelledby="about-experience" className="container-site pb-16">
        <div className="grid gap-10 rounded-xl bg-navy-900 p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="about-experience"
              tone="dark"
              eyebrow={t('experienceEyebrow')}
              title={t('experienceTitle')}
              description={t('experienceBody')}
            />
          </div>
          <div>
            <h3 className="text-md font-semibold text-white">{t('capabilitiesTitle')}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {CAPABILITIES.map((key) => (
                <li key={key} className="flex items-start gap-3 text-base text-navy-on">
                  <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
                  {t(`capabilities.${key}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ClientsStrip label={tHome('clients.label')} />

      <section aria-labelledby="about-vision" className="border-t border-line bg-surface">
        <div className="container-site max-w-4xl py-16">
          <SectionHeading
            id="about-vision"
            eyebrow={t('visionEyebrow')}
            title={t('visionTitle')}
            description={t('visionBody')}
          />
        </div>
      </section>

      <ContactBand />
    </>
  );
}

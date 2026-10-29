import { CircleCheck, Compass, Globe, Sprout } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ClientMessages } from '@/components/common/client-messages';
import { PageHeader } from '@/components/common/page-header';
import { buttonVariants } from '@/components/ui/button';
import { ApplicationForm } from '@/features/careers/components/application-form';
import { resolveLocale } from '@/lib/i18n/resolve-locale';
import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]/careers'>): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return buildPageMetadata({
    locale,
    pathname: '/careers',
    title: t('careers.title'),
    description: t('careers.description'),
    siteName: t('siteName'),
  });
}

const APPROACH = [
  { key: 'growth', icon: Sprout },
  { key: 'innovation', icon: Globe },
  { key: 'impact', icon: Compass },
] as const;

const THRIVE = ['curious', 'collaborative', 'ambitious'] as const;

export default async function CareersPage({ params }: PageProps<'/[locale]/careers'>) {
  setRequestLocale(resolveLocale((await params).locale));
  const t = await getTranslations('careers');

  return (
    <>
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        lead={t('lead')}
        crumbs={[{ label: t('eyebrow') }]}
        aside={
          <a href="#apply" className={buttonVariants({ size: 'lg' })}>
            {t('apply')}
          </a>
        }
      />
      <div className="container-site grid gap-10 py-12 lg:grid-cols-[1fr_1fr]">
        <section aria-labelledby="careers-intro">
          <h2 id="careers-intro" className="text-xl font-bold">
            {t('introTitle')}
          </h2>
          <p className="mt-4 text-md leading-7">{t('intro1')}</p>
          <p className="mt-4 text-md leading-7">{t('intro2')}</p>

          <h2 className="mt-10 text-xl font-bold">{t('thriveTitle')}</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {THRIVE.map((key) => (
              <li key={key} className="flex items-start gap-3 text-md">
                <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-success" />
                {t(`thrive.${key}`)}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-lg bg-sand p-6">
            <h2 className="text-lg font-bold">{t('cultureTitle')}</h2>
            <p className="mt-2 text-base leading-7">{t('culture')}</p>
          </div>
        </section>

        <section aria-labelledby="careers-approach">
          <h2 id="careers-approach" className="text-xl font-bold">
            {t('approachTitle')}
          </h2>
          <ul className="mt-4 grid gap-4">
            {APPROACH.map(({ key, icon: Icon }) => (
              <li key={key} className="flex gap-4 rounded-lg border border-line bg-surface p-5 shadow-card">
                <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-md bg-tint-200 text-navy">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-md font-semibold">{t(`approach.${key}.title`)}</h3>
                  <p className="mt-1 text-sm leading-6">{t(`approach.${key}.body`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section id="apply" aria-labelledby="careers-apply" className="scroll-mt-32 border-t border-line bg-surface">
        <div className="container-site max-w-3xl py-12">
          <h2 id="careers-apply" className="text-2xl font-bold">
            {t('formTitle')}
          </h2>
          <p className="mt-2 text-base">{t('formLead')}</p>
          <div className="mt-8">
            <ClientMessages namespaces={['careers', 'forms']}>
              <ApplicationForm />
            </ClientMessages>
          </div>
        </div>
      </section>
    </>
  );
}

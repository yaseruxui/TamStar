import { CircleCheck } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactBand } from '@/components/common/contact-band';
import { PageHeader } from '@/components/common/page-header';
import { ProjectsLedger } from '@/features/company/components/projects-ledger';
import { StatsRow } from '@/features/company/components/stats-row';
import { projects } from '@/features/company/data/projects';
import { resolveLocale } from '@/lib/i18n/resolve-locale';
import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]/projects'>): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return buildPageMetadata({
    locale,
    pathname: '/projects',
    title: t('projects.title'),
    description: t('projects.description'),
    siteName: t('siteName'),
  });
}

const ABILITIES = ['complex', 'scale', 'adapt', 'quality', 'economy'] as const;

export default async function ProjectsPage({ params }: PageProps<'/[locale]/projects'>) {
  setRequestLocale(resolveLocale((await params).locale));
  const t = await getTranslations('projects');

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} crumbs={[{ label: t('eyebrow') }]} />
      <div className="container-site py-12">
        <StatsRow tone="light" />
        <div className="mt-12">
          <ProjectsLedger projects={projects} />
        </div>
        <section aria-labelledby="project-abilities" className="mt-12 rounded-lg bg-navy p-6 sm:p-8">
          <h2 id="project-abilities" className="text-lg font-bold text-white">
            {t('abilitiesTitle')}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {ABILITIES.map((key) => (
              <li key={key} className="flex items-start gap-2.5 text-sm text-navy-on">
                <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
                {t(`abilities.${key}`)}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <ContactBand />
    </>
  );
}

import { getLocale, getTranslations } from 'next-intl/server';
import type { Project } from '@/types/domain';
import { cn } from '@/utils/cn';

/** Track record as a ledger — reads like a contracts register rather than marketing cards. */
export async function ProjectsLedger({ projects }: { projects: readonly Project[] }) {
  const [t, tCommon, locale] = await Promise.all([getTranslations('projects'), getTranslations('common'), getLocale()]);

  return (
    <div className="rounded-lg border border-line bg-surface px-5 sm:px-6">
      <div
        aria-hidden
        className="hidden grid-cols-[1.3fr_0.8fr_2fr_0.7fr_0.8fr] gap-6 border-b border-line py-3 label-tech text-muted lg:grid"
      >
        <span>{t('client')}</span>
        <span>{t('sector')}</span>
        <span>{t('scope')}</span>
        <span>{t('since')}</span>
        <span>{t('term')}</span>
      </div>
      <ul className="[&>li:last-child]:border-b-0">
        {projects.map((project) => {
          const active = project.status === 'active';
          return (
            <li
              key={project.key}
              className="grid gap-2 border-b border-line py-6 lg:grid-cols-[1.3fr_0.8fr_2fr_0.7fr_0.8fr] lg:items-baseline lg:gap-6"
            >
              <div>
                <h3 className="text-md font-medium">{project.client[locale]}</h3>
                <p
                  className={cn(
                    'mt-1 inline-flex items-center gap-1.5 text-xs',
                    active ? 'text-success' : 'text-brand-ink',
                  )}
                >
                  <span aria-hidden className={cn('size-1.5 rounded-full', active ? 'bg-success' : 'bg-brand')} />
                  {t(`status.${project.status}`)}
                </p>
              </div>
              <p className="text-sm text-navy">
                <span className="text-muted lg:hidden">{t('sector')}: </span>
                {tCommon(`sectors.${project.sector}`)}
              </p>
              <p className="text-sm leading-6">{project.summary[locale]}</p>
              <p className="text-sm font-medium text-ink tabular">
                <span className="font-normal text-muted lg:hidden">{t('since')}: </span>
                {project.since[locale]}
              </p>
              <p className="text-sm text-body">
                {project.term ? (
                  <>
                    <span className="text-muted lg:hidden">{t('term')}: </span>
                    {project.term[locale]}
                  </>
                ) : (
                  <span aria-hidden className="text-subtle">
                    —
                  </span>
                )}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

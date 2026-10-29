import { CalendarClock, FilePenLine } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types/domain';
import { cn } from '@/utils/cn';

export async function ProjectCard({ project, className }: { project: Project; className?: string }) {
  const [t, tCommon, locale] = await Promise.all([getTranslations('projects'), getTranslations('common'), getLocale()]);
  const active = project.status === 'active';

  return (
    <article className={cn('flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card', className)}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="navy" size="sm">
          {tCommon(`sectors.${project.sector}`)}
        </Badge>
        <Badge tone={active ? 'success' : 'brand'} size="sm">
          <span aria-hidden className={cn('size-1.5 rounded-full', active ? 'bg-success' : 'bg-brand')} />
          {t(`status.${project.status}`)}
        </Badge>
      </div>
      <h3 className="mt-4 text-lg font-semibold">{project.client[locale]}</h3>
      <p className="mt-2 flex-1 text-sm leading-6">{project.summary[locale]}</p>
      <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4 text-xs">
        <div className="flex items-center gap-1.5">
          <CalendarClock aria-hidden className="size-3.5 text-muted" />
          <dt className="text-muted">{t('since')}</dt>
          <dd className="font-semibold text-ink">{project.since[locale]}</dd>
        </div>
        {project.term ? (
          <div className="flex items-center gap-1.5">
            <FilePenLine aria-hidden className="size-3.5 text-muted" />
            <dt className="text-muted">{t('term')}</dt>
            <dd className="font-semibold text-ink">{project.term[locale]}</dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}

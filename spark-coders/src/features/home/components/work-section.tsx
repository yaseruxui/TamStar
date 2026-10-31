import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button';
import { ArrowIcon } from '@/components/ui/icons';
import { projects } from '../data/content';
import { WorkList } from './work-list';

export async function WorkSection() {
  const t = await getTranslations('home.work');
  const rows = projects.map((project) => ({
    ...project,
    title: t(`items.${project.key}.title`),
    category: t(`items.${project.key}.category`),
    alt: t(`items.${project.key}.alt`),
  }));

  return (
    <section id="work" className="relative border-t border-line bg-ink-2 py-[clamp(80px,12vw,160px)]">
      <div className="container-site">
        <div className="mb-[clamp(32px,5vw,56px)] flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-xl">{t('title')}</h2>
          <p className="max-w-[26rem] text-muted">{t('lead')}</p>
        </div>
        <WorkList rows={rows} detailsLabel={t('details')} />
        <div className="flex justify-center">
          <ButtonLink href="#" variant="ghost">
            {t('all')}
            <ArrowIcon />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

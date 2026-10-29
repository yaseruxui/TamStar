import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProjectsLedger } from '@/features/company/components/projects-ledger';
import { projects } from '@/features/company/data/projects';

const HOME_PROJECTS = ['maaden', 'petroRabigh', 'acwaPower', 'veolia'];

export async function ProjectsSection() {
  const t = await getTranslations('home.projects');
  const selected = projects.filter((project) => HOME_PROJECTS.includes(project.key));

  return (
    <section aria-labelledby="home-projects" className="container-site pb-14 sm:pb-20">
      <SectionHeading
        id="home-projects"
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('body')}
        action={
          <ButtonLink href="/projects" variant="outline">
            {t('link')}
          </ButtonLink>
        }
      />
      <div className="mt-12">
        <ProjectsLedger projects={selected} />
      </div>
    </section>
  );
}

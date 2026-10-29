import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProjectCard } from '@/features/company/components/project-card';
import { projects } from '@/features/company/data/projects';

export async function ProjectsSection() {
  const t = await getTranslations('home.projects');
  const featured = projects.filter((project) => project.featured);

  return (
    <section aria-labelledby="home-projects" className="container-site py-16 sm:py-20">
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
      <ul className="mt-10 grid gap-4 lg:grid-cols-3">
        {featured.map((project) => (
          <li key={project.key}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}

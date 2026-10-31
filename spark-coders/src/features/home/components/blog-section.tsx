import { getFormatter, getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button';
import { ArrowIcon } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/reveal';
import { posts } from '../data/content';
import { ProjectArt } from './project-art';

export async function BlogSection() {
  const [t, format] = await Promise.all([getTranslations('home.blog'), getFormatter()]);

  return (
    <section id="blog" className="border-t border-line bg-ink-2 py-[clamp(80px,12vw,160px)]">
      <div className="container-site">
        <div className="mb-[clamp(32px,5vw,56px)] flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-xl">{t('title')}</h2>
          <ButtonLink href="#" variant="ghost">
            {t('all')}
            <ArrowIcon />
          </ButtonLink>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal as="article" key={post.key} index={index}>
              <a href={post.href} className="group/post flex flex-col gap-3">
                <ProjectArt
                  accent={post.accent}
                  image={post.image}
                  alt={t(`items.${post.key}.alt`)}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="aspect-[16/11] rounded-card border border-line transition-transform duration-600 ease-brand group-hover/post:scale-[0.98]"
                />
                <span className="text-[0.8125rem] text-faint">
                  {t('category')} ·{' '}
                  <time dateTime={post.date}>
                    {format.dateTime(new Date(post.date), { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                </span>
                <h3 className="font-display text-[1.3125rem] leading-normal font-semibold transition-colors duration-250 group-hover/post:text-aqua">
                  {t(`items.${post.key}.title`)}
                </h3>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

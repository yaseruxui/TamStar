import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CtaBand } from '@/components/common/cta-band';
import { PageHero } from '@/components/common/page-hero';
import { Reveal } from '@/components/ui/reveal';
import { DelightSection } from '@/features/home/components/delight-section';
import { TeamSection } from '@/features/home/components/team-section';
import { TestimonialsSection } from '@/features/home/components/testimonials-section';
import { localePath, routes } from '@/lib/i18n/paths';
import { resolveLocale } from '@/lib/i18n/resolve-locale';
import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const [t, tMeta] = await Promise.all([
    getTranslations({ locale, namespace: 'pages.about' }),
    getTranslations({ locale, namespace: 'metadata' }),
  ]);
  return buildPageMetadata({
    locale,
    pathname: routes.about,
    title: t('metaTitle'),
    description: t('metaDescription'),
    siteName: tMeta('siteName'),
  });
}

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  const [t, tBlog, tWork] = await Promise.all([
    getTranslations('pages.about'),
    getTranslations('pages.blog'),
    getTranslations('pages.work'),
  ]);
  const values = t.raw('values') as { title: string; body: string }[];

  return (
    <>
      <PageHero title={t('title')} lead={t('lead')}>
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {values.map((value, index) => (
            <Reveal
              as="li"
              key={value.title}
              index={index}
              className="rounded-panel bg-white/[0.03] p-6 shadow-[inset_0_0_0_1px_var(--color-line-strong)]"
            >
              <b className="font-display text-xl text-gradient-blue">{value.title}</b>
              <p className="mt-2 text-muted">{value.body}</p>
            </Reveal>
          ))}
        </ul>
      </PageHero>
      <TeamSection />
      <DelightSection />
      <TestimonialsSection />
      <CtaBand
        title={tBlog('ctaTitle')}
        body={tWork('ctaBody')}
        label={tWork('cta')}
        href={localePath(locale, routes.contact)}
      />
    </>
  );
}

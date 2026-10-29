import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactBand } from '@/components/common/contact-band';
import { BomBand } from '@/features/home/components/bom-band';
import { CategoriesSection } from '@/features/home/components/categories-section';
import { FeaturedSection } from '@/features/home/components/featured-section';
import { Hero } from '@/features/home/components/hero';
import { LogisticsSection } from '@/features/home/components/logistics-section';
import { ModelsSection } from '@/features/home/components/models-section';
import { ProjectsSection } from '@/features/home/components/projects-section';
import { RfqFlowSection } from '@/features/home/components/rfq-flow-section';
import { resolveLocale } from '@/lib/i18n/resolve-locale';
import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return buildPageMetadata({
    locale,
    pathname: '/',
    title: t('home.title'),
    description: t('description'),
    siteName: t('siteName'),
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  setRequestLocale(resolveLocale((await params).locale));

  return (
    <>
      <Hero />
      <CategoriesSection />
      <FeaturedSection />
      <BomBand />
      <ModelsSection />
      <LogisticsSection />
      <RfqFlowSection />
      <ProjectsSection />
      <ContactBand />
    </>
  );
}

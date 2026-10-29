import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactBand } from '@/components/common/contact-band';
import { ClientsMarquee } from '@/features/company/components/clients-marquee';
import { CapabilitiesSection } from '@/features/home/components/capabilities-section';
import { CategoriesSection } from '@/features/home/components/categories-section';
import { Hero } from '@/features/home/components/hero';
import { ProjectsSection } from '@/features/home/components/projects-section';
import { RfqSection } from '@/features/home/components/rfq-section';
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
  const t = await getTranslations('home');

  return (
    <>
      <Hero />
      <ClientsMarquee label={t('clients.label')} />
      <CategoriesSection />
      <CapabilitiesSection />
      <ProjectsSection />
      <RfqSection />
      <ContactBand />
    </>
  );
}

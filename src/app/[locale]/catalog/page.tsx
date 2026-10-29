import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/common/page-header';
import { CategoryCard } from '@/features/catalog/components/category-card';
import { NotListedCard } from '@/features/catalog/components/not-listed-card';
import { countItemsByCategory, getCategories } from '@/features/catalog/services/catalog';
import { resolveLocale } from '@/lib/i18n/resolve-locale';
import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]/catalog'>): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return buildPageMetadata({
    locale,
    pathname: '/catalog',
    title: t('catalog.title'),
    description: t('catalog.description'),
    siteName: t('siteName'),
  });
}

export default async function CatalogPage({ params }: PageProps<'/[locale]/catalog'>) {
  setRequestLocale(resolveLocale((await params).locale));
  const t = await getTranslations('catalog');
  const counts = countItemsByCategory();

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} crumbs={[{ label: t('title') }]} />
      <div className="container-site py-12 sm:py-16">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {getCategories().map((category) => (
            <li key={category.slug}>
              <CategoryCard category={category} itemCount={counts.get(category.slug) ?? 0} />
            </li>
          ))}
        </ul>
        <NotListedCard className="mt-10" />
      </div>
    </>
  );
}

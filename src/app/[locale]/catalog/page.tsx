import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/common/page-header';
import { CategoryTile } from '@/features/catalog/components/category-tile';
import { ItemCard } from '@/features/catalog/components/item-card';
import { NotListedCard } from '@/features/catalog/components/not-listed-card';
import { countItemsByCategory, getAllItems, getCategories } from '@/features/catalog/services/catalog';
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
  const items = getAllItems();

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} crumbs={[{ label: t('title') }]} />
      <div className="container-site py-8 sm:py-10">
        <section aria-labelledby="catalog-categories">
          <h2 id="catalog-categories" className="text-lg">
            {t('categoriesTitle')}
          </h2>
          <ul className="mt-5 grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-5 lg:grid-cols-9">
            {getCategories().map((category) => (
              <li key={category.slug}>
                <CategoryTile category={category} itemCount={counts.get(category.slug) ?? 0} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="catalog-all" className="mt-12">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="catalog-all" className="text-lg">
              {t('allProducts')}
            </h2>
            <p className="text-sm text-muted tabular">{t('itemsCount', { count: items.length })}</p>
          </div>
          <ul className="mt-5 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((item, index) => (
              <li key={`${item.category}-${item.slug}`}>
                <ItemCard item={item} priority={index < 4} />
              </li>
            ))}
          </ul>
        </section>

        <NotListedCard className="mt-10" />
      </div>
    </>
  );
}

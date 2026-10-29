import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/common/page-header';
import { JsonLdScript } from '@/components/seo/json-ld';
import { CategoryIcon } from '@/features/catalog/components/category-icon';
import { CategoryNav } from '@/features/catalog/components/category-nav';
import { ItemCard } from '@/features/catalog/components/item-card';
import { NotListedCard } from '@/features/catalog/components/not-listed-card';
import { getCategories, getCategory, getItemsByCategory } from '@/features/catalog/services/catalog';
import { routing } from '@/lib/i18n/routing';
import { resolveLocale } from '@/lib/i18n/resolve-locale';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getCategories().map((category) => ({ locale, category: category.slug })));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/catalog/[category]'>): Promise<Metadata> {
  const { locale: rawLocale, category: slug } = await params;
  const locale = resolveLocale(rawLocale);
  const category = getCategory(slug);
  if (!category) return {};
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return buildPageMetadata({
    locale,
    pathname: `/catalog/${category.slug}`,
    title: category.name[locale],
    description: category.summary[locale],
    siteName: t('siteName'),
  });
}

export default async function CategoryPage({ params }: PageProps<'/[locale]/catalog/[category]'>) {
  const { locale: rawLocale, category: slug } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);
  const category = getCategory(slug);
  if (!category) notFound();

  const [t, tNav] = await Promise.all([getTranslations('catalog'), getTranslations('navigation')]);
  const items = getItemsByCategory(category.slug);

  return (
    <>
      <PageHeader
        eyebrow={t('itemsCount', { count: items.length })}
        title={category.name[locale]}
        lead={category.summary[locale]}
        crumbs={[{ label: tNav('catalog'), href: '/catalog' }, { label: category.name[locale] }]}
        aside={<CategoryIcon icon={category.icon} className="hidden size-20 rounded-lg lg:grid [&_svg]:size-10" />}
      />
      <div className="container-site grid gap-8 py-12 lg:grid-cols-[17rem_1fr]">
        <aside className="order-last lg:order-first">
          <div className="lg:sticky lg:top-28">
            <CategoryNav activeSlug={category.slug} />
          </div>
        </aside>
        <div>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <li key={item.slug}>
                <ItemCard item={item} />
              </li>
            ))}
          </ul>
          <NotListedCard className="mt-8" />
        </div>
      </div>
      <JsonLdScript
        data={breadcrumbJsonLd(locale, [
          { name: tNav('home'), pathname: '/' },
          { name: tNav('catalog'), pathname: '/catalog' },
          { name: category.name[locale], pathname: `/catalog/${category.slug}` },
        ])}
      />
    </>
  );
}

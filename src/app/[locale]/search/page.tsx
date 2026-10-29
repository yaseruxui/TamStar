import { SearchX } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/common/page-header';
import { EmptyState } from '@/components/feedback/empty-state';
import { ButtonLink } from '@/components/ui/button-link';
import { CatalogSearchForm } from '@/features/catalog/components/catalog-search-form';
import { ItemCard } from '@/features/catalog/components/item-card';
import { NotListedCard } from '@/features/catalog/components/not-listed-card';
import { getCategory, searchItems } from '@/features/catalog/services/catalog';
import { resolveLocale } from '@/lib/i18n/resolve-locale';
import { buildPageMetadata } from '@/lib/seo/metadata';

type SearchPageProps = PageProps<'/[locale]/search'>;

function readParam(value: string | string[] | undefined): string {
  const first = Array.isArray(value) ? value[0] : value;
  return (first ?? '').trim().slice(0, 120);
}

export async function generateMetadata({ params, searchParams }: SearchPageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const query = readParam((await searchParams).q);
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return buildPageMetadata({
    locale,
    pathname: '/search',
    title: query ? t('search.title', { query }) : t('search.titleEmpty'),
    description: t('catalog.description'),
    siteName: t('siteName'),
    noIndex: true,
  });
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  const search = await searchParams;
  const query = readParam(search.q);
  const category = getCategory(readParam(search.category));

  const [t, tNav] = await Promise.all([getTranslations('catalog'), getTranslations('navigation')]);
  const results = query ? searchItems(query, { category: category?.slug }) : [];

  return (
    <>
      <PageHeader
        eyebrow={t('search.title')}
        title={query ? t('search.for', { query }) : t('search.promptTitle')}
        lead={
          query
            ? `${t('search.count', { count: results.length })}${category ? ` · ${category.name[locale]}` : ''}`
            : t('search.promptBody')
        }
        crumbs={[{ label: tNav('catalog'), href: '/catalog' }, { label: t('search.title') }]}
      />
      <div className="container-site py-12">
        <CatalogSearchForm
          idPrefix="search-page"
          size="lg"
          defaultQuery={query}
          defaultCategory={category?.slug}
          className="mb-10"
        />
        {results.length > 0 ? (
          <>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((item) => (
                <li key={`${item.category}-${item.slug}`}>
                  <ItemCard item={item} />
                </li>
              ))}
            </ul>
            <NotListedCard className="mt-10" />
          </>
        ) : (
          <EmptyState
            icon={<SearchX />}
            title={query ? t('search.emptyTitle') : t('search.promptTitle')}
            body={query ? t('search.emptyBody') : t('search.promptBody')}
            action={
              <div className="flex flex-wrap justify-center gap-3">
                <ButtonLink href="/rfq">{t('notListedCta')}</ButtonLink>
                <ButtonLink href="/catalog" variant="outline">
                  {tNav('catalog')}
                </ButtonLink>
              </div>
            }
          />
        )}
      </div>
    </>
  );
}

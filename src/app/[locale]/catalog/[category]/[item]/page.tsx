import { ClipboardList, Info } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { JsonLdScript } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button-link';
import { CategoryIcon } from '@/features/catalog/components/category-icon';
import { ItemCard } from '@/features/catalog/components/item-card';
import { getAllItemParams, getCategory, getItem, getRelatedItems } from '@/features/catalog/services/catalog';
import { specValue } from '@/features/catalog/utils/spec-value';
import { AddToRfqButton } from '@/features/rfq/components/add-to-rfq-button';
import { routing } from '@/lib/i18n/routing';
import { resolveLocale } from '@/lib/i18n/resolve-locale';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { buildPageMetadata } from '@/lib/seo/metadata';

type ItemPageProps = PageProps<'/[locale]/catalog/[category]/[item]'>;

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getAllItemParams().map((params) => ({ locale, ...params })));
}

export async function generateMetadata({ params }: ItemPageProps): Promise<Metadata> {
  const { locale: rawLocale, category, item: slug } = await params;
  const locale = resolveLocale(rawLocale);
  const item = getItem(category, slug);
  if (!item) return {};
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return buildPageMetadata({
    locale,
    pathname: `/catalog/${item.category}/${item.slug}`,
    title: item.standards.length
      ? `${item.name[locale]} — ${item.standards.slice(0, 2).join(', ')}`
      : item.name[locale],
    description: item.summary[locale],
    siteName: t('siteName'),
  });
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { locale: rawLocale, category: categorySlug, item: slug } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);
  const item = getItem(categorySlug, slug);
  const category = getCategory(categorySlug);
  if (!item || !category) notFound();

  const [t, tNav] = await Promise.all([getTranslations('catalog'), getTranslations('navigation')]);
  const name = item.name[locale];
  const related = getRelatedItems(item);
  const pathname = `/catalog/${item.category}/${item.slug}`;

  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="container-site py-4">
          <Breadcrumbs
            items={[
              { label: tNav('catalog'), href: '/catalog' },
              { label: category.name[locale], href: `/catalog/${category.slug}` },
              { label: name },
            ]}
          />
        </div>
      </div>

      <div className="container-site grid gap-8 py-10 lg:grid-cols-[1fr_22rem]">
        <article className="rounded-lg border border-line bg-surface p-6 shadow-card sm:p-8">
          <div className="flex items-start gap-5">
            <CategoryIcon icon={category.icon} className="size-16 rounded-lg [&_svg]:size-8" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-brand-ink">{category.name[locale]}</p>
              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{name}</h1>
            </div>
          </div>
          <p className="mt-6 text-md leading-7">{item.summary[locale]}</p>

          {item.standards.length > 0 ? (
            <section aria-labelledby="item-standards" className="mt-8">
              <h2 id="item-standards" className="text-sm font-semibold">
                {t('standards')}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.standards.map((standard) => (
                  <li key={standard}>
                    <Badge tone="navy" mono>
                      {standard}
                    </Badge>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section aria-labelledby="item-specs" className="mt-8">
            <h2 id="item-specs" className="text-sm font-semibold">
              {t('specifications')}
            </h2>
            <dl className="mt-3 divide-y divide-line overflow-hidden rounded-md border border-line">
              {item.specs.map((spec) => (
                <div key={spec.label} className="grid gap-1 px-4 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
                  <dt className="text-sm text-muted">{t(`specs.${spec.label}`)}</dt>
                  <dd className="text-sm font-medium text-ink">
                    <bdi>{specValue(spec, locale)}</bdi>
                  </dd>
                </div>
              ))}
              <div className="grid gap-1 bg-canvas px-4 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
                <dt className="text-sm text-muted">{t('unit')}</dt>
                <dd className="text-sm font-medium text-ink">{t(`units.${item.unit}`)}</dd>
              </div>
            </dl>
          </section>
        </article>

        <aside>
          <div className="flex flex-col gap-4 lg:sticky lg:top-28">
            <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
              <h2 className="text-md font-semibold">{t('pricingTitle')}</h2>
              <p className="mt-2 text-sm leading-6">{t('pricingBody')}</p>
              <div className="mt-5 flex flex-col gap-2">
                <AddToRfqButton category={item.category} slug={item.slug} itemName={name} />
                <ButtonLink href="/rfq" variant="primary" className="w-full">
                  <ClipboardList aria-hidden />
                  {t('requestNow')}
                </ButtonLink>
              </div>
              <p className="mt-4 flex gap-2 text-xs text-muted">
                <Info aria-hidden className="size-4 shrink-0" />
                {t('pricingNote')}
              </p>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-items" className="border-t border-line bg-surface">
          <div className="container-site py-12">
            <h2 id="related-items" className="text-xl font-bold">
              {t('related')}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedItem) => (
                <li key={relatedItem.slug}>
                  <ItemCard item={relatedItem} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <JsonLdScript
        data={breadcrumbJsonLd(locale, [
          { name: tNav('home'), pathname: '/' },
          { name: tNav('catalog'), pathname: '/catalog' },
          { name: category.name[locale], pathname: `/catalog/${category.slug}` },
          { name, pathname },
        ])}
      />
    </>
  );
}

import { ClipboardList, LockKeyhole, ShieldCheck, Truck, UserRound } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { JsonLdScript } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button-link';
import { AddToCart } from '@/features/cart/components/add-to-cart';
import { ItemCard } from '@/features/catalog/components/item-card';
import { getAllItemParams, getCategory, getItem, getRelatedItems } from '@/features/catalog/services/catalog';
import { PRODUCT_IMAGE_SIZE, productImage } from '@/features/catalog/utils/images';
import { specValue } from '@/features/catalog/utils/spec-value';
import { Link } from '@/lib/i18n/navigation';
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
  const metadata = buildPageMetadata({
    locale,
    pathname: `/catalog/${item.category}/${item.slug}`,
    title: item.standards.length
      ? `${item.name[locale]} — ${item.standards.slice(0, 2).join(', ')}`
      : item.name[locale],
    description: item.summary[locale],
    siteName: t('siteName'),
  });
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, images: [{ url: productImage(item.slug), width: 1200, height: 1200 }] },
  };
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { locale: rawLocale, category: categorySlug, item: slug } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);
  const item = getItem(categorySlug, slug);
  const category = getCategory(categorySlug);
  if (!item || !category) notFound();

  const [t, tNav, tCart] = await Promise.all([
    getTranslations('catalog'),
    getTranslations('navigation'),
    getTranslations('cart'),
  ]);
  const name = item.name[locale];
  const related = getRelatedItems(item, 4);
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

      <div className="container-site grid gap-8 py-8 lg:grid-cols-12 lg:py-10">
        <div className="lg:col-span-6">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-line bg-canvas lg:sticky lg:top-40">
            <Image
              src={productImage(item.slug)}
              alt={name}
              width={PRODUCT_IMAGE_SIZE}
              height={PRODUCT_IMAGE_SIZE}
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6">
          <Link href={`/catalog/${category.slug}`} className="text-sm font-medium text-brand-ink hover:underline">
            {category.name[locale]}
          </Link>
          <h1 className="mt-2 text-2xl leading-tight sm:text-3xl">{name}</h1>
          {item.standards.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={t('standards')}>
              {item.standards.map((standard) => (
                <li key={standard}>
                  <Badge tone="navy" mono>
                    {standard}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-5 text-md leading-8">{item.summary[locale]}</p>

          <div className="mt-6 rounded-lg border border-line bg-surface p-5 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-sand px-4 py-3">
              <span className="flex items-center gap-2 font-semibold text-brand-ink">
                <LockKeyhole aria-hidden className="size-4" />
                {tCart('priceLocked')}
              </span>
              <Link
                href="/account"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:underline"
              >
                <UserRound aria-hidden className="size-4" />
                {tCart('priceLockedHint')}
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted">
              {t('unit')}: <span className="font-medium text-ink">{t(`units.${item.unit}`)}</span>
            </p>
            <AddToCart category={item.category} slug={item.slug} itemName={name} variant="detail" className="mt-4" />
            <ButtonLink href="/rfq" variant="outline" size="lg" className="mt-2 h-12 w-full">
              <ClipboardList aria-hidden />
              {t('requestNow')}
            </ButtonLink>
            <ul className="mt-5 grid gap-3 border-t border-line pt-4 text-sm sm:grid-cols-2">
              <li className="flex items-start gap-2.5">
                <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
                {t('pricingNote')}
              </li>
              <li className="flex items-start gap-2.5">
                <Truck aria-hidden className="mt-0.5 size-4 shrink-0 text-navy" />
                {t('delivery')}
              </li>
            </ul>
          </div>

          <section aria-labelledby="item-specs" className="mt-8">
            <h2 id="item-specs" className="text-lg">
              {t('specifications')}
            </h2>
            <dl className="mt-4 divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
              {item.specs.map((spec) => (
                <div key={spec.label} className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <dt className="text-sm text-muted">{t(`specs.${spec.label}`)}</dt>
                  <dd className="text-sm font-medium text-ink">
                    <bdi>{specValue(spec, locale)}</bdi>
                  </dd>
                </div>
              ))}
              {item.standards.length > 0 ? (
                <div className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <dt className="text-sm text-muted">{t('standards')}</dt>
                  <dd className="text-sm font-medium text-ink">
                    <bdi>{item.standards.join(' · ')}</bdi>
                  </dd>
                </div>
              ) : null}
            </dl>
          </section>
        </div>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-items" className="border-t border-line bg-surface">
          <div className="container-site py-12">
            <h2 id="related-items" className="text-xl">
              {t('related')}
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
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

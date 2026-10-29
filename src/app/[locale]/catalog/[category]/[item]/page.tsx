import { ClipboardList, FileCheck, LockKeyhole, ShieldCheck, Truck } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { JsonLdScript } from '@/components/seo/json-ld';
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
    openGraph: { ...metadata.openGraph, images: [{ url: productImage(item.slug), width: 1000, height: 1000 }] },
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

  const assurances = [
    { icon: ShieldCheck, text: t('pricingNote') },
    { icon: Truck, text: t('delivery') },
    { icon: FileCheck, text: t('certificates') },
  ] as const;

  return (
    <>
      <div className="container-site pt-6">
        <Breadcrumbs
          items={[
            { label: tNav('catalog'), href: '/catalog' },
            { label: category.name[locale], href: `/catalog/${category.slug}` },
            { label: name },
          ]}
        />
      </div>

      <div className="container-site grid gap-8 py-6 lg:grid-cols-12 lg:gap-12 lg:py-8">
        <div className="lg:col-span-6">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-tile lg:sticky lg:top-40">
            <Image
              src={productImage(item.slug)}
              alt={name}
              width={PRODUCT_IMAGE_SIZE}
              height={PRODUCT_IMAGE_SIZE}
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="h-full w-full object-cover"
            />
            {item.standards[0] ? (
              <span className="absolute start-5 top-5 rounded-full bg-surface/90 px-3 py-1.5 font-mono text-xs font-medium text-navy backdrop-blur">
                {item.standards[0]}
              </span>
            ) : null}
          </div>
        </div>

        <div className="lg:col-span-6 lg:py-2">
          <Link
            href={`/catalog/${category.slug}`}
            className="inline-flex rounded-full bg-tile px-3.5 py-1.5 text-xs font-semibold text-ink hover:bg-tile-strong"
          >
            {category.name[locale]}
          </Link>
          <h1 className="mt-4 text-[1.75rem] leading-tight sm:text-[2.5rem] sm:leading-[1.2]">{name}</h1>
          <p className="mt-4 text-md leading-8 text-body">{item.summary[locale]}</p>

          {item.standards.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('standards')}>
              {item.standards.map((standard) => (
                <li
                  key={standard}
                  className="rounded-full border border-line px-3 py-1 font-mono text-xs font-medium text-navy"
                >
                  {standard}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8 rounded-xl border border-line p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-sand text-brand-ink">
                  <LockKeyhole aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="block font-display text-lg font-bold text-ink">{tCart('priceLocked')}</span>
                  <span className="block text-xs text-muted">
                    {tCart('unitPer', { unit: t(`units.${item.unit}`) })}
                  </span>
                </span>
              </div>
              <Link href="/account" className="text-sm font-semibold text-brand-hover hover:underline">
                {t('signInForPrice')}
              </Link>
            </div>
            <AddToCart category={item.category} slug={item.slug} itemName={name} variant="detail" className="mt-5" />
            <ButtonLink href="/rfq" variant="outline" size="lg" className="mt-3 w-full">
              <ClipboardList aria-hidden />
              {t('requestNow')}
            </ButtonLink>
          </div>

          <ul className="mt-4 grid gap-2 rounded-xl bg-tile p-4 sm:p-5">
            {assurances.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-ink">
                <Icon aria-hidden className="mt-0.5 size-[18px] shrink-0 text-brand-hover" />
                {text}
              </li>
            ))}
          </ul>

          <section aria-labelledby="item-specs" className="mt-10">
            <h2 id="item-specs" className="text-xl">
              {t('specifications')}
            </h2>
            <dl className="mt-4 overflow-hidden rounded-xl border border-line">
              {item.specs.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`grid gap-1 px-5 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-4 ${index % 2 === 0 ? 'bg-tile/60' : ''}`}
                >
                  <dt className="text-sm text-muted">{t(`specs.${spec.label}`)}</dt>
                  <dd className="text-sm font-semibold text-ink">
                    <bdi>{specValue(spec, locale)}</bdi>
                  </dd>
                </div>
              ))}
              <div
                className={`grid gap-1 px-5 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-4 ${item.specs.length % 2 === 0 ? 'bg-tile/60' : ''}`}
              >
                <dt className="text-sm text-muted">{t('unit')}</dt>
                <dd className="text-sm font-semibold text-ink">{t(`units.${item.unit}`)}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-items" className="container-site py-14 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <h2 id="related-items" className="text-2xl sm:text-[2rem]">
              {t('related')}
            </h2>
            <ButtonLink href={`/catalog/${category.slug}`} variant="outline">
              {t('viewCategory')}
            </ButtonLink>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {related.map((relatedItem) => (
              <li key={relatedItem.slug}>
                <ItemCard item={relatedItem} />
              </li>
            ))}
          </ul>
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

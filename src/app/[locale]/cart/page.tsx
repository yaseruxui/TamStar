import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/common/page-header';
import { CartView } from '@/features/cart/components/cart-view';
import { getCartCatalog } from '@/features/cart/services/cart-catalog';
import { resolveLocale } from '@/lib/i18n/resolve-locale';
import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]/cart'>): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return buildPageMetadata({
    locale,
    pathname: '/cart',
    title: t('cart.title'),
    description: t('description'),
    siteName: t('siteName'),
    noIndex: true,
  });
}

export default async function CartPage({ params }: PageProps<'/[locale]/cart'>) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  const [t, catalog] = await Promise.all([getTranslations('cart'), getCartCatalog(locale)]);

  return (
    <>
      <PageHeader eyebrow={t('summary')} title={t('title')} crumbs={[{ label: t('title') }]} />
      <div className="container-site py-8 sm:py-10">
        <CartView catalog={catalog} />
      </div>
    </>
  );
}

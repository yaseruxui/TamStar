import { ClipboardList, LockKeyhole, UserRound } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/common/page-header';
import { ButtonLink } from '@/components/ui/button-link';
import { resolveLocale } from '@/lib/i18n/resolve-locale';
import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]/checkout'>): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return buildPageMetadata({
    locale,
    pathname: '/checkout',
    title: t('checkout.title'),
    description: t('description'),
    siteName: t('siteName'),
    noIndex: true,
  });
}

/** Ordering opens with company accounts and the payment gateway (TAMSTAR_MVP.md §1, flow C). */
export default async function CheckoutPage({ params }: PageProps<'/[locale]/checkout'>) {
  setRequestLocale(resolveLocale((await params).locale));
  const [t, tNav] = await Promise.all([getTranslations('account'), getTranslations('navigation')]);

  return (
    <>
      <PageHeader
        eyebrow={tNav('checkout')}
        title={t('checkoutTitle')}
        crumbs={[{ label: tNav('cart'), href: '/cart' }, { label: tNav('checkout') }]}
      />
      <div className="container-site py-10">
        <div className="mx-auto max-w-2xl rounded-xl border border-line bg-surface p-8 text-center shadow-card">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-sand text-brand-ink">
            <LockKeyhole aria-hidden className="size-6" />
          </span>
          <p className="mt-5 text-md leading-8">{t('checkoutBody')}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/rfq" size="lg">
              <ClipboardList aria-hidden />
              {t('toRfq')}
            </ButtonLink>
            <ButtonLink href="/account" size="lg" variant="outline">
              <UserRound aria-hidden />
              {t('toAccount')}
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}

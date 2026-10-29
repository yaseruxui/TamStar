import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ClientMessages } from '@/components/common/client-messages';
import { SiteFooter } from '@/components/common/site-footer';
import { SiteHeader } from '@/components/common/site-header';
import { JsonLdScript } from '@/components/seo/json-ld';
import { siteUrl } from '@/lib/env';
import { plexArabic, plexMono } from '@/lib/fonts';
import { localeDirection, routing } from '@/lib/i18n/routing';
import { organizationJsonLd } from '@/lib/seo/json-ld';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { cn } from '@/utils/cn';
import '@/styles/globals.css';

/** Namespaces read by site-wide client components (header, RFQ buttons, error boundary). */
const CLIENT_NAMESPACES = ['common', 'navigation', 'catalog'] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#002d59',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(siteUrl),
    applicationName: 'TAMSTAR',
    title: { default: t('defaultTitle'), template: `%s | ${t('siteName')}` },
    formatDetection: { telephone: false, email: false, address: false },
    ...buildPageMetadata({
      locale,
      pathname: '/',
      title: t('defaultTitle'),
      description: t('description'),
      siteName: t('siteName'),
      absoluteTitle: true,
    }),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [t, tMeta] = await Promise.all([getTranslations('common'), getTranslations('metadata')]);

  return (
    <html lang={locale} dir={localeDirection[locale]} className={cn(plexArabic.variable, plexMono.variable)}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-sm bg-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {t('skipToContent')}
        </a>
        <ClientMessages namespaces={CLIENT_NAMESPACES}>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ClientMessages>
        <JsonLdScript
          data={organizationJsonLd(locale, {
            brand: t('brand'),
            legalName: t('legalName'),
            description: tMeta('description'),
          })}
        />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { getPathname } from '@/lib/i18n/navigation';
import { ogLocale, routing, type Locale } from '@/lib/i18n/routing';
import { siteUrl } from '@/lib/env';

export function absoluteUrl(locale: Locale, pathname: string): string {
  return `${siteUrl}${getPathname({ href: pathname, locale })}`;
}

export function alternateLanguages(pathname: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) languages[locale] = absoluteUrl(locale, pathname);
  languages['x-default'] = absoluteUrl(routing.defaultLocale, pathname);
  return languages;
}

interface PageMetadataInput {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  siteName: string;
  /** Use the title as-is instead of applying the "%s | TAMSTAR" template. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  siteName,
  absoluteTitle = false,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(locale, pathname);
  return {
    metadataBase: new URL(siteUrl),
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: alternateLanguages(pathname) },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName,
      locale: ogLocale[locale],
      alternateLocale: routing.locales.filter((other) => other !== locale).map((other) => ogLocale[other]),
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

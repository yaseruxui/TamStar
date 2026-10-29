import { company } from '@/lib/config/site';
import type { Locale } from '@/lib/i18n/routing';
import { siteUrl } from '@/lib/env';
import { absoluteUrl } from './metadata';

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(
  locale: Locale,
  names: { brand: string; legalName: string; description: string },
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: names.brand,
    alternateName: company.brandEn,
    legalName: company.legalNameEn,
    description: names.description,
    url: absoluteUrl(locale, '/'),
    logo: `${siteUrl}/brand/tamstar-logo.png`,
    email: company.email,
    telephone: company.phones[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.countryCode,
    },
    contactPoint: company.phones.map((telephone) => ({
      '@type': 'ContactPoint',
      telephone,
      email: company.email,
      contactType: 'sales',
      areaServed: 'SA',
      availableLanguage: ['ar', 'en'],
    })),
  };
}

export function localBusinessJsonLd(locale: Locale, name: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name,
    parentOrganization: { '@id': `${siteUrl}/#organization` },
    url: absoluteUrl(locale, '/contact'),
    telephone: company.phones[0],
    email: company.email,
    image: `${siteUrl}/brand/tamstar-logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.countryCode,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: company.openingHours.opens,
        closes: company.openingHours.closes,
      },
    ],
  };
}

export function breadcrumbJsonLd(locale: Locale, crumbs: ReadonlyArray<{ name: string; pathname: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(locale, crumb.pathname),
    })),
  };
}

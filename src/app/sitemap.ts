import type { MetadataRoute } from 'next';
import { getAllItemParams, getCategories } from '@/features/catalog/services/catalog';
import { routing } from '@/lib/i18n/routing';
import { absoluteUrl, alternateLanguages } from '@/lib/seo/metadata';

const STATIC_PATHS: ReadonlyArray<{ pathname: string; priority: number }> = [
  { pathname: '/', priority: 1 },
  { pathname: '/catalog', priority: 0.9 },
  { pathname: '/rfq', priority: 0.9 },
  { pathname: '/services', priority: 0.8 },
  { pathname: '/projects', priority: 0.7 },
  { pathname: '/about', priority: 0.7 },
  { pathname: '/contact', priority: 0.7 },
  { pathname: '/careers', priority: 0.5 },
  { pathname: '/account', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pathnames = [
    ...STATIC_PATHS,
    ...getCategories().map((category) => ({ pathname: `/catalog/${category.slug}`, priority: 0.8 })),
    ...getAllItemParams().map(({ category, item }) => ({ pathname: `/catalog/${category}/${item}`, priority: 0.6 })),
  ];

  return pathnames.flatMap(({ pathname, priority }) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, pathname),
      changeFrequency: 'monthly' as const,
      priority,
      alternates: { languages: alternateLanguages(pathname) },
    })),
  );
}

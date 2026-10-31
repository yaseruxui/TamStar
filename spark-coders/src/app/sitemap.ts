import type { MetadataRoute } from 'next';
import { routing } from '@/lib/i18n/routing';
import { absoluteUrl, alternateLanguages } from '@/lib/seo/metadata';

const PATHS: ReadonlyArray<{ pathname: string; priority: number }> = [{ pathname: '/', priority: 1 }];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap(({ pathname, priority }) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, pathname),
      changeFrequency: 'monthly' as const,
      priority,
      alternates: { languages: alternateLanguages(pathname) },
    })),
  );
}

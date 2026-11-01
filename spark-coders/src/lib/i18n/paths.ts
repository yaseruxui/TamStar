import type { navSections } from '@/lib/config/navigation';
import { getPathname } from './navigation';
import type { Locale } from './routing';

/** Locale-prefixed URL of a page, e.g. `/ar/work/clinic`. */
export function localePath(locale: Locale, href: string): string {
  return getPathname({ href, locale });
}

/** A section of the home page from anywhere on the site, e.g. `/ar#contact`. */
export function homeSection(locale: Locale, id: string): string {
  return `${getPathname({ href: '/', locale })}#${id}`;
}

export const routes = {
  work: '/work',
  project: (slug: string) => `/work/${slug}`,
  blog: '/blog',
  post: (slug: string) => `/blog/${slug}`,
} as const;

/** Where a menu entry points: its own page when it has one, otherwise its home-page section. */
export function navHref(locale: Locale, section: (typeof navSections)[number]): string {
  return 'page' in section ? localePath(locale, section.page) : homeSection(locale, section.id);
}

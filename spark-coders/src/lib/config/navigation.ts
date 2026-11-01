/**
 * Menu entries, in order. `id` is the home-page section's anchor; entries with a `page` open that
 * page instead. Labels live in `navigation.items`.
 */
export const navSections = [
  { key: 'home', id: 'top' },
  { key: 'work', id: 'work', page: '/work' },
  { key: 'services', id: 'services' },
  { key: 'team', id: 'team' },
  { key: 'blog', id: 'blog', page: '/blog' },
  { key: 'contact', id: 'contact' },
] as const;

export type NavSectionKey = (typeof navSections)[number]['key'];

/** Footer quick links (subset, footer order). */
export const footerSections: readonly NavSectionKey[] = ['services', 'work', 'blog', 'team', 'contact'];

/** In-page sections of the one-page site, in menu order. Labels live in `navigation.items`. */
export const navSections = [
  { key: 'home', href: '#top' },
  { key: 'work', href: '#work' },
  { key: 'services', href: '#services' },
  { key: 'team', href: '#team' },
  { key: 'blog', href: '#blog' },
  { key: 'contact', href: '#contact' },
] as const;

export type NavSectionKey = (typeof navSections)[number]['key'];

/** Footer quick links (subset, footer order). */
export const footerSections: readonly NavSectionKey[] = ['services', 'work', 'blog', 'team', 'contact'];

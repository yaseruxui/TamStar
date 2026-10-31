/** Brand facts that do not change between locales. */
export const site = {
  wordmark: 'skodr',
  domain: 'skodr.com',
  email: 'hello@skodr.com',
  phone: '+000000000',
  phoneDisplay: '+000 000 000',
  logo: '/brand/logo-mark.svg',
  themeColor: '#07051a',
  socials: [
    { key: 'linkedin', href: '#' },
    { key: 'instagram', href: '#' },
    { key: 'x', href: '#' },
    { key: 'behance', href: '#' },
  ],
} as const;

export type SocialKey = (typeof site.socials)[number]['key'];

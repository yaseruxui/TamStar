/** Brand facts that do not change between locales. */
export const site = {
  wordmark: 'SKODR',
  slogan: 'Crafting Digital Excellence',
  domain: 'skodr.com',
  email: 'hello@skodr.com',
  phone: '+000000000',
  phoneDisplay: '+000 000 000',
  /** Square raster mark for structured data, manifest and social cards. */
  logo: '/brand/skodr-mark-512.png',
  /** Trimmed mark used in the interface (intrinsic 640×442). */
  mark: { src: '/brand/skodr-mark.webp', width: 640, height: 442 },
  /** Opaque, colour-bled copy of the mark used as the 3D model's texture. */
  markTexture: '/brand/skodr-mark-texture.webp',
  themeColor: '#07051a',
  socials: [
    { key: 'linkedin', href: '#' },
    { key: 'instagram', href: '#' },
    { key: 'x', href: '#' },
    { key: 'behance', href: '#' },
  ],
} as const;

export type SocialKey = (typeof site.socials)[number]['key'];

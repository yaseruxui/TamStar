import type {
  DelightStepKey,
  HeroWordKey,
  LeadTagKey,
  Post,
  Project,
  Sector,
  TeamMember,
  TestimonialKey,
} from '../types';

export const heroWords: readonly HeroWordKey[] = ['ecommerce', 'education', 'clinics', 'startups', 'restaurants'];

export const techStack: readonly string[] = [
  'Next.js',
  'React',
  'Flutter',
  'Laravel',
  'Node.js',
  'TypeScript',
  'Figma',
  'PostgreSQL',
  'AWS',
  'OpenAI',
  'Shopify',
  'WordPress',
];

/**
 * Showcase projects. Drop a photo into /public/images/projects/<key>.webp and set `image`
 * to its path; until then each card renders its brand-gradient artwork.
 */
export const projects: readonly Project[] = [
  { key: 'education', accent: 1, href: '#', image: null },
  { key: 'ecommerce', accent: 2, href: '#', image: null },
  { key: 'clinic', accent: 3, href: '#', image: null },
  { key: 'delivery', accent: 4, href: '#', image: null },
  { key: 'dashboard', accent: 5, href: '#', image: null },
  { key: 'restaurant', accent: 6, href: '#', image: null },
];

export const leadTags: readonly LeadTagKey[] = [
  'client',
  'quote',
  'booking',
  'whatsapp',
  'call',
  'order',
  'signup',
  'inquiry',
];

export const delightSteps: readonly DelightStepKey[] = ['discover', 'plan', 'design', 'build', 'launch'];

export const team: readonly TeamMember[] = [
  { key: 'founder', initial: { ar: 'س', en: 'S' }, href: '#', image: null },
  { key: 'pm', initial: { ar: 'م', en: 'M' }, href: '#', image: null },
  { key: 'designer', initial: { ar: 'ت', en: 'D' }, href: '#', image: null },
  { key: 'developer', initial: { ar: 'ب', en: 'A' }, href: '#', image: null },
  { key: 'marketer', initial: { ar: 'ت', en: 'M' }, href: '#', image: null },
];

export const sectors: readonly Sector[] = [
  { key: 'business', icon: 'rocket' },
  { key: 'education', icon: 'cap' },
  { key: 'commerce', icon: 'cart' },
];

export const testimonials: readonly TestimonialKey[] = ['one', 'two', 'three'];

export const posts: readonly Post[] = [
  { key: 'content', accent: 1, href: '#', date: '2026-09-08', image: null },
  { key: 'team', accent: 2, href: '#', date: '2026-09-01', image: null },
  { key: 'brief', accent: 3, href: '#', date: '2026-08-25', image: null },
];

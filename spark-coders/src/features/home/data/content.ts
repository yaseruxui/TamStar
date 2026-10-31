import type { TechIconKey } from '../lib/tech-icons';
import type {
  DelightStepKey,
  HeroWordKey,
  LeadTagKey,
  Post,
  Project,
  ServiceKey,
  TeamMember,
  Testimonial,
} from '../types';

export const heroWords: readonly HeroWordKey[] = ['ecommerce', 'education', 'clinics', 'startups', 'restaurants'];

/** A technology in the hero strip. `icon` is a Simple Icons slug-key; null draws a neutral glyph. */
export interface Tech {
  name: string;
  icon: TechIconKey | null;
}

export const techStack: readonly Tech[] = [
  { name: 'Next.js', icon: 'siNextdotjs' },
  { name: 'React', icon: 'siReact' },
  { name: 'Flutter', icon: 'siFlutter' },
  { name: 'Laravel', icon: 'siLaravel' },
  { name: 'Node.js', icon: 'siNodedotjs' },
  { name: 'TypeScript', icon: 'siTypescript' },
  { name: 'Figma', icon: 'siFigma' },
  { name: 'PostgreSQL', icon: 'siPostgresql' },
  // Amazon's logo is not distributed by Simple Icons (trademark policy); a neutral cloud stands in.
  { name: 'AWS', icon: null },
  { name: 'OpenAI', icon: 'siOpenai' },
  { name: 'Shopify', icon: 'siShopify' },
  { name: 'WordPress', icon: 'siWordpress' },
];

/**
 * Showcase projects. Each image is an interface screenshot (1600×1200) in /public/images/projects/;
 * set `image` to null to fall back to the brand-gradient artwork.
 */
export const projects: readonly Project[] = [
  { key: 'education', accent: 1, href: '#', image: '/images/projects/education.webp' },
  { key: 'ecommerce', accent: 2, href: '#', image: '/images/projects/ecommerce.webp' },
  { key: 'clinic', accent: 3, href: '#', image: '/images/projects/clinic.webp' },
  { key: 'delivery', accent: 4, href: '#', image: '/images/projects/delivery.webp' },
  { key: 'dashboard', accent: 5, href: '#', image: '/images/projects/dashboard.webp' },
  { key: 'restaurant', accent: 6, href: '#', image: '/images/projects/restaurant.webp' },
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

/** Services, in display order (copy in messages `home.services`). */
export const services: readonly ServiceKey[] = ['website', 'store', 'app', 'systems', 'branding', 'seo'];

/**
 * Client voices, in display order. The current photos are AI-generated portraits (Figma AI), not
 * real people; swap in clients' own photos (with their permission) in /public/images/clients/.
 * With `image: null` the illustrated avatar is shown.
 */
export const testimonials: readonly Testimonial[] = [
  { key: 'one', avatar: 'shemagh', image: '/images/clients/client-one.webp' },
  { key: 'two', avatar: 'hijab', image: '/images/clients/client-two.webp' },
  { key: 'three', avatar: 'ghutra', image: '/images/clients/client-three.webp' },
  { key: 'four', avatar: 'hijabLight', image: '/images/clients/client-four.webp' },
];

export const posts: readonly Post[] = [
  { key: 'content', accent: 1, href: '#', date: '2026-09-08', image: '/images/blog/content.webp' },
  { key: 'team', accent: 2, href: '#', date: '2026-09-01', image: '/images/blog/team.webp' },
  { key: 'brief', accent: 3, href: '#', date: '2026-08-25', image: '/images/blog/brief.webp' },
];

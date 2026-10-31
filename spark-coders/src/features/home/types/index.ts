import type { Messages } from '@/messages';

type Home = Messages['home'];

export type HeroWordKey = keyof Home['hero']['words'];
export type ProjectKey = keyof Home['work']['items'];
export type LeadTagKey = keyof Home['leads']['tags'];
export type DelightStepKey = keyof Home['delight']['steps'];
export type TeamMemberKey = keyof Home['team']['members'];
export type SectorKey = keyof Home['sectors']['items'];
export type TestimonialKey = keyof Home['testimonials']['items'];
export type PostKey = keyof Home['blog']['items'];

/** 1–6: which brand gradient a card falls back to when it has no photo. */
export type Accent = 1 | 2 | 3 | 4 | 5 | 6;

export interface Project {
  key: ProjectKey;
  accent: Accent;
  href: string;
  /** Path under /public. `null` renders the brand-gradient artwork instead of a photo. */
  image: string | null;
}

export interface Post {
  key: PostKey;
  accent: Accent;
  href: string;
  /** ISO date; rendered with the locale's calendar formatting. */
  date: string;
  image: string | null;
}

export interface TeamMember {
  key: TeamMemberKey;
  /** One letter shown in the avatar until a photo is supplied. */
  initial: { ar: string; en: string };
  href: string;
  image: string | null;
}

export interface Sector {
  key: SectorKey;
  icon: 'rocket' | 'cap' | 'cart';
}

/** Serializable copy handed from server components to client islands. */
export interface ProjectRow {
  key: ProjectKey;
  accent: Accent;
  href: string;
  image: string | null;
  title: string;
  category: string;
  alt: string;
}

export interface SectorPanel {
  key: SectorKey;
  icon: Sector['icon'];
  tab: string;
  title: string;
  title2: string;
  body: string;
  link: string;
}

/** A client voice. `image` is the client's own photo (with their permission); null shows the initial. */
export interface Testimonial {
  key: TestimonialKey;
  initial: { ar: string; en: string };
  image: string | null;
}

/** Serializable testimonial handed to the client carousel. */
export interface Quote {
  key: TestimonialKey;
  quote: string;
  name: string;
  role: string;
  initial: string;
  image: string | null;
  alt: string;
}

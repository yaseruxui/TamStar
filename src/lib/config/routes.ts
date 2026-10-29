export const routes = {
  home: '/',
  catalog: '/catalog',
  rfq: '/rfq',
  cart: '/cart',
  account: '/account',
  about: '/about',
  services: '/services',
  projects: '/projects',
  careers: '/careers',
  contact: '/contact',
} as const;

export type RouteKey = keyof typeof routes;
export type AppPathname = (typeof routes)[RouteKey];

export const primaryNav: readonly RouteKey[] = [
  'home',
  'catalog',
  'services',
  'projects',
  'about',
  'careers',
  'contact',
];

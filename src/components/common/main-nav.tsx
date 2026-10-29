'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { primaryNav, routes } from '@/lib/config/routes';
import { cn } from '@/utils/cn';

export function isActivePath(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export function MainNav() {
  const t = useTranslations('navigation');
  const pathname = usePathname();

  return (
    <nav aria-label={t('mainLabel')} className="hidden bg-navy lg:block">
      <ul className="container-site flex h-11 items-stretch gap-1">
        {primaryNav.map((key) => {
          const href = routes[key];
          const active = isActivePath(pathname, href);
          return (
            <li key={key} className="flex">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex items-center px-3 text-sm font-medium text-navy-on transition-colors hover:text-white',
                  active && 'text-white after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-brand',
                )}
              >
                {t(key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

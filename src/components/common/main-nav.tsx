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
    <nav aria-label={t('mainLabel')} className="hidden h-full lg:block">
      <ul className="flex h-full items-stretch gap-1">
        {primaryNav.map((key) => {
          const href = routes[key];
          const active = isActivePath(pathname, href);
          return (
            <li key={key} className="flex">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex items-center px-3 text-sm font-medium text-body transition-colors hover:text-ink',
                  'after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:scale-x-0 after:bg-brand after:transition-transform hover:after:scale-x-100',
                  active && 'text-ink after:scale-x-100',
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

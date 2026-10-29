'use client';

import { LayoutGrid } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { cn } from '@/utils/cn';

export interface CategoryLink {
  slug: string;
  name: string;
}

export function CategoryBar({ categories }: { categories: readonly CategoryLink[] }) {
  const t = useTranslations('navigation');
  const pathname = usePathname();

  return (
    <nav aria-label={t('categoriesLabel')}>
      <div className="container-site">
        <ul className="-mx-1 flex h-14 items-center gap-1.5 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <li className="shrink-0">
            <Link
              href="/catalog"
              aria-current={pathname === '/catalog' ? 'page' : undefined}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-navy-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-navy"
            >
              <LayoutGrid aria-hidden className="size-4" />
              {t('allCategories')}
            </Link>
          </li>
          {categories.map((category) => {
            const href = `/catalog/${category.slug}`;
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={category.slug} className="shrink-0">
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'inline-flex h-10 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap text-body transition-colors hover:bg-tile hover:text-ink',
                    active && 'bg-tile text-ink',
                  )}
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

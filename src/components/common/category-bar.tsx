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
    <nav aria-label={t('categoriesLabel')} className="border-b border-line bg-surface">
      <div className="container-site">
        <ul className="-mx-1 flex h-12 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <li className="shrink-0">
            <Link
              href="/catalog"
              aria-current={pathname === '/catalog' ? 'page' : undefined}
              className="inline-flex h-9 items-center gap-2 rounded-sm bg-navy px-3.5 text-sm font-semibold text-white hover:bg-navy-700"
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
                    'inline-flex h-9 items-center rounded-sm px-3 text-sm whitespace-nowrap text-body transition-colors hover:bg-canvas hover:text-ink',
                    active && 'bg-tint-100 font-medium text-navy',
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

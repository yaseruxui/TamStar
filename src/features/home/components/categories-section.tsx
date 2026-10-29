import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';
import { SectionHeading } from '@/components/ui/section-heading';
import { CategoryIcon } from '@/features/catalog/components/category-icon';
import { countItemsByCategory, getCategories } from '@/features/catalog/services/catalog';
import { Link } from '@/lib/i18n/navigation';

/** Catalog as an engineering index: numbered rows instead of a wall of cards. */
export async function CategoriesSection() {
  const [t, tCatalog, locale] = await Promise.all([
    getTranslations('home.categories'),
    getTranslations('catalog'),
    getLocale(),
  ]);
  const counts = countItemsByCategory();
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section aria-labelledby="home-categories" className="reveal container-site py-20 sm:py-24">
      <SectionHeading
        id="home-categories"
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('body')}
        action={
          <ButtonLink href="/catalog" variant="outline">
            {t('link')}
          </ButtonLink>
        }
      />
      <ol className="mt-12 grid border-t border-ink/80 lg:grid-cols-2 lg:gap-x-12">
        {getCategories().map((category, index) => (
          <li key={category.slug} className="border-b border-paper-line">
            <Link
              href={`/catalog/${category.slug}`}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 transition-colors hover:bg-surface sm:grid-cols-[3rem_auto_1fr_auto] sm:px-3"
            >
              <span className="font-mono text-xs text-muted tabular">{String(index + 1).padStart(2, '0')}</span>
              <CategoryIcon icon={category.icon} className="hidden size-10 rounded-sm sm:grid [&_svg]:size-5" />
              <span className="min-w-0">
                <span className="block font-display text-md font-medium text-ink">{category.name[locale]}</span>
                <span className="mt-0.5 block truncate text-sm text-muted">{category.summary[locale]}</span>
              </span>
              <span className="flex items-center gap-3 text-xs text-muted">
                <span className="hidden tabular sm:inline">
                  {tCatalog('itemsCount', { count: counts.get(category.slug) ?? 0 })}
                </span>
                <Arrow
                  aria-hidden
                  className="size-4 text-navy transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

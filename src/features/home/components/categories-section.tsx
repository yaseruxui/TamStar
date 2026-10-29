import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';
import { SectionHeading } from '@/components/ui/section-heading';
import { CategoryCard } from '@/features/catalog/components/category-card';
import { countItemsByCategory, getCategories } from '@/features/catalog/services/catalog';

export async function CategoriesSection() {
  const t = await getTranslations('home.categories');
  const counts = countItemsByCategory();

  return (
    <section aria-labelledby="home-categories" className="container-site py-16 sm:py-20">
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
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {getCategories().map((category) => (
          <li key={category.slug}>
            <CategoryCard category={category} itemCount={counts.get(category.slug) ?? 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}

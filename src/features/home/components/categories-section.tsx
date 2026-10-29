import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';
import { SectionHeading } from '@/components/ui/section-heading';
import { CategoryTile } from '@/features/catalog/components/category-tile';
import { countItemsByCategory, getCategories } from '@/features/catalog/services/catalog';

export async function CategoriesSection() {
  const t = await getTranslations('home.categories');
  const counts = countItemsByCategory();

  return (
    <section aria-labelledby="home-categories" className="container-site py-10 sm:py-12">
      <SectionHeading
        id="home-categories"
        eyebrow={t('eyebrow')}
        title={t('title')}
        action={
          <ButtonLink href="/catalog" variant="outline">
            {t('link')}
          </ButtonLink>
        }
      />
      <ul className="mt-6 grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-5 lg:grid-cols-9">
        {getCategories().map((category) => (
          <li key={category.slug}>
            <CategoryTile category={category} itemCount={counts.get(category.slug) ?? 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}

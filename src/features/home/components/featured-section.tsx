import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';
import { SectionHeading } from '@/components/ui/section-heading';
import { ItemCard } from '@/features/catalog/components/item-card';
import { getFeaturedItems } from '@/features/catalog/services/catalog';

export async function FeaturedSection() {
  const t = await getTranslations('home.featured');

  return (
    <section aria-labelledby="home-featured" className="border-y border-line bg-surface">
      <div className="container-site py-12 sm:py-16">
        <SectionHeading
          id="home-featured"
          eyebrow={t('eyebrow')}
          title={t('title')}
          action={
            <ButtonLink href="/catalog" variant="outline">
              {t('link')}
            </ButtonLink>
          }
        />
        <ul className="mt-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {getFeaturedItems().map((item) => (
            <li key={item.slug}>
              <ItemCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

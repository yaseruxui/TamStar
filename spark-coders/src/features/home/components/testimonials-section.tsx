import { getTranslations } from 'next-intl/server';
import { testimonials } from '../data/content';
import { TestimonialsCarousel } from './testimonials-carousel';

export async function TestimonialsSection() {
  const [t, tCommon] = await Promise.all([getTranslations('home.testimonials'), getTranslations('common')]);
  const quotes = testimonials.map((key) => ({
    key,
    quote: t(`items.${key}.quote`),
    author: t(`items.${key}.author`),
  }));

  return (
    <section aria-labelledby="testimonials-title" className="py-[clamp(80px,12vw,160px)]">
      <div className="container-site">
        <h2 id="testimonials-title" className="font-display text-2xl font-extrabold text-muted">
          {t('title')}
        </h2>
        <TestimonialsCarousel quotes={quotes} labels={{ prev: tCommon('prev'), next: tCommon('next') }} />
      </div>
    </section>
  );
}

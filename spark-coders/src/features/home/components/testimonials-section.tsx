import { getLocale, getTranslations } from 'next-intl/server';
import { testimonials } from '../data/content';
import { TestimonialsOrbit } from './testimonials-orbit';

export async function TestimonialsSection() {
  const [t, locale] = await Promise.all([getTranslations('home.testimonials'), getLocale()]);
  const quotes = testimonials.map((item) => {
    const name = t(`items.${item.key}.name`);
    return {
      key: item.key,
      // The card draws its own quote mark, so drop the typographic quotes around the text.
      quote: t(`items.${item.key}.quote`).replace(/^[«“"]\s*|\s*[»”"]$/g, ''),
      name,
      role: t(`items.${item.key}.role`),
      initial: item.initial[locale],
      image: item.image,
      alt: t('photoAlt', { name }),
    };
  });

  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden py-[clamp(80px,12vw,160px)] bg-[radial-gradient(40%_50%_at_50%_55%,rgb(110_41_172/0.22),transparent_70%)]"
    >
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="testimonials-title" className="display-xl">
            {t('title')}
          </h2>
          <p className="mt-5 text-lg text-muted">{t('lead')}</p>
        </div>
        <TestimonialsOrbit quotes={quotes} chooseLabel={t('choose')} />
      </div>
    </section>
  );
}

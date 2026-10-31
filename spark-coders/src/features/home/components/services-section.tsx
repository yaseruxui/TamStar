import { getTranslations } from 'next-intl/server';
import { Kashida } from '@/components/ui/kashida';
import { services } from '../data/content';
import { ServicesList } from './services-list';

/**
 * What we do: one glass row per service on the brand gradient; hovering a row shows its picture
 * beside the pointer. Each row leads to the contact form.
 */
export async function ServicesSection() {
  const t = await getTranslations('home.services');

  return (
    <section
      id="services"
      aria-label={t('aria')}
      className="relative overflow-hidden bg-[radial-gradient(60%_80%_at_100%_0%,rgb(178_108_255/0.35),transparent_60%),radial-gradient(60%_80%_at_0%_100%,rgb(127_238_250/0.2),transparent_60%),var(--grad-soft)] py-[clamp(80px,12vw,160px)]"
    >
      <div className="container-site">
        <div className="mb-[clamp(32px,5vw,56px)] flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-xl">
            <Kashida text={t('title')} />
          </h2>
          <p className="max-w-[26rem] text-text/85">{t('lead')}</p>
        </div>
        <ServicesList
          ctaLabel={t('cta')}
          rows={services.map((key) => ({
            key,
            title: t(`items.${key}.title`),
            body: t(`items.${key}.body`),
            alt: t(`items.${key}.alt`),
            image: `/images/services/${key}.webp`,
          }))}
        />
      </div>
    </section>
  );
}

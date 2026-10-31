import { getTranslations } from 'next-intl/server';
import { GuideCard } from '@/features/contact/components/guide-card';
import { sectors } from '../data/content';
import { SectorTabs } from './sector-tabs';

export async function SectorsSection() {
  const t = await getTranslations('home.sectors');
  const panels = sectors.map((sector) => ({
    key: sector.key,
    icon: sector.icon,
    tab: t(`items.${sector.key}.tab`),
    title: t(`items.${sector.key}.title`),
    title2: t(`items.${sector.key}.title2`),
    body: t(`items.${sector.key}.body`),
    link: t(`items.${sector.key}.link`),
  }));

  return (
    <section
      aria-label={t('aria')}
      className="relative overflow-hidden bg-[radial-gradient(60%_80%_at_100%_0%,rgb(178_108_255/0.35),transparent_60%),radial-gradient(60%_80%_at_0%_100%,rgb(127_238_250/0.2),transparent_60%),var(--grad-soft)] py-[clamp(64px,10vw,128px)]"
    >
      <div className="container-site">
        <div className="mb-10 max-w-2xl">
          <h2 className="display-xl">{t('title')}</h2>
          <p className="mt-4 text-lg text-text/85">{t('lead')}</p>
        </div>
        <SectorTabs panels={panels} tabsLabel={t('tabsAria')} />
        <GuideCard />
      </div>
    </section>
  );
}

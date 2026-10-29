import { Building, Factory, Mountain, Zap, type LucideIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/section-heading';

const SECTORS: ReadonlyArray<{ key: 'mining' | 'petrochemicals' | 'energy' | 'urban'; icon: LucideIcon }> = [
  { key: 'mining', icon: Mountain },
  { key: 'petrochemicals', icon: Factory },
  { key: 'energy', icon: Zap },
  { key: 'urban', icon: Building },
];

export async function SectorsSection() {
  const t = await getTranslations('home.sectors');
  return (
    <section aria-labelledby="home-sectors" className="container-site py-14 sm:py-20">
      <SectionHeading id="home-sectors" eyebrow={t('eyebrow')} title={t('title')} />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SECTORS.map(({ key, icon: Icon }) => (
          <li key={key} className="reveal rounded-xl bg-tile p-7 transition-colors hover:bg-tile-strong">
            <Icon aria-hidden className="size-8 text-brand" strokeWidth={1.6} />
            <h3 className="mt-6 text-lg">{t(`${key}.title`)}</h3>
            <p className="mt-2 text-sm leading-6">{t(`${key}.body`)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { Clock, MapPin, Plane, Ship, Truck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/section-heading';
import { company } from '@/lib/config/site';

export async function LogisticsSection() {
  const [t, tCommon] = await Promise.all([getTranslations('home.logistics'), getTranslations('common')]);

  const points = [
    { key: 'freight', icon: Ship },
    { key: 'jit', icon: Clock },
    { key: 'cargo', icon: Truck },
  ] as const;

  return (
    <section aria-labelledby="home-logistics" className="container-site pb-16 sm:pb-20">
      <div className="grid gap-8 overflow-hidden rounded-lg bg-navy-900 p-6 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <SectionHeading
            id="home-logistics"
            tone="dark"
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('body')}
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {points.map(({ key, icon: Icon }) => (
              <li key={key} className="flex gap-3 text-sm text-navy-on">
                <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-grid-navy relative rounded-md border border-white/10 p-6">
          <Plane aria-hidden className="absolute end-6 top-6 size-5 text-white/30" />
          <p className="text-xs font-semibold text-brand">{t('hq')}</p>
          <p className="mt-3 text-xl font-bold text-white">{tCommon('addressLine1')}</p>
          <p className="mt-1 text-base text-navy-on">{tCommon('addressLine2')}</p>
          <p className="mt-5 flex items-center gap-2 text-sm text-navy-on">
            <Clock aria-hidden className="size-4 text-brand" />
            {tCommon('officeHoursDays')} · {tCommon('officeHoursTime')}
          </p>
          <a
            href={company.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-sm bg-white px-4 text-sm font-semibold text-navy hover:bg-tint-100"
          >
            <MapPin aria-hidden className="size-4 text-brand" />
            {tCommon('openInMaps')}
          </a>
        </div>
      </div>
    </section>
  );
}

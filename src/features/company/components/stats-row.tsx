import { getTranslations } from 'next-intl/server';
import { stats } from '@/lib/config/site';
import { cn } from '@/utils/cn';

export async function StatsRow({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  const t = await getTranslations('common.stats');
  const dark = tone === 'dark';

  return (
    <dl
      className={cn(
        'grid grid-cols-2 overflow-hidden rounded-md border sm:grid-cols-4',
        dark ? 'divide-white/10 border-white/10 bg-white/5' : 'divide-line border-line bg-surface',
        'divide-x divide-y sm:divide-y-0 rtl:divide-x-reverse',
        className,
      )}
    >
      {stats.map((stat) => (
        <div key={stat.key} className="flex flex-col-reverse gap-1 px-4 py-4">
          <dt className={cn('text-xs', dark ? 'text-navy-on' : 'text-muted')}>{t(stat.key)}</dt>
          <dd
            className={cn(
              'tabular text-2xl font-bold',
              dark ? 'text-white' : 'text-navy',
              stat.key === 'years' && 'text-brand',
            )}
          >
            <bdi>{stat.value}</bdi>
          </dd>
        </div>
      ))}
    </dl>
  );
}

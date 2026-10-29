import { getLocale } from 'next-intl/server';
import { clients } from '../data/projects';
import { cn } from '@/utils/cn';

export async function ClientsStrip({ label, tone = 'dark' }: { label: string; tone?: 'dark' | 'light' }) {
  const locale = await getLocale();
  const dark = tone === 'dark';

  return (
    <div
      className={cn('flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10', dark ? 'text-navy-on' : 'text-muted')}
    >
      <p className="shrink-0 text-xs font-medium lg:max-w-44">{label}</p>
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {clients.map((client) => (
          <li key={client.key} className={cn('text-md font-bold tracking-tight', dark ? 'text-white/85' : 'text-navy')}>
            {client.name[locale]}
          </li>
        ))}
      </ul>
    </div>
  );
}

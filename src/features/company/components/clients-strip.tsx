import { getLocale } from 'next-intl/server';
import { clients } from '../data/projects';

export async function ClientsStrip({ label }: { label: string }) {
  const locale = await getLocale();
  return (
    <section aria-label={label} className="container-site pb-14 sm:pb-20">
      <div className="rounded-2xl bg-tile px-6 py-10">
        <p className="text-center text-sm text-muted">{label}</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {clients.map((client) => (
            <li key={client.key} className="font-display text-lg font-bold whitespace-nowrap text-ink/55 sm:text-xl">
              {client.name[locale]}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

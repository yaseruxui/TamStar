import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from './breadcrumbs';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs: readonly Crumb[];
  aside?: ReactNode;
}

export function PageHeader({ eyebrow, title, lead, crumbs, aside }: PageHeaderProps) {
  return (
    <section className="border-b border-line bg-surface">
      <div className="container-site py-8 sm:py-12">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-brand-ink">{eyebrow}</p>
            <h1 className="mt-2 text-2xl leading-tight sm:text-3xl">{title}</h1>
            {lead ? <p className="mt-4 max-w-2xl text-base leading-7 text-body sm:text-md">{lead}</p> : null}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}

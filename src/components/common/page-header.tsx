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
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold text-brand-ink">
              <span aria-hidden className="h-px w-5 bg-current" />
              {eyebrow}
            </p>
            <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
            {lead ? <p className="mt-4 text-md text-body">{lead}</p> : null}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}

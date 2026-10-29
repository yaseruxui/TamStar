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
    <section className="bg-drafting border-b border-paper-line">
      <div className="container-site py-10 sm:py-16">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-xs font-medium text-brand-ink">
              <span aria-hidden className="h-px w-8 bg-brand" />
              {eyebrow}
            </p>
            <h1 className="mt-4 text-2xl leading-tight sm:text-4xl">{title}</h1>
            {lead ? <p className="mt-5 max-w-2xl text-md leading-8 text-body">{lead}</p> : null}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}

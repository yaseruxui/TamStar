import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  tone?: 'light' | 'dark';
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  as: Heading = 'h2',
  tone = 'light',
  className,
  id,
}: SectionHeadingProps) {
  const dark = tone === 'dark';
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="max-w-2xl">
        {eyebrow ? (
          <p
            className={cn('mb-2 flex items-center gap-2 text-xs font-semibold', dark ? 'text-brand' : 'text-brand-ink')}
          >
            <span aria-hidden className="h-px w-5 bg-current" />
            {eyebrow}
          </p>
        ) : null}
        <Heading id={id} className={cn('text-xl leading-snug sm:text-2xl', dark && 'text-white')}>
          {title}
        </Heading>
        {description ? (
          <p className={cn('mt-2 text-base leading-7', dark ? 'text-navy-on' : 'text-muted')}>{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

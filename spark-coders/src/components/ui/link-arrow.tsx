import type { AnchorHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { ArrowIcon } from './icons';

export function LinkArrow({ className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn('inline-flex min-h-11 items-center gap-2 font-display text-sm font-semibold text-aqua', className)}
      {...props}
    >
      {children}
      <ArrowIcon />
    </a>
  );
}

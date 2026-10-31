import type { AnchorHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { ArrowIcon } from './icons';

export function LinkArrow({ className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        'group/la inline-flex items-center gap-2 font-display text-sm font-semibold text-aqua [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-brand hover:[&_svg]:-translate-x-1 ltr:hover:[&_svg]:translate-x-1',
        className,
      )}
      {...props}
    >
      {children}
      <ArrowIcon />
    </a>
  );
}

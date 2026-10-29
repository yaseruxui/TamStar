import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

const badgeVariants = cva('inline-flex items-center gap-1 rounded-xs font-semibold [&_svg]:size-3', {
  variants: {
    tone: {
      navy: 'bg-tint-200 text-navy',
      brand: 'bg-brand-soft/60 text-brand-ink',
      success: 'bg-success-soft text-success-ink',
      neutral: 'bg-canvas text-body ring-1 ring-line ring-inset',
      inverse: 'bg-white/10 text-white',
    },
    size: {
      sm: 'px-1.5 py-0.5 text-2xs',
      md: 'px-2 py-0.5 text-xs',
    },
    mono: {
      true: 'font-mono tracking-tight',
      false: '',
    },
  },
  defaultVariants: { tone: 'navy', size: 'md', mono: false },
});

export interface BadgeProps extends ComponentPropsWithoutRef<'span'>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, size, mono, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, size, mono }), className)} {...props} />;
}

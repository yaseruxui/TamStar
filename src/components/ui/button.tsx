import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

export const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-sm font-semibold whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-navy-950 hover:bg-brand-hover',
        navy: 'bg-navy text-white hover:bg-navy-700',
        outline: 'border border-line bg-surface text-navy hover:border-navy-600 hover:bg-tint-100',
        soft: 'bg-tint-200 text-navy hover:bg-tint-300',
        ghost: 'text-navy hover:bg-tint-100',
        inverse: 'bg-white text-navy hover:bg-tint-100',
        inverseOutline: 'border border-white/25 text-white hover:bg-white/10',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps extends ComponentPropsWithoutRef<'button'>, ButtonVariantProps {}

export function Button({ className, variant, size, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

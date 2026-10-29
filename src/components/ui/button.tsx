import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

export const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-b from-brand-light to-brand text-navy-950 shadow-[0_8px_20px_-8px_rgb(252_144_37/0.7)] hover:to-brand-hover',
        navy: 'bg-navy-950 text-white hover:bg-navy',
        outline: 'border border-line bg-surface text-ink hover:border-ink/30',
        soft: 'bg-tint-200 text-navy hover:bg-tint-300',
        ghost: 'text-navy hover:bg-tint-100',
        inverse: 'bg-white text-navy hover:bg-tint-100',
        inverseOutline: 'border border-white/25 text-white hover:bg-white/10',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-5 text-sm',
        lg: 'h-13 px-7 text-base',
        icon: 'size-11',
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

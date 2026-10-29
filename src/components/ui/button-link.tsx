import type { ComponentProps } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/utils/cn';
import { buttonVariants, type ButtonVariantProps } from './button';

type ButtonLinkProps = ComponentProps<typeof Link> & ButtonVariantProps;

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

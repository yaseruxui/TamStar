import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

export function Card({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('rounded-lg border border-line bg-surface shadow-card', className)} {...props} />;
}

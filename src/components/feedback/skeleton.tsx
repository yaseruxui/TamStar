import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

export function Skeleton({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div aria-hidden className={cn('animate-pulse rounded-sm bg-tint-200', className)} {...props} />;
}

export function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <div className="flex flex-col gap-5" aria-hidden>
      {Array.from({ length: fields }, (_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-11 w-full" />
        </div>
      ))}
      <Skeleton className="h-11 w-44" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="container-site py-12" aria-hidden>
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-4 h-9 w-2/3 max-w-xl" />
      <Skeleton className="mt-3 h-4 w-full max-w-2xl" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-44 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

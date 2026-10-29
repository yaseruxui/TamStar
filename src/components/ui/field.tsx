import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/utils/cn';

const controlBase =
  'w-full rounded-sm border bg-surface px-3 text-base text-ink placeholder:text-muted/80 transition-colors outline-none focus:border-navy-600 focus:ring-2 focus:ring-tint-300 disabled:bg-canvas aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger-soft';

export function Input({ className, ...props }: ComponentPropsWithoutRef<'input'>) {
  return <input className={cn(controlBase, 'h-11 border-line', className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentPropsWithoutRef<'textarea'>) {
  return <textarea className={cn(controlBase, 'min-h-28 border-line py-2.5', className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentPropsWithoutRef<'select'>) {
  return (
    <select
      className={cn(
        controlBase,
        'h-11 appearance-none border-line bg-[length:16px] bg-[position:right_0.75rem_center] bg-no-repeat pe-9 rtl:bg-[position:left_0.75rem_center]',
        "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23737781' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")]",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

interface FieldProps {
  id: string;
  label: string;
  children: ReactNode;
  hint?: string;
  error?: string;
  required?: boolean;
  optionalLabel?: string;
  className?: string;
}

/** Label + control + hint/error wiring. Controls should set `aria-describedby={describedBy(id, …)}`. */
export function Field({ id, label, children, hint, error, required, optionalLabel, className }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="flex items-baseline gap-1.5 text-sm font-medium text-ink">
        {label}
        {required ? (
          <span aria-hidden className="text-danger">
            *
          </span>
        ) : optionalLabel ? (
          <span className="text-xs font-normal text-muted">({optionalLabel})</span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(id: string, { hint, error }: { hint?: string; error?: string }): string | undefined {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

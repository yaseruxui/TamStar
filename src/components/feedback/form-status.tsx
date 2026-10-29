import { CircleAlert, CircleCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface FormStatusProps {
  tone: 'success' | 'error';
  title?: string;
  children: ReactNode;
  className?: string;
}

export function FormStatus({ tone, title, children, className }: FormStatusProps) {
  const Icon = tone === 'success' ? CircleCheck : CircleAlert;
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex gap-3 rounded-md border p-4 text-sm',
        tone === 'success'
          ? 'border-success/20 bg-success-soft text-success-ink'
          : 'border-danger/20 bg-danger-soft text-danger',
        className,
      )}
    >
      <Icon aria-hidden className="mt-0.5 size-5 shrink-0" />
      <div>
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className={cn(title && 'mt-0.5')}>{children}</div>
      </div>
    </div>
  );
}

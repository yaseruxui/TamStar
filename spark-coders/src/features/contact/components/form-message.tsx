import { cn } from '@/utils/cn';

export function FormMessage({ message, tone }: { message: string | null; tone: 'ok' | 'error' }) {
  return (
    <p role="status" className={cn('text-[0.9375rem]', tone === 'error' ? 'text-danger' : 'text-aqua')}>
      {message}
    </p>
  );
}

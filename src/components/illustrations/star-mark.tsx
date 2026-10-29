import { cn } from '@/utils/cn';

/** The five-point star from the TAMSTAR mark, used as a separator glyph. */
export function StarMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn('size-3 text-brand', className)}>
      <path fill="currentColor" d="M12 1.8l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9l7.1-.6z" />
    </svg>
  );
}

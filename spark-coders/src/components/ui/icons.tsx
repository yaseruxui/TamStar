import type { SVGProps } from 'react';
import { cn } from '@/utils/cn';

type IconProps = SVGProps<SVGSVGElement>;

const base = 'size-[1.1em] shrink-0';

/**
 * Points toward the reading direction's "forward": left in Arabic, right in English.
 * Shaft and arms are separate so a hovered link or button can open the head (`.learn-arrow`).
 */
export function ArrowIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn(base, 'learn-arrow ltr:-scale-x-100', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 12H5" />
      <path className="learn-arm learn-arm-top" d="M11 6 5 12" />
      <path className="learn-arm learn-arm-bottom" d="M5 12l6 6" />
    </svg>
  );
}

export function RocketIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn(base, className)} {...props}>
      <path
        d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2-.1-2.8a2.1 2.1 0 0 0-2.9-.2ZM12 15l-3-3a22 22 0 0 1 2-4A13 13 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2Z M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0m1 7v5s3-.6 4-2c1.1-1.6 0-5 0-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CapIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn(base, className)} {...props}>
      <path
        d="M22 10 12 5 2 10l10 5 10-5Zm-16 2v5c3 2.7 9 2.7 12 0v-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CartIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn(base, className)} {...props}>
      <path
        d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2M10 21h.01M17 21h.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

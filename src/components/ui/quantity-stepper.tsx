'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/utils/cn';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  decreaseLabel: string;
  increaseLabel: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 1_000_000,
  label,
  decreaseLabel,
  increaseLabel,
  size = 'md',
  className,
}: QuantityStepperProps) {
  const height = size === 'sm' ? 'h-9' : 'h-11';
  const set = (next: number) => onChange(Math.min(max, Math.max(min, Number.isFinite(next) ? Math.round(next) : min)));
  const button =
    'grid aspect-square h-full place-items-center text-navy transition-colors hover:bg-tint-100 disabled:text-subtle disabled:hover:bg-transparent';

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        'inline-flex items-stretch overflow-hidden rounded-full border border-line bg-surface',
        height,
        className,
      )}
    >
      <button
        type="button"
        aria-label={decreaseLabel}
        disabled={value <= min}
        onClick={() => set(value - 1)}
        className={button}
      >
        <Minus aria-hidden className="size-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        aria-label={label}
        onChange={(event) => set(Number(event.target.value))}
        className="w-14 border-x border-line bg-transparent text-center text-sm font-semibold text-ink tabular outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        aria-label={increaseLabel}
        disabled={value >= max}
        onClick={() => set(value + 1)}
        className={button}
      >
        <Plus aria-hidden className="size-4" />
      </button>
    </div>
  );
}

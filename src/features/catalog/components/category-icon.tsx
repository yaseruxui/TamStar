import { Cog, Cylinder, Droplets, Flame, Gauge, Hammer, HardHat, Package, Plug, type LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { CategoryIcon as CategoryIconKey } from '../types';

const icons: Record<CategoryIconKey, LucideIcon> = {
  valve: Cylinder,
  gauge: Gauge,
  hardHat: HardHat,
  flame: Flame,
  plug: Plug,
  cog: Cog,
  hammer: Hammer,
  droplets: Droplets,
  package: Package,
};

const tones: Record<CategoryIconKey, string> = {
  valve: 'bg-tint-200 text-navy',
  gauge: 'bg-tint-200 text-navy',
  hardHat: 'bg-brand-soft/50 text-brand-ink',
  flame: 'bg-danger-soft text-danger',
  plug: 'bg-tint-200 text-navy',
  cog: 'bg-tint-200 text-navy',
  hammer: 'bg-brand-soft/50 text-brand-ink',
  droplets: 'bg-tint-200 text-link',
  package: 'bg-success-soft text-success',
};

export function CategoryIcon({ icon, className }: { icon: CategoryIconKey; className?: string }) {
  const Icon = icons[icon];
  return (
    <span
      aria-hidden
      className={cn('grid size-12 shrink-0 place-items-center rounded-md [&_svg]:size-6', tones[icon], className)}
    >
      <Icon strokeWidth={1.75} />
    </span>
  );
}

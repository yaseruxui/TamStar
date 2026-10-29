import { Globe, Leaf, Receipt, Target, Truck, Users, Wallet, Wrench, type LucideIcon } from 'lucide-react';
import type { ServiceIcon as ServiceIconKey } from '../data/services';

const icons: Record<ServiceIconKey, LucideIcon> = {
  receipt: Receipt,
  truck: Truck,
  users: Users,
  wrench: Wrench,
  target: Target,
  globe: Globe,
  wallet: Wallet,
  leaf: Leaf,
};

export function ServiceIcon({ icon }: { icon: ServiceIconKey }) {
  const Icon = icons[icon];
  return (
    <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-md bg-tint-200 text-navy">
      <Icon className="size-5" />
    </span>
  );
}

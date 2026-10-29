import type { LocalizedText } from '@/types/i18n';

export type CategoryIcon = 'valve' | 'gauge' | 'hardHat' | 'flame' | 'plug' | 'cog' | 'hammer' | 'droplets' | 'package';

export type SpecLabel =
  | 'sizes'
  | 'pressureClass'
  | 'materials'
  | 'ends'
  | 'operation'
  | 'range'
  | 'accuracy'
  | 'protection'
  | 'types'
  | 'application'
  | 'voltage'
  | 'compliance';

export const unitsOfMeasure = ['piece', 'set', 'meter', 'pair', 'box', 'roll', 'liter', 'kg', 'lot'] as const;

export type UnitOfMeasure = (typeof unitsOfMeasure)[number];

export interface ItemSpec {
  label: SpecLabel;
  value: string | LocalizedText;
}

export interface CatalogCategory {
  slug: string;
  icon: CategoryIcon;
  /** Item whose studio render represents the category. */
  cover: string;
  name: LocalizedText;
  summary: LocalizedText;
}

export interface CatalogItem {
  slug: string;
  category: string;
  name: LocalizedText;
  summary: LocalizedText;
  standards: readonly string[];
  specs: readonly ItemSpec[];
  unit: UnitOfMeasure;
  /** Odoo `default_code` once the item is linked to a product template. */
  odooCode?: string;
}

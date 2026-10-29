import type { LocalizedText } from './i18n';

export type Sector =
  | 'mining'
  | 'petrochemicals'
  | 'energy'
  | 'utilities'
  | 'maritime'
  | 'megaProjects'
  | 'urbanDevelopment'
  | 'realEstate';

export type ProjectStatus = 'active' | 'negotiating';

export interface Project {
  key: string;
  client: LocalizedText;
  sector: Sector;
  status: ProjectStatus;
  since: LocalizedText;
  term: LocalizedText | null;
  summary: LocalizedText;
  featured: boolean;
}

export interface Client {
  key: string;
  name: LocalizedText;
}

export interface Stat {
  key: 'years' | 'projects' | 'materials' | 'countries';
  value: string;
}

export type InquiryTopic = 'rfq' | 'product' | 'supplier' | 'other';

export type CareerPosition = 'sales' | 'purchase' | 'accounting' | 'logistics' | 'warehouse' | 'other';

/** RFQ lifecycle agreed in TAMSTAR_MVP.md §3. */
export const rfqStatuses = [
  'submitted',
  'underReview',
  'sourcing',
  'quotationPrepared',
  'sentToCustomer',
  'accepted',
  'rejected',
] as const;

export type RfqStatus = (typeof rfqStatuses)[number];

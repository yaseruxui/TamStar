'use client';

import dynamic from 'next/dynamic';
import { FormSkeleton } from '@/components/feedback/skeleton';
import type { CatalogOption } from './rfq-form';

/**
 * The RFQ form reads the browser-only RFQ list and the visitor's local date, so it ships as its own
 * chunk rendered on the client; the server streams a skeleton of similar height in its place.
 */
const RfqForm = dynamic(() => import('./rfq-form').then((module) => module.RfqForm), {
  ssr: false,
  loading: () => <FormSkeleton fields={6} />,
});

export function RfqFormLoader({ catalog }: { catalog: Readonly<Record<string, CatalogOption>> }) {
  return <RfqForm catalog={catalog} minDeliveryDate={new Date().toISOString().slice(0, 10)} />;
}

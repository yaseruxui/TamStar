import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';
import type { Messages } from '@/messages';

interface ClientMessagesProps {
  namespaces: ReadonlyArray<keyof Messages>;
  children: ReactNode;
}

/**
 * Ships only the listed translation namespaces to the client subtree, keeping
 * the HTML/RSC payload small on pages that don't need form or catalog copy.
 */
export async function ClientMessages({ namespaces, children }: ClientMessagesProps) {
  const messages = await getMessages();
  const picked = Object.fromEntries(namespaces.map((namespace) => [namespace, messages[namespace]]));
  return <NextIntlClientProvider messages={picked}>{children}</NextIntlClientProvider>;
}

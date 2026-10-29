import { Search } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { RfqBasketLink } from '@/features/rfq/components/rfq-basket-link';
import { Link } from '@/lib/i18n/navigation';
import { Logo } from './logo';
import { MainNav } from './main-nav';
import { MobileMenu } from './mobile-menu';
import { TopBar } from './top-bar';

export async function SiteHeader() {
  const t = await getTranslations('navigation');

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-30 border-b border-paper-line bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/85">
        <div className="container-site flex h-[4.5rem] items-center gap-6">
          <Logo priority className="h-9 sm:h-10" />
          <div className="hidden h-full flex-1 justify-center lg:flex">
            <MainNav />
          </div>
          <div className="ms-auto flex items-center gap-2 lg:ms-0">
            <Link
              href="/search"
              aria-label={t('searchLabel')}
              className="grid size-11 place-items-center rounded-sm border border-paper-line text-navy transition-colors hover:border-navy hover:bg-surface"
            >
              <Search aria-hidden className="size-[18px]" />
            </Link>
            <RfqBasketLink />
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}

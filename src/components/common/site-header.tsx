import { RfqBasketLink } from '@/features/rfq/components/rfq-basket-link';
import { HeaderSearch } from './header-search';
import { Logo } from './logo';
import { MainNav } from './main-nav';
import { MobileMenu } from './mobile-menu';
import { TopBar } from './top-bar';

export function SiteHeader() {
  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-30 border-b border-line bg-surface">
        <div className="container-site flex h-[4.5rem] items-center gap-3 sm:gap-6 lg:h-20">
          <Logo priority className="h-9 sm:h-11" />
          <HeaderSearch idPrefix="header-search" className="hidden max-w-2xl flex-1 md:flex" />
          <div className="ms-auto flex items-center gap-2">
            <RfqBasketLink />
            <MobileMenu />
          </div>
        </div>
        <div className="container-site pb-3 md:hidden">
          <HeaderSearch idPrefix="header-search-mobile" />
        </div>
      </header>
      <MainNav />
    </>
  );
}

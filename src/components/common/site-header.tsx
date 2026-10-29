import { ClipboardList, UserRound } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { CartDrawer } from '@/features/cart/components/cart-drawer';
import { getCartCatalog } from '@/features/cart/services/cart-catalog';
import { CatalogSearchForm } from '@/features/catalog/components/catalog-search-form';
import { getCategories } from '@/features/catalog/services/catalog';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/utils/cn';
import { CategoryBar } from './category-bar';
import { Logo } from './logo';
import { MobileMenu } from './mobile-menu';
import { TopBar } from './top-bar';

export async function SiteHeader() {
  const locale = await getLocale();
  const [t, catalog] = await Promise.all([getTranslations('navigation'), getCartCatalog(locale)]);
  const categories = getCategories().map((category) => ({ slug: category.slug, name: category.name[locale] }));
  const action =
    'inline-flex h-11 items-center gap-2 rounded-sm px-3 text-sm font-medium text-ink transition-colors hover:bg-canvas';

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-30 bg-surface/95 shadow-card backdrop-blur supports-[backdrop-filter]:bg-surface/90">
        <div className="container-site flex h-[4.75rem] items-center gap-4 lg:gap-8">
          <Logo priority className="h-9 sm:h-11" />
          <CatalogSearchForm idPrefix="header-search" className="hidden max-w-3xl flex-1 md:flex" />
          <div className="ms-auto flex items-center gap-1 sm:gap-2">
            <Link href="/account" className={cn(action, 'hidden xl:inline-flex')}>
              <UserRound aria-hidden className="size-5 text-navy" />
              {t('account')}
            </Link>
            <Link href="/rfq" className={cn(action, 'hidden lg:inline-flex')}>
              <ClipboardList aria-hidden className="size-5 text-navy" />
              {t('rfq')}
            </Link>
            <CartDrawer catalog={catalog} />
            <MobileMenu />
          </div>
        </div>
        <div className="container-site pb-3 md:hidden">
          <CatalogSearchForm idPrefix="header-search-mobile" />
        </div>
        <CategoryBar categories={categories} />
      </header>
    </>
  );
}

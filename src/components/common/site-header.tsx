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
  const pill =
    'inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-semibold text-ink transition-colors hover:border-ink/25';

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur-md">
        <div className="container-site flex h-20 items-center gap-4 lg:gap-6">
          <Logo priority className="h-10 sm:h-11" />
          <CatalogSearchForm idPrefix="header-search" className="hidden max-w-2xl flex-1 md:flex" />
          <div className="ms-auto flex items-center gap-2">
            <Link href="/rfq" className={cn(pill, 'hidden lg:inline-flex')}>
              <ClipboardList aria-hidden className="size-[18px] text-brand" />
              {t('rfq')}
            </Link>
            <Link href="/account" className={cn(pill, 'hidden xl:inline-flex')}>
              <UserRound aria-hidden className="size-[18px]" />
              {t('signIn')}
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

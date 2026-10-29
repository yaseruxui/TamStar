import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import logo from '@/assets/brand/tamstar-logo.png';
import { getCategories } from '@/features/catalog/services/catalog';
import { Link } from '@/lib/i18n/navigation';
import { company } from '@/lib/config/site';
import { toMailHref, toTelHref } from '@/utils/format';

export async function SiteFooter() {
  const [t, tNav, locale] = await Promise.all([getTranslations('common'), getTranslations('navigation'), getLocale()]);
  const year = new Date().getFullYear();

  const companyLinks = [
    { href: '/about', label: tNav('about') },
    { href: '/services', label: tNav('services') },
    { href: '/projects', label: tNav('projects') },
    { href: '/careers', label: tNav('careers') },
    { href: '/contact', label: tNav('contact') },
  ] as const;

  return (
    <footer className="border-t-4 border-brand bg-tile text-sm text-body">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Image src={logo} alt={t('brand')} sizes="160px" className="h-11 w-auto" />
          <p className="mt-5 max-w-xs leading-6">{t('vision2030')}.</p>
          <p className="mt-3 font-bold text-ink">{t('tagline')}</p>
        </div>

        <div>
          <h2 className="mb-4 text-md font-semibold text-ink">{t('address')}</h2>
          <address className="flex flex-col gap-3 not-italic">
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2.5 hover:text-brand-hover"
            >
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>
                {t('addressLine1')}
                <br />
                {t('addressLine2')}
              </span>
            </a>
            <p className="flex gap-2.5">
              <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>
                {t('officeHoursDays')}
                <br />
                {t('officeHoursTime')}
              </span>
            </p>
          </address>
        </div>

        <div>
          <h2 className="mb-4 text-md font-semibold text-ink">{tNav('getInTouch')}</h2>
          <ul className="flex flex-col gap-3">
            {company.phones.map((phone) => (
              <li key={phone}>
                <a href={toTelHref(phone)} className="inline-flex items-center gap-2.5 hover:text-brand-hover">
                  <Phone aria-hidden className="size-4 text-brand" />
                  <span dir="ltr" className="tabular">
                    {phone}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a href={toMailHref(company.email)} className="inline-flex items-center gap-2.5 hover:text-brand-hover">
                <Mail aria-hidden className="size-4 text-brand" />
                {company.email}
              </a>
            </li>
          </ul>
        </div>

        <nav
          aria-label={tNav('footerLabel')}
          className="grid grid-cols-2 gap-6 sm:col-span-2 lg:col-span-1 lg:grid-cols-1"
        >
          <div>
            <h2 className="mb-4 text-md font-semibold text-ink">{tNav('company')}</h2>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-hover">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:hidden">
            <h2 className="mb-4 text-md font-semibold text-ink">{tNav('catalog')}</h2>
            <ul className="flex flex-col gap-2.5">
              {getCategories()
                .slice(0, 5)
                .map((category) => (
                  <li key={category.slug}>
                    <Link href={`/catalog/${category.slug}`} className="hover:text-brand-hover">
                      {category.name[locale]}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>{tNav('copyright', { year })}</p>
          <p className="flex gap-4">
            <Link href="/catalog" className="hover:text-brand-hover">
              {tNav('catalog')}
            </Link>
            <Link href="/rfq" className="hover:text-brand-hover">
              {tNav('rfq')}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

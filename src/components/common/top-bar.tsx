import { Mail, Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { company } from '@/lib/config/site';
import { toMailHref, toTelHref } from '@/utils/format';
import { LocaleSwitcher } from './locale-switcher';

const COMPANY_LINKS = ['services', 'projects', 'about', 'careers', 'contact'] as const;

export async function TopBar() {
  const [t, tNav] = await Promise.all([getTranslations('common'), getTranslations('navigation')]);
  const [primaryPhone] = company.phones;

  return (
    <div className="bg-navy-950 text-xs text-navy-on/90">
      <div className="container-site flex h-9 items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <a href={toTelHref(primaryPhone)} className="inline-flex items-center gap-1.5 hover:text-white">
            <Phone aria-hidden className="size-3.5 text-brand" />
            <span dir="ltr" className="tabular">
              {primaryPhone}
            </span>
          </a>
          <a href={toMailHref(company.email)} className="hidden items-center gap-1.5 hover:text-white sm:inline-flex">
            <Mail aria-hidden className="size-3.5 text-brand" />
            {company.email}
          </a>
          <span className="hidden items-center gap-1.5 xl:inline-flex">
            <span aria-hidden className="size-1.5 rounded-full bg-success" />
            {t('vision2030')}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <nav aria-label={tNav('company')} className="hidden lg:block">
            <ul className="flex items-center gap-4">
              {COMPANY_LINKS.map((key) => (
                <li key={key}>
                  <Link href={`/${key}`} className="hover:text-white">
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <span aria-hidden className="hidden h-3 w-px bg-white/20 lg:block" />
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  );
}

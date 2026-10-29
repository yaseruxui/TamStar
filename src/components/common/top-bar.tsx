import { Clock, Mail, Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { company } from '@/lib/config/site';
import { toMailHref, toTelHref } from '@/utils/format';
import { LocaleSwitcher } from './locale-switcher';

export async function TopBar() {
  const t = await getTranslations('common');
  const [primaryPhone] = company.phones;

  return (
    <div className="bg-navy-950 text-xs text-navy-on">
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
          <span className="hidden items-center gap-1.5 rounded-xs bg-success px-2 py-0.5 text-2xs font-semibold text-white lg:inline-flex">
            {t('vision2030')}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-1.5 md:inline-flex">
            <Clock aria-hidden className="size-3.5" />
            {t('officeHoursShort')}
          </span>
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  );
}

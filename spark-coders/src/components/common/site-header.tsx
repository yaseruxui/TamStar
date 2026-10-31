import { getLocale, getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button';
import { ArrowIcon } from '@/components/ui/icons';
import { site } from '@/lib/config/site';
import { getPathname } from '@/lib/i18n/navigation';
import { routing } from '@/lib/i18n/routing';
import { navSections } from '@/lib/config/navigation';
import { BrandLogo } from './brand-logo';
import { HeaderFrame } from './header-frame';
import { SiteMenu } from './site-menu';

export async function SiteHeader() {
  const [locale, t, tNav] = await Promise.all([getLocale(), getTranslations('common'), getTranslations('navigation')]);
  const otherLocale = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  return (
    <HeaderFrame>
      <div className="container-site flex items-center justify-between gap-4">
        <a href="#top" aria-label={tNav('homeAria')} className="inline-flex">
          <BrandLogo />
        </a>
        <div className="flex items-center gap-3">
          <ButtonLink href="#contact" size="sm" className="max-sm:hidden">
            {t('startProject')}
            <ArrowIcon />
          </ButtonLink>
          <SiteMenu
            items={navSections.map((section) => ({ href: section.href, label: tNav(`items.${section.key}`) }))}
            socials={site.socials.map((social) => ({ href: social.href, label: t(`socials.${social.key}`) }))}
            labels={{
              open: t('menu'),
              close: t('close'),
              nav: tNav('mainAria'),
              followUs: t('followUs'),
              note: tNav('menuNote'),
            }}
            localeSwitch={{
              href: getPathname({ href: '/', locale: otherLocale }),
              hrefLang: otherLocale,
              label: tNav('switchLocale'),
              ariaLabel: tNav('switchLocaleAria'),
            }}
          />
        </div>
      </div>
    </HeaderFrame>
  );
}

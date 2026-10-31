import { getTranslations } from 'next-intl/server';
import { footerSections, navSections } from '@/lib/config/navigation';
import { site } from '@/lib/config/site';
import { BrandLogo } from './brand-logo';
import { SkodrWordmark } from './skodr-wordmark';

export async function SiteFooter() {
  const [t, tNav, tHome] = await Promise.all([
    getTranslations('common'),
    getTranslations('navigation'),
    getTranslations('home.outro'),
  ]);
  const hrefFor = (key: (typeof footerSections)[number]) => navSections.find((s) => s.key === key)?.href ?? '#top';
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden border-t border-line bg-ink-2 pt-[clamp(64px,10vw,120px)] pb-8">
      <div className="container-site">
        <SkodrWordmark
          withSlogan
          gradient
          className="mx-auto mb-[clamp(40px,6vw,80px)] w-[min(100%,920px)] text-muted"
        />
        <div className="grid grid-cols-2 gap-10 border-b border-line pb-10 lg:grid-cols-[2fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <a href="#top" aria-label={site.wordmark} className="inline-flex">
              <BrandLogo size="lg" />
            </a>
            <p className="mt-4 text-muted">{tHome('note')}</p>
          </div>
          <nav aria-label={tNav('quickLinks')}>
            <p className="label-sm">{tNav('quickLinks')}</p>
            <ul className="mt-3.5 grid gap-1.5">
              {footerSections.map((key) => (
                <li key={key}>
                  <a href={hrefFor(key)} className="text-muted transition-colors duration-200 hover:text-aqua">
                    {tNav(`items.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={tNav('socialAria')}>
            <p className="label-sm">{t('followUs')}</p>
            <ul className="mt-3.5 grid gap-1.5">
              {site.socials.slice(0, 3).map((social) => (
                <li key={social.key}>
                  <a
                    href={social.href}
                    rel="noopener"
                    className="text-muted transition-colors duration-200 hover:text-aqua"
                  >
                    {t(`socials.${social.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-3 pt-6 text-sm text-faint">
          <span>{t('rights', { year })}</span>
          <a href="#top" className="hover:text-text">
            {t('backToTop')} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

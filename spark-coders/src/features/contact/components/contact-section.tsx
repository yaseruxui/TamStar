import { getTranslations } from 'next-intl/server';
import { site } from '@/lib/config/site';
import { ContactForm } from './contact-form';
import { Kashida } from '@/components/ui/kashida';

export async function ContactSection() {
  const t = await getTranslations('contact');

  return (
    <section
      id="contact"
      className="border-t border-line bg-[radial-gradient(50%_60%_at_0%_100%,rgb(110_41_172/0.3),transparent_70%)] bg-ink py-[clamp(80px,12vw,160px)]"
    >
      <div className="container-site grid items-start gap-[clamp(40px,6vw,96px)] lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="display-xl">
            {t('title')}
            <br />
            <span className="text-violet">
              <Kashida text={t('titleAccent')} />
            </span>
          </h2>
          <p className="mt-5 text-muted">{t('lead')}</p>
          <ul className="mt-8 grid gap-3">
            <li className="flex items-baseline gap-4">
              <span className="min-w-16 text-sm text-faint">{t('emailLabel')}</span>
              <a href={`mailto:${site.email}`} dir="ltr" className="hover:text-aqua">
                {site.email}
              </a>
            </li>
            <li className="flex items-baseline gap-4">
              <span className="min-w-16 text-sm text-faint">{t('phoneLabel')}</span>
              <a href={`tel:${site.phone}`} dir="ltr" className="hover:text-aqua">
                {site.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

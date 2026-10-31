import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button';
import { ArrowIcon } from '@/components/ui/icons';
import { heroWords } from '../data/content';
import { HeroIntro } from './hero-intro';
import { HeroRotator } from './hero-rotator';
import { HeroShowcase } from './hero-showcase';
import { TechMarquee } from './tech-marquee';

export async function HeroSection() {
  const [t, tWork] = await Promise.all([getTranslations('home.hero'), getTranslations('home.work')]);

  return (
    <section id="top" className="relative isolate overflow-hidden pt-[calc(var(--header-h)+clamp(32px,6vw,72px))]">
      <div
        aria-hidden="true"
        className="absolute -inset-x-[10%] -top-[20%] -z-10 h-[120%] animate-drift bg-[radial-gradient(40%_45%_at_18%_30%,rgb(178_108_255/0.28),transparent_70%),radial-gradient(35%_40%_at_80%_60%,rgb(12_142_199/0.25),transparent_70%),radial-gradient(25%_30%_at_55%_15%,rgb(127_238_250/0.12),transparent_70%)] blur-[10px]"
      />
      <div className="container-site relative z-10 lg:min-h-[540px]">
        <div className="lg:max-w-[58%]">
          <HeroIntro
            intro={t.rich('intro', { b: (chunks) => <b className="font-semibold text-text">{chunks}</b> })}
            lines={[t('line1'), t('line2')]}
            rotator={<HeroRotator words={heroWords.map((key) => t(`words.${key}`))} />}
            actions={
              <>
                <ButtonLink href="#contact" className="max-sm:flex-[1_1_100%]">
                  {t('ctaPrimary')}
                  <ArrowIcon />
                </ButtonLink>
                <ButtonLink href="#work" variant="ghost" className="max-sm:flex-[1_1_100%]">
                  {t('ctaSecondary')}
                </ButtonLink>
              </>
            }
          />
        </div>
        <HeroShowcase
          shots={[
            { src: '/images/projects/dashboard.webp', alt: tWork('items.dashboard.alt') },
            { src: '/images/projects/ecommerce.webp', alt: tWork('items.ecommerce.alt') },
            { src: '/images/projects/clinic.webp', alt: tWork('items.clinic.alt') },
          ]}
        />
      </div>
      <TechMarquee label={t('stackLabel')} ariaLabel={t('stackAria')} />
    </section>
  );
}

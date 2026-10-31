import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button';
import { ArrowIcon } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/reveal';
import { heroWords } from '../data/content';
import { HeroRotator } from './hero-rotator';
import { TechMarquee } from './tech-marquee';

export async function HeroSection() {
  const t = await getTranslations('home.hero');

  return (
    <section id="top" className="relative isolate overflow-hidden pt-[calc(var(--header-h)+clamp(32px,6vw,72px))]">
      <div
        aria-hidden="true"
        className="absolute -inset-x-[10%] -top-[20%] -z-10 h-[120%] animate-drift bg-[radial-gradient(40%_45%_at_18%_30%,rgb(178_108_255/0.28),transparent_70%),radial-gradient(35%_40%_at_80%_60%,rgb(12_142_199/0.25),transparent_70%),radial-gradient(25%_30%_at_55%_15%,rgb(127_238_250/0.12),transparent_70%)] blur-[10px]"
      />
      <div className="container-site">
        <Reveal as="p" className="mb-[clamp(24px,4vw,48px)] max-w-[440px] text-muted">
          {t.rich('intro', { b: (chunks) => <b className="text-text">{chunks}</b> })}
        </Reveal>
        <h1 className="font-display text-[clamp(2.6rem,9.2vw,8.75rem)] leading-[1.12] font-extrabold tracking-[-0.015em]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="block animate-rise">{t('line1')}</span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="block animate-rise [animation-delay:0.12s]">{t('line2')}</span>
          </span>
          <HeroRotator words={heroWords.map((key) => t(`words.${key}`))} />
        </h1>
        <div className="mt-[clamp(28px,4vw,48px)] flex flex-wrap gap-3">
          <ButtonLink href="#contact" className="max-sm:flex-[1_1_100%]">
            {t('ctaPrimary')}
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="#work" variant="ghost" className="max-sm:flex-[1_1_100%]">
            {t('ctaSecondary')}
          </ButtonLink>
        </div>
      </div>
      <TechMarquee label={t('stackLabel')} ariaLabel={t('stackAria')} />
    </section>
  );
}

import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/utils/cn';
import { delightSteps } from '../data/content';
import { ConfettiStage } from './confetti-stage';
import { SectionHeading } from './section-heading';

const indent = ['', 'lg:ms-[8%]', 'lg:ms-[16%]', 'lg:ms-[24%]', 'lg:ms-[32%]'] as const;

export async function DelightSection() {
  const t = await getTranslations('home.delight');

  return (
    <ConfettiStage
      tapLabel={t('tap')}
      className="relative overflow-hidden border-t border-line bg-ink-2 py-[clamp(80px,12vw,150px)]"
    >
      <div className="container-site grid items-center gap-[clamp(32px,6vw,96px)] lg:grid-cols-[1.1fr_1fr]">
        <SectionHeading
          className="lg:order-2"
          eyebrow={t('eyebrow')}
          title={t('title')}
          accent={t('titleAccent')}
          body={t('body')}
        />
        <Reveal aria-hidden="true" className="grid gap-3">
          {delightSteps.map((key, index) => {
            const goal = index === delightSteps.length - 1;
            return (
              <div
                key={key}
                className={cn(
                  'flex items-center gap-4 rounded-2xl border px-5 py-4 font-display text-lg font-semibold transition-[translate,border-color] duration-500 ease-brand hover:-translate-x-1.5 hover:border-aqua ltr:hover:translate-x-1.5',
                  goal ? 'border-transparent bg-grad' : 'border-line-strong bg-glass',
                  indent[index],
                )}
              >
                <span className={cn('text-[0.8125rem]', goal ? 'text-white/80' : 'text-faint')}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                {t(`steps.${key}`)}
              </div>
            );
          })}
        </Reveal>
      </div>
    </ConfettiStage>
  );
}

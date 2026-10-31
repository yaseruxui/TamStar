import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { LinkArrow } from '@/components/ui/link-arrow';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/utils/cn';
import { team } from '../data/content';

export async function TeamSection() {
  const [t, locale] = await Promise.all([getTranslations('home.team'), getLocale()]);

  return (
    <section id="team" className="border-t border-line py-[clamp(80px,12vw,160px)]">
      <div className="container-site grid gap-[clamp(32px,5vw,72px)] lg:grid-cols-[1fr_2.2fr]">
        <div className="self-start lg:sticky lg:top-[calc(var(--header-h)+24px)]">
          <h2 className="display-xl">{t('title')}</h2>
          <p className="mt-5 text-muted">{t('body')}</p>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:gap-5">
          {team.map((member, index) => (
            <Reveal
              as="li"
              key={member.key}
              index={index}
              className="flex flex-col gap-1.5 rounded-card border border-line bg-glass p-3.5 transition-[border-color,translate] duration-500 ease-brand hover:-translate-y-1 hover:border-line-strong sm:p-5"
            >
              <div
                aria-hidden="true"
                className={cn(
                  'relative mb-3 grid aspect-square place-items-center overflow-hidden rounded-[999px_999px_24px_24px]',
                  index % 2
                    ? 'bg-[radial-gradient(70%_70%_at_70%_20%,rgb(178_108_255/0.5),transparent_60%),linear-gradient(135deg,var(--color-ink-3),var(--color-ocean))]'
                    : 'bg-[radial-gradient(70%_70%_at_30%_20%,rgb(127_238_250/0.35),transparent_60%),var(--grad-soft)]',
                )}
              >
                {member.image ? (
                  <Image
                    src={member.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 45vw, 240px"
                    className="object-cover"
                  />
                ) : (
                  <span className="font-display text-[2.5rem] font-extrabold text-white/85 sm:text-[4rem]">
                    {member.initial[locale]}
                  </span>
                )}
              </div>
              <h3 className="font-display text-xl font-semibold">{t(`members.${member.key}.name`)}</h3>
              <p className="text-[0.9375rem] text-aqua">{t(`members.${member.key}.role`)}</p>
              <p className="mb-2 text-[0.9375rem] text-muted max-sm:hidden">{t(`members.${member.key}.bio`)}</p>
              <LinkArrow href={member.href} className="mt-auto">
                {t('linkedin')}
              </LinkArrow>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

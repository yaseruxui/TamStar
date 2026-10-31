import { techStack } from '../data/content';

/** Endless logo-style strip; the list is rendered twice so the -50% loop is seamless. */
export function TechMarquee({ label, ariaLabel }: { label: string; ariaLabel: string }) {
  return (
    <div
      aria-label={ariaLabel}
      className="mt-[clamp(48px,8vw,96px)] flex items-center gap-6 border-y border-line bg-ink-2/60 px-(--gutter) py-[22px] max-sm:flex-col max-sm:items-stretch max-sm:gap-3"
    >
      <p className="w-[7.5rem] shrink-0 font-display text-[0.8125rem] leading-normal font-semibold text-muted max-sm:w-auto">
        {label}
      </p>
      <div
        dir="ltr"
        className="group/mq min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      >
        <ul className="flex w-max animate-marquee gap-14 group-hover/mq:[animation-play-state:paused]">
          {[...techStack, ...techStack].map((tech, index) => (
            <li
              key={`${tech}-${index}`}
              aria-hidden={index >= techStack.length || undefined}
              className="font-display text-[1.375rem] font-semibold whitespace-nowrap text-faint transition-colors duration-250 hover:text-aqua"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import Image from 'next/image';
import { site } from '@/lib/config/site';
import { cn } from '@/utils/cn';

interface BrandLogoProps {
  size?: 'md' | 'lg';
  className?: string;
}

/** Logo mark + "skodr" wordmark. The wordmark is Latin and always reads left-to-right. */
export function BrandLogo({ size = 'md', className }: BrandLogoProps) {
  const px = size === 'lg' ? 48 : 40;
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <Image src={site.logo} alt="" width={px} height={px} unoptimized priority={size === 'md'} />
      <span
        dir="ltr"
        className={cn(
          'text-gradient pb-[0.08em] font-display leading-none font-extrabold tracking-[-0.02em]',
          size === 'lg' ? 'text-[2rem]' : 'text-[1.625rem]',
        )}
      >
        {site.wordmark}
      </span>
    </span>
  );
}

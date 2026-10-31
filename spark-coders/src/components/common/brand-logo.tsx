import Image from 'next/image';
import { site } from '@/lib/config/site';
import { cn } from '@/utils/cn';
import { SkodrWordmark } from './skodr-wordmark';

interface BrandLogoProps {
  size?: 'md' | 'lg';
  className?: string;
}

/** The S mark + SKODR lettering. The lettering is Latin and always reads left-to-right. */
export function BrandLogo({ size = 'md', className }: BrandLogoProps) {
  const markHeight = size === 'lg' ? 44 : 34;
  const markWidth = Math.round((markHeight * site.mark.width) / site.mark.height);
  return (
    <span dir="ltr" className={cn('inline-flex items-center gap-2.5', className)}>
      <Image
        src={site.mark.src}
        alt=""
        width={markWidth}
        height={markHeight}
        priority={size === 'md'}
        sizes={`${markWidth}px`}
      />
      <SkodrWordmark className={cn('text-text', size === 'lg' ? 'w-[132px]' : 'w-[100px]')} />
    </span>
  );
}

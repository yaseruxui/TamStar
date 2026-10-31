import Image from 'next/image';
import { site } from '@/lib/config/site';
import { cn } from '@/utils/cn';
import { SkodrWordmark } from './skodr-wordmark';

interface BrandLogoProps {
  size?: 'md' | 'lg';
  className?: string;
}

/**
 * The full SKODR lockup: S mark, lettering and the "CRAFTING DIGITAL EXCELLENCE" slogan,
 * in the header and the footer. The lettering is Latin and always reads left-to-right.
 */
export function BrandLogo({ size = 'md', className }: BrandLogoProps) {
  const markHeight = size === 'lg' ? 56 : 44;
  const markWidth = Math.round((markHeight * site.mark.width) / site.mark.height);
  return (
    <span dir="ltr" className={cn('inline-flex items-center gap-3', className)}>
      <Image
        src={site.mark.src}
        alt=""
        width={markWidth}
        height={markHeight}
        priority={size === 'md'}
        sizes={`${markWidth}px`}
        className={cn(size === 'md' && 'max-sm:h-[38px] max-sm:w-auto')}
      />
      {size === 'lg' ? (
        <SkodrWordmark withSlogan className="w-[230px] text-text" />
      ) : (
        <SkodrWordmark withSlogan className="w-[144px] text-text sm:w-[168px]" />
      )}
    </span>
  );
}

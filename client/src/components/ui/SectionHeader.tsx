import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  darkMode?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  darkMode = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'max-w-3xl mb-12 sm:mb-16',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'text-xs uppercase tracking-[0.18em] font-bold font-sans mb-3',
            darkMode ? 'text-[#F5A623]' : 'text-[#835500]'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight leading-[1.2] mb-4',
          darkMode ? 'text-white' : 'text-[#1C1B1B]'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-base sm:text-lg leading-relaxed font-sans max-w-2xl',
            align === 'center' && 'mx-auto',
            darkMode ? 'text-[#F3F0EF]/80' : 'text-[#524534]'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

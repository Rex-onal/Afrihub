import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  darkMode?: boolean;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  darkMode = false,
  className,
  id,
  ...rest
}) => {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full py-16 sm:py-20 lg:py-28 overflow-hidden',
        darkMode ? 'bg-[#1C1B1B] text-white' : 'bg-transparent text-[#1C1B1B]',
        className
      )}
      {...rest}
    >
      {children}
    </section>
  );
};

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';
import { sectionRevealVariants } from '../../lib/motion';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  darkMode?: boolean;
  className?: string;
  id?: string;
  animate?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  darkMode = false,
  className,
  id,
  animate = true,
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (animate && !shouldReduceMotion) {
    return (
      <motion.section
        id={id}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={sectionRevealVariants}
        className={cn(
          'relative w-full py-16 sm:py-20 lg:py-28 overflow-hidden',
          darkMode ? 'bg-[#1C1B1B] text-white' : 'bg-transparent text-[#1C1B1B]',
          className
        )}
        {...(rest as unknown as Record<string, unknown>)}
      >
        {children}
      </motion.section>
    );
  }

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


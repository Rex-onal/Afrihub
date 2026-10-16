import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';
import { cardHoverVariants } from '../../lib/motion';

export type CardVariant = 'surface' | 'tonal' | 'dark' | 'outline';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: CardVariant;
  hoverLift?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  surface: 'bg-white text-[#1C1B1B] border border-[#D7C3AE]/40 shadow-[0_10px_30px_rgba(28,27,27,0.05)]',
  tonal: 'bg-[#F0EDEC] text-[#1C1B1B] border border-transparent shadow-[0_4px_16px_rgba(28,27,27,0.03)]',
  dark: 'bg-[#1C1B1B] text-white border border-[#2C2B2B] shadow-[0_12px_36px_rgba(0,0,0,0.35)]',
  outline: 'bg-transparent text-[#1C1B1B] border border-[#857462]/30',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'surface', hoverLift = false, children, className, ...rest }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const canHover = hoverLift && !shouldReduceMotion;

    return (
      <motion.div
        ref={ref}
        variants={canHover ? cardHoverVariants : undefined}
        initial={canHover ? 'initial' : undefined}
        whileHover={canHover ? 'hover' : undefined}
        className={cn(
          'rounded-[20px] p-6 transition-shadow',
          variantStyles[variant],
          hoverLift && 'hover:shadow-[0_18px_40px_rgba(28,27,27,0.12)]',
          className
        )}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

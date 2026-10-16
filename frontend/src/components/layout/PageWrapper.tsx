import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { routeTransitionVariants } from '../../lib/motion';
import { cn } from '../../lib/utils';

export interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, className }) => {
  const shouldReduceMotion = useReducedMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.main
      variants={shouldReduceMotion ? undefined : routeTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn('min-h-screen flex flex-col pt-20', className)}
    >
      {children}
    </motion.main>
  );
};

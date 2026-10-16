import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';

export interface FloatingDotsProps {
  className?: string;
  count?: number;
}

const DOT_CONFIGS = [
  { top: '15%', left: '10%', size: 8, color: '#F5A623', duration: 4.5, delay: 0 },
  { top: '25%', right: '12%', size: 12, color: '#006C4C', duration: 5.2, delay: 0.8 },
  { top: '65%', left: '18%', size: 6, color: '#E8572A', duration: 4.8, delay: 1.2 },
  { bottom: '20%', right: '15%', size: 10, color: '#006492', duration: 5.6, delay: 0.4 },
  { top: '45%', right: '28%', size: 7, color: '#F5A623', duration: 6.0, delay: 1.6 },
];

export const FloatingDots: React.FC<FloatingDotsProps> = ({ className, count = 5 }) => {
  const shouldReduceMotion = useReducedMotion();
  const dots = DOT_CONFIGS.slice(0, count);

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none select-none absolute inset-0 overflow-hidden', className)}
    >
      {dots.map((dot, idx) => (
        <motion.div
          key={idx}
          style={{
            position: 'absolute',
            top: dot.top,
            left: dot.left,
            right: dot.right,
            bottom: dot.bottom,
            width: dot.size,
            height: dot.size,
            borderRadius: '9999px',
            backgroundColor: dot.color,
            opacity: 0.25,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [-4, 6, -4],
                  x: [-2, 3, -2],
                  opacity: [0.2, 0.4, 0.2],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: dot.duration,
                  delay: dot.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />
      ))}
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { parseStatValue } from '../../lib/motion';
import { cn } from '../../lib/utils';

export interface StatCounterProps {
  value: string;
  label?: string;
  duration?: number;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  label,
  duration = 1.8,
  className,
  valueClassName,
  labelClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '50px' });
  const shouldReduceMotion = useReducedMotion();

  const parsed = parseStatValue(value);
  const [animatedDisplay, setAnimatedDisplay] = useState(
    `${parsed.prefix}0${parsed.suffix}`
  );

  const display = shouldReduceMotion ? value : animatedDisplay;

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const fallbackTimer = setTimeout(() => {
      setAnimatedDisplay(value);
    }, duration * 1000 + 100);

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentNumber = easeProgress * parsed.numericValue;

      const formattedNumber =
        parsed.decimals > 0
          ? currentNumber.toFixed(parsed.decimals)
          : Math.floor(currentNumber).toLocaleString();

      setAnimatedDisplay(`${parsed.prefix}${formattedNumber}${parsed.suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setAnimatedDisplay(value);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      clearTimeout(fallbackTimer);
    };
  }, [isInView, shouldReduceMotion, value, duration, parsed.decimals, parsed.numericValue, parsed.prefix, parsed.suffix]);

  return (
    <div
      ref={containerRef}
      className={cn('flex flex-col', className)}
      aria-label={`${value} ${label || ''}`.trim()}
    >
      <span
        aria-hidden="true"
        className={cn(
          'font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1B1B]',
          valueClassName
        )}
      >
        {display}
      </span>
      {label && (
        <span
          className={cn(
            'text-xs sm:text-sm font-medium text-[#524534] mt-1 uppercase tracking-wider',
            labelClassName
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
};

import React from 'react';
import { cn } from '../../lib/utils';

export interface DottedMapPatternProps {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  gap?: number;
}

export const DottedMapPattern: React.FC<DottedMapPatternProps> = ({
  className,
  dotColor = '#857462',
  dotSize = 1.5,
  gap = 24,
}) => {
  const patternId = React.useId();

  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none select-none absolute inset-0 w-full h-full opacity-20', className)}
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={gap}
          height={gap}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={gap / 2} cy={gap / 2} r={dotSize} fill={dotColor} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

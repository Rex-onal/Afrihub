import React from 'react';
import { cn } from '../../lib/utils';
import africaMapUrl from '../../assets/africa-map.svg';

export interface AfricaSilhouetteProps {
  className?: string;
  opacity?: number;
}

export const AfricaSilhouette: React.FC<AfricaSilhouetteProps> = ({
  className,
  opacity = 0.08,
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none select-none overflow-hidden', className)}
    >
      <img
        src={africaMapUrl}
        alt=""
        style={{ opacity }}
        className="w-full h-full object-contain filter grayscale contrast-200"
      />
    </div>
  );
};

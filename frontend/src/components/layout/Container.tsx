import React from 'react';
import { cn } from '../../lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

const sizeStyles: Record<'default' | 'narrow' | 'wide' | 'full', string> = {
  narrow: 'max-w-4xl',
  default: 'max-w-7xl',
  wide: 'max-w-8xl',
  full: 'max-w-full',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'default',
  ...rest
}) => {
  return (
    <div
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeStyles[size], className)}
      {...rest}
    >
      {children}
    </div>
  );
};

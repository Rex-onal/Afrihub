import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant = 'default' | 'success' | 'info' | 'warning' | 'outline' | 'coral' | 'dark';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[#F0EDEC] text-[#524534] border border-[#D7C3AE]/40',
  success: 'bg-[#86F8C6]/30 text-[#006C4C] border border-[#006C4C]/20',
  info: 'bg-[#5EBFFF]/25 text-[#006492] border border-[#006492]/20',
  warning: 'bg-[#F5A623]/20 text-[#835500] border border-[#F5A623]/30',
  coral: 'bg-[#E8572A]/15 text-[#E8572A] border border-[#E8572A]/25',
  outline: 'bg-transparent text-[#1C1B1B] border border-[#857462]/30',
  dark: 'bg-[#1C1B1B] text-white border border-transparent',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className,
  ...rest
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide',
        variantStyles[variant],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onToggle?: (selected: boolean) => void;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  id?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onToggle,
  onClick,
  disabled = false,
  icon,
  className,
  id,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const handleClick = () => {
    if (disabled) return;
    if (onToggle) onToggle(!selected);
    if (onClick) onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={selected}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      whileHover={disabled || shouldReduceMotion ? undefined : { y: -1 }}
      whileTap={disabled || shouldReduceMotion ? undefined : { scale: 0.96 }}
      className={cn(
        'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#835500] focus-visible:ring-offset-2',
        selected
          ? 'bg-[#1C1B1B] text-white shadow-sm border border-transparent'
          : 'bg-[#F0EDEC] text-[#1C1B1B] hover:bg-[#E5E2E1] border border-[#D7C3AE]/40',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
    >
      {selected ? (
        <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" aria-hidden="true" />
      ) : (
        icon && <span className="w-3.5 h-3.5 shrink-0 inline-flex items-center justify-center">{icon}</span>
      )}
      <span>{label}</span>
    </motion.button>
  );
};

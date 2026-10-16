import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';
import { formFeedbackVariants } from '../../lib/motion';

export interface PillRadioOption {
  value: string;
  label: string;
}

export interface PillRadioGroupProps {
  label?: string;
  options: PillRadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export const PillRadioGroup: React.FC<PillRadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  name,
  error,
  className,
  disabled = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const groupId = React.useId();
  const errorId = `${groupId}-error`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (disabled || !onChange) return;

    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % options.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + options.length) % options.length;
    }

    if (nextIndex !== null) {
      onChange(options[nextIndex].value);
      const nextBtn = document.getElementById(`${groupId}-pill-${options[nextIndex].value}`);
      nextBtn?.focus();
    }
  };

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <span id={`${groupId}-label`} className="text-xs sm:text-sm font-medium text-[#1C1B1B]">
          {label}
        </span>
      )}

      <div
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'inline-flex p-1 rounded-full bg-[#F0EDEC] border border-[#D7C3AE]/40 gap-1 select-none',
          className
        )}
      >
        {options.map((opt, idx) => {
          const isSelected = value === opt.value;
          const pillId = `${groupId}-pill-${opt.value}`;

          return (
            <button
              key={opt.value}
              id={pillId}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected || (!value && idx === 0) ? 0 : -1}
              disabled={disabled}
              onClick={() => {
                if (!disabled && onChange) onChange(opt.value);
              }}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                'relative flex-1 px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#835500]',
                isSelected
                  ? 'bg-[#1C1B1B] text-white shadow-sm'
                  : 'text-[#524534] hover:text-[#1C1B1B] hover:bg-white/40',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                disabled={disabled}
                onChange={() => onChange?.(opt.value)}
                className="sr-only"
                aria-hidden="true"
              />
              <span className="relative z-10">{opt.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            id={errorId}
            role="alert"
            variants={shouldReduceMotion ? undefined : formFeedbackVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-xs text-[#BA1A1A] font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

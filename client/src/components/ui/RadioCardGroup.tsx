import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formFeedbackVariants } from '../../lib/motion';

export interface RadioCardOption {
  value: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface RadioCardGroupProps {
  label?: string;
  options: RadioCardOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export const RadioCardGroup: React.FC<RadioCardGroupProps> = ({
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, currentIndex: number) => {
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
      const nextCard = document.getElementById(`${groupId}-card-${options[nextIndex].value}`);
      nextCard?.focus();
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
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
        className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3', className)}
      >
        {options.map((opt, idx) => {
          const isSelected = value === opt.value;
          const cardId = `${groupId}-card-${opt.value}`;

          return (
            <div
              key={opt.value}
              id={cardId}
              role="radio"
              tabIndex={isSelected || (!value && idx === 0) ? 0 : -1}
              aria-checked={isSelected}
              aria-disabled={disabled}
              onClick={() => {
                if (!disabled && onChange) onChange(opt.value);
              }}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                'relative p-4 rounded-[16px] border text-left cursor-pointer transition-all select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#835500] focus-visible:ring-offset-2',
                isSelected
                  ? 'bg-white border-[#1C1B1B] shadow-[0_4px_20px_rgba(28,27,27,0.08)] ring-1 ring-[#1C1B1B]'
                  : 'bg-white/60 border-[#D7C3AE]/60 hover:bg-white hover:border-[#857462]',
                disabled && 'opacity-50 cursor-not-allowed',
                error && !isSelected && 'border-[#BA1A1A]/50'
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

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {opt.icon && (
                    <div
                      className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0',
                        isSelected ? 'bg-[#1C1B1B] text-white' : 'bg-[#F0EDEC] text-[#524534]'
                      )}
                    >
                      {opt.icon}
                    </div>
                  )}
                  <h3 className="text-sm font-semibold text-[#1C1B1B]">{opt.title}</h3>
                </div>

                <div
                  className={cn(
                    'w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors',
                    isSelected
                      ? 'border-[#1C1B1B] bg-[#1C1B1B] text-white'
                      : 'border-[#D7C3AE] bg-white'
                  )}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              {opt.description && (
                <p className="mt-2 text-xs text-[#524534]/85 leading-relaxed">{opt.description}</p>
              )}
            </div>
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

import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formFeedbackVariants } from '../../lib/motion';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  error?: string;
  containerClassName?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, name, className, containerClassName, disabled, ...rest }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const generatedId = React.useId();
    const checkboxId = id || name || generatedId;
    const errorId = `${checkboxId}-error`;

    return (
      <div className={cn('flex flex-col gap-1', containerClassName)}>
        <label
          htmlFor={checkboxId}
          className={cn(
            'inline-flex items-start gap-3 cursor-pointer select-none text-sm text-[#1C1B1B]',
            disabled && 'opacity-60 cursor-not-allowed'
          )}
        >
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              name={name}
              disabled={disabled}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              className="peer sr-only"
              {...rest}
            />
            <div
              className={cn(
                'w-5 h-5 rounded-[6px] border border-[#D7C3AE]/80 bg-white transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#835500] peer-focus-visible:ring-offset-2 peer-checked:bg-[#1C1B1B] peer-checked:border-[#1C1B1B] flex items-center justify-center',
                error && 'border-[#BA1A1A]',
                className
              )}
            >
              <Check className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity stroke-[3]" />
            </div>
          </div>
          <span className="leading-tight">{label}</span>
        </label>

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
              className="text-xs text-[#BA1A1A] font-medium ml-8"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

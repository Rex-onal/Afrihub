import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formFeedbackVariants } from '../../lib/motion';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  containerClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder = 'Select an option',
      id,
      name,
      className,
      containerClassName,
      required,
      disabled,
      defaultValue = '',
      ...rest
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const generatedId = React.useId();
    const selectId = id || name || generatedId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    const describedBy = [error ? errorId : null, helperText ? helperId : null]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs sm:text-sm font-medium text-[#1C1B1B] flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-[#BA1A1A] ml-1" aria-hidden="true">*</span>}
            </span>
          </label>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            name={name}
            required={required}
            disabled={disabled}
            defaultValue={defaultValue}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cn(
              'w-full appearance-none rounded-[12px] bg-white border border-[#D7C3AE]/60 pl-4 pr-10 py-2.5 text-sm text-[#1C1B1B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#835500] focus:border-transparent cursor-pointer',
              error && 'border-[#BA1A1A] focus:ring-[#BA1A1A]',
              disabled && 'bg-[#F0EDEC] opacity-60 cursor-not-allowed',
              className
            )}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 pointer-events-none flex items-center gap-1.5 text-[#857462]">
            {error ? (
              <AlertCircle className="w-4 h-4 text-[#BA1A1A]" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            )}
          </div>
        </div>

        {helperText && !error && (
          <p id={helperId} className="text-xs text-[#524534]/80">
            {helperText}
          </p>
        )}

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
              className="text-xs text-[#BA1A1A] flex items-center gap-1 font-medium mt-0.5"
            >
              <span>{error}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Select.displayName = 'Select';

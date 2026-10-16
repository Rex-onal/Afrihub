import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formFeedbackVariants } from '../../lib/motion';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      name,
      className,
      containerClassName,
      required,
      disabled,
      ...rest
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const generatedId = React.useId();
    const inputId = id || name || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const describedBy = [error ? errorId : null, helperText ? helperId : null]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs sm:text-sm font-medium text-[#1C1B1B] flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-[#BA1A1A] ml-1" aria-hidden="true">*</span>}
            </span>
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-[#857462]">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            required={required}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cn(
              'w-full rounded-[12px] bg-white border border-[#D7C3AE]/60 px-4 py-2.5 text-sm text-[#1C1B1B] placeholder:text-[#857462]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#835500] focus:border-transparent',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-[#BA1A1A] focus:ring-[#BA1A1A]',
              disabled && 'bg-[#F0EDEC] opacity-60 cursor-not-allowed',
              className
            )}
            {...rest}
          />

          {rightIcon && !error && (
            <div className="absolute right-3.5 pointer-events-none text-[#857462]">
              {rightIcon}
            </div>
          )}

          {error && !rightIcon && (
            <div className="absolute right-3.5 pointer-events-none text-[#BA1A1A]">
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
            </div>
          )}
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

Input.displayName = 'Input';

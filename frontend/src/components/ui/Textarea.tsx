import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formFeedbackVariants } from '../../lib/motion';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      id,
      name,
      rows = 4,
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
    const textareaId = id || name || generatedId;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    const describedBy = [error ? errorId : null, helperText ? helperId : null]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs sm:text-sm font-medium text-[#1C1B1B] flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-[#BA1A1A] ml-1" aria-hidden="true">*</span>}
            </span>
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            name={name}
            rows={rows}
            required={required}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cn(
              'w-full rounded-[12px] bg-white border border-[#D7C3AE]/60 p-3.5 text-sm text-[#1C1B1B] placeholder:text-[#857462]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#835500] focus:border-transparent resize-y min-h-[100px]',
              error && 'border-[#BA1A1A] focus:ring-[#BA1A1A]',
              disabled && 'bg-[#F0EDEC] opacity-60 cursor-not-allowed',
              className
            )}
            {...rest}
          />

          {error && (
            <div className="absolute top-3.5 right-3.5 pointer-events-none text-[#BA1A1A]">
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

Textarea.displayName = 'Textarea';

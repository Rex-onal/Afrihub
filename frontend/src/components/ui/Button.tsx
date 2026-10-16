import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';
import {
  buttonHoverVariants,
  arrowGlideVariants,
  plusRotateVariants,
} from '../../lib/motion';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'play' | 'cardAction';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  animateHover?: boolean;
}

type NativeButtonProps = Omit<HTMLMotionProps<'button'>, 'children' | 'className'>;

export type ButtonProps = BaseButtonProps &
  (
    | (NativeButtonProps & { as?: 'button'; to?: never; href?: never })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string; to?: never })
    | (Omit<LinkProps, 'to'> & { as: 'link'; to: string; href?: never })
  );

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#1C1B1B] hover:bg-[#2C2B2B] text-white shadow-sm border border-transparent rounded-full font-medium',
  secondary:
    'bg-[#F5A623] hover:bg-[#E09618] text-[#1C1B1B] shadow-sm border border-transparent rounded-full font-semibold',
  outline:
    'bg-transparent hover:bg-[#F0EDEC] text-[#1C1B1B] border border-[#857462]/30 hover:border-[#1C1B1B] rounded-full font-medium',
  play:
    'bg-[#006C4C] hover:bg-[#005239] text-white rounded-full p-3.5 flex items-center justify-center shadow-md',
  cardAction:
    'bg-[#E8572A] hover:bg-[#CF491F] text-white rounded-xl p-2.5 flex items-center justify-center shadow-sm',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-xs px-3.5 py-1.5 gap-1.5',
  md: 'text-sm px-5 py-2.5 gap-2',
  lg: 'text-base px-7 py-3.5 gap-2.5',
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      children,
      className,
      animateHover = true,
      as = 'button',
      ...rest
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const isSpecialVariant = variant === 'play' || variant === 'cardAction';
    const isInteractive = !disabled && !loading;

    const baseClasses = cn(
      'inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#835500] focus-visible:ring-offset-2 select-none cursor-pointer',
      variantStyles[variant],
      !isSpecialVariant && sizeStyles[size],
      (disabled || loading) && 'opacity-60 cursor-not-allowed pointer-events-none',
      className
    );

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children && <span>{children}</span>}
        {!loading && rightIcon && (
          <motion.span
            className="inline-flex shrink-0"
            variants={shouldReduceMotion ? undefined : arrowGlideVariants}
          >
            {rightIcon}
          </motion.span>
        )}
        {!loading && variant === 'cardAction' && !children && (
          <motion.svg
            className="w-5 h-5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            variants={shouldReduceMotion ? undefined : plusRotateVariants}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </motion.svg>
        )}
        {!loading && variant === 'play' && !children && (
          <svg
            className="w-5 h-5 shrink-0 translate-x-0.5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </>
    );

    const motionProps =
      animateHover && isInteractive && !shouldReduceMotion
        ? {
            variants: buttonHoverVariants,
            initial: 'initial',
            whileHover: 'hover',
            whileTap: 'tap',
          }
        : {};

    if (as === 'link') {
      const { to, ...linkRest } = rest as Omit<LinkProps, 'to'> & { as: 'link'; to: string };
      return (
        <motion.div {...motionProps} className="inline-flex">
          <Link
            ref={ref as React.Ref<HTMLAnchorElement>}
            to={to}
            className={baseClasses}
            aria-disabled={disabled || loading}
            {...linkRest}
          >
            {content}
          </Link>
        </motion.div>
      );
    }

    if (as === 'a') {
      const { href, ...aRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        as: 'a';
        href: string;
      };
      return (
        <motion.div {...motionProps} className="inline-flex">
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={baseClasses}
            aria-disabled={disabled || loading}
            {...aRest}
          >
            {content}
          </a>
        </motion.div>
      );
    }

    const buttonRest = rest as NativeButtonProps;
    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={(buttonRest.type as 'button' | 'submit' | 'reset' | undefined) || 'button'}
        disabled={disabled || loading}
        aria-busy={loading}
        className={baseClasses}
        {...motionProps}
        {...buttonRest}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

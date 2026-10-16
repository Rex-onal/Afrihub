import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export type AlertVariant = 'success' | 'error' | 'info';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const variantConfig: Record<
  AlertVariant,
  { container: string; icon: React.ReactNode; titleColor: string }
> = {
  success: {
    container: 'bg-[#86F8C6]/20 border-[#006C4C]/30 text-[#006C4C]',
    icon: <CheckCircle2 className="w-5 h-5 text-[#006C4C] shrink-0" aria-hidden="true" />,
    titleColor: 'text-[#006C4C]',
  },
  error: {
    container: 'bg-[#FFDAD6]/40 border-[#BA1A1A]/30 text-[#BA1A1A]',
    icon: <AlertCircle className="w-5 h-5 text-[#BA1A1A] shrink-0" aria-hidden="true" />,
    titleColor: 'text-[#BA1A1A]',
  },
  info: {
    container: 'bg-[#5EBFFF]/20 border-[#006492]/30 text-[#006492]',
    icon: <Info className="w-5 h-5 text-[#006492] shrink-0" aria-hidden="true" />,
    titleColor: 'text-[#006492]',
  },
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className,
}) => {
  const config = variantConfig[variant];

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'w-full rounded-[14px] border p-4 flex items-start gap-3 text-sm leading-relaxed transition-colors',
        config.container,
        className
      )}
    >
      <div className="mt-0.5">{config.icon}</div>
      <div className="flex-1">
        {title && <h3 className={cn('font-semibold text-sm mb-1', config.titleColor)}>{title}</h3>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss alert"
          className="text-current opacity-60 hover:opacity-100 transition-opacity p-0.5 rounded cursor-pointer"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

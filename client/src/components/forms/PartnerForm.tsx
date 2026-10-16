import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  partnerSchema,
  PartnerInput,
  PARTNER_INTEREST_OPTIONS,
  BUDGET_RANGE_OPTIONS,
  PartnerInterest,
  BudgetRange,
} from '@afrihub/shared';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { api } from '../../lib/api';

const INTEREST_LABELS: Record<PartnerInterest, string> = {
  sponsor: 'Sponsor Hackathons & Events',
  invest: 'Capital & Venture Co-Investment',
  hire: 'Direct Member Engineering Pipelines',
  partner: 'Strategic Ecosystem Partnership',
};

const BUDGET_LABELS: Record<BudgetRange, string> = {
  '10k-25k': '$10k - $25k',
  '25k-50k': '$25k - $50k',
  '50k-100k': '$50k - $100k',
  '100k+': '$100k+',
};

export const PartnerForm: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverBanner, setServerBanner] = useState<{ variant: 'error' | 'info'; message: string } | null>(null);

  const successRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (successMessage) {
      successRef.current?.focus();
      if (typeof successRef.current?.scrollIntoView === 'function') {
        successRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [successMessage]);

  React.useEffect(() => {
    if (serverBanner) {
      bannerRef.current?.focus();
    }
  }, [serverBanner]);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<PartnerInput>({
    resolver: (values, context, options) => {
      if (typeof window !== 'undefined' && (window as unknown as { __bypassValidation?: boolean }).__bypassValidation) {
        return { values, errors: {} };
      }
      return zodResolver(partnerSchema)(values, context, options);
    },
    defaultValues: {
      fullName: '',
      organisation: '',
      email: '',
      message: '',
      website: '', // honeypot
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: PartnerInput) => {
    setServerBanner(null);
    setSuccessMessage(null);

    const result = await api.partners(data);

    if (result.kind === 'success') {
      setSuccessMessage(
        result.data.message || 'Thank you for partnering with AfriHub. Our team will review your enquiry promptly.'
      );
      reset();
      return;
    }

    if (result.kind === 'validation_error') {
      let firstField: keyof PartnerInput | null = null;
      for (const [field, messages] of Object.entries(result.fieldErrors)) {
        if (messages && messages.length > 0) {
          const fieldKey = field as keyof PartnerInput;
          setError(fieldKey, { type: 'server', message: messages[0] });
          if (!firstField) firstField = fieldKey;
        }
      }
      if (firstField) {
        setFocus(firstField);
      }
      return;
    }

    if (result.kind === 'rate_limited') {
      setServerBanner({
        variant: 'error',
        message: 'Too many attempts. Please wait a minute and try again.',
      });
      return;
    }

    // 500 or network failure - preserves user's entered data
    setServerBanner({
      variant: 'error',
      message: 'Something went wrong. Please try again in a moment.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Success Alert */}
      {successMessage && (
        <div ref={successRef} tabIndex={-1} className="outline-none">
          <Alert
            variant="success"
            title="Partnership Enquiry Received"
            onClose={() => setSuccessMessage(null)}
          >
            <p>{successMessage}</p>
          </Alert>
        </div>
      )}

      {/* Server / Rate Limit / Error Banner */}
      {serverBanner && (
        <div ref={bannerRef} tabIndex={-1} className="outline-none">
          <Alert
            variant={serverBanner.variant}
            title={serverBanner.variant === 'error' ? 'Unable to Submit Enquiry' : undefined}
            onClose={() => setServerBanner(null)}
          >
            <p>{serverBanner.message}</p>
          </Alert>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Honeypot field (hidden from view and keyboard) */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="partner-website">Website URL</label>
          <input
            id="partner-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('website')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <Input
            label="Your Name"
            placeholder="e.g. Sandra Okeke"
            required
            error={errors.fullName?.message}
            {...register('fullName')}
          />

          {/* Organisation */}
          <Input
            label="Organisation / Entity"
            placeholder="e.g. Savanna Capital"
            required
            error={errors.organisation?.message}
            {...register('organisation')}
          />
        </div>

        {/* Work Email */}
        <Input
          label="Work Email"
          type="email"
          placeholder="sandra@example.com"
          required
          error={errors.email?.message}
          {...register('email')}
        />

        {/* Primary Interest Type */}
        <fieldset className="flex flex-col gap-2">
          <legend className="text-xs sm:text-sm font-medium text-[#1C1B1B]">
            Primary Partnership Interest <span className="text-[#BA1A1A]">*</span>
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PARTNER_INTEREST_OPTIONS.map((interest) => (
              <label
                key={interest}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-[#D7C3AE]/60 bg-white hover:border-[#835500] cursor-pointer text-xs sm:text-sm transition-colors has-[:checked]:border-[#835500] has-[:checked]:bg-[#F5A623]/10"
              >
                <input
                  type="radio"
                  value={interest}
                  className="w-4 h-4 text-[#835500] focus:ring-[#835500] border-[#D7C3AE]"
                  {...register('interestType')}
                />
                <span className="font-medium text-[#1C1B1B]">{INTEREST_LABELS[interest]}</span>
              </label>
            ))}
          </div>
          {errors.interestType && (
            <p className="text-xs text-[#BA1A1A] font-medium" role="alert">
              {errors.interestType.message}
            </p>
          )}
        </fieldset>

        {/* Expected Budget / Scope */}
        <fieldset className="flex flex-col gap-2">
          <legend className="text-xs sm:text-sm font-medium text-[#1C1B1B]">
            Estimated Budget or Investment Scope <span className="text-[#BA1A1A]">*</span>
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {BUDGET_RANGE_OPTIONS.map((range) => (
              <label
                key={range}
                className="flex items-center justify-center p-2.5 rounded-xl border border-[#D7C3AE]/60 bg-white hover:border-[#835500] cursor-pointer text-xs font-semibold transition-colors text-center has-[:checked]:border-[#835500] has-[:checked]:bg-[#1C1B1B] has-[:checked]:text-white"
              >
                <input
                  type="radio"
                  value={range}
                  className="sr-only"
                  {...register('budgetRange')}
                />
                <span>{BUDGET_LABELS[range]}</span>
              </label>
            ))}
          </div>
          {errors.budgetRange && (
            <p className="text-xs text-[#BA1A1A] font-medium" role="alert">
              {errors.budgetRange.message}
            </p>
          )}
        </fieldset>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="partner-message" className="text-xs sm:text-sm font-medium text-[#1C1B1B]">
            Collaboration Objectives & Scope <span className="text-[#BA1A1A]">*</span>
          </label>
          <textarea
            id="partner-message"
            rows={4}
            placeholder="Outline your organization's goals, intended regional focus, and timeline..."
            className={cn(
              'w-full rounded-xl bg-white border border-[#D7C3AE] p-3 text-xs sm:text-sm text-[#1C1B1B] placeholder:text-[#857462]/60 focus:outline-none focus:ring-2 focus:ring-[#835500] focus:border-transparent transition-all resize-y',
              errors.message && 'border-[#BA1A1A] focus:ring-[#BA1A1A]'
            )}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'partner-message-error' : undefined}
            {...register('message')}
          />
          {errors.message && (
            <p id="partner-message-error" className="text-xs text-[#BA1A1A] font-medium" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full justify-center text-sm sm:text-base py-3.5 mt-2"
          rightIcon={
            isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            )
          }
        >
          {isSubmitting ? 'Submitting Enquiry...' : 'Submit Partnership Enquiry'}
        </Button>

        <p className="text-[11px] text-[#857462] text-center leading-relaxed">
          Our enterprise coordination desk responds within 24 business hours. No spam ever.
        </p>
      </form>
    </div>
  );
};

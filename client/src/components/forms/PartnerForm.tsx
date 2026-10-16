import React, { useState } from 'react';
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
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

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
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<PartnerInput | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PartnerInput>({
    resolver: zodResolver(partnerSchema),
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
    // Phase 5: UI & validation only.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmittedData(data);
    setIsSuccess(true);
  };

  if (isSuccess && submittedData) {
    return (
      <div
        className="p-6 sm:p-8 rounded-2xl bg-[#006C4C]/10 border border-[#006C4C]/30 text-[#1C1B1B]"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-3 mb-3 text-[#006C4C]">
          <CheckCircle2 className="w-6 h-6 shrink-0" aria-hidden="true" />
          <h3 className="font-serif text-lg sm:text-xl font-bold">
            Partnership Enquiry Validated
          </h3>
        </div>
        <p className="text-sm text-[#524534] leading-relaxed mb-4">
          Thank you, <strong className="text-[#1C1B1B]">{submittedData.fullName}</strong> from{' '}
          <strong className="text-[#1C1B1B]">{submittedData.organisation}</strong>.
          Your enterprise partnership enquiry has passed all client-side validation gates.
        </p>
        <div className="p-3.5 rounded-xl bg-white/80 border border-[#006C4C]/20 text-xs text-[#524534] space-y-1 mb-5">
          <p className="font-bold text-[#006C4C] uppercase tracking-wider text-[11px]">
            Phase 5 Development Mode
          </p>
          <p>Work Email: {submittedData.email}</p>
          <p>Interest: {INTEREST_LABELS[submittedData.interestType] || submittedData.interestType}</p>
          <p>Budget Tier: {BUDGET_LABELS[submittedData.budgetRange] || submittedData.budgetRange}</p>
          <p className="text-[#857462] mt-2 italic">
            Form is completely verified and ready for Neon backend connection in Phase 7.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => {
            setIsSuccess(false);
            setSubmittedData(null);
            reset();
          }}
        >
          Submit Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot field */}
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
        rightIcon={!isSubmitting ? <ArrowRight className="w-4 h-4" /> : undefined}
      >
        {isSubmitting ? 'Validating Enquiry...' : 'Submit Partnership Enquiry'}
      </Button>

      <p className="text-[11px] text-[#857462] text-center leading-relaxed">
        Our enterprise coordination desk responds within 24 business hours. No spam ever.
      </p>
    </form>
  );
};

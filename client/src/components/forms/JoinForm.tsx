import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  joinSchema,
  JoinInput,
  COUNTRY_OPTIONS,
  TRACK_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
  INTEREST_OPTIONS,
  Track,
  ExperienceLevel,
  Interest,
} from '@afrihub/shared';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const COUNTRY_LABELS: Record<string, string> = {
  NG: 'Nigeria',
  KE: 'Kenya',
  GH: 'Ghana',
  RW: 'Rwanda',
  ZA: 'South Africa',
  EG: 'Egypt',
  UG: 'Uganda',
  TZ: 'Tanzania',
  SN: 'Senegal',
  OTHER: 'Other African Nation',
};

const TRACK_LABELS: Record<Track, string> = {
  software: 'Software Engineering',
  data_ai: 'Data & AI Systems',
  design: 'UI/UX Design',
  product: 'Product & Systems',
};

const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  beginner: 'Beginner',
  junior: 'Junior (1-2y)',
  mid: 'Mid (3-5y)',
  senior: 'Senior (5y+)',
};

const INTEREST_LABELS: Record<Interest, string> = {
  hackathons: 'Hackathons',
  scholarships: 'Scholarships',
  open_source: 'Open Source',
  mentorship: 'Mentorship',
  job_pipelines: 'Career Pathways',
};

export const JoinForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<JoinInput | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JoinInput>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      fullName: '',
      email: '',
      interests: ['hackathons', 'scholarships'],
      website: '', // honeypot
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: JoinInput) => {
    // In Phase 5: UI & validation only. Simulate brief processing time.
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
            Profile Validated Successfully
          </h3>
        </div>
        <p className="text-sm text-[#524534] leading-relaxed mb-4">
          Welcome to AfriHub, <strong className="text-[#1C1B1B]">{submittedData.fullName}</strong>!
          Your builder enrolment profile has passed all client-side validation gates.
        </p>
        <div className="p-3.5 rounded-xl bg-white/80 border border-[#006C4C]/20 text-xs text-[#524534] space-y-1 mb-5">
          <p className="font-bold text-[#006C4C] uppercase tracking-wider text-[11px]">
            Phase 5 Development Mode
          </p>
          <p>Email: {submittedData.email}</p>
          <p>Track: {TRACK_LABELS[submittedData.track] || submittedData.track}</p>
          <p>Country: {COUNTRY_LABELS[submittedData.country] || submittedData.country}</p>
          <p>Interests: {submittedData.interests.join(', ')}</p>
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
          Submit Another Profile
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot field (hidden from view and keyboard) */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="join-website">Website URL</label>
        <input
          id="join-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      {/* Full Name */}
      <Input
        label="Full Name"
        placeholder="e.g. Amina Diallo"
        required
        error={errors.fullName?.message}
        {...register('fullName')}
      />

      {/* Email */}
      <Input
        label="Work or Personal Email"
        type="email"
        placeholder="amina@example.com"
        required
        error={errors.email?.message}
        {...register('email')}
      />

      {/* Country of Residence */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="join-country" className="text-xs sm:text-sm font-medium text-[#1C1B1B]">
          Country of Residence <span className="text-[#BA1A1A]">*</span>
        </label>
        <select
          id="join-country"
          className={cn(
            'w-full rounded-xl bg-white border border-[#D7C3AE] px-3.5 py-2.5 text-xs sm:text-sm text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#835500] focus:border-transparent transition-all',
            errors.country && 'border-[#BA1A1A] focus:ring-[#BA1A1A]'
          )}
          aria-invalid={errors.country ? 'true' : 'false'}
          aria-describedby={errors.country ? 'join-country-error' : undefined}
          {...register('country')}
        >
          <option value="">Select country...</option>
          {COUNTRY_OPTIONS.map((code) => (
            <option key={code} value={code}>
              {COUNTRY_LABELS[code] || code}
            </option>
          ))}
        </select>
        {errors.country && (
          <p id="join-country-error" className="text-xs text-[#BA1A1A] font-medium" role="alert">
            {errors.country.message}
          </p>
        )}
      </div>

      {/* Primary Discipline Track */}
      <fieldset className="flex flex-col gap-2">
        <legend className="text-xs sm:text-sm font-medium text-[#1C1B1B]">
          Primary Discipline Track <span className="text-[#BA1A1A]">*</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TRACK_OPTIONS.map((track) => (
            <label
              key={track}
              className="flex items-center gap-2.5 p-3 rounded-xl border border-[#D7C3AE]/60 bg-white hover:border-[#835500] cursor-pointer text-xs sm:text-sm transition-colors has-[:checked]:border-[#835500] has-[:checked]:bg-[#F5A623]/10"
            >
              <input
                type="radio"
                value={track}
                className="w-4 h-4 text-[#835500] focus:ring-[#835500] border-[#D7C3AE]"
                {...register('track')}
              />
              <span className="font-medium text-[#1C1B1B]">{TRACK_LABELS[track]}</span>
            </label>
          ))}
        </div>
        {errors.track && (
          <p className="text-xs text-[#BA1A1A] font-medium" role="alert">
            {errors.track.message}
          </p>
        )}
      </fieldset>

      {/* Experience Level */}
      <fieldset className="flex flex-col gap-2">
        <legend className="text-xs sm:text-sm font-medium text-[#1C1B1B]">
          Experience Level <span className="text-[#BA1A1A]">*</span>
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {EXPERIENCE_LEVEL_OPTIONS.map((level) => (
            <label
              key={level}
              className="flex items-center justify-center p-2.5 rounded-xl border border-[#D7C3AE]/60 bg-white hover:border-[#835500] cursor-pointer text-xs font-semibold transition-colors text-center has-[:checked]:border-[#835500] has-[:checked]:bg-[#1C1B1B] has-[:checked]:text-white"
            >
              <input
                type="radio"
                value={level}
                className="sr-only"
                {...register('experienceLevel')}
              />
              <span>{EXPERIENCE_LABELS[level]}</span>
            </label>
          ))}
        </div>
        {errors.experienceLevel && (
          <p className="text-xs text-[#BA1A1A] font-medium" role="alert">
            {errors.experienceLevel.message}
          </p>
        )}
      </fieldset>

      {/* Areas You Wish to Explore */}
      <fieldset className="flex flex-col gap-2">
        <legend className="text-xs sm:text-sm font-medium text-[#1C1B1B]">
          Areas You Wish to Explore <span className="text-[#BA1A1A]">*</span>
        </legend>
        <Controller
          name="interests"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((interest) => {
                const checked = field.value?.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => {
                      const current = field.value || [];
                      const updated = checked
                        ? current.filter((i) => i !== interest)
                        : [...current, interest];
                      field.onChange(updated);
                    }}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#835500]',
                      checked
                        ? 'bg-[#F5A623] text-[#1C1B1B] border-[#F5A623] font-bold shadow-xs'
                        : 'bg-white text-[#524534] border-[#D7C3AE] hover:border-[#835500]'
                    )}
                    role="checkbox"
                    aria-checked={checked}
                  >
                    {INTEREST_LABELS[interest]}
                  </button>
                );
              })}
            </div>
          )}
        />
        {errors.interests && (
          <p className="text-xs text-[#BA1A1A] font-medium" role="alert">
            {errors.interests.message}
          </p>
        )}
      </fieldset>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full justify-center text-sm sm:text-base py-3.5 mt-2"
        rightIcon={!isSubmitting ? <ArrowRight className="w-4 h-4" /> : undefined}
      >
        {isSubmitting ? 'Validating Profile...' : 'Join AfriHub'}
      </Button>

      <p className="text-[11px] text-[#857462] text-center leading-relaxed">
        By joining, you agree to the AfriHub Community Code of Conduct. No spam ever.
      </p>
    </form>
  );
};

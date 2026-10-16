import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactSchema,
  ContactInput,
  CONTACT_CATEGORY_OPTIONS,
  ContactCategory,
} from '@afrihub/shared';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CheckCircle2, Send } from 'lucide-react';
import { cn } from '../../lib/utils';

const CATEGORY_LABELS: Record<ContactCategory, string> = {
  community: 'Community Membership & Hubs',
  partnerships: 'Enterprise Partnerships',
  talent: 'Engineering Talent Inquiries',
  scholarships: 'Scholarships & Certifications',
  press: 'Press & Media Requests',
  support: 'General Support & Operations',
};

export const ContactForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactInput | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      message: '',
      newsletterOptIn: false,
      website: '', // honeypot
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: ContactInput) => {
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
            Message Validated Successfully
          </h3>
        </div>
        <p className="text-sm text-[#524534] leading-relaxed mb-4">
          Thank you, <strong className="text-[#1C1B1B]">{submittedData.fullName}</strong>.
          Your message has passed all client-side validation rules.
        </p>
        <div className="p-3.5 rounded-xl bg-white/80 border border-[#006C4C]/20 text-xs text-[#524534] space-y-1 mb-5">
          <p className="font-bold text-[#006C4C] uppercase tracking-wider text-[11px]">
            Phase 5 Development Mode
          </p>
          <p>Email: {submittedData.email}</p>
          <p>Category: {CATEGORY_LABELS[submittedData.category] || submittedData.category}</p>
          <p>Subject: {submittedData.subject}</p>
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
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Honeypot field */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">Website URL</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          label="Email Address"
          type="email"
          placeholder="amina@example.com"
          required
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      {/* Inquiry Category */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-category" className="text-xs sm:text-sm font-medium text-[#1C1B1B]">
          Inquiry Category / Department <span className="text-[#BA1A1A]">*</span>
        </label>
        <select
          id="contact-category"
          className={cn(
            'w-full rounded-xl bg-white border border-[#D7C3AE] px-3.5 py-2.5 text-xs sm:text-sm text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#835500] focus:border-transparent transition-all',
            errors.category && 'border-[#BA1A1A] focus:ring-[#BA1A1A]'
          )}
          aria-invalid={errors.category ? 'true' : 'false'}
          aria-describedby={errors.category ? 'contact-category-error' : undefined}
          {...register('category')}
        >
          <option value="">Select inquiry category...</option>
          {CONTACT_CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat] || cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p id="contact-category-error" className="text-xs text-[#BA1A1A] font-medium" role="alert">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <Input
        label="Subject"
        placeholder="Brief summary of your inquiry"
        required
        error={errors.subject?.message}
        {...register('subject')}
      />

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-xs sm:text-sm font-medium text-[#1C1B1B]">
          Detailed Message <span className="text-[#BA1A1A]">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="Tell us about your project, questions, or how we can collaborate..."
          className={cn(
            'w-full rounded-xl bg-white border border-[#D7C3AE] p-3 text-xs sm:text-sm text-[#1C1B1B] placeholder:text-[#857462]/60 focus:outline-none focus:ring-2 focus:ring-[#835500] focus:border-transparent transition-all resize-y',
            errors.message && 'border-[#BA1A1A] focus:ring-[#BA1A1A]'
          )}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-xs text-[#BA1A1A] font-medium" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Newsletter opt-in */}
      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#524534] pt-1 select-none">
        <input
          type="checkbox"
          className="mt-0.5 w-4 h-4 rounded text-[#835500] focus:ring-[#835500] border-[#D7C3AE]"
          {...register('newsletterOptIn')}
        />
        <span>Notify me of upcoming hackathons, regional scholarships, and continental research reports.</span>
      </label>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full justify-center text-sm sm:text-base py-3.5 mt-2"
        rightIcon={!isSubmitting ? <Send className="w-4 h-4" /> : undefined}
      >
        {isSubmitting ? 'Sending Message...' : 'Send Message'}
      </Button>

      <p className="text-[11px] text-[#857462] text-center leading-relaxed">
        We respect your privacy. No spam ever.
      </p>
    </form>
  );
};

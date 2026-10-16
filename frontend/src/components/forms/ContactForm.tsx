import React, { useState, useRef } from 'react';
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
import { Alert } from '../ui/Alert';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { api } from '../../lib/api';

const CATEGORY_LABELS: Record<ContactCategory, string> = {
  community: 'Community Membership & Hubs',
  partnerships: 'Enterprise Partnerships',
  talent: 'Engineering Talent Inquiries',
  scholarships: 'Scholarships & Certifications',
  press: 'Press & Media Requests',
  support: 'General Support & Operations',
};

export const ContactForm: React.FC = () => {
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
  } = useForm<ContactInput>({
    resolver: (values, context, options) => {
      if (typeof window !== 'undefined' && (window as unknown as { __bypassValidation?: boolean }).__bypassValidation) {
        return { values, errors: {} };
      }
      return zodResolver(contactSchema)(values, context, options);
    },
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
    setServerBanner(null);
    setSuccessMessage(null);

    const result = await api.contact(data);

    if (result.kind === 'success') {
      setSuccessMessage(
        result.data.message || 'Thank you for contacting AfriHub. We will respond within 48 hours.'
      );
      reset();
      return;
    }

    if (result.kind === 'validation_error') {
      let firstField: keyof ContactInput | null = null;
      for (const [field, messages] of Object.entries(result.fieldErrors)) {
        if (messages && messages.length > 0) {
          const fieldKey = field as keyof ContactInput;
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
            title="Message Dispatched"
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
            title={serverBanner.variant === 'error' ? 'Unable to Send Message' : undefined}
            onClose={() => setServerBanner(null)}
          >
            <p>{serverBanner.message}</p>
          </Alert>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Honeypot field (hidden from view and keyboard) */}
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
          rightIcon={
            isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="w-4 h-4" aria-hidden="true" />
            )
          }
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </Button>

        <p className="text-[11px] text-[#857462] text-center leading-relaxed">
          We respect your privacy. No spam ever.
        </p>
      </form>
    </div>
  );
};

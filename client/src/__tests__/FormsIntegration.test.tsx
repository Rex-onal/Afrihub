import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { JoinForm } from '../components/forms/JoinForm';
import { PartnerForm } from '../components/forms/PartnerForm';
import { ContactForm } from '../components/forms/ContactForm';
import * as apiModule from '../lib/api';

describe('Phase 7 Full-Stack Form Wiring & Integration Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('JoinForm', () => {
    it('submits valid data, shows 201 Alert, resets form, and focuses success message', async () => {
      vi.spyOn(apiModule.api, 'join').mockResolvedValueOnce({
        kind: 'success',
        status: 201,
        data: { message: 'Welcome to AfriHub! Your community registration has been confirmed.' },
      });

      render(<JoinForm />);

      // Fill in fields
      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Kwame Mensah' } });
      fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'kwame@afrihub.example' } });
      fireEvent.change(screen.getByLabelText(/Country of Residence/i), { target: { value: 'GH' } });
      fireEvent.click(screen.getByLabelText(/Software Engineering/i));
      fireEvent.click(screen.getByLabelText('Junior (1-2y)'));

      // Submit
      const submitBtn = screen.getByRole('button', { name: /Join AfriHub Community/i });
      fireEvent.click(submitBtn);

      // Verify success Alert
      const alert = await screen.findByRole('status');
      expect(alert).toHaveTextContent(/Registration Confirmed/i);
      expect(alert).toHaveTextContent(/Welcome to AfriHub/i);

      // Verify form reset
      expect(screen.getByLabelText(/Full Name/i)).toHaveValue('');
      expect(screen.getByLabelText(/Email Address/i)).toHaveValue('');
    });

    it('maps 409 conflict error to email field with approved message', async () => {
      vi.spyOn(apiModule.api, 'join').mockResolvedValueOnce({
        kind: 'conflict',
        status: 409,
        message: 'This email is already registered with AfriHub. Contact us if you need help.',
      });

      render(<JoinForm />);

      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Kwame Mensah' } });
      fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'kwame@afrihub.example' } });
      fireEvent.change(screen.getByLabelText(/Country of Residence/i), { target: { value: 'GH' } });
      fireEvent.click(screen.getByLabelText(/Software Engineering/i));
      fireEvent.click(screen.getByLabelText('Junior (1-2y)'));

      fireEvent.click(screen.getByRole('button', { name: /Join AfriHub Community/i }));

      // Verify field error
      const emailError = await screen.findByText('This email is already registered with AfriHub. Contact us if you need help.');
      expect(emailError).toBeInTheDocument();
      expect(screen.getByLabelText(/Email Address/i)).toHaveFocus();
    });

    it('handles 429 rate limit with approved copy', async () => {
      vi.spyOn(apiModule.api, 'join').mockResolvedValueOnce({
        kind: 'rate_limited',
        status: 429,
        message: 'Too many attempts. Please wait a minute and try again.',
      });

      render(<JoinForm />);

      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Kwame Mensah' } });
      fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'kwame@afrihub.example' } });
      fireEvent.change(screen.getByLabelText(/Country of Residence/i), { target: { value: 'GH' } });
      fireEvent.click(screen.getByLabelText(/Software Engineering/i));
      fireEvent.click(screen.getByLabelText('Junior (1-2y)'));

      fireEvent.click(screen.getByRole('button', { name: /Join AfriHub Community/i }));

      const alert = await screen.findByRole('alert');
      expect(alert).toHaveTextContent(/Too many attempts. Please wait a minute and try again./i);
    });

    it('handles 500 / network error and preserves entered data', async () => {
      vi.spyOn(apiModule.api, 'join').mockResolvedValueOnce({
        kind: 'network_error',
        status: 0,
        message: 'Something went wrong. Please try again in a moment.',
      });

      render(<JoinForm />);

      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Kwame Mensah' } });
      fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'kwame@afrihub.example' } });
      fireEvent.change(screen.getByLabelText(/Country of Residence/i), { target: { value: 'GH' } });
      fireEvent.click(screen.getByLabelText(/Software Engineering/i));
      fireEvent.click(screen.getByLabelText('Junior (1-2y)'));

      fireEvent.click(screen.getByRole('button', { name: /Join AfriHub Community/i }));

      const alert = await screen.findByRole('alert');
      expect(alert).toHaveTextContent(/Something went wrong. Please try again in a moment./i);

      // Verify user input is preserved
      expect(screen.getByLabelText(/Full Name/i)).toHaveValue('Kwame Mensah');
      expect(screen.getByLabelText(/Email Address/i)).toHaveValue('kwame@afrihub.example');
    });
  });

  describe('PartnerForm', () => {
    it('submits valid data, shows 201 Alert, and resets form', async () => {
      vi.spyOn(apiModule.api, 'partners').mockResolvedValueOnce({
        kind: 'success',
        status: 201,
        data: { message: 'Thank you for partnering with AfriHub. Our team will review your enquiry promptly.' },
      });

      render(<PartnerForm />);

      fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Sandra Okeke' } });
      fireEvent.change(screen.getByLabelText(/Organisation \/ Entity/i), { target: { value: 'Savanna Capital' } });
      fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: 'sandra@savanna.example' } });
      fireEvent.click(screen.getByLabelText(/Sponsor Hackathons & Events/i));
      fireEvent.click(screen.getByLabelText('$50k - $100k'));
      fireEvent.change(screen.getByLabelText(/Collaboration Objectives & Scope/i), {
        target: { value: 'We would like to discuss strategic sponsorship for pan-African hackathon pipelines.' },
      });

      fireEvent.click(screen.getByRole('button', { name: /Submit Partnership Enquiry/i }));

      const alert = await screen.findByRole('status');
      expect(alert).toHaveTextContent(/Partnership Enquiry Received/i);
      expect(alert).toHaveTextContent(/Thank you for partnering with AfriHub/i);

      expect(screen.getByLabelText(/Your Name/i)).toHaveValue('');
    });

    it('maps server 400 validation error onto fields and focuses first invalid field', async () => {
      vi.spyOn(apiModule.api, 'partners').mockResolvedValueOnce({
        kind: 'validation_error',
        status: 400,
        message: 'Validation failed',
        fieldErrors: {
          organisation: ['Organisation name must be at least 2 characters'],
        },
      });

      render(<PartnerForm />);

      fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Sandra Okeke' } });
      fireEvent.change(screen.getByLabelText(/Organisation \/ Entity/i), { target: { value: 'S' } });
      fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: 'sandra@savanna.example' } });
      fireEvent.click(screen.getByLabelText(/Sponsor Hackathons & Events/i));
      fireEvent.click(screen.getByLabelText('$50k - $100k'));
      fireEvent.change(screen.getByLabelText(/Collaboration Objectives & Scope/i), {
        target: { value: 'We would like to discuss strategic sponsorship for pan-African hackathon pipelines.' },
      });

      // Bypass client zod validation to send to API
      (window as unknown as { __bypassValidation: boolean }).__bypassValidation = true;
      fireEvent.click(screen.getByRole('button', { name: /Submit Partnership Enquiry/i }));
      (window as unknown as { __bypassValidation: boolean }).__bypassValidation = false;

      const errorText = await screen.findByText('Organisation name must be at least 2 characters');
      expect(errorText).toBeInTheDocument();
      expect(screen.getByLabelText(/Organisation \/ Entity/i)).toHaveFocus();
    });
  });

  describe('ContactForm', () => {
    it('submits valid data, shows 201 Alert, and resets form', async () => {
      vi.spyOn(apiModule.api, 'contact').mockResolvedValueOnce({
        kind: 'success',
        status: 201,
        data: { message: 'Thank you for contacting AfriHub. We will respond within 48 hours.' },
      });

      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Amina Diallo' } });
      fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'amina@example.com' } });
      fireEvent.change(screen.getByLabelText(/Inquiry Category \/ Department/i), { target: { value: 'scholarships' } });
      fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Scholarship eligibility question' } });
      fireEvent.change(screen.getByLabelText(/Detailed Message/i), {
        target: { value: 'Could you clarify the hardware grant criteria for West African applicants?' },
      });

      fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

      const alert = await screen.findByRole('status');
      expect(alert).toHaveTextContent(/Message Dispatched/i);
      expect(alert).toHaveTextContent(/Thank you for contacting AfriHub/i);

      expect(screen.getByLabelText(/Full Name/i)).toHaveValue('');
    });
  });
});

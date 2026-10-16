import { z } from 'zod';

export const PARTNER_INTEREST_OPTIONS = ['invest', 'sponsor', 'hire', 'partner'] as const;
export type PartnerInterest = (typeof PARTNER_INTEREST_OPTIONS)[number];

export const BUDGET_RANGE_OPTIONS = ['10k-25k', '25k-50k', '50k-100k', '100k+'] as const;
export type BudgetRange = (typeof BUDGET_RANGE_OPTIONS)[number];

export const partnerSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be under 100 characters'),
  organisation: z
    .string()
    .min(2, 'Organisation name must be at least 2 characters')
    .max(150, 'Organisation name must be under 150 characters'),
  email: z
    .string()
    .email('Please provide a valid work email address')
    .max(255, 'Email must be under 255 characters'),
  interestType: z.enum(PARTNER_INTEREST_OPTIONS, {
    error: 'Please select a partnership interest',
  }),
  budgetRange: z.enum(BUDGET_RANGE_OPTIONS, {
    error: 'Please select an expected budget range',
  }),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be under 2000 characters'),
  website: z.string().optional(), // Honeypot field
});

export type PartnerInput = z.infer<typeof partnerSchema>;

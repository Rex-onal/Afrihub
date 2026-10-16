import { z } from 'zod';

export const CONTACT_CATEGORY_OPTIONS = [
  'community',
  'partnerships',
  'talent',
  'scholarships',
  'press',
  'support',
] as const;
export type ContactCategory = (typeof CONTACT_CATEGORY_OPTIONS)[number];

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be under 100 characters'),
  email: z
    .string()
    .email('Please provide a valid email address')
    .max(255, 'Email must be under 255 characters'),
  category: z.enum(CONTACT_CATEGORY_OPTIONS, {
    error: 'Please select an inquiry domain',
  }),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(150, 'Subject must be under 150 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be under 2000 characters'),
  newsletterOptIn: z.boolean().optional(),
  website: z.string().optional(), // Honeypot field
});

export type ContactInput = z.infer<typeof contactSchema>;

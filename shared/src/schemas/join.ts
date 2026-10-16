import { z } from 'zod';

export const TRACK_OPTIONS = ['software', 'data_ai', 'design', 'product'] as const;
export type Track = (typeof TRACK_OPTIONS)[number];

export const EXPERIENCE_LEVEL_OPTIONS = ['beginner', 'junior', 'mid', 'senior'] as const;
export type ExperienceLevel = (typeof EXPERIENCE_LEVEL_OPTIONS)[number];

export const INTEREST_OPTIONS = [
  'hackathons',
  'scholarships',
  'open_source',
  'mentorship',
  'job_pipelines',
] as const;
export type Interest = (typeof INTEREST_OPTIONS)[number];

export const COUNTRY_OPTIONS = [
  'NG',
  'KE',
  'GH',
  'RW',
  'ZA',
  'EG',
  'UG',
  'TZ',
  'SN',
  'OTHER',
] as const;
export type Country = (typeof COUNTRY_OPTIONS)[number];

export const joinSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be under 100 characters'),
  email: z
    .string()
    .email('Please provide a valid email address')
    .max(255, 'Email must be under 255 characters'),
  country: z.enum(COUNTRY_OPTIONS, {
    error: 'Please select a valid country',
  }),
  track: z.enum(TRACK_OPTIONS, {
    error: 'Please select a primary track',
  }),
  experienceLevel: z.enum(EXPERIENCE_LEVEL_OPTIONS, {
    error: 'Please select your experience level',
  }),
  interests: z
    .array(z.enum(INTEREST_OPTIONS))
    .min(1, 'Please select at least one area of interest'),
  website: z.string().optional(), // Honeypot field
});

export type JoinInput = z.infer<typeof joinSchema>;

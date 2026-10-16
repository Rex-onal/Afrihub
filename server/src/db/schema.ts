import { pgEnum, pgTable, text, uuid, timestamp, boolean } from 'drizzle-orm/pg-core';
import {
  TRACK_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
  COUNTRY_OPTIONS,
  INTEREST_OPTIONS,
  PARTNER_INTEREST_OPTIONS,
  BUDGET_RANGE_OPTIONS,
  CONTACT_CATEGORY_OPTIONS,
} from '@afrihub/shared';

// Helper to pass readonly arrays to Drizzle pgEnum
const toTuple = <T extends readonly [string, ...string[]]>(arr: T): [T[number], ...T[number][]] =>
  [arr[0], ...arr.slice(1)] as unknown as [T[number], ...T[number][]];

export const trackEnum = pgEnum('track', toTuple(TRACK_OPTIONS));
export const experienceLevelEnum = pgEnum('experience_level', toTuple(EXPERIENCE_LEVEL_OPTIONS));
export const countryEnum = pgEnum('country', toTuple(COUNTRY_OPTIONS));
export const interestEnum = pgEnum('interest', toTuple(INTEREST_OPTIONS));
export const partnerInterestEnum = pgEnum('interest_type', toTuple(PARTNER_INTEREST_OPTIONS));
export const budgetRangeEnum = pgEnum('budget_range', toTuple(BUDGET_RANGE_OPTIONS));
export const contactCategoryEnum = pgEnum('category', toTuple(CONTACT_CATEGORY_OPTIONS));

export const communityMembers = pgTable('community_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull().unique(),
  country: countryEnum('country').notNull(),
  track: trackEnum('track').notNull(),
  experienceLevel: experienceLevelEnum('experience_level').notNull(),
  interests: interestEnum('interests').array().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const partnerEnquiries = pgTable('partner_enquiries', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: text('full_name').notNull(),
  organisation: text('organisation').notNull(),
  email: text('email').notNull(),
  interestType: partnerInterestEnum('interest_type').notNull(),
  budgetRange: budgetRangeEnum('budget_range').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const contactMessages = pgTable('contact_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  category: contactCategoryEnum('category').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  newsletterOptIn: boolean('newsletter_opt_in').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

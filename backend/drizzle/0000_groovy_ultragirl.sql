CREATE TYPE "public"."budget_range" AS ENUM('10k-25k', '25k-50k', '50k-100k', '100k+');--> statement-breakpoint
CREATE TYPE "public"."category" AS ENUM('community', 'partnerships', 'talent', 'scholarships', 'press', 'support');--> statement-breakpoint
CREATE TYPE "public"."country" AS ENUM('NG', 'KE', 'GH', 'RW', 'ZA', 'EG', 'UG', 'TZ', 'SN', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."experience_level" AS ENUM('beginner', 'junior', 'mid', 'senior');--> statement-breakpoint
CREATE TYPE "public"."interest" AS ENUM('hackathons', 'scholarships', 'open_source', 'mentorship', 'job_pipelines');--> statement-breakpoint
CREATE TYPE "public"."interest_type" AS ENUM('invest', 'sponsor', 'hire', 'partner');--> statement-breakpoint
CREATE TYPE "public"."track" AS ENUM('software', 'data_ai', 'design', 'product');--> statement-breakpoint
CREATE TABLE "community_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"country" "country" NOT NULL,
	"track" "track" NOT NULL,
	"experience_level" "experience_level" NOT NULL,
	"interests" "interest"[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "community_members_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"category" "category" NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"newsletter_opt_in" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "partner_enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"organisation" text NOT NULL,
	"email" text NOT NULL,
	"interest_type" "interest_type" NOT NULL,
	"budget_range" "budget_range" NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { z } from 'zod';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().positive().default(4000),
    DATABASE_URL: z.string().url().optional(),
    TEST_DATABASE_URL: z.string().url().optional(),
    USE_TEST_DB: z.enum(['true', 'false']).optional(),
    CLIENT_ORIGIN: z.string().optional(),
  })
  .refine((env) => Boolean(env.DATABASE_URL || env.TEST_DATABASE_URL), {
    message: 'DATABASE_URL or TEST_DATABASE_URL must be set',
    path: ['DATABASE_URL'],
  })
  .refine(
    (env) => {
      if (env.NODE_ENV !== 'production') return true;
      return Boolean(env.DATABASE_URL && env.DATABASE_URL.includes('sslmode=require'));
    },
    {
      message: 'DATABASE_URL must include sslmode=require in production',
      path: ['DATABASE_URL'],
    }
  );

export type AppEnv = z.infer<typeof envSchema>;

export function validateEnv(input: NodeJS.ProcessEnv = process.env): AppEnv {
  const parsed = envSchema.safeParse(input);
  if (!parsed.success) {
    const details = parsed.error.flatten().fieldErrors;
    throw new Error(`Invalid environment configuration: ${JSON.stringify(details)}`);
  }
  return parsed.data;
}

export const env: AppEnv = validateEnv();

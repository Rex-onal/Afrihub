import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import * as schema from './schema.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

export function createDb(connectionUrl?: string) {
  const url = connectionUrl || process.env.TEST_DATABASE_URL || process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not defined in environment');
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

let _db: ReturnType<typeof createDb> | null = null;
let _currentUrl: string | null = null;

export const db: ReturnType<typeof createDb> = new Proxy({} as ReturnType<typeof createDb>, {
  get(_target, prop, receiver) {
    const url = process.env.TEST_DATABASE_URL || process.env.DATABASE_URL;
    if (!_db || _currentUrl !== url) {
      _currentUrl = url || null;
      _db = createDb(url);
    }
    return Reflect.get(_db, prop, receiver);
  },
});

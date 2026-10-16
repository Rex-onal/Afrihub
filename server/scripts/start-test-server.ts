import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

// Direct all database operations strictly to the TEST branch
process.env.TEST_DATABASE_URL = process.env.DATABASE_URL_TEST;

import '../src/index.js';

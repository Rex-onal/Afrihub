import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

// Ensure the server connects to the test database
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;

import '../src/index.js';

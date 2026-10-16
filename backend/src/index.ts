import dotenv from 'dotenv';
import { app } from './app.js';
import { getDatabaseUrl } from './db/client.js';

dotenv.config();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  const activeUrl = getDatabaseUrl();
  const isTest = activeUrl === process.env.TEST_DATABASE_URL;
  console.log(`AfriHub API server running on port ${port} (${isTest ? 'TEST BRANCH' : 'MAIN BRANCH'})`);
});

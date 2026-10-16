import dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  const branchIndicator = process.env.TEST_DATABASE_URL ? 'TEST BRANCH' : 'MAIN BRANCH';
  console.log(`AfriHub API server running on port ${port} (${branchIndicator})`);
});

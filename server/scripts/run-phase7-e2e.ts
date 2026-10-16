import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

// Ensure we test against Neon TEST branch
process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;

import { createDb } from '../src/db/client.js';
import { communityMembers, partnerEnquiries, contactMessages } from '../src/db/schema.js';
import { eq } from 'drizzle-orm';

const API_URL = 'http://localhost:4000';

async function runE2E() {
  console.log('=== PHASE 7 FULL-STACK LIVE E2E VERIFICATION (NEON TEST BRANCH) ===\n');

  const db = createDb(process.env.DATABASE_URL_TEST);

  // 1. Verify API server health
  console.log('[1/7] Checking API server health...');
  const healthRes = await fetch(`${API_URL}/api/health`);
  const healthJson = await healthRes.json();
  if (healthRes.status !== 200 || healthJson.status !== 'ok') {
    throw new Error(`Health check failed: status ${healthRes.status}, body ${JSON.stringify(healthJson)}`);
  }
  console.log('✓ Health check passed: 200 OK');

  // 2. Test Join form end-to-end (201, 409 duplicate, 400 validation)
  console.log('\n[2/7] Testing Join form submission over HTTP...');
  const joinPayload = {
    fullName: 'Kwame Asante',
    email: 'kwame.asante.phase7@afrihub.example',
    country: 'GH',
    track: 'software',
    experienceLevel: 'junior',
    interests: ['hackathons', 'scholarships'],
  };

  const joinRes = await fetch(`${API_URL}/api/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(joinPayload),
  });
  const joinJson = await joinRes.json();
  if (joinRes.status !== 201) {
    throw new Error(`Expected 201 on join, got ${joinRes.status}: ${JSON.stringify(joinJson)}`);
  }
  console.log(`✓ POST /api/join returned 201: "${joinJson.message}"`);

  // Verify saved in Neon TEST branch
  const memberRows = await db
    .select()
    .from(communityMembers)
    .where(eq(communityMembers.email, joinPayload.email));
  if (memberRows.length !== 1) {
    throw new Error(`Expected 1 saved member in Neon TEST branch, found ${memberRows.length}`);
  }
  console.log(`✓ Neon DB verification: member confirmed in TEST branch (id=${memberRows[0].id}, country=${memberRows[0].country}, track=${memberRows[0].track})`);

  // Test 409 Duplicate email
  console.log('\n[3/7] Testing duplicate email 409 conflict...');
  const dupJoinRes = await fetch(`${API_URL}/api/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(joinPayload),
  });
  const dupJoinJson = await dupJoinRes.json();
  if (dupJoinRes.status !== 409) {
    throw new Error(`Expected 409, got ${dupJoinRes.status}: ${JSON.stringify(dupJoinJson)}`);
  }
  const expected409 = 'This email is already registered with AfriHub. Contact us if you need help.';
  if (dupJoinJson.error !== expected409) {
    throw new Error(`Expected error "${expected409}", got "${dupJoinJson.error}"`);
  }
  console.log(`✓ 409 Conflict verified: "${dupJoinJson.error}"`);

  // Test 400 Validation error mapping
  console.log('\n[4/7] Testing server 400 validation error response...');
  const invalidJoinRes = await fetch(`${API_URL}/api/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName: 'A', email: 'invalid-email', country: 'XX' }),
  });
  const invalidJoinJson = await invalidJoinRes.json();
  if (invalidJoinRes.status !== 400) {
    throw new Error(`Expected 400, got ${invalidJoinRes.status}`);
  }
  if (!invalidJoinJson.details?.fullName || !invalidJoinJson.details?.email) {
    throw new Error(`Expected field errors for fullName and email, got: ${JSON.stringify(invalidJoinJson)}`);
  }
  console.log(`✓ 400 Validation error verified with field-level details:`, invalidJoinJson.details);

  // 3. Test Partner form end-to-end
  console.log('\n[5/7] Testing Partner enquiry submission over HTTP...');
  const partnerPayload = {
    fullName: 'Nadia Mansour',
    organisation: 'Sahara Ventures',
    email: 'nadia.mansour.phase7@afrihub.example',
    interestType: 'sponsor',
    budgetRange: '50k-100k',
    message: 'We would love to sponsor the upcoming pan-African hackathon sprint across West and East Africa.',
  };

  const partnerRes = await fetch(`${API_URL}/api/partners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partnerPayload),
  });
  const partnerJson = await partnerRes.json();
  if (partnerRes.status !== 201) {
    throw new Error(`Expected 201 on partner enquiry, got ${partnerRes.status}: ${JSON.stringify(partnerJson)}`);
  }
  console.log(`✓ POST /api/partners returned 201: "${partnerJson.message}"`);

  // Verify in Neon TEST branch
  const partnerRows = await db
    .select()
    .from(partnerEnquiries)
    .where(eq(partnerEnquiries.email, partnerPayload.email));
  if (partnerRows.length !== 1) {
    throw new Error(`Expected 1 saved partner in Neon TEST branch, found ${partnerRows.length}`);
  }
  console.log(`✓ Neon DB verification: partner enquiry confirmed in TEST branch (id=${partnerRows[0].id}, org=${partnerRows[0].organisation}, budget=${partnerRows[0].budgetRange})`);

  // 4. Test Contact form end-to-end
  console.log('\n[6/7] Testing Contact message submission over HTTP...');
  const contactPayload = {
    fullName: 'Kofi Boateng',
    email: 'kofi.boateng.phase7@afrihub.example',
    category: 'scholarships',
    subject: 'Inquiry on 2026 Scholarship Cohort',
    message: 'Could you provide details on the application cycle and timeline for the upcoming engineering scholarships?',
    newsletterOptIn: true,
  };

  const contactRes = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactPayload),
  });
  const contactJson = await contactRes.json();
  if (contactRes.status !== 201) {
    throw new Error(`Expected 201 on contact message, got ${contactRes.status}: ${JSON.stringify(contactJson)}`);
  }
  console.log(`✓ POST /api/contact returned 201: "${contactJson.message}"`);

  // Verify in Neon TEST branch
  const contactRows = await db
    .select()
    .from(contactMessages)
    .where(eq(contactMessages.email, contactPayload.email));
  if (contactRows.length !== 1) {
    throw new Error(`Expected 1 saved contact message in Neon TEST branch, found ${contactRows.length}`);
  }
  console.log(`✓ Neon DB verification: contact message confirmed in TEST branch (id=${contactRows[0].id}, category=${contactRows[0].category}, newsletter=${contactRows[0].newsletterOptIn})`);

  // 5. Test Honeypot silent 201
  console.log('\n[7/7] Testing honeypot rejection...');
  const honeypotRes = await fetch(`${API_URL}/api/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...joinPayload,
      email: 'honeypot-phase7@afrihub.example',
      website: 'https://spambot.example',
    }),
  });
  if (honeypotRes.status !== 201) {
    throw new Error(`Expected 201 on honeypot, got ${honeypotRes.status}`);
  }
  const honeypotRows = await db
    .select()
    .from(communityMembers)
    .where(eq(communityMembers.email, 'honeypot-phase7@afrihub.example'));
  if (honeypotRows.length !== 0) {
    throw new Error('Honeypot entry was unexpectedly written to database!');
  }
  console.log('✓ Honeypot succeeded: returned 201 silently and 0 rows written to Postgres.');

  console.log('\n=== E2E LIVE HTTP SUBMISSION VERIFICATION COMPLETED SUCCESSFULLY ===');
}

runE2E().catch((err) => {
  console.error('\n❌ E2E test failed:', err);
  process.exit(1);
});

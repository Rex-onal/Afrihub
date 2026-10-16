import dotenv from 'dotenv';
dotenv.config();

// Direct all database operations strictly to the TEST branch
process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;

import request from 'supertest';
import { app } from '../src/app.js';
import { createDb } from '../src/db/client.js';
import { communityMembers, partnerEnquiries, contactMessages } from '../src/db/schema.js';
import { eq } from 'drizzle-orm';

async function runTests() {
  console.log('--- STARTING PHASE 6 NEON TEST SUITE (TEST BRANCH ONLY) ---');
  const db = createDb(process.env.DATABASE_URL_TEST);

  // 1. Health check test
  console.log('\n[1/6] Testing GET /api/health...');
  const healthRes = await request(app).get('/api/health');
  if (healthRes.status !== 200 || healthRes.body.status !== 'ok') {
    throw new Error(`Health check failed: ${JSON.stringify(healthRes.body)}`);
  }
  console.log('✓ Health check passed: 200 { status: "ok" }');

  // 2. Test valid POST /api/join
  console.log('\n[2/6] Testing valid POST /api/join...');
  const joinPayload = {
    fullName: 'Amara Okafor',
    email: 'amara.test.phase6@example.com',
    country: 'NG',
    track: 'software',
    experienceLevel: 'junior',
    interests: ['hackathons', 'open_source'],
  };
  const joinRes = await request(app).post('/api/join').send(joinPayload);
  if (joinRes.status !== 201) {
    throw new Error(`Join request failed (${joinRes.status}): ${JSON.stringify(joinRes.body)}`);
  }
  console.log(`✓ POST /api/join returned 201: "${joinRes.body.message}"`);

  // Verify in Postgres
  const savedMembers = await db
    .select()
    .from(communityMembers)
    .where(eq(communityMembers.email, joinPayload.email));
  if (savedMembers.length !== 1) {
    throw new Error(`Expected 1 saved member in Postgres, found ${savedMembers.length}`);
  }
  console.log(`✓ Confirmed in Postgres TEST branch: Member id=${savedMembers[0].id}, email=${savedMembers[0].email}, track=${savedMembers[0].track}`);

  // 3. Test duplicate email on /api/join returns exact 409 copy
  console.log('\n[3/6] Testing duplicate email 409 on POST /api/join...');
  const dupJoinRes = await request(app).post('/api/join').send(joinPayload);
  if (dupJoinRes.status !== 409) {
    throw new Error(`Expected 409 on duplicate email, got ${dupJoinRes.status}: ${JSON.stringify(dupJoinRes.body)}`);
  }
  const expected409 = 'This email is already registered with AfriHub. Contact us if you need help.';
  if (dupJoinRes.body.error !== expected409) {
    throw new Error(`Expected error "${expected409}", got "${dupJoinRes.body.error}"`);
  }
  console.log(`✓ Duplicate join returned exact approved 409 message: "${dupJoinRes.body.error}"`);

  // 4. Test valid POST /api/partners
  console.log('\n[4/6] Testing valid POST /api/partners...');
  const partnerPayload = {
    fullName: 'Tariq Mansour',
    organisation: 'Atlas Test Ventures',
    email: 'tariq.test.phase6@example.com',
    interestType: 'sponsor',
    budgetRange: '25k-50k',
    message: 'Exploring corporate sponsorship for the pan-African hackathon sprint.',
  };
  const partnerRes = await request(app).post('/api/partners').send(partnerPayload);
  if (partnerRes.status !== 201) {
    throw new Error(`Partner request failed (${partnerRes.status}): ${JSON.stringify(partnerRes.body)}`);
  }
  console.log(`✓ POST /api/partners returned 201: "${partnerRes.body.message}"`);

  // Verify in Postgres
  const savedPartners = await db
    .select()
    .from(partnerEnquiries)
    .where(eq(partnerEnquiries.email, partnerPayload.email));
  if (savedPartners.length !== 1) {
    throw new Error(`Expected 1 saved partner in Postgres, found ${savedPartners.length}`);
  }
  console.log(`✓ Confirmed in Postgres TEST branch: Enquiry id=${savedPartners[0].id}, organisation=${savedPartners[0].organisation}, interestType=${savedPartners[0].interestType}`);

  // 5. Test valid POST /api/contact
  console.log('\n[5/6] Testing valid POST /api/contact...');
  const contactPayload = {
    fullName: 'Zainab Sesay',
    email: 'zainab.test.phase6@example.com',
    category: 'scholarships',
    subject: 'Fellowship Application Inquiry',
    message: 'Inquiring about hardware stipend eligibility for West African fellows.',
    newsletterOptIn: true,
  };
  const contactRes = await request(app).post('/api/contact').send(contactPayload);
  if (contactRes.status !== 201) {
    throw new Error(`Contact request failed (${contactRes.status}): ${JSON.stringify(contactRes.body)}`);
  }
  console.log(`✓ POST /api/contact returned 201: "${contactRes.body.message}"`);

  // Verify in Postgres
  const savedContacts = await db
    .select()
    .from(contactMessages)
    .where(eq(contactMessages.email, contactPayload.email));
  if (savedContacts.length !== 1) {
    throw new Error(`Expected 1 saved contact message in Postgres, found ${savedContacts.length}`);
  }
  console.log(`✓ Confirmed in Postgres TEST branch: Message id=${savedContacts[0].id}, category=${savedContacts[0].category}, newsletterOptIn=${savedContacts[0].newsletterOptIn}`);

  // 6. Test Honeypot silent 201
  console.log('\n[6/6] Testing Honeypot silent 201 on POST /api/join...');
  const honeyRes = await request(app).post('/api/join').send({
    ...joinPayload,
    email: 'honeypot-bot@example.com',
    website: 'https://spam-bot.example.com',
  });
  if (honeyRes.status !== 201) {
    throw new Error(`Expected 201 on honeypot, got ${honeyRes.status}`);
  }
  const honeypotCheck = await db
    .select()
    .from(communityMembers)
    .where(eq(communityMembers.email, 'honeypot-bot@example.com'));
  if (honeypotCheck.length !== 0) {
    throw new Error('Honeypot entry was mistakenly written to the database!');
  }
  console.log('✓ Honeypot succeeded: returned 201 silently and 0 rows written to Postgres.');

  // 7. Prove Postgres rejects an invalid enum value
  console.log('\n[7/7] Proving Postgres rejects an invalid enum value...');
  let pgEnumRejected = false;
  try {
    const neonSql = (db as any).$client;
    await neonSql`
      INSERT INTO community_members (full_name, email, country, track, experience_level, interests)
      VALUES ('Hacker', 'invalid-enum@example.com', 'NG', 'invalid_track'::track, 'junior', ARRAY['hackathons'::interest]);
    `;
  } catch (err: any) {
    pgEnumRejected = true;
    console.log(`✓ Postgres rejected invalid enum as expected!`);
    console.log(`  Postgres Error Code: ${err.code}`);
    console.log(`  Postgres Error Message: ${err.message}`);
  }
  if (!pgEnumRejected) {
    throw new Error('Postgres failed to reject invalid enum value!');
  }

  // 8. Clean up test rows
  console.log('\n--- CLEANING UP TEST ROWS FROM TEST BRANCH ---');
  await db.delete(communityMembers).where(eq(communityMembers.email, joinPayload.email));
  await db.delete(partnerEnquiries).where(eq(partnerEnquiries.email, partnerPayload.email));
  await db.delete(contactMessages).where(eq(contactMessages.email, contactPayload.email));

  const remainingMembers = await db.select().from(communityMembers).where(eq(communityMembers.email, joinPayload.email));
  const remainingPartners = await db.select().from(partnerEnquiries).where(eq(partnerEnquiries.email, partnerPayload.email));
  const remainingContacts = await db.select().from(contactMessages).where(eq(contactMessages.email, contactPayload.email));

  if (remainingMembers.length === 0 && remainingPartners.length === 0 && remainingContacts.length === 0) {
    console.log('✓ All test rows successfully deleted from Postgres TEST branch (0 remaining).');
  } else {
    throw new Error('Failed to clean up test rows!');
  }

  console.log('\n🎉 ALL PHASE 6 ENDPOINT AND NEON TESTS PASSED PERFECTLY!');
}

runTests().catch((err) => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});

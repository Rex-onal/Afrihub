import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import request from 'supertest';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { eq, like } from 'drizzle-orm';
import { app } from '../src/app.js';
import { db } from '../src/db/client.js';
import { communityMembers, partnerEnquiries, contactMessages } from '../src/db/schema.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const testDbUrl = process.env.TEST_DATABASE_URL;
const mainDbUrl = process.env.DATABASE_URL;

// Refuse to run against undefined DB or against main branch DB
if (!testDbUrl) {
  throw new Error('TEST_DATABASE_URL is not set. Refusing to run tests against an undefined database.');
}

if (mainDbUrl && testDbUrl === mainDbUrl) {
  throw new Error(
    'CRITICAL SECURITY GUARD: TEST_DATABASE_URL equals DATABASE_URL. Refusing to run tests against main database branch.'
  );
}

const TEST_DOMAIN = '@vitest.afrihub.example';
let ipCounter = 200;

function nextIp(): string {
  ipCounter += 1;
  return `192.168.20.${ipCounter}`;
}

async function cleanupTestRows() {
  await db.delete(communityMembers).where(like(communityMembers.email, `%${TEST_DOMAIN}`));
  await db.delete(partnerEnquiries).where(like(partnerEnquiries.email, `%${TEST_DOMAIN}`));
  await db.delete(contactMessages).where(like(contactMessages.email, `%${TEST_DOMAIN}`));
}

describe('Server API Suite (TEST_DATABASE_URL Isolated Branch)', () => {
  beforeAll(async () => {
    await cleanupTestRows();
  });

  afterEach(async () => {
    await cleanupTestRows();
  });

  afterAll(async () => {
    await cleanupTestRows();
  });

  // 1. Health check
  describe('GET /api/health', () => {
    it('returns 200 with status ok', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 'ok' });
    });
  });

  // 2. Valid Submissions
  describe('Valid Submissions', () => {
    it('successfully processes valid /api/join and stores in community_members', async () => {
      const email = `kofi.boateng${Date.now()}${TEST_DOMAIN}`;
      const payload = {
        fullName: 'Kofi Boateng',
        email,
        country: 'GH',
        track: 'software',
        experienceLevel: 'mid',
        interests: ['hackathons', 'scholarships'],
      };

      const res = await request(app)
        .post('/api/join')
        .set('X-Forwarded-For', nextIp())
        .send(payload);

      expect(res.status).toBe(201);
      expect(res.body.message).toContain('Welcome to AfriHub');

      // Verify row exists in DB
      const rows = await db
        .select()
        .from(communityMembers)
        .where(eq(communityMembers.email, email.toLowerCase()));
      expect(rows).toHaveLength(1);
      expect(rows[0].fullName).toBe('Kofi Boateng');
      expect(rows[0].country).toBe('GH');
      expect(rows[0].track).toBe('software');
    });

    it('successfully processes valid /api/partners and stores in partner_enquiries', async () => {
      const email = `partners.lead${Date.now()}${TEST_DOMAIN}`;
      const payload = {
        fullName: 'Folake Adeyemi',
        organisation: 'Savanna Capital Partners',
        email,
        interestType: 'sponsor',
        budgetRange: '10k-25k',
        message: 'We are eager to sponsor the upcoming pan-African hackathon in Lagos.',
      };

      const res = await request(app)
        .post('/api/partners')
        .set('X-Forwarded-For', nextIp())
        .send(payload);

      expect(res.status).toBe(201);
      expect(res.body.message).toContain('Thank you for partnering with AfriHub');

      // Verify row exists in DB
      const rows = await db
        .select()
        .from(partnerEnquiries)
        .where(eq(partnerEnquiries.email, email.toLowerCase()));
      expect(rows).toHaveLength(1);
      expect(rows[0].organisation).toBe('Savanna Capital Partners');
      expect(rows[0].interestType).toBe('sponsor');
      expect(rows[0].budgetRange).toBe('10k-25k');
    });

    it('successfully processes valid /api/contact and stores in contact_messages', async () => {
      const email = `inquiring.dev${Date.now()}${TEST_DOMAIN}`;
      const payload = {
        fullName: 'Tariq Al-Mansoor',
        email,
        category: 'scholarships',
        subject: 'Inquiry regarding scholarship eligibility',
        message: 'Hello AfriHub team, I would like to know if undergraduate students can apply.',
        newsletterOptIn: true,
      };

      const res = await request(app)
        .post('/api/contact')
        .set('X-Forwarded-For', nextIp())
        .send(payload);

      expect(res.status).toBe(201);
      expect(res.body.message).toContain('Thank you for contacting AfriHub');

      // Verify row exists in DB
      const rows = await db
        .select()
        .from(contactMessages)
        .where(eq(contactMessages.email, email.toLowerCase()));
      expect(rows).toHaveLength(1);
      expect(rows[0].subject).toBe('Inquiry regarding scholarship eligibility');
      expect(rows[0].category).toBe('scholarships');
      expect(rows[0].newsletterOptIn).toBe(true);
    });
  });

  // 3. Validation and 400 Field Errors
  describe('Validation & 400 Field Errors', () => {
    it('returns 400 with field-level details on invalid join submission', async () => {
      const invalidPayload = {
        fullName: '',
        email: 'not-an-email',
        country: 'InvalidCountry',
        track: 'invalid_track',
        experienceLevel: 'novice',
        interests: [],
      };

      const res = await request(app)
        .post('/api/join')
        .set('X-Forwarded-For', nextIp())
        .send(invalidPayload);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Validation failed');
      expect(res.body).toHaveProperty('details');
      expect(res.body.details).toHaveProperty('email');
      expect(res.body.details).toHaveProperty('fullName');
      expect(res.body.details).toHaveProperty('interests');
    });

    it('returns 400 with field-level details on invalid partners submission', async () => {
      const res = await request(app)
        .post('/api/partners')
        .set('X-Forwarded-For', nextIp())
        .send({
          fullName: 'Jane Doe',
          organisation: '',
          email: 'invalid-email',
          interestType: 'unknown',
          budgetRange: 'unspecified',
          message: 'too short',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Validation failed');
      expect(res.body.details).toHaveProperty('email');
      expect(res.body.details).toHaveProperty('organisation');
      expect(res.body.details).toHaveProperty('message');
    });

    it('returns 400 with field-level details on invalid contact submission', async () => {
      const res = await request(app)
        .post('/api/contact')
        .set('X-Forwarded-For', nextIp())
        .send({
          fullName: '',
          email: 'not-an-email',
          category: 'invalid',
          subject: '',
          message: 'hi',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Validation failed');
      expect(res.body.details).toHaveProperty('fullName');
      expect(res.body.details).toHaveProperty('email');
      expect(res.body.details).toHaveProperty('subject');
      expect(res.body.details).toHaveProperty('message');
    });
  });

  // 4. Invalid Enum Rejection
  describe('Invalid Enum Rejection', () => {
    it('rejects unrecognised track enum on /api/join', async () => {
      const payload = {
        fullName: 'Valid Name',
        email: `valid${Date.now()}${TEST_DOMAIN}`,
        country: 'NG',
        track: 'crypto_trading', // Invalid enum
        experienceLevel: 'mid',
        interests: ['hackathons'],
      };

      const res = await request(app)
        .post('/api/join')
        .set('X-Forwarded-For', nextIp())
        .send(payload);

      expect(res.status).toBe(400);
      expect(res.body.details).toHaveProperty('track');
    });

    it('rejects unrecognised partner interestType enum on /api/partners', async () => {
      const payload = {
        fullName: 'Valid Name',
        organisation: 'Test Org',
        email: `partner${Date.now()}${TEST_DOMAIN}`,
        interestType: 'buyout', // Invalid enum
        budgetRange: '10k-25k',
        message: 'This is a valid enquiry message describing partnership.',
      };

      const res = await request(app)
        .post('/api/partners')
        .set('X-Forwarded-For', nextIp())
        .send(payload);

      expect(res.status).toBe(400);
      expect(res.body.details).toHaveProperty('interestType');
    });

    it('rejects unrecognised contact category enum on /api/contact', async () => {
      const payload = {
        fullName: 'Valid Name',
        email: `contact${Date.now()}${TEST_DOMAIN}`,
        category: 'unsupported_category', // Invalid enum
        subject: 'Valid Subject Line',
        message: 'This is a valid message of more than 10 characters.',
      };

      const res = await request(app)
        .post('/api/contact')
        .set('X-Forwarded-For', nextIp())
        .send(payload);

      expect(res.status).toBe(400);
      expect(res.body.details).toHaveProperty('category');
    });
  });

  // 5. 409 Duplicate Email Handling
  describe('409 Duplicate Email Handling', () => {
    it('returns 409 with exact required message when an email is already registered', async () => {
      const email = `duplicate.dev${Date.now()}${TEST_DOMAIN}`;
      const payload = {
        fullName: 'Chidi Nwosu',
        email,
        country: 'NG',
        track: 'software',
        experienceLevel: 'senior',
        interests: ['mentorship', 'scholarships'],
      };

      // First submission
      const firstRes = await request(app)
        .post('/api/join')
        .set('X-Forwarded-For', nextIp())
        .send(payload);
      expect(firstRes.status).toBe(201);

      // Second submission with exact same email
      const secondRes = await request(app)
        .post('/api/join')
        .set('X-Forwarded-For', nextIp())
        .send(payload);

      expect(secondRes.status).toBe(409);
      expect(secondRes.body).toEqual({
        error: 'This email is already registered with AfriHub. Contact us if you need help.',
      });
    });
  });

  // 6. Honeypot Spambot Trap
  describe('Honeypot Trap (Silent 201 with zero DB insertion)', () => {
    it('returns silent 201 and stores zero rows when website honeypot field is filled on /api/join', async () => {
      const email = `spambot.join${Date.now()}${TEST_DOMAIN}`;
      const payload = {
        fullName: 'Spam Bot',
        email,
        country: 'KE',
        track: 'software',
        experienceLevel: 'beginner',
        interests: ['hackathons'],
        website: 'https://malicious-spam-site.example', // Honeypot filled
      };

      const res = await request(app)
        .post('/api/join')
        .set('X-Forwarded-For', nextIp())
        .send(payload);

      expect(res.status).toBe(201);

      // Verify NO row was written to the database
      const rows = await db
        .select()
        .from(communityMembers)
        .where(eq(communityMembers.email, email.toLowerCase()));
      expect(rows).toHaveLength(0);
    });

    it('returns silent 201 and stores zero rows when website honeypot field is filled on /api/partners', async () => {
      const email = `spambot.partner${Date.now()}${TEST_DOMAIN}`;
      const payload = {
        fullName: 'Bot User',
        organisation: 'Phishing Org',
        email,
        interestType: 'invest',
        budgetRange: '100k+',
        message: 'Spam pitch offering unsolicited crypto investments.',
        website: 'https://bad-bot.example',
      };

      const res = await request(app)
        .post('/api/partners')
        .set('X-Forwarded-For', nextIp())
        .send(payload);

      expect(res.status).toBe(201);

      const rows = await db
        .select()
        .from(partnerEnquiries)
        .where(eq(partnerEnquiries.email, email.toLowerCase()));
      expect(rows).toHaveLength(0);
    });
  });

  // 7. Rate Limiting (429)
  describe('POST Rate Limiting (429)', () => {
    it('returns 429 when more than 5 POST requests are made from the same IP within a minute', async () => {
      const throttledIp = '203.0.113.88';

      // Submit 5 valid requests from this IP
      for (let i = 0; i < 5; i++) {
        const res = await request(app)
          .post('/api/join')
          .set('X-Forwarded-For', throttledIp)
          .send({
            fullName: `User ${i}`,
            email: `user${i}.${Date.now()}${TEST_DOMAIN}`,
            country: 'NG',
            track: 'software',
            experienceLevel: 'beginner',
            interests: ['hackathons'],
          });
        expect(res.status).toBe(201);
      }

      // The 6th request from this IP must be blocked with 429
      const sixthRes = await request(app)
        .post('/api/join')
        .set('X-Forwarded-For', throttledIp)
        .send({
          fullName: 'Blocked User',
          email: `blocked${Date.now()}${TEST_DOMAIN}`,
          country: 'NG',
          track: 'software',
          experienceLevel: 'beginner',
          interests: ['hackathons'],
        });

      expect(sixthRes.status).toBe(429);
      expect(sixthRes.body).toHaveProperty(
        'error',
        'Too many requests from this IP, please try again after a minute.'
      );
    });
  });
});

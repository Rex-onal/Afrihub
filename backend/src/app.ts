import './config/env.js';
import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { healthRouter } from './routes/health.js';
import { joinRouter } from './routes/join.js';
import { partnersRouter } from './routes/partners.js';
import { contactRouter } from './routes/contact.js';
import { honeypotCheck } from './middleware/honeypot.js';
import { postRateLimiter } from './middleware/rate-limiter.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFoundHandler } from './middleware/not-found.js';
import { httpsRedirect } from './middleware/https-redirect.js';

export const app: Express = express();

app.set('trust proxy', 1);
app.disable('x-powered-by');

// Force HTTPS in production behind a trusted proxy. No-op in dev/test.
app.use(httpsRedirect);

// Security headers. CSP is disabled: this app serves JSON only, no HTML,
// and the frontend is served from a separate origin that owns its own CSP.
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'same-site' },
    referrerPolicy: { policy: 'no-referrer' },
    hsts: { maxAge: 15552000, includeSubDomains: true },
  })
);

// CORS allowlist. Dev (5173) and preview (4173) are always allowed; extra prod
// origins come from CLIENT_ORIGIN (comma-separated).
const customOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((o) => o.trim())
  : [];
const allowedOrigins = Array.from(
  new Set(['http://localhost:5173', 'http://localhost:4173', ...customOrigins])
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// 10 KB cap: all three forms are small JSON bodies; anything larger is abuse.
app.use(express.json({ limit: '10kb' }));

app.use('/api', healthRouter);
app.use('/api', honeypotCheck);

app.use((req, res, next) => {
  if (req.method === 'POST') {
    return postRateLimiter(req, res, next);
  }
  next();
});

app.use('/api', joinRouter);
app.use('/api', partnersRouter);
app.use('/api', contactRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

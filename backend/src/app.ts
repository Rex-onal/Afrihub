import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { healthRouter } from './routes/health.js';
import { joinRouter } from './routes/join.js';
import { partnersRouter } from './routes/partners.js';
import { contactRouter } from './routes/contact.js';
import { honeypotCheck } from './middleware/honeypot.js';
import { postRateLimiter } from './middleware/rate-limiter.js';
import { errorHandler } from './middleware/error-handler.js';

dotenv.config();

export const app: Express = express();

// Trust proxy for reverse proxies and IP resolution
app.set('trust proxy', 1);

// Security headers
app.use(helmet());

// Cross-Origin Resource Sharing locked to CLIENT_ORIGIN (always allowing dev: 5173 and preview: 4173)
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

// Body parser
app.use(express.json());

// 1. Health check route (unthrottled, public)
app.use('/api', healthRouter);

// 2. Honeypot check on all submission endpoints (silent 201)
app.use('/api', honeypotCheck);

// 3. Rate limiting strictly on POST endpoints (5 req/min per IP)
app.use((req, res, next) => {
  if (req.method === 'POST') {
    return postRateLimiter(req, res, next);
  }
  next();
});

// 4. Form submission endpoints
app.use('/api', joinRouter);
app.use('/api', partnersRouter);
app.use('/api', contactRouter);

// 5. Centralized error handling
app.use(errorHandler);

export default app;

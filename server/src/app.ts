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

// Security headers
app.use(helmet());

// Cross-Origin Resource Sharing locked strictly to CLIENT_ORIGIN
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(
  cors({
    origin: clientOrigin,
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

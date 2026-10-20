import rateLimit from 'express-rate-limit';
import { logger } from '../lib/logger.js';

const RATE_LIMIT_MESSAGE = {
  error: 'Too many requests from this IP, please try again after a minute.',
};

/**
 * Strict rate limiter for POST endpoints (5 requests per minute per IP).
 */
export const postRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: RATE_LIMIT_MESSAGE,
  handler: (req, res) => {
    logger.warn({ event: 'rate_limited', ip: req.ip, path: req.path });
    res.status(429).json(RATE_LIMIT_MESSAGE);
  },
});

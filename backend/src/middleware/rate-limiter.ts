import rateLimit from 'express-rate-limit';

/**
 * Strict rate limiter for POST endpoints (5 requests per minute per IP).
 */
export const postRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests from this IP, please try again after a minute.',
  },
});

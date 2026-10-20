import type { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger.js';

/**
 * Honeypot middleware.
 * If the hidden 'website' field is filled, return silent 201 without writing to DB.
 */
export function honeypotCheck(req: Request, res: Response, next: NextFunction): void {
  const website = req.body?.website;
  if (website && typeof website === 'string' && website.trim() !== '') {
    logger.warn({ event: 'honeypot_hit', ip: req.ip, path: req.path });
    res.status(201).json({ message: 'Submission received successfully' });
    return;
  }
  next();
}

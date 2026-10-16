import type { Request, Response, NextFunction } from 'express';

/**
 * Honeypot middleware.
 * If the hidden 'website' field is filled, return silent 201 without writing to DB.
 */
export function honeypotCheck(req: Request, res: Response, next: NextFunction): void {
  const website = req.body?.website;
  if (website && typeof website === 'string' && website.trim() !== '') {
    res.status(201).json({ message: 'Submission received successfully' });
    return;
  }
  next();
}

import { Router, type Request, type Response, type NextFunction } from 'express';
import { contactSchema } from '@afrihub/shared';
import { db } from '../db/client.js';
import { contactMessages } from '../db/schema.js';
import { logger } from '../lib/logger.js';

export const contactRouter: Router = Router();

contactRouter.post('/contact', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parseResult = contactSchema.safeParse(req.body);

    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      logger.warn({ event: 'validation_failed', route: '/api/contact', fieldKeys: Object.keys(fieldErrors) });
      res.status(400).json({
        error: 'Validation failed',
        details: fieldErrors,
      });
      return;
    }

    const data = parseResult.data;

    await db.insert(contactMessages).values({
      fullName: data.fullName,
      email: data.email.toLowerCase().trim(),
      category: data.category,
      subject: data.subject,
      message: data.message,
      newsletterOptIn: data.newsletterOptIn ?? false,
    });

    res.status(201).json({
      message: 'Thank you for contacting AfriHub. We will respond within 48 hours.',
    });
  } catch (error) {
    next(error);
  }
});

import { Router, type Request, type Response, type NextFunction } from 'express';
import { partnerSchema } from '@afrihub/shared';
import { db } from '../db/client.js';
import { partnerEnquiries } from '../db/schema.js';
import { logger } from '../lib/logger.js';

export const partnersRouter: Router = Router();

partnersRouter.post('/partners', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parseResult = partnerSchema.safeParse(req.body);

    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      logger.warn({ event: 'validation_failed', route: '/api/partners', fieldKeys: Object.keys(fieldErrors) });
      res.status(400).json({
        error: 'Validation failed',
        details: fieldErrors,
      });
      return;
    }

    const data = parseResult.data;

    await db.insert(partnerEnquiries).values({
      fullName: data.fullName,
      organisation: data.organisation,
      email: data.email.toLowerCase().trim(),
      interestType: data.interestType,
      budgetRange: data.budgetRange,
      message: data.message,
    });

    res.status(201).json({
      message: 'Thank you for partnering with AfriHub. Our team will review your enquiry promptly.',
    });
  } catch (error) {
    next(error);
  }
});

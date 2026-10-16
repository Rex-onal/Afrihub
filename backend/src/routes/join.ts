import { Router, type Request, type Response, type NextFunction } from 'express';
import { joinSchema } from '@afrihub/shared';
import { db } from '../db/client.js';
import { communityMembers } from '../db/schema.js';

export const joinRouter: Router = Router();

joinRouter.post('/join', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parseResult = joinSchema.safeParse(req.body);

    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      res.status(400).json({
        error: 'Validation failed',
        details: fieldErrors,
      });
      return;
    }

    const data = parseResult.data;

    await db.insert(communityMembers).values({
      fullName: data.fullName,
      email: data.email.toLowerCase().trim(),
      country: data.country,
      track: data.track,
      experienceLevel: data.experienceLevel,
      interests: data.interests,
    });

    res.status(201).json({
      message: 'Welcome to AfriHub! Your community registration has been confirmed.',
    });
  } catch (error) {
    const rootErr =
      error && typeof error === 'object' && 'cause' in error
        ? (error as { cause: unknown }).cause
        : error;
    const pgErr = rootErr as { code?: string } | null;
    if (pgErr?.code === '23505') {
      res.status(409).json({
        error: 'This email is already registered with AfriHub. Contact us if you need help.',
      });
      return;
    }
    next(error);
  }
});

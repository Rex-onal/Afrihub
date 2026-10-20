import type { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger.js';

/**
 * Central error handling middleware.
 * Never leaks stack traces, internal system details, or raw SQL errors.
 */
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (res.headersSent) {
    return;
  }

  // Body-parser SyntaxError (malformed JSON) — Express 5 surfaces it with `type: 'entity.parse.failed'`.
  const bodyErr = err as { type?: string; status?: number } | null;
  if (err instanceof SyntaxError && bodyErr?.type === 'entity.parse.failed') {
    logger.warn({ event: 'malformed_json', path: req.path });
    res.status(400).json({ error: 'Malformed JSON body.' });
    return;
  }

  // Body-parser PayloadTooLargeError (413).
  if (bodyErr?.type === 'entity.too.large') {
    logger.warn({ event: 'payload_too_large', path: req.path });
    res.status(413).json({ error: 'Request body too large.' });
    return;
  }

  const rootErr =
    err && typeof err === 'object' && 'cause' in err
      ? (err as { cause: unknown }).cause
      : err;
  const pgErr = rootErr as { code?: string; message?: string } | null;

  if (pgErr?.code === '23505') {
    logger.warn({ event: 'duplicate_email', path: req.path });
    res.status(409).json({
      error: 'This email is already registered with AfriHub. Contact us if you need help.',
    });
    return;
  }

  if (pgErr?.code === '22P02') {
    logger.warn({ event: 'invalid_enum', path: req.path });
    res.status(400).json({
      error: 'Invalid input format or unrecognized option value.',
    });
    return;
  }

  // Never log the raw error object — it may contain PII from DB query values.
  logger.error({ event: 'server_error', path: req.path, code: pgErr?.code });
  res.status(500).json({
    error: 'An internal server error occurred. Please try again later.',
  });
}

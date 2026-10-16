import type { Request, Response, NextFunction } from 'express';

/**
 * Central error handling middleware.
 * Never leaks stack traces, internal system details, or raw SQL errors.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('[AfriHub Server Error]:', err);

  if (res.headersSent) {
    return;
  }

  // Handle Postgres Unique Constraint Violation (Code 23505)
  const rootErr =
    err && typeof err === 'object' && 'cause' in err
      ? (err as { cause: unknown }).cause
      : err;
  const pgErr = rootErr as { code?: string; message?: string } | null;
  if (pgErr?.code === '23505') {
    res.status(409).json({
      error: 'This email is already registered with AfriHub. Contact us if you need help.',
    });
    return;
  }

  // Handle Postgres Invalid Text Representation / Enum Violation (Code 22P02)
  if (pgErr?.code === '22P02') {
    res.status(400).json({
      error: 'Invalid input format or unrecognized option value.',
    });
    return;
  }

  res.status(500).json({
    error: 'An internal server error occurred. Please try again later.',
  });
}

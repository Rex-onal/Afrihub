import type { Request, Response, NextFunction } from 'express';

export function httpsRedirect(req: Request, res: Response, next: NextFunction): void {
  if (process.env.NODE_ENV !== 'production') {
    next();
    return;
  }
  const proto = req.header('x-forwarded-proto');
  if (proto && proto !== 'https') {
    res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
    return;
  }
  next();
}

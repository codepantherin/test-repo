import type { Request, Response, NextFunction } from 'express';

/**
 * Catch-all middleware for unmatched routes.
 * Always responds with a JSON 404 payload — never HTML.
 */
export function notFound(req: Request, res: Response, _next: NextFunction): void {
  res.status(404).json({
    ok: false,
    error: 'NOT_FOUND',
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
}

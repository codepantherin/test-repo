import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for the contact endpoint.
 * 5 requests / 15 minutes / IP.
 *
 * Responses use the API contract shape:
 *   429 { ok: false, error: 'RATE_LIMITED' }
 */
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({ ok: false, error: 'RATE_LIMITED' });
  },
});

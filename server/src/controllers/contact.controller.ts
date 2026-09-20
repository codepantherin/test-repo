import type { Request, Response, NextFunction } from 'express';
import { contactSchema } from '../schemas/contact.schema.js';
import { sendContactEmail } from '../services/mailer.service.js';

/**
 * POST /api/contact
 *
 * Validates the inbound payload, silently drops bot submissions that fill
 * the honeypot field, then dispatches the message via the mailer service.
 */
export async function submitContact(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const { company, ...payload } = parsed.data;

  // Honeypot tripped: pretend success so bots do not learn the trap.
  if (company && company.trim().length > 0) {
    res.status(200).json({ ok: true });
    return;
  }

  try {
    await sendContactEmail(payload);
    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
}

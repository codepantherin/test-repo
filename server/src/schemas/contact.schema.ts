import { z } from 'zod';

/**
 * Contact form schema — single source of truth for the `POST /api/contact`
 * request body. Mirrors `client/src/features/contact/schema.ts` so both sides
 * validate against identical constraints.
 *
 * `company` is a honeypot field: it is optional at the schema level and
 * expected to be absent/empty. The controller rejects any non-empty value
 * silently (200 + no email dispatch) to avoid tipping off bots.
 */
export const contactSchema = z.object({
  name: z
    .string({ required_error: 'Name is required.' })
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(80, 'Name must be at most 80 characters.'),

  email: z
    .string({ required_error: 'Email is required.' })
    .trim()
    .toLowerCase()
    .min(1, 'Email is required.')
    .max(120, 'Email must be at most 120 characters.')
    .email('Please enter a valid email address.'),

  subject: z
    .string({ required_error: 'Subject is required.' })
    .trim()
    .min(3, 'Subject must be at least 3 characters.')
    .max(120, 'Subject must be at most 120 characters.'),

  message: z
    .string({ required_error: 'Message is required.' })
    .trim()
    .min(20, 'Message must be at least 20 characters.')
    .max(2000, 'Message must be at most 2000 characters.'),

  // Honeypot: must remain empty. Bots tend to fill every input they see.
  company: z.string().max(0).optional().default(''),
});

export type ContactPayload = z.infer<typeof contactSchema>;

/**
 * Shape returned in a 400 response body:
 *   { ok: false, errors: { <field>: string[] } }
 */
export type ContactFieldErrors = z.inferFlattenedErrors<
  typeof contactSchema
>['fieldErrors'];

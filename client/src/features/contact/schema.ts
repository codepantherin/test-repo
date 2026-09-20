import { z } from 'zod';

/**
 * Contact form schema.
 *
 * Mirrors the server-side schema in `server/src/schemas/contact.schema.ts`
 * so that client and server validate the same shape. Keep both in sync.
 */
export const contactSchema = z.object({
  name: z
    .string({ required_error: 'Name is required.' })
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(80, 'Name must be 80 characters or fewer.'),
  email: z
    .string({ required_error: 'Email is required.' })
    .trim()
    .email('Enter a valid email address.')
    .max(120, 'Email must be 120 characters or fewer.'),
  subject: z
    .string({ required_error: 'Subject is required.' })
    .trim()
    .min(3, 'Subject must be at least 3 characters.')
    .max(120, 'Subject must be 120 characters or fewer.'),
  message: z
    .string({ required_error: 'Message is required.' })
    .trim()
    .min(20, 'Message must be at least 20 characters.')
    .max(2000, 'Message must be 2000 characters or fewer.'),
  // Honeypot: must remain empty. Bots tend to fill every field.
  company: z.string().max(0).optional().or(z.literal('')),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

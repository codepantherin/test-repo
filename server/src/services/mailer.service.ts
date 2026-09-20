import nodemailer, { type Transporter } from 'nodemailer';
import { env } from '../config/env.js';
import type { ContactInput } from '../schemas/contact.schema.js';

/**
 * Transport is created once at module load and reused across requests.
 * Nodemailer manages connection pooling internally.
 */
const transporter: Transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

/**
 * Escapes user-supplied text before it is embedded in the HTML body
 * to prevent HTML injection in the outgoing email.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHtml(payload: ContactInput): string {
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const subject = escapeHtml(payload.subject);
  const message = escapeHtml(payload.message).replace(/\n/g, '<br />');

  return `
    <div style="font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px;">New contact form submission</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${name}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${email}</p>
      <p style="margin: 0 0 8px;"><strong>Subject:</strong> ${subject}</p>
      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
      <p style="margin: 0;">${message}</p>
    </div>
  `.trim();
}

function buildText(payload: ContactInput): string {
  return [
    'New contact form submission',
    '',
    `Name:    ${payload.name}`,
    `Email:   ${payload.email}`,
    `Subject: ${payload.subject}`,
    '',
    payload.message,
  ].join('\n');
}

/**
 * Dispatches a contact form submission to the configured inbox.
 * Resolves on successful delivery; rejects if SMTP fails.
 */
export async function sendContactEmail(payload: ContactInput): Promise<void> {
  await transporter.sendMail({
    from: env.MAIL_FROM,
    to: env.MAIL_TO,
    replyTo: `${payload.name} <${payload.email}>`,
    subject: `[Portfolio] ${payload.subject}`,
    text: buildText(payload),
    html: buildHtml(payload),
  });
}

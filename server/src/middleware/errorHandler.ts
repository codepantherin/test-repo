import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { env } from '../config/env.js';

type FieldErrors = Record<string, string[]>;

interface HttpError extends Error {
  status?: number;
  statusCode?: number;
  code?: string;
  errors?: FieldErrors;
}

const toFieldErrors = (error: ZodError): FieldErrors => {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.length > 0 ? issue.path.join('.') : 'form';
    (errors[key] ??= []).push(issue.message);
  }
  return errors;
};

const resolveStatus = (error: HttpError): number => {
  if (typeof error.status === 'number') return error.status;
  if (typeof error.statusCode === 'number') return error.statusCode;
  if (error instanceof ZodError) return 400;
  return 500;
};

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ ok: false, error: 'NOT_FOUND' });
};

export const errorHandler: ErrorRequestHandler = (error: HttpError, _req, res, _next) => {
  const status = resolveStatus(error);

  if (error instanceof ZodError) {
    res.status(400).json({ ok: false, errors: toFieldErrors(error) });
    return;
  }

  if (status === 429) {
    res.status(429).json({ ok: false, error: 'RATE_LIMITED' });
    return;
  }

  if (status === 400 && error.errors) {
    res.status(400).json({ ok: false, errors: error.errors });
    return;
  }

  if (status >= 400 && status < 500) {
    res.status(status).json({ ok: false, error: error.code ?? 'BAD_REQUEST' });
    return;
  }

  if (env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.error('[error]', error);
  }

  res.status(500).json({ ok: false, error: 'INTERNAL' });
};

import type { z } from 'zod';
import type { contactSchema } from '../features/contact/schema';

type ContactPayload = z.infer<typeof contactSchema>;

type ContactSuccess = { ok: true };
type ContactFieldErrors = { ok: false; errors: Record<string, string[]> };
type ContactRateLimited = { ok: false; error: 'RATE_LIMITED' };
type ContactInternal = { ok: false; error: 'INTERNAL' };

export type ContactResponse =
  | ContactSuccess
  | ContactFieldErrors
  | ContactRateLimited
  | ContactInternal;

/**
 * Thrown for any non-2xx API response. Carries the parsed JSON body so
 * callers (e.g. React Hook Form) can map field errors without re-parsing.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly body: ContactResponse | null;

  constructor(status: number, body: ContactResponse | null) {
    super(`API request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

const API_URL: string = 
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';

async function request<TResponse>(
  path: string,
  init: RequestInit,
): Promise<TResponse> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...init.headers,
    },
  });

  let body: unknown = null;
  const text = await response.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = null;
    }
  }

  if (!response.ok) {
    throw new ApiError(response.status, body as ContactResponse | null);
  }

  return body as TResponse;
}

export const api = {
  contact: {
    submit(payload: ContactPayload): Promise<ContactSuccess> {
      return request<ContactSuccess>('/api/contact', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
  },
} as const;

export type Api = typeof api;

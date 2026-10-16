import type { JoinInput, PartnerInput, ContactInput } from '@afrihub/shared';

export type ApiResult<T = { message: string }> =
  | { kind: 'success'; status: 201; data: T }
  | {
      kind: 'validation_error';
      status: 400;
      message: string;
      fieldErrors: Record<string, string[] | undefined>;
    }
  | { kind: 'conflict'; status: 409; message: string }
  | { kind: 'rate_limited'; status: 429; message: string }
  | { kind: 'server_error'; status: 500; message: string }
  | { kind: 'network_error'; status: 0; message: string };

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const DEFAULT_TIMEOUT_MS = 10000;

export async function submitForm<TBody extends object, TResponse = { message: string }>(
  endpoint: '/api/join' | '/api/partners' | '/api/contact',
  body: TBody,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<ApiResult<TResponse>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = `${BASE_URL.replace(/\/+$/, '')}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timer);

    let json: Record<string, unknown> | null = null;
    try {
      const parsed: unknown = await response.json();
      if (typeof parsed === 'object' && parsed !== null) {
        json = parsed as Record<string, unknown>;
      }
    } catch {
      // Body may not be valid JSON
    }

    if (response.status === 201) {
      return {
        kind: 'success',
        status: 201,
        data: ((json as unknown) || { message: 'Submission received successfully' }) as TResponse,
      };
    }

    if (response.status === 400) {
      const fieldErrors = ((json?.details || json?.errors || {}) as Record<
        string,
        string[] | undefined
      >);
      const message =
        (typeof json?.error === 'string' ? json.error : null) ||
        (typeof json?.message === 'string' ? json.message : null) ||
        'Please review the highlighted fields and correct the errors.';
      return {
        kind: 'validation_error',
        status: 400,
        message,
        fieldErrors,
      };
    }

    if (response.status === 409) {
      const message =
        (typeof json?.error === 'string' ? json.error : null) ||
        (typeof json?.message === 'string' ? json.message : null) ||
        'This email is already registered with AfriHub. Contact us if you need help.';
      return {
        kind: 'conflict',
        status: 409,
        message,
      };
    }

    if (response.status === 429) {
      return {
        kind: 'rate_limited',
        status: 429,
        message: 'Too many attempts. Please wait a minute and try again.',
      };
    }

    // 500 or any unexpected server status
    return {
      kind: 'server_error',
      status: 500,
      message: 'Something went wrong. Please try again in a moment.',
    };
  } catch {
    clearTimeout(timer);
    return {
      kind: 'network_error',
      status: 0,
      message: 'Something went wrong. Please try again in a moment.',
    };
  }
}

export const api = {
  join: (data: JoinInput) => submitForm<JoinInput>('/api/join', data),
  partners: (data: PartnerInput) => submitForm<PartnerInput>('/api/partners', data),
  contact: (data: ContactInput) => submitForm<ContactInput>('/api/contact', data),
};

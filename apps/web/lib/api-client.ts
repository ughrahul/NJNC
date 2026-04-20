import type { ApiResponse } from '@njnc/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
};

/**
 * API client for communicating with the Fastify backend.
 * Handles the standard response envelope, auth headers, and error parsing.
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {}, token } = options;

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include', // Send httpOnly cookies (refresh token)
    });

    const data: ApiResponse<T> = await response.json();

    if (!data.success) {
      throw new ApiError(
        response.status,
        data.error.code,
        data.error.message,
        data.error.fields
      );
    }

    return data.data;
  }

  get<T>(path: string, token?: string) {
    return this.request<T>(path, { method: 'GET', token });
  }

  post<T>(path: string, body: unknown, token?: string) {
    return this.request<T>(path, { method: 'POST', body, token });
  }

  put<T>(path: string, body: unknown, token?: string) {
    return this.request<T>(path, { method: 'PUT', body, token });
  }

  patch<T>(path: string, body: unknown, token?: string) {
    return this.request<T>(path, { method: 'PATCH', body, token });
  }

  delete<T>(path: string, token?: string) {
    return this.request<T>(path, { method: 'DELETE', token });
  }
}

export class ApiError extends Error {
  public statusCode: number;
  public code: string;
  public fields?: Record<string, string>;

  constructor(
    statusCode: number,
    code: string,
    message: string,
    fields?: Record<string, string>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.fields = fields;
    this.name = 'ApiError';
  }
}

export const api = new ApiClient(API_BASE_URL);

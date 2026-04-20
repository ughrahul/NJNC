/**
 * Custom error classes for structured error handling.
 */

export class AppError extends Error {
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
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id
      ? `${resource} with ID ${id} not found`
      : `${resource} not found`;
    super(404, 'NOT_FOUND', message);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, fields?: Record<string, string>) {
    super(400, 'VALIDATION_ERROR', message, fields);
    this.name = 'ValidationError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(401, 'UNAUTHORIZED', message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'You do not have permission to perform this action') {
    super(403, 'FORBIDDEN', message);
    this.name = 'ForbiddenError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string, fields?: Record<string, string>) {
    super(409, 'CONFLICT', message, fields);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super(429, 'RATE_LIMIT_EXCEEDED', 'Too many requests. Please try again later.');
    this.name = 'RateLimitError';
  }
}

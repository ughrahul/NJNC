/**
 * Standard API response helpers.
 * All responses follow the envelope defined in the spec (§10.2).
 */

import type {
  ApiSuccessResponse,
  ApiErrorResponse,
  PaginationMeta,
} from "@njnc/types";

export function successResponse<T>(
  data: T,
  meta?: PaginationMeta,
): ApiSuccessResponse<T> {
  const response: ApiSuccessResponse<T> = {
    success: true,
    data,
  };
  if (meta) {
    response.meta = meta;
  }
  return response;
}

export function errorResponse(
  code: string,
  message: string,
  fields?: Record<string, string>,
): ApiErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      ...(fields && { fields }),
    },
  };
}

export function paginationMeta(
  page: number,
  perPage: number,
  total: number,
): PaginationMeta {
  return {
    page,
    perPage,
    total,
    totalPages: Math.ceil(total / perPage),
  };
}

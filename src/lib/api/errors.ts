import type { ApiErrorDetail } from "@/types/api";

export class ApiError extends Error {
  readonly status: number;
  readonly details: ApiErrorDetail[];

  constructor(
    message: string,
    status: number,
    details: ApiErrorDetail[] = [],
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(
    message = "You need to sign in to continue.",
    details: ApiErrorDetail[] = [],
  ) {
    super(message, 401, details);
    this.name = "UnauthorizedError";
  }
}

export type ApiErrorDetails = ApiErrorDetail;

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function isUnauthorizedError(error: unknown): error is UnauthorizedError {
  return (
    error instanceof UnauthorizedError ||
    (error instanceof ApiError && error.status === 401)
  );
}

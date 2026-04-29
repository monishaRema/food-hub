export type ApiErrorDetails = {
  field?: string;
  message: string;
};

export class ApiError extends Error {
  readonly status: number;
  readonly errorDetails?: ApiErrorDetails[];

  constructor(message: string, status: number, errorDetails?: ApiErrorDetails[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errorDetails = errorDetails;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(
    message = "Session expired. Please login again.",
    errorDetails?: ApiErrorDetails[],
  ) {
    super(message, 401, errorDetails);
    this.name = "UnauthorizedError";
  }
}

export function isUnauthorizedError(error: unknown): error is UnauthorizedError {
  return (
    error instanceof UnauthorizedError ||
    (error instanceof ApiError && error.status === 401)
  );
}

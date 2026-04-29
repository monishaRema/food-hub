import { env } from "@/env";
import { ApiError, type ApiErrorDetails, UnauthorizedError } from "@/lib/api/errors";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

type ApiErrorResponse = {
  success: false;
  message: string;
  errorDetails?: ApiErrorDetails[];
};

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

async function parseJson<T>(response: Response): Promise<T> {
  const result = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !result.success) {
    const errorDetails = !result.success ? result.errorDetails : undefined;

    if (response.status === 401) {
      throw new UnauthorizedError(result.message, errorDetails);
    }

    throw new ApiError(
      result.message || `Request failed with ${response.status}`,
      response.status,
      errorDetails,
    );
  }

  return result.data;
}

function createRequestOptions(method: HttpMethod, data?: unknown): RequestInit {
  return {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
  };
}

export async function apiFetch<T>(
  endpoint: string,
  method: HttpMethod = "GET",
  data?: unknown,
): Promise<T> {
  let response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}${endpoint}`,
    createRequestOptions(method, data),
  );

  if (response.status === 401) {
    const refreshResponse = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (!refreshResponse.ok) {
      throw new UnauthorizedError();
    }

    response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}${endpoint}`,
      createRequestOptions(method, data),
    );
  }

  return parseJson<T>(response);
}

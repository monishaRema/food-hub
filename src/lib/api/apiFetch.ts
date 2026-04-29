import { env } from "@/env";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

type ApiErrorResponse = {
  success: false;
  message: string;
  errorDetails?: unknown;
};

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

async function parseJson<T>(response: Response): Promise<T> {
  /**
   * @params take a promise
   * @return data in json as result
   */
  const result = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !result.success) {
    throw new Error(result.message || `Request failed with ${response.status}`);
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
      throw new Error("Session expired. Please login again.");
    }

    response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}${endpoint}`,
      createRequestOptions(method, data),
    );
  }

  return parseJson<T>(response);
}

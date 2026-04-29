import "server-only";

import { cookies } from "next/headers";
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

type ServerApiFetchOptions = {
  method?: HttpMethod;
  data?: unknown;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number | false;
};

async function parseJson<T>(response: Response): Promise<T> {
  const result = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !result.success) {
    throw new Error(result.message || `Request failed with ${response.status}`);
  }

  return result.data;
}

export async function apiFetchServer<T>(
  endpoint: string,
  options: ServerApiFetchOptions = {},
): Promise<T> {
  const {
    method = "GET",
    data,
    cache,
    tags,
    revalidate,
  } = options;

  const cookieStore = await cookies();

  const response = await fetch(`${env.API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    ...(data !== undefined ? { body: JSON.stringify(data) } : {}),

    // Next.js caching
    ...(cache ? { cache } : {}),
    ...(tags || revalidate !== undefined
      ? {
          next: {
            ...(tags ? { tags } : {}),
            ...(revalidate !== undefined ? { revalidate } : {}),
          },
        }
      : {}),
  });

  return parseJson<T>(response);
}
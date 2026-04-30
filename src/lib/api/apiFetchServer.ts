import "server-only";

import { cookies } from "next/headers";

import { env } from "@/env";
import {
  ApiError,
  type ApiErrorDetails,
  UnauthorizedError,
} from "@/lib/api/errors";
import type { ApiFetchMethod } from "@/lib/api/types";
import type { ApiFetchResult, ApiResponse } from "@/types/api";

type ServerApiFetchOptions = {
  method?: ApiFetchMethod;
  data?: unknown;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number | false;
};



async function parseJson<T>(response: Response): Promise<ApiFetchResult<T>> {
  const result = (await response.json()) as Omit<ApiResponse<T>, "res">;

  if (!response.ok) {
    const errorDetails = result.errorDetails as ApiErrorDetails[] | undefined;

    if (response.status === 401) {
      throw new UnauthorizedError(result.message, errorDetails);
    }

    throw new ApiError(
      result.message || `Request failed with ${response.status}`,
      response.status,
      errorDetails,
    );
  }

  return {
    res: response,
    statusCode: result.statusCode ?? response.status,
    message: result.message,
    data: result.data,
    meta: result.meta,
  };
}

export async function apiFetchServer<T>(
  endpoint: string,
  options: ServerApiFetchOptions = {},
): Promise<ApiFetchResult<T>> {
  const { method = "GET", data, cache, tags, revalidate } = options;
  const cookieStore = await cookies();

  const response = await fetch(`${env.API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
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

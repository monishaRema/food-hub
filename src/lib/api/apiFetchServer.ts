import "server-only";

import { cookies } from "next/headers";

import { env } from "@/env";
import {
  ApiError,
  type ApiErrorDetails,
  UnauthorizedError,
} from "@/lib/api/errors";
import type { ApiFetchMethod, ApiFetchResult, ApiResponse } from "@/types/api";

type ServerApiFetchOptions = {
  method?: ApiFetchMethod;
  data?: unknown;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number | false;
};

function buildNextOptions(params: {
  tags?: string[];
  revalidate?: number | false;
}) {
  const { tags, revalidate } = params;

  if (!tags && revalidate === undefined) {
    return {};
  }

  return {
    next: {
      ...(tags ? { tags } : {}),
      ...(revalidate !== undefined ? { revalidate } : {}),
    },
  };
}

async function parseJson<T>(response: Response): Promise<ApiFetchResult<T>> {
  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    throw new ApiError(
      `Invalid response from server. Status: ${response.status}`,
      response.status,
    );
  }

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
    data: result.data,
    meta: result.meta ?? null,
  };
}

export async function apiFetchServer<T>(
  endpoint: string,
  options: ServerApiFetchOptions = {},
): Promise<ApiFetchResult<T>> {
  const { method = "GET", data, cache, tags, revalidate } = options;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`${env.API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
    ...(cache ? { cache } : {}),
    ...buildNextOptions({ tags, revalidate }),
  });

  return parseJson<T>(response);
}

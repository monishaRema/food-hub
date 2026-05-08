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
  forwardCookies?: boolean;
};

function getApiEndpoint(endpoint: string) {
  if (!endpoint.startsWith("/api/")) {
    throw new Error(
      `apiFetchServer expected an /api/* endpoint, received "${endpoint}".`,
    );
  }

  return endpoint;
}

function buildBackendUrl(endpoint: string) {
  return `${env.API_URL.replace(/\/$/, "")}/${endpoint.replace(/^\/api\//, "")}`;
}

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
  const {
    method = "GET",
    data,
    cache,
    tags,
    revalidate,
    forwardCookies = false,
  } = options;
  const apiEndpoint = getApiEndpoint(endpoint);

  let cookieHeader = "";
  const requestHeaders = new Headers();

  if (forwardCookies) {
    const cookieStore = await cookies();

    cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const accessToken = cookieStore.get("access-token")?.value;
    const refreshToken = cookieStore.get("refresh-token")?.value;

    if (cookieHeader) {
      requestHeaders.set("cookie", cookieHeader);
    }

    if (accessToken) {
      requestHeaders.set("authorization", `Bearer ${accessToken}`);
      requestHeaders.set("access-token", accessToken);
    }

    if (refreshToken) {
      requestHeaders.set("refresh-token", refreshToken);
    }
  }

  const targetUrl = forwardCookies
    ? new URL(apiEndpoint, env.FRONTEND_BASE_URL)
    : buildBackendUrl(apiEndpoint);

  const response = await fetch(targetUrl, {
    method,
    headers: {
      ...Object.fromEntries(requestHeaders.entries()),
      ...(data !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
    ...(cache ? { cache } : {}),
    ...buildNextOptions({ tags, revalidate }),
  });

  return parseJson<T>(response);
}

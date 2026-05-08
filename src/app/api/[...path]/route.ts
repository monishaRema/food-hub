import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { env } from "@/env";
import type { ApiResponse } from "@/types/api";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

type ResponseHeadersWithSetCookie = Headers & {
  getSetCookie?: () => string[];
};

const BODYLESS_METHODS = new Set(["GET", "HEAD"]);

function buildBackendUrl(path: string[], search: string) {
  return `${env.API_URL}/${path.join("/")}${search}`;
}

function shouldUseSecureCookies(request: NextRequest) {
  return request.nextUrl.protocol === "https:";
}

function getTokenMaxAge(token: string) {
  try {
    const [, payload] = token.split(".");

    if (!payload) {
      return undefined;
    }

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(
      Buffer.from(normalizedPayload, "base64").toString("utf-8"),
    ) as { exp?: number };

    if (!decodedPayload.exp) {
      return undefined;
    }

    const maxAge = decodedPayload.exp - Math.floor(Date.now() / 1000);

    return maxAge > 0 ? maxAge : undefined;
  } catch {
    return undefined;
  }
}

function parseCookieHeader(cookieHeader: string | null) {
  const cookies = new Map<string, string>();

  if (!cookieHeader) {
    return cookies;
  }

  for (const segment of cookieHeader.split(";")) {
    const trimmedSegment = segment.trim();

    if (!trimmedSegment) {
      continue;
    }

    const separatorIndex = trimmedSegment.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const name = trimmedSegment.slice(0, separatorIndex).trim();
    const value = trimmedSegment.slice(separatorIndex + 1).trim();

    if (name) {
      cookies.set(name, value);
    }
  }

  return cookies;
}

function getCookieToken(cookieHeader: string | null, name: string) {
  return parseCookieHeader(cookieHeader).get(name);
}

function stringifyCookieHeader(cookieMap: Map<string, string>) {
  return Array.from(cookieMap.entries())
    .map(([name, value]) => `${name}=${value}`)
    .join("; ");
}

function updateCookieHeader(
  cookieHeader: string | null,
  tokens: {
    accessToken?: string;
    refreshToken?: string;
  },
) {
  const cookies = parseCookieHeader(cookieHeader);

  if (tokens.accessToken) {
    cookies.set("access-token", tokens.accessToken);
  }

  if (tokens.refreshToken) {
    cookies.set("refresh-token", tokens.refreshToken);
  }

  return stringifyCookieHeader(cookies);
}

function shouldAttemptRefresh(path: string[], status: number) {
  if (status !== 401) {
    return false;
  }

  if (path.length < 2 || path[0] !== "auth") {
    return true;
  }

  return path[1] === "me";
}

function applyAuthCookies(
  response: NextResponse,
  request: NextRequest,
  tokens: {
    accessToken?: string;
    refreshToken?: string;
  },
) {
  const secure = shouldUseSecureCookies(request);

  if (tokens.accessToken) {
    const accessTokenMaxAge = getTokenMaxAge(tokens.accessToken);

    response.cookies.set("access-token", tokens.accessToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      ...(accessTokenMaxAge ? { maxAge: accessTokenMaxAge } : {}),
    });
  }

  if (tokens.refreshToken) {
    const refreshTokenMaxAge = getTokenMaxAge(tokens.refreshToken);

    response.cookies.set("refresh-token", tokens.refreshToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      ...(refreshTokenMaxAge ? { maxAge: refreshTokenMaxAge } : {}),
    });
  }
}

function clearAuthCookies(response: NextResponse, request: NextRequest) {
  const secure = shouldUseSecureCookies(request);

  response.cookies.set("access-token", "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("refresh-token", "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

function getAuthTokensFromPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return {};
  }

  const data = (payload as { data?: unknown }).data;

  if (!data || typeof data !== "object") {
    return {};
  }

  const tokenData = data as {
    accessToken?: unknown;
    refreshToken?: unknown;
  };

  return {
    accessToken:
      typeof tokenData.accessToken === "string"
        ? tokenData.accessToken
        : undefined,
    refreshToken:
      typeof tokenData.refreshToken === "string"
        ? tokenData.refreshToken
        : undefined,
  };
}

async function callBackend(
  targetUrl: string,
  method: string,
  contentType: string | null,
  cookieHeader: string | null,
  body?: string,
) {
  const headers = new Headers();
  const accessToken = getCookieToken(cookieHeader, "access-token");
  const refreshToken = getCookieToken(cookieHeader, "refresh-token");

  if (contentType) {
    headers.set("content-type", contentType);
  }

  if (cookieHeader) {
    headers.set("cookie", cookieHeader);
  }

  if (accessToken) {
    headers.set("authorization", `Bearer ${accessToken}`);
    headers.set("access-token", accessToken);
  }

  if (refreshToken) {
    headers.set("refresh-token", refreshToken);
  }

  return fetch(targetUrl, {
    method,
    headers,
    body,
    cache: "no-store",
  });
}

function getSetCookieHeaders(headers: Headers) {
  const responseHeaders = headers as ResponseHeadersWithSetCookie;

  if (typeof responseHeaders.getSetCookie === "function") {
    return responseHeaders.getSetCookie();
  }

  const setCookie = headers.get("set-cookie");

  return setCookie ? [setCookie] : [];
}

async function createProxyResponse(
  backendResponse: Response,
  request: NextRequest,
  options?: {
    tokens?: {
      accessToken?: string;
      refreshToken?: string;
    };
    clearCookies?: boolean;
  },
) {
  const responseBody =
    backendResponse.status === 204 ||
    backendResponse.status === 205 ||
    backendResponse.status === 304
      ? null
      : await backendResponse.text();

  const headers = new Headers();
  const contentType = backendResponse.headers.get("content-type");

  if (contentType) {
    headers.set("content-type", contentType);
  }

  const response = new NextResponse(responseBody, {
    status: backendResponse.status,
    headers,
  });

  for (const setCookie of getSetCookieHeaders(backendResponse.headers)) {
    response.headers.append("set-cookie", setCookie);
  }

  if (options?.tokens) {
    applyAuthCookies(response, request, options.tokens);
  }

  if (options?.clearCookies) {
    clearAuthCookies(response, request);
  }

  return response;
}

async function proxyHandler(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  const targetUrl = buildBackendUrl(path, request.nextUrl.search);
  const contentType = request.headers.get("content-type");
  const cookieHeader = request.headers.get("cookie");

  const body = BODYLESS_METHODS.has(request.method)
    ? undefined
    : await request.text();

  let backendResponse = await callBackend(
    targetUrl,
    request.method,
    contentType,
    cookieHeader,
    body,
  );

  if (!shouldAttemptRefresh(path, backendResponse.status)) {
    const responseBody = await backendResponse.clone().text();
    const contentTypeHeader = backendResponse.headers.get("content-type");
    const payload =
      contentTypeHeader?.includes("application/json") && responseBody
        ? (JSON.parse(responseBody) as ApiResponse<unknown>)
        : null;

    const tokens = payload ? getAuthTokensFromPayload(payload) : undefined;
    const isLogout =
      backendResponse.ok &&
      path.length === 2 &&
      path[0] === "auth" &&
      path[1] === "logout";

    return createProxyResponse(backendResponse, request, {
      tokens,
      clearCookies: isLogout,
    });
  }

  const refreshResponse = await callBackend(
    buildBackendUrl(["auth", "refresh-token"], ""),
    "POST",
    null,
    cookieHeader,
  );

  if (!refreshResponse.ok) {
    const expiredResponse = NextResponse.json(
      {
        success: false,
        message: "Session expired. Please log in again.",
      },
      { status: 401 },
    );

    clearAuthCookies(expiredResponse, request);

    return expiredResponse;
  }

  const refreshPayload = (await refreshResponse.json()) as ApiResponse<unknown>;
  const refreshedTokens = getAuthTokensFromPayload(refreshPayload);
  const refreshedCookieHeader = updateCookieHeader(cookieHeader, refreshedTokens);

  backendResponse = await callBackend(
    targetUrl,
    request.method,
    contentType,
    refreshedCookieHeader || null,
    body,
  );

  return createProxyResponse(backendResponse, request, {
    tokens: refreshedTokens,
  });
}

export const dynamic = "force-dynamic";

export const GET = proxyHandler;
export const POST = proxyHandler;
export const PATCH = proxyHandler;
export const PUT = proxyHandler;
export const DELETE = proxyHandler;
export const HEAD = proxyHandler;
export const OPTIONS = proxyHandler;

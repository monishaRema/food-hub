export type ApiFetchMethod = "GET" | "POST" | "PATCH" | "DELETE";

export type ApiSearchParamValue =
  | string
  | number
  | boolean
  | null
  | undefined;

export type ApiSearchParams = Record<
  string,
  ApiSearchParamValue | ApiSearchParamValue[]
>;

export interface ApiFetchOptions {
  method?: ApiFetchMethod;
  body?: unknown;
  headers?: HeadersInit;
  searchParams?: ApiSearchParams;
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  forwardCookies?: boolean;
}

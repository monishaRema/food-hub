export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export interface Meta {
  page: number;
  limit: number;
  totalItems: number;
  totalPage: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: Meta;
  errorDetails?: ApiErrorDetail[];
  res?: Response;
  statusCode?: number;
}

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: Meta;
  errorDetails?: ApiErrorDetail[];
}

export type ApiFetchResult<T> = {
  data?: T;
  meta: Meta | null;
};

export interface PaginatedPayload<T> {
  data: T;
  meta: Meta;
}


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

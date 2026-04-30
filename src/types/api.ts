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
  res: Response;
  statusCode: number;
  message: string;
  data?: T;
  meta?: Meta;
  errorDetails?: ApiErrorDetail[];
}

export type ApiFetchResult<T> = {
  res: Response;
  statusCode: number;
  message: string;
  data?: T;
  meta?: Meta;
};

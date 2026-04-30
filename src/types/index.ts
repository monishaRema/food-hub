export type SearchParamsType = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export type ParamsIdType = {
  params: Promise<{ id: string }>;
}
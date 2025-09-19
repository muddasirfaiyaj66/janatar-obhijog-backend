export interface TQuery {
  searchTerm?: string;
  sort?: string;
  limit?: number;
  page?: number;
  skip?: number;
  fields?: string;
  [key: string]: string | number | boolean | undefined; // For dynamic filtering
}

export interface TPaginationResult extends Record<string, unknown> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface TQueryResult<T> {
  data: T[];
  pagination: TPaginationResult;
}

export interface TSortOptions {
  [key: string]: 1 | -1;
}

export interface TFilterOptions {
  [key: string]:
    | string
    | number
    | boolean
    | Date
    | RegExp
    | Record<string, unknown>;
}

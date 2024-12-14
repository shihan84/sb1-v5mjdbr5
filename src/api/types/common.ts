// Common types used across multiple endpoints
export interface CollectionResponse {
  estimated_count: number;
  next?: string;
  prev?: string;
  timing?: Record<string, any>;
}

export interface ErrorResponse {
  errors: Array<{
    id?: string;
    status?: string;
    code?: string;
    title?: string;
    source?: {
      pointer?: string;
      parameter?: string;
    };
    meta?: Record<string, string>;
  }>;
}

export interface PaginationParams {
  limit?: number;
  cursor?: string;
  sort?: string;
  select?: string;
}

export interface QueryOptions extends PaginationParams {
  q?: string;
  format?: 'openmetrics';
}
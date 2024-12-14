export interface ApiError extends Error {
  status?: number;
  code?: string;
  details?: Record<string, unknown>;
}

export interface ErrorResponse {
  error?: string;
  message?: string;
  code?: string;
  details?: Record<string, unknown>;
}
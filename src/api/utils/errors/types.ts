export interface ApiErrorData {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

export interface ErrorResponse {
  error?: string;
  message?: string;
  code?: string;
  details?: Record<string, unknown>;
}
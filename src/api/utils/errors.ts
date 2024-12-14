import { ERROR_MESSAGES } from '../config/constants';
import type { ApiError } from '../http/types';

export function handleHttpError(status: number, error: unknown): ApiError {
  // Network or CORS errors
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return createApiError(ERROR_MESSAGES.NETWORK.TIMEOUT);
    }
    if (error.message.includes('Failed to fetch')) {
      return createApiError(ERROR_MESSAGES.NETWORK.CONNECTION);
    }
    if (error.message.includes('CORS')) {
      return createApiError(ERROR_MESSAGES.NETWORK.CORS);
    }
  }

  // HTTP status errors
  switch (status) {
    case 401:
      return createApiError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS, status);
    case 403:
      return createApiError(ERROR_MESSAGES.AUTH.SESSION_EXPIRED, status);
    case 404:
      return createApiError(ERROR_MESSAGES.SERVER.NOT_FOUND, status);
    case 503:
      return createApiError(ERROR_MESSAGES.SERVER.MAINTENANCE, status);
    default:
      if (status >= 500) {
        return createApiError(ERROR_MESSAGES.SERVER.ERROR, status);
      }
  }

  // Unknown errors
  const message = error instanceof Error ? error.message : 'Unknown error occurred';
  return createApiError(message, status);
}

function createApiError(message: string, status?: number): ApiError {
  const error = new Error(message) as ApiError;
  error.name = 'ApiError';
  if (status) error.status = status;
  return error;
}
import { ERROR_MESSAGES } from './messages';
import { ApiError, NetworkError, AuthError, ServerError } from './ApiError';
import type { ErrorResponse } from './types';

export function handleApiError(error: unknown): Error {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    // Network errors
    if (error.message.includes('Failed to fetch')) {
      return new NetworkError(ERROR_MESSAGES.NETWORK.CONNECTION);
    }
    // Timeout errors
    if (error.name === 'AbortError') {
      return new NetworkError(ERROR_MESSAGES.NETWORK.TIMEOUT);
    }
    // CORS errors
    if (error.message.includes('CORS')) {
      return new NetworkError(ERROR_MESSAGES.NETWORK.CORS);
    }
    return new ApiError(error.message);
  }

  return new ApiError('Unknown error occurred');
}

export function handleHttpError(status: number, error: unknown): ApiError {
  // Network or CORS errors
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return new NetworkError(ERROR_MESSAGES.NETWORK.TIMEOUT);
    }
    if (error.message.includes('Failed to fetch')) {
      return new NetworkError(ERROR_MESSAGES.NETWORK.CONNECTION);
    }
    if (error.message.includes('CORS')) {
      return new NetworkError(ERROR_MESSAGES.NETWORK.CORS);
    }
  }

  // HTTP status errors
  switch (status) {
    case 401:
      return new AuthError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
    case 403:
      return new AuthError(ERROR_MESSAGES.AUTH.SESSION_EXPIRED);
    case 404:
      return new ServerError(ERROR_MESSAGES.SERVER.NOT_FOUND, status);
    case 503:
      return new ServerError(ERROR_MESSAGES.SERVER.MAINTENANCE, status);
    default:
      if (status >= 500) {
        return new ServerError(ERROR_MESSAGES.SERVER.ERROR, status);
      }
  }

  // Parse error response
  if (typeof error === 'object' && error !== null) {
    const errorResponse = error as ErrorResponse;
    const message = errorResponse.error || errorResponse.message || 'Unknown error occurred';
    return new ApiError(message, errorResponse.code, status);
  }

  return new ApiError('Unknown error occurred', undefined, status);
}
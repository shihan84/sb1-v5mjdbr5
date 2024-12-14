import { fetchWithTimeout } from './networkUtils';
import { withRetry } from './retryUtils';
import { createAuthHeaders } from './headers';
import { ERROR_MESSAGES } from '../config/constants';
import type { FlussonicAuth } from '../types';

interface RequestOptions extends RequestInit {
  auth: FlussonicAuth;
}

export async function makeRequest<T>(
  url: string,
  { auth, ...options }: RequestOptions
): Promise<T> {
  const headers = createAuthHeaders(auth);
  
  try {
    const response = await withRetry(() =>
      fetchWithTimeout(url, {
        ...options,
        headers,
        mode: 'cors',
        credentials: 'include',
        redirect: 'follow'
      })
    );

    if (!response.ok) {
      throw await handleErrorResponse(response);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Request failed:', error);
    throw handleRequestError(error);
  }
}

async function handleErrorResponse(response: Response): Promise<Error> {
  let message = `HTTP Error ${response.status}`;

  try {
    const data = await response.json();
    message = data.error || data.message || message;
  } catch {
    message = response.statusText || message;
  }

  const error = new Error(message);
  (error as any).status = response.status;

  switch (response.status) {
    case 401:
      return new Error(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
    case 403:
      return new Error(ERROR_MESSAGES.AUTH.SESSION_EXPIRED);
    case 404:
      return new Error(ERROR_MESSAGES.SERVER.NOT_FOUND);
    case 503:
      return new Error(ERROR_MESSAGES.SERVER.MAINTENANCE);
    default:
      if (response.status >= 500) {
        return new Error(ERROR_MESSAGES.SERVER.ERROR);
      }
      return error;
  }
}

function handleRequestError(error: unknown): Error {
  if (error instanceof Error) {
    // Network errors
    if (
      error.message.includes('Failed to fetch') ||
      error.message.includes('NetworkError')
    ) {
      return new Error(ERROR_MESSAGES.NETWORK.CONNECTION);
    }

    // Timeout errors
    if (error.name === 'AbortError') {
      return new Error(ERROR_MESSAGES.NETWORK.TIMEOUT);
    }

    // CORS errors
    if (
      error.message.includes('CORS') ||
      error.message.includes('Cross-Origin')
    ) {
      return new Error(ERROR_MESSAGES.NETWORK.CORS);
    }

    return error;
  }

  return new Error('An unknown error occurred. Please try again.');
}
import { API_CONFIG } from '../config/constants';

export async function withRetry<T>(
  operation: () => Promise<T>,
  retryConfig = API_CONFIG.RETRY_CONFIG
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt < retryConfig.attempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (!shouldRetry(error)) {
        throw error;
      }
      
      const delay = Math.min(
        retryConfig.baseDelay * Math.pow(2, attempt),
        retryConfig.maxDelay
      );
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}

function shouldRetry(error: unknown): boolean {
  if (error instanceof Error) {
    // Retry network errors and 5xx server errors
    return (
      error.name === 'NetworkError' ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('500') ||
      error.message.includes('503')
    );
  }
  return false;
}
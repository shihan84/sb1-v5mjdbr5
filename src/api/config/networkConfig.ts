export const NETWORK_CONFIG = {
  TIMEOUT: 10000,
  RETRY: {
    attempts: 3,
    baseDelay: 1000,
    maxDelay: 5000
  },
  STATUS_CODES: {
    OK: 200,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  }
} as const;
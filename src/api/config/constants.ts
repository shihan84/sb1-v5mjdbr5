export const API_CONFIG = {
  // Use HTTPS for production, HTTP for development
  BASE_URL: import.meta.env.PROD 
    ? 'https://live.ekamraott.com'
    : 'http://localhost:5173/api',
  API_VERSION: 'v3',
  API_PATH: '/streamer/api/v3',
  DEFAULT_CREDENTIALS: {
    username: 'demo',
    password: 'pass'
  },
  RETRY_CONFIG: {
    attempts: 3,
    baseDelay: 1000,
    maxDelay: 5000
  },
  TIMEOUT: 30000 // Increased timeout for slower connections
} as const;

export const ERROR_MESSAGES = {
  NETWORK: {
    CONNECTION: 'Cannot connect to server. Please check:\n' +
      '1. The server URL is correct\n' +
      '2. The server is running\n' +
      '3. Your network connection is working\n' +
      '4. Any firewalls or VPNs that might be blocking the connection\n' +
      '5. The server is accessible from your network',
    TIMEOUT: 'Request timed out. The server took too long to respond.',
    CORS: 'Cross-Origin Resource Sharing (CORS) error. Please check server configuration.'
  },
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid username or password. Please check your credentials.',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.'
  },
  SERVER: {
    NOT_FOUND: 'Server not found. Please check the URL.',
    ERROR: 'Server error occurred. Please try again later.',
    MAINTENANCE: 'Server is under maintenance. Please try again later.'
  }
} as const;
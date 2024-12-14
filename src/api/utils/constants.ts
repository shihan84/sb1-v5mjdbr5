export const API_PATHS = {
  BASE: 'streamer/api/v3',
  STATS: 'config/stats',
  STREAMS: 'streams',
} as const;

export const ERROR_MESSAGES = {
  NETWORK: 'Cannot connect to server. Please check:\n' +
    '1. The server URL is correct\n' +
    '2. The server is running\n' +
    '3. Your network connection is working\n' +
    '4. CORS is properly configured on the server\n' +
    '5. Any firewalls are not blocking the connection',
  AUTH: 'Invalid username or password',
  NOT_FOUND: 'API endpoint not found. Please check the server URL',
  SERVER_ERROR: 'Server error occurred. Please try again later',
  UNKNOWN: 'An unknown error occurred',
} as const;
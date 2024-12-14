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
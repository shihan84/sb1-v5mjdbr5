export const API_CONFIG = {
  BASE_URL: import.meta.env.PROD 
    ? 'https://live.ekamraott.com'
    : 'http://localhost:5173/api',
  API_PATH: '/streamer/api/v3',
  DEFAULT_CREDENTIALS: {
    username: 'demo',
    password: 'pass'
  }
} as const;
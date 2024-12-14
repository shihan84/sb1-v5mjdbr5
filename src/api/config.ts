export const API_CONFIG = {
  BASE_URL: 'http://live.ekamraott.com',
  DEFAULT_CREDENTIALS: {
    username: 'demo',
    password: 'pass'
  },
  ENDPOINTS: {
    STREAMS: '/streamer/api/v3/streams',
    STATS: '/streamer/api/v3/config/stats',
    DVR: '/streamer/api/v3/dvr'
  }
} as const;
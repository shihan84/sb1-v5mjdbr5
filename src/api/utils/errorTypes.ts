export class APIError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class AuthenticationError extends APIError {
  constructor(message = 'Invalid username or password') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class NetworkError extends APIError {
  constructor(message = 'Network connection failed') {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}
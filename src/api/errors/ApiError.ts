import type { ApiError } from './types';

export class FlussonicApiError extends Error implements ApiError {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'FlussonicApiError';
  }
}

export class NetworkError extends FlussonicApiError {
  constructor(message: string) {
    super(message, undefined, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export class AuthError extends FlussonicApiError {
  constructor(message: string) {
    super(message, 401, 'AUTH_ERROR');
    this.name = 'AuthError';
  }
}

export class ServerError extends FlussonicApiError {
  constructor(message: string, status?: number) {
    super(message, status, 'SERVER_ERROR');
    this.name = 'ServerError';
  }
}
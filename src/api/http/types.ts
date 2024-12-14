import type { FlussonicAuth } from '../types';

export interface RequestConfig extends Omit<RequestInit, 'body'> {
  auth: FlussonicAuth;
  body?: unknown;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface ApiError extends Error {
  status?: number;
  code?: string;
}
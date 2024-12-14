import { NETWORK_CONFIG } from '../config/networkConfig';
import { createAuthHeaders } from '../utils/headers';
import { handleHttpError, handleRequestError } from '../errors';
import type { RequestConfig, ApiResponse } from './types';

export class HttpClient {
  constructor(private baseUrl: string) {}

  async request<T>(path: string, config: RequestConfig): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path);
    const headers = createAuthHeaders(config.auth);
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      NETWORK_CONFIG.TIMEOUT
    );

    try {
      const response = await fetch(url, {
        ...config,
        headers,
        signal: controller.signal,
        credentials: 'include',
        mode: 'cors',
        body: config.body ? JSON.stringify(config.body) : undefined
      });

      clearTimeout(timeout);
      const data = await response.json();

      if (!response.ok) {
        throw handleHttpError(response.status, data);
      }

      return {
        data,
        status: response.status
      };
    } catch (error) {
      clearTimeout(timeout);
      throw handleRequestError(error);
    }
  }

  private buildUrl(path: string): string {
    return new URL(path, this.baseUrl).toString();
  }

  async get<T>(path: string, config: RequestConfig): Promise<T> {
    const response = await this.request<T>(path, { ...config, method: 'GET' });
    return response.data;
  }

  async post<T>(path: string, config: RequestConfig): Promise<T> {
    const response = await this.request<T>(path, { ...config, method: 'POST' });
    return response.data;
  }
}
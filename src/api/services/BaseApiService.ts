import { HttpClient } from '../http/HttpClient';
import { API_CONFIG } from '../config/apiConfig';
import type { FlussonicAuth } from '../types';

export class BaseApiService {
  protected client: HttpClient;
  protected auth: FlussonicAuth;

  constructor(baseUrl: string, auth: FlussonicAuth) {
    this.client = new HttpClient(baseUrl);
    this.auth = auth;
  }

  protected getApiPath(path: string): string {
    return `${API_CONFIG.API_PATH}${path}`;
  }
}
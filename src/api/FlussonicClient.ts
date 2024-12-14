import { HttpClient } from './http/HttpClient';
import { StreamsService } from './services/StreamsService';
import { StatsService } from './services/StatsService';
import { API_CONFIG } from './config/apiConfig';
import type { FlussonicAuth } from './types';

export class FlussonicClient {
  private readonly http: HttpClient;
  public readonly streams: StreamsService;
  public readonly stats: StatsService;

  constructor(baseUrl: string, auth: FlussonicAuth) {
    this.http = new HttpClient(this.normalizeUrl(baseUrl));
    this.streams = new StreamsService(this.http, auth);
    this.stats = new StatsService(this.http, auth);
  }

  private normalizeUrl(url: string): string {
    if (!url.match(/^https?:\/\/.+/)) {
      throw new Error('Invalid URL format. Must start with http:// or https://');
    }
    return url.replace(/\/+$/, '');
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.stats.get();
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}
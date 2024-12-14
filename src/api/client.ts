import { UrlBuilder } from './utils/url';
import { StreamsAPI } from './endpoints/streams';
import { StatsAPI } from './endpoints/stats';
import type { FlussonicAuth } from './types';

export class FlussonicClient {
  private urlBuilder: UrlBuilder;
  private auth: FlussonicAuth;

  public readonly streams: StreamsAPI;
  public readonly stats: StatsAPI;

  constructor(baseUrl: string, auth: FlussonicAuth) {
    // Ensure URL is properly formatted
    if (!baseUrl.match(/^https?:\/\/.+/)) {
      throw new Error('Invalid URL format. Must start with http:// or https://');
    }

    this.urlBuilder = new UrlBuilder(baseUrl);
    this.auth = auth;

    // Initialize API endpoints
    this.streams = new StreamsAPI(this.urlBuilder, this.auth);
    this.stats = new StatsAPI(this.urlBuilder, this.auth);
  }

  getStreamUrl(streamName: string): string {
    return `${this.urlBuilder.toString()}/streams/${encodeURIComponent(streamName)}`;
  }

  async testConnection(): Promise<boolean> {
    try {
      const stats = await this.stats.get();
      return !!stats;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}
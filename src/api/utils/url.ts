import { API_PATHS } from './constants';

export class UrlBuilder {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = this.normalizeUrl(baseUrl);
  }

  private normalizeUrl(url: string): string {
    try {
      // Remove trailing slashes and normalize
      const cleanUrl = url.replace(/\/+$/, '');
      
      // Parse URL to validate and normalize
      const urlObj = new URL(cleanUrl);
      
      // Ensure protocol is http or https
      if (!urlObj.protocol.match(/^https?:$/)) {
        throw new Error('URL must use HTTP or HTTPS protocol');
      }

      // Remove any existing API path
      const basePath = urlObj.pathname.replace(/\/streamer\/api\/v3\/?.*$/, '');
      
      // Reconstruct normalized URL without trailing slash
      return `${urlObj.protocol}//${urlObj.host}${basePath}`.replace(/\/$/, '');

    } catch (error) {
      throw new Error(`Invalid server URL: ${url}. Must be a valid HTTP/HTTPS URL`);
    }
  }

  private buildPath(...parts: string[]): string {
    return parts
      .map(part => part.replace(/^\/+|\/+$/g, ''))
      .filter(Boolean)
      .join('/');
  }

  getFullUrl(...parts: string[]): string {
    const path = this.buildPath(API_PATHS.BASE, ...parts);
    return `${this.baseUrl}/${path}`;
  }

  getStatsUrl(): string {
    return this.getFullUrl(API_PATHS.STATS);
  }

  getStreamsUrl(streamName?: string): string {
    return streamName 
      ? this.getFullUrl(API_PATHS.STREAMS, encodeURIComponent(streamName))
      : this.getFullUrl(API_PATHS.STREAMS);
  }

  toString(): string {
    return this.baseUrl;
  }
}
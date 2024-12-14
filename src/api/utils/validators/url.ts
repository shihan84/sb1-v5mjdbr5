export class UrlValidator {
  private static readonly PROTOCOLS = {
    rtmp: /^rtmps?:\/\/[^/]+(:\d+)?\/.*$/,
    udp: /^udp:\/\/(\d{1,3}\.){3}\d{1,3}:\d+$/,
    srt: /^srt:\/\/[^:]+:\d+/,
    m4f: /^m4fs?:\/\/.+/,
    hls: /^hlss?:\/\/.+/,
    tshttp: /^tshttps?:\/\/.+/
  };

  static validateServerUrl(url: string): string {
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

  static getProtocol(url: string): string {
    const match = url.match(/^([a-z]+):\/\//);
    if (!match) {
      throw new Error('Invalid URL format: missing protocol');
    }
    return match[1];
  }

  static isSupportedPushProtocol(protocol: string): boolean {
    const baseProtocol = protocol.replace('s', '');
    return Object.keys(this.PROTOCOLS).includes(baseProtocol);
  }

  static isValidUrl(url: string, protocol: string): boolean {
    const baseProtocol = protocol.replace('s', '');
    const regex = this.PROTOCOLS[baseProtocol];
    return regex ? regex.test(url) : false;
  }
}
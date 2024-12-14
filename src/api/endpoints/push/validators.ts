import { PushConfig } from '../../types';
import { UrlValidator } from '../../utils/validators/url';

export function validatePushConfig(config: PushConfig): void {
  if (!config.url) {
    throw new Error('Push URL is required');
  }

  const protocol = UrlValidator.getProtocol(config.url);
  
  if (!UrlValidator.isSupportedPushProtocol(protocol)) {
    throw new Error(`Unsupported push protocol: ${protocol}`);
  }

  if (!UrlValidator.isValidUrl(config.url, protocol)) {
    throw new Error(`Invalid ${protocol.toUpperCase()} URL format`);
  }

  validatePushParameters(config);
}

function validatePushParameters(config: PushConfig): void {
  if (config.retry_limit !== undefined && config.retry_limit < 0) {
    throw new Error('retry_limit must be a positive number');
  }

  if (config.retry_timeout !== undefined && config.retry_timeout < 0) {
    throw new Error('retry_timeout must be a positive number');
  }

  if (config.timeout !== undefined && config.timeout < 0) {
    throw new Error('timeout must be a positive number');
  }
}
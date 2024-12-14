import type { PushConfig } from '../types';

export function validatePushConfig(config: PushConfig): void {
  if (!config.url) {
    throw new Error('Push URL is required');
  }

  // Validate URL format based on protocol
  if (config.url.startsWith('rtmp://') || config.url.startsWith('rtmps://')) {
    validateRtmpPush(config);
  } else if (config.url.startsWith('udp://')) {
    validateUdpPush(config);
  } else if (config.url.startsWith('srt://')) {
    validateSrtPush(config);
  } else {
    throw new Error('Unsupported push protocol');
  }
}

function validateRtmpPush(config: PushConfig): void {
  // RTMP specific validations
  const rtmpRegex = /^rtmps?:\/\/[^/]+(:\d+)?\/.*$/;
  if (!rtmpRegex.test(config.url)) {
    throw new Error('Invalid RTMP URL format');
  }
}

function validateUdpPush(config: PushConfig): void {
  // UDP specific validations
  const udpRegex = /^udp:\/\/(\d{1,3}\.){3}\d{1,3}:\d+$/;
  if (!udpRegex.test(config.url)) {
    throw new Error('Invalid UDP URL format');
  }
}

function validateSrtPush(config: PushConfig): void {
  // SRT specific validations
  const srtRegex = /^srt:\/\/[^:]+:\d+/;
  if (!srtRegex.test(config.url)) {
    throw new Error('Invalid SRT URL format');
  }
}
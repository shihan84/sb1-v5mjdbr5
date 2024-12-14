import type { BasePushConfig } from './base';

export interface RtmpPushConfig extends BasePushConfig {
  url: string;
}

export interface UdpPushConfig extends BasePushConfig {
  url: string;
  multicast_loop?: boolean;
  standby?: boolean;
  vb?: number;
  bitrate?: number;
  pnr?: number;
  pids?: Record<string, number>;
  mpegts_ac3?: 'system_b' | 'system_a' | 'keep';
}

export interface SrtPushConfig extends UdpPushConfig {
  passphrase?: string;
  latency?: number;
  streamid?: string;
}

export type PushConfig = RtmpPushConfig | UdpPushConfig | SrtPushConfig;
// Stream related types
export interface StreamVideoInfo {
  codec: string;
  width: number;
  height: number;
  fps: number;
  bitrate: number;
}

export interface StreamAudioInfo {
  codec: string;
  channels: number;
  sample_rate: number;
  bitrate: number;
}

export interface StreamMediaInfo {
  video?: StreamVideoInfo;
  audio?: StreamAudioInfo;
}

export interface StreamStats {
  id?: string;
  source_id?: string;
  opened_at?: number;
  lifetime?: number;
  started_at?: number;
  last_dts?: number;
  last_dts_at?: number;
  ts_delay?: number;
  status: 'running' | 'stopped' | 'error';
  backup_running?: boolean;
  input_error_rate?: number;
  inputs_duration?: number;
  inputs_bytes?: number;
  bytes_in: number;
  bytes_out: number;
  retry_count?: number;
  input_bitrate: number;
  output_bitrate: number;
  online_clients: number;
  last_access_at?: number;
  uptime?: number;
  alive: boolean;
  input_media_info?: StreamMediaInfo;
}

export interface FlussonicStream {
  name: string;
  comment?: string;
  title?: string;
  input?: string;
  stats: StreamStats;
}

export interface StreamsResponse {
  estimated_count: number;
  next?: string;
  prev?: string;
  timing?: Record<string, any>;
  server_id: string;
  streams: Record<string, FlussonicStream>;
}

export interface StreamTrafficData {
  timestamp: Date;
  bandwidth: number;
  viewers: number;
}

export interface MonthlyTrafficStats {
  month: string;
  totalBandwidth: number;
  averageViewers: number;
  peakViewers: number;
  totalDataTransferred: number;
}
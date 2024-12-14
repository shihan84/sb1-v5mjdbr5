import { Server } from '../types';

export interface FlussonicAuth {
  username: string;
  password: string;
}

export interface FlussonicStreamStats {
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
  started_at?: number;
  uptime?: number;
  alive: boolean;
  input_media_info?: {
    video?: {
      codec: string;
      width: number;
      height: number;
      fps: number;
      bitrate: number;
    };
    audio?: {
      codec: string;
      channels: number;
      sample_rate: number;
      bitrate: number;
    };
  };
}

export interface FlussonicStream {
  name: string;
  comment?: string;
  title?: string;
  input?: string;
  stats: FlussonicStreamStats;
}

export interface FlussonicCluster {
  estimated_count: number;
  next?: string;
  prev?: string;
  timing?: Record<string, any>;
  server_id: string;
  streams: Record<string, FlussonicStream>;
}

export interface FlussonicStats {
  bandwidth_in: number;
  bandwidth_out: number;
  streams_total: number;
  streams_active: number;
  clients_total: number;
  cpu_usage: number;
  memory_usage: number;
  uptime: number;
  disk_usage: {
    total: number;
    used: number;
    free: number;
  };
}

export interface FlussonicServerResponse {
  server: Server;
  stats: FlussonicStats;
  streams: Record<string, FlussonicStream>;
}
// Base types for push functionality
export interface PushStats {
  id?: string;
  opened_at?: number;
  bytes?: number;
  status?: 'establishing' | 'running' | 'stalling' | 'finished';
  retries?: number;
  payload?: number;
  encoded?: number;
  fillers?: number;
  stuffing?: number;
  trimmed_bytes?: number;
  trimmed_frames?: number;
  sys_fillers?: number;
  sys_payload?: number;
  sys_stuffing?: number;
  standby_status?: 'active' | 'waiting';
}

export interface BasePushConfig {
  comment?: string;
  retry_limit?: number;
  retry_timeout?: number;
  timeout?: number;
  connect_timeout?: number;
  disabled?: boolean;
  stats?: PushStats;
}

export interface PushResponse {
  url: string;
  status: string;
  stats?: PushStats;
}
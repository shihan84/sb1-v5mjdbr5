export interface DvrRange {
  from?: number;
  duration?: number;
  opened_at?: number;
  closed_at?: number;
}

export interface DvrInfo {
  from: number;
  depth: number;
  ranges: DvrRange[];
  bytes: number;
  disk_size: number;
  duration: number;
}

export interface DvrExportJob {
  id: string;
  name: string;
  from: number;
  duration: number;
  path: string;
  packing?: 'fragmented' | 'compat';
  timelapse?: boolean | number;
  timelapse_kbps?: number;
  started_at?: number;
  finished_at?: number;
  status: 'running' | 'succeeded' | 'failed' | 'canceled';
  error?: string;
}

export interface DvrExportOptions {
  from: number;
  duration: number;
  path: string;
  packing?: 'fragmented' | 'compat';
  timelapse?: boolean;
  timelapse_kbps?: number;
  meta?: boolean;
}
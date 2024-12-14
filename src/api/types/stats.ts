export interface DiskUsage {
  total: number;
  used: number;
  free: number;
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
  disk_usage: DiskUsage;
}
import { makeRequest } from '../utils/request';
import type { FlussonicAuth, DvrExportJob, DvrExportOptions } from '../types';

export class DvrAPI {
  constructor(
    private baseUrl: string,
    private auth: FlussonicAuth
  ) {}

  async exportDvr(streamName: string, options: DvrExportOptions): Promise<DvrExportJob> {
    const queryParams = new URLSearchParams({
      from: options.from.toString(),
      duration: options.duration.toString(),
      path: options.path,
      ...(options.packing && { packing: options.packing }),
      ...(options.timelapse && { timelapse: options.timelapse.toString() }),
      ...(options.timelapse_kbps && { timelapse_kbps: options.timelapse_kbps.toString() }),
      ...(options.meta && { meta: options.meta.toString() })
    });

    return makeRequest<DvrExportJob>(
      `${this.baseUrl}/streamer/api/v3/streams/${streamName}/dvr/export?${queryParams.toString()}`,
      this.auth,
      { method: 'POST' }
    );
  }

  async getDvrExportStatus(jobId: string): Promise<DvrExportJob> {
    return makeRequest<DvrExportJob>(
      `${this.baseUrl}/streamer/api/v3/dvr_export_jobs/${jobId}`,
      this.auth
    );
  }

  async cancelDvrExport(jobId: string): Promise<void> {
    await makeRequest(
      `${this.baseUrl}/streamer/api/v3/dvr_export_jobs/${jobId}`,
      this.auth,
      { method: 'DELETE' }
    );
  }

  async listDvrExportJobs(): Promise<{ jobs: DvrExportJob[] }> {
    return makeRequest<{ jobs: DvrExportJob[] }>(
      `${this.baseUrl}/streamer/api/v3/dvr_export_jobs`,
      this.auth
    );
  }
}
import { makeRequest } from '../utils/request';
import type { FlussonicAuth, PushConfig, PushResponse } from '../types';

export class PushAPI {
  constructor(
    private baseUrl: string,
    private auth: FlussonicAuth
  ) {}

  async addPush(streamName: string, pushConfig: PushConfig): Promise<PushResponse> {
    return makeRequest<PushResponse>(
      `${this.baseUrl}/streamer/api/v3/streams/${streamName}/push`,
      this.auth,
      {
        method: 'POST',
        body: JSON.stringify(pushConfig),
      }
    );
  }

  async updatePush(streamName: string, pushId: string, pushConfig: Partial<PushConfig>): Promise<PushResponse> {
    return makeRequest<PushResponse>(
      `${this.baseUrl}/streamer/api/v3/streams/${streamName}/push/${pushId}`,
      this.auth,
      {
        method: 'PUT',
        body: JSON.stringify(pushConfig),
      }
    );
  }

  async deletePush(streamName: string, pushId: string): Promise<void> {
    await makeRequest(
      `${this.baseUrl}/streamer/api/v3/streams/${streamName}/push/${pushId}`,
      this.auth,
      {
        method: 'DELETE',
      }
    );
  }

  async listPushes(streamName: string): Promise<PushResponse[]> {
    return makeRequest<PushResponse[]>(
      `${this.baseUrl}/streamer/api/v3/streams/${streamName}/push`,
      this.auth
    );
  }

  async getPushStatus(streamName: string, pushId: string): Promise<PushResponse> {
    return makeRequest<PushResponse>(
      `${this.baseUrl}/streamer/api/v3/streams/${streamName}/push/${pushId}`,
      this.auth
    );
  }
}
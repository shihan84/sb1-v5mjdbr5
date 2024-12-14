import { BaseApiService } from './BaseApiService';
import type { FlussonicStream, StreamsResponse } from '../types';

export class StreamsService extends BaseApiService {
  async list(): Promise<StreamsResponse> {
    return this.client.get(
      this.getApiPath('/streams'),
      { auth: this.auth }
    );
  }

  async get(streamName: string): Promise<FlussonicStream> {
    return this.client.get(
      this.getApiPath(`/streams/${encodeURIComponent(streamName)}`),
      { auth: this.auth }
    );
  }
}
import { makeRequest } from '../../utils/request';
import { validatePushConfig } from './validators';
import type { UrlBuilder } from '../../utils/url';
import type { FlussonicAuth, PushConfig, PushResponse } from '../../types';

export class PushService {
  constructor(
    private urlBuilder: UrlBuilder,
    private auth: FlussonicAuth
  ) {}

  async addPush(streamName: string, pushConfig: PushConfig): Promise<PushResponse> {
    validatePushConfig(pushConfig);
    return makeRequest<PushResponse>(
      this.urlBuilder.getStreamPushUrl(streamName),
      this.auth,
      {
        method: 'POST',
        body: JSON.stringify(pushConfig),
      }
    );
  }

  async updatePush(
    streamName: string, 
    pushId: string, 
    pushConfig: Partial<PushConfig>
  ): Promise<PushResponse> {
    if (pushConfig.url) {
      validatePushConfig(pushConfig as PushConfig);
    }
    
    return makeRequest<PushResponse>(
      this.urlBuilder.getStreamPushUrl(streamName, pushId),
      this.auth,
      {
        method: 'PUT',
        body: JSON.stringify(pushConfig),
      }
    );
  }

  async deletePush(streamName: string, pushId: string): Promise<void> {
    await makeRequest(
      this.urlBuilder.getStreamPushUrl(streamName, pushId),
      this.auth,
      { method: 'DELETE' }
    );
  }

  async listPushes(streamName: string): Promise<PushResponse[]> {
    return makeRequest<PushResponse[]>(
      this.urlBuilder.getStreamPushUrl(streamName),
      this.auth
    );
  }

  async getPushStatus(streamName: string, pushId: string): Promise<PushResponse> {
    return makeRequest<PushResponse>(
      this.urlBuilder.getStreamPushUrl(streamName, pushId),
      this.auth
    );
  }
}
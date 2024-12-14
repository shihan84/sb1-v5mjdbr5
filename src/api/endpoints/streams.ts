import { makeRequest } from '../utils/request';
import type { UrlBuilder } from '../utils/url';
import type { FlussonicAuth, StreamsResponse, FlussonicStream } from '../types';

export class StreamsAPI {
  constructor(
    private urlBuilder: UrlBuilder,
    private auth: FlussonicAuth
  ) {}

  async list(): Promise<StreamsResponse> {
    return makeRequest<StreamsResponse>(
      this.urlBuilder.getStreamsUrl(),
      this.auth
    );
  }

  async get(streamName: string): Promise<FlussonicStream> {
    const stream = await makeRequest<FlussonicStream>(
      this.urlBuilder.getStreamsUrl(streamName),
      this.auth
    );

    // Ensure stream name is included in response
    return {
      ...stream,
      name: streamName
    };
  }
}
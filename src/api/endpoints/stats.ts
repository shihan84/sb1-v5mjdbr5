import { makeRequest } from '../utils/request';
import type { UrlBuilder } from '../utils/url';
import type { FlussonicAuth, FlussonicStats } from '../types';

export class StatsAPI {
  constructor(
    private urlBuilder: UrlBuilder,
    private auth: FlussonicAuth
  ) {}

  async get(): Promise<FlussonicStats> {
    return makeRequest<FlussonicStats>(
      this.urlBuilder.getStatsUrl(),
      this.auth
    );
  }
}
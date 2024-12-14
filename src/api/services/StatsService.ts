import { BaseApiService } from './BaseApiService';
import type { FlussonicStats } from '../types';

export class StatsService extends BaseApiService {
  async get(): Promise<FlussonicStats> {
    return this.client.get(
      this.getApiPath('/config/stats'),
      { auth: this.auth }
    );
  }
}
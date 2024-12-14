import { FlussonicClient } from '../client';
import { handleApiError } from '../utils/errors';
import type { FlussonicStats } from '../types';

export class ServerService {
  constructor(private client: FlussonicClient) {}

  async testConnection(): Promise<boolean> {
    try {
      const stats = await this.client.stats.get();
      return !!stats;
    } catch (error) {
      console.error('Connection test failed:', handleApiError(error));
      return false;
    }
  }

  async getServerStats(): Promise<FlussonicStats | null> {
    try {
      return await this.client.stats.get();
    } catch (error) {
      console.error('Failed to fetch server stats:', handleApiError(error));
      return null;
    }
  }
}
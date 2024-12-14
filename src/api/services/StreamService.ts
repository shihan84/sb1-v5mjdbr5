import { FlussonicClient } from '../client';
import { handleApiError } from '../utils/errors';
import type { FlussonicStream } from '../types';

export class StreamService {
  constructor(private client: FlussonicClient) {}

  async getAllStreams(): Promise<FlussonicStream[]> {
    try {
      const response = await this.client.streams.list();
      if (!response?.streams) {
        return [];
      }
      
      return Object.entries(response.streams)
        .map(([name, stream]) => ({
          ...stream,
          name // Ensure name is included
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('Error fetching streams:', error);
      throw handleApiError(error);
    }
  }

  async getStreamInfo(streamName: string): Promise<FlussonicStream | null> {
    try {
      const stream = await this.client.streams.get(streamName);
      if (!stream) {
        return null;
      }
      return {
        ...stream,
        name: streamName // Ensure name is included
      };
    } catch (error) {
      console.error(`Error fetching stream info for ${streamName}:`, error);
      throw handleApiError(error);
    }
  }
}
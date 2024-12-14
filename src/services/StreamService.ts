import { FlussonicClient } from '../api/client';
import type { FlussonicStream, StreamsResponse } from '../api/types';

export class StreamService {
  constructor(private client: FlussonicClient) {}

  async getAllStreams(): Promise<FlussonicStream[]> {
    try {
      const response = await this.client.streams.list();
      // Convert streams object to array and sort by name
      return Object.entries(response.streams)
        .map(([name, stream]) => ({
          ...stream,
          name: name // Ensure name is included
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('Error fetching streams:', error);
      throw error;
    }
  }

  async getStreamInfo(streamName: string): Promise<FlussonicStream | null> {
    try {
      const response = await this.client.streams.get(streamName);
      return {
        ...response,
        name: streamName // Ensure name is included
      };
    } catch (error) {
      console.error(`Error fetching stream info for ${streamName}:`, error);
      return null;
    }
  }
}
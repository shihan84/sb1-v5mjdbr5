import { useQuery } from '@tanstack/react-query';
import { useFlussonic } from './useFlussonic';
import type { FlussonicStream } from '../api/types';

export function useStreams() {
  const { client } = useFlussonic();

  return useQuery({
    queryKey: ['streams'],
    queryFn: async (): Promise<FlussonicStream[]> => {
      if (!client) {
        throw new Error('No active server connection');
      }

      try {
        const response = await client.streams.list();
        if (!response?.streams) {
          return [];
        }
        
        return Object.entries(response.streams)
          .map(([name, stream]) => ({
            ...stream,
            name
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
      } catch (error) {
        console.error('Error fetching streams:', error);
        throw error;
      }
    },
    refetchInterval: 5000,
    enabled: !!client
  });
}
import { useQuery } from '@tanstack/react-query';
import { useFlussonic } from './useFlussonic';
import { handleApiError } from '../api/utils/errors';
import type { FlussonicStream } from '../api/types';

export function useStreamInfo(streamName: string | undefined) {
  const { client } = useFlussonic();

  return useQuery({
    queryKey: ['stream', streamName],
    queryFn: async (): Promise<FlussonicStream> => {
      if (!client || !streamName) {
        throw new Error('No active server connection or invalid stream name');
      }

      try {
        const stream = await client.streams.get(streamName);
        if (!stream) {
          throw new Error(`Stream "${streamName}" not found`);
        }
        return {
          ...stream,
          name: streamName // Ensure name is included
        };
      } catch (error) {
        console.error(`Error fetching stream info for ${streamName}:`, error);
        throw handleApiError(error);
      }
    },
    enabled: !!client && !!streamName,
    retry: 1,
    staleTime: 5000
  });
}
import { useQuery } from '@tanstack/react-query';
import { useFlussonic } from './useFlussonic';
import type { StreamTrafficData } from '../api/types/stream';

export function useStreamTraffic(streamName: string, startDate: Date, endDate: Date) {
  const { client } = useFlussonic();

  return useQuery({
    queryKey: ['stream-traffic', streamName, startDate.toISOString(), endDate.toISOString()],
    queryFn: async (): Promise<StreamTrafficData[]> => {
      const service = new StreamService(client);
      return service.getStreamTraffic(streamName, startDate, endDate);
    },
    refetchInterval: 60000, // Refetch every minute
  });
}
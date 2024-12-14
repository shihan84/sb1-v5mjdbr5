import { useMemo } from 'react';
import { FlussonicClient } from '../api/client';
import { useServerStore } from '../store/serverStore';
import { API_CONFIG } from '../api/config';

export function useFlussonic() {
  const { servers } = useServerStore();
  const activeServer = useMemo(() => 
    servers.find(s => s.status === 'online') || {
      url: API_CONFIG.BASE_URL,
      username: API_CONFIG.DEFAULT_CREDENTIALS.username,
      password: API_CONFIG.DEFAULT_CREDENTIALS.password,
      status: 'online'
    },
    [servers]
  );

  const client = useMemo(() => {
    if (!activeServer) return null;

    try {
      return new FlussonicClient(
        activeServer.url,
        {
          username: activeServer.username,
          password: activeServer.password
        }
      );
    } catch (error) {
      console.error('Failed to create Flussonic client:', error);
      return null;
    }
  }, [activeServer]);

  return { client, activeServer };
}
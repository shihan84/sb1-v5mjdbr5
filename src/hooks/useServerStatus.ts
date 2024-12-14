import { useEffect, useCallback } from 'react';
import { useServerStore } from '../store/serverStore';
import { ServerService } from '../api/services/ServerService';
import { FlussonicClient } from '../api/client';

const PING_INTERVAL = 30000; // 30 seconds

export function useServerStatus() {
  const { servers, updateServer } = useServerStore();

  const checkServerStatus = useCallback(async () => {
    for (const server of servers) {
      const client = new FlussonicClient(server.url, {
        username: server.username,
        password: server.password,
      });
      const serverService = new ServerService(client);

      try {
        const stats = await serverService.getServerStats();
        
        if (stats) {
          updateServer(server.id, {
            status: 'online',
            lastPing: new Date(),
            error: null,
            stats: {
              bandwidth_in: stats.bandwidth_in,
              bandwidth_out: stats.bandwidth_out,
              streams_total: stats.streams_total,
              clients_total: stats.clients_total,
            },
          });
        } else {
          updateServer(server.id, {
            status: 'offline',
            lastPing: new Date(),
            error: 'Server returned no stats',
          });
        }
      } catch (error) {
        updateServer(server.id, {
          status: 'offline',
          lastPing: new Date(),
          error: error instanceof Error ? error.message : 'Connection failed',
        });
      }
    }
  }, [servers, updateServer]);

  useEffect(() => {
    let mounted = true;
    let interval: NodeJS.Timeout;

    const runChecks = async () => {
      if (!mounted) return;
      await checkServerStatus();
      
      if (mounted && servers.length > 0) {
        interval = setInterval(checkServerStatus, PING_INTERVAL);
      }
    };

    if (servers.length > 0) {
      runChecks();
    }
    
    return () => {
      mounted = false;
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [checkServerStatus, servers.length]);
}
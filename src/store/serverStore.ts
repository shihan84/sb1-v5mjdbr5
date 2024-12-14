import { create } from 'zustand';

export interface Server {
  id: string;
  name: string;
  url: string;
  username: string;
  password: string;
  status: 'online' | 'offline';
  lastPing: Date;
  error?: string;
  stats?: {
    bandwidth_in: number;
    bandwidth_out: number;
    streams_total: number;
    clients_total: number;
  };
}

interface ServerState {
  servers: Server[];
  addServer: (server: Omit<Server, 'id' | 'status' | 'lastPing'>) => void;
  removeServer: (id: string) => void;
  updateServer: (id: string, data: Partial<Server>) => void;
}

export const useServerStore = create<ServerState>((set) => ({
  servers: [],
  addServer: (server) =>
    set((state) => ({
      servers: [
        ...state.servers,
        {
          ...server,
          id: crypto.randomUUID(),
          status: 'offline',
          lastPing: new Date(),
        },
      ],
    })),
  removeServer: (id) =>
    set((state) => ({
      servers: state.servers.filter((server) => server.id !== id),
    })),
  updateServer: (id, data) =>
    set((state) => ({
      servers: state.servers.map((server) =>
        server.id === id ? { ...server, ...data } : server
      ),
    })),
}));
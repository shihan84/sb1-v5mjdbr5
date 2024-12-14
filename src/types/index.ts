import { FlussonicAuth } from '../api/types';

export interface Server extends FlussonicAuth {
  id: string;
  name: string;
  url: string;
  status: 'online' | 'offline';
  lastPing: Date;
  username: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  permissions: string[];
  createdAt: Date;
}

export interface Stream {
  id: string;
  name: string;
  serverId: string;
  status: 'active' | 'inactive';
  viewerCount: number;
  bandwidth: number;
}

export interface TrafficData {
  timestamp: Date;
  bandwidth: number;
  viewers: number;
}
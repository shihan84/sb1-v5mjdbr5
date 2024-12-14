import { useState, useEffect, useCallback } from 'react';
import { FlussonicClient } from '../../api/client';
import type { FlussonicStream } from '../../api/types';

interface UseServerStreamsResult {
  streams: Record<string, FlussonicStream>;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useServerStreams(
  serverUrl: string,
  username: string,
  password: string
): UseServerStreamsResult {
  const [streams, setStreams] = useState<Record<string, FlussonicStream>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStreams = useCallback(async () => {
    if (!serverUrl) {
      setError('Server URL is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const client = new FlussonicClient(serverUrl, { username, password });
      const isConnected = await client.testConnection();
      
      if (!isConnected) {
        throw new Error('Could not connect to server. Please check your server URL and credentials.');
      }

      const response = await client.streams.list();
      
      if (response?.streams) {
        setStreams(response.streams);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      console.error('Failed to fetch streams:', err);
      setError(getErrorMessage(err));
      setStreams({});
    } finally {
      setLoading(false);
    }
  }, [serverUrl, username, password]);

  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  return {
    streams,
    loading,
    error,
    refetch: fetchStreams
  };
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    // Network/CORS errors
    if (err.message.includes('NetworkError') || err.message.includes('Failed to fetch')) {
      return 'Cannot connect to server. Please check:\n' +
        '1. The server URL is correct\n' +
        '2. The server is running\n' +
        '3. Your network connection is working\n' +
        '4. CORS is properly configured on the server\n' +
        '5. Any firewalls are not blocking the connection';
    }
    
    // Authentication errors
    if (err.message.includes('401') || err.message.includes('Invalid credentials')) {
      return 'Invalid username or password';
    }

    // Not found errors
    if (err.message.includes('404')) {
      return 'API endpoint not found. Please check the server URL';
    }

    // Server errors
    if (err.message.includes('500')) {
      return 'Server error occurred. Please try again later';
    }

    return err.message;
  }
  return 'An unknown error occurred';
}
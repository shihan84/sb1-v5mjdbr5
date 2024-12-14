import { useState, useCallback } from 'react';
import { FlussonicClient } from '../api/FlussonicClient';
import { handleRequestError } from '../api/errors';

export function useServerConnection() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = useCallback(async (
    url: string,
    username: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const client = new FlussonicClient(url, { username, password });
      const isConnected = await client.testConnection();

      if (!isConnected) {
        throw new Error('Could not connect to server');
      }

      return true;
    } catch (err) {
      const apiError = handleRequestError(err);
      setError(apiError.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { testConnection, isLoading, error };
}
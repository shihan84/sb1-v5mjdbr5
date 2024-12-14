import type { FlussonicAuth } from '../types';

export function createAuthHeaders(auth: FlussonicAuth): Headers {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  const credentials = btoa(`${auth.username}:${auth.password}`);
  headers.set('Authorization', `Basic ${credentials}`);

  return headers;
}
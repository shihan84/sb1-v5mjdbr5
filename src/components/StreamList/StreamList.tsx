import React from 'react';
import { useStreams } from '../../hooks/useStreams';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { ErrorMessage } from '../Common/ErrorMessage';
import { StreamListItem } from './StreamListItem';
import { useFlussonic } from '../../hooks/useFlussonic';
import { NoServerConnection } from '../Common/NoServerConnection';
import { ErrorBoundary } from '../Common/ErrorBoundary';

export function StreamList() {
  const { client } = useFlussonic();
  const { data: streams, isLoading, error } = useStreams();

  if (!client) {
    return <NoServerConnection />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error instanceof Error ? error.message : 'Failed to load streams'} 
      />
    );
  }

  if (!streams?.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 text-center">
          No streams available. Click the "Add Stream" button to get started.
        </p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        {streams.map((stream) => (
          <StreamListItem key={stream.name} stream={stream} />
        ))}
      </div>
    </ErrorBoundary>
  );
}
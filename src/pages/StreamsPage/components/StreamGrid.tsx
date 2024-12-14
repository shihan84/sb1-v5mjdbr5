import React from 'react';
import { useStreams } from '../../../hooks/useStreams';
import { StreamGridItem } from './StreamGridItem';
import { LoadingSpinner } from '../../../components/Common/LoadingSpinner';
import { ErrorMessage } from '../../../components/Common/ErrorMessage';

export function StreamGrid() {
  const { data: streams, isLoading, error } = useStreams();

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
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">
          No streams available. Click the "Add Stream" button to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {streams.map((stream) => (
        <StreamGridItem key={stream.name} stream={stream} />
      ))}
    </div>
  );
}
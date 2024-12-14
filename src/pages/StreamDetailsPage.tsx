import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useStreamInfo } from '../hooks/useStreamInfo';
import { StreamPlayer } from '../components/StreamPlayer/StreamPlayer';
import { StreamStats } from '../components/StreamDetails/StreamStats';
import { StreamHeader } from '../components/StreamDetails/StreamHeader';
import { StreamTrafficChart } from '../components/Analytics/StreamTrafficChart';
import { LoadingSpinner } from '../components/Common/LoadingSpinner';
import { ErrorMessage } from '../components/Common/ErrorMessage';
import { useFlussonic } from '../hooks/useFlussonic';
import { NoServerConnection } from '../components/Common/NoServerConnection';

export function StreamDetailsPage() {
  const { streamName } = useParams<{ streamName: string }>();
  const { client } = useFlussonic();
  const { data: stream, isLoading, error } = useStreamInfo(streamName);

  if (!client) {
    return <NoServerConnection />;
  }

  if (!streamName) {
    return <Navigate to="/streams" replace />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !stream) {
    return (
      <ErrorMessage 
        message={error instanceof Error ? error.message : `Stream "${streamName}" not found`}
      />
    );
  }

  return (
    <div className="space-y-6">
      <StreamHeader stream={stream} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <StreamPlayer streamName={stream.name} />
          </div>
          <StreamStats stream={stream} />
        </div>
        
        <div className="space-y-6">
          <StreamTrafficChart 
            serverId="main" 
            streamName={stream.name} 
          />
        </div>
      </div>
    </div>
  );
}
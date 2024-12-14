import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useStreamInfo } from '../../hooks/useStreamInfo';
import { StreamHeader } from './components/StreamHeader';
import { StreamPlayer } from './components/StreamPlayer';
import { StreamStats } from './components/StreamStats';
import { StreamTrafficChart } from './components/StreamTrafficChart';
import { StreamViewersChart } from './components/StreamViewersChart';
import { StreamBandwidthUsage } from './components/StreamBandwidthUsage';
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import { ErrorMessage } from '../../components/Common/ErrorMessage';
import { NoStreamFound } from '../../components/Common/NoStreamFound';
import { NoServerConnection } from '../../components/Common/NoServerConnection';
import { useFlussonic } from '../../hooks/useFlussonic';
import { ErrorBoundary } from '../../components/Common/ErrorBoundary';

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
    return <NoStreamFound streamName={streamName} />;
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <StreamHeader stream={stream} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <StreamPlayer stream={stream} />
            </div>
            <StreamStats stream={stream} />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <StreamBandwidthUsage stream={stream} />
            <StreamTrafficChart stream={stream} />
            <StreamViewersChart stream={stream} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
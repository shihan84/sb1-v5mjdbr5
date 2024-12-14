import React from 'react';
import { StreamHeader } from './components/StreamHeader';
import { StreamGrid } from './components/StreamGrid';
import { useFlussonic } from '../../hooks/useFlussonic';
import { NoServerConnection } from '../../components/Common/NoServerConnection';
import { ErrorBoundary } from '../../components/Common/ErrorBoundary';

export function StreamsPage() {
  const { client } = useFlussonic();

  if (!client) {
    return <NoServerConnection />;
  }

  return (
    <div className="space-y-6">
      <ErrorBoundary>
        <StreamHeader />
        <StreamGrid />
      </ErrorBoundary>
    </div>
  );
}
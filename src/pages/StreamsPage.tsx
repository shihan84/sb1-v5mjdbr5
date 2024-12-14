import React from 'react';
import { useStreams } from '../hooks/useStreams';
import { useFlussonic } from '../hooks/useFlussonic';
import { Plus } from 'lucide-react';
import { StreamList } from '../components/StreamList/StreamList';
import { LoadingSpinner } from '../components/Common/LoadingSpinner';
import { ErrorMessage } from '../components/Common/ErrorMessage';
import { NoServerConnection } from '../components/Common/NoServerConnection';

export function StreamsPage() {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Streams</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus size={20} />
          <span>Add Stream</span>
        </button>
      </div>

      <StreamList />
    </div>
  );
}
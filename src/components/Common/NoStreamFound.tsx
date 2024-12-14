import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NoStreamFoundProps {
  streamName: string;
}

export function NoStreamFound({ streamName }: NoStreamFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Stream Not Found</h1>
      <p className="text-gray-600 mb-2">
        The stream "{streamName}" could not be found.
      </p>
      <p className="text-gray-500 mb-6">
        Please check if the stream name is correct or if the stream is still available.
      </p>
      <Link
        to="/streams"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Back to Streams
      </Link>
    </div>
  );
}
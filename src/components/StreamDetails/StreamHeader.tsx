import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { FlussonicStream } from '../../api/types';

interface StreamHeaderProps {
  stream: FlussonicStream;
}

export function StreamHeader({ stream }: StreamHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/streams"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>Back to Streams</span>
        </Link>
        <h1 className="text-2xl font-bold">{stream.title || stream.name}</h1>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            stream.stats.alive
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {stream.stats.alive ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
  );
}
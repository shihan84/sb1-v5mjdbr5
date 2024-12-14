import React from 'react';
import { useStreams } from '../../hooks/useStreams';
import { formatBytes, formatBitrate } from '../../utils/format';
import { Activity, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';

export function StreamsList() {
  const { data: streams, isLoading, error } = useStreams();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Activity className="w-6 h-6 text-gray-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Failed to load streams: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Live Streams</h2>
      </div>
      
      <div className="divide-y">
        {streams?.map(stream => (
          <div key={stream.name} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {stream.stats.alive ? (
                  <Play className="w-5 h-5 text-green-500" />
                ) : (
                  <Pause className="w-5 h-5 text-red-500" />
                )}
                
                <div>
                  <Link 
                    to={`/streams/${stream.name}`}
                    className="font-medium text-gray-900 hover:text-indigo-600"
                  >
                    {stream.title || stream.name}
                  </Link>
                  {stream.comment && (
                    <p className="text-sm text-gray-500">{stream.comment}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Viewers</p>
                  <p className="font-medium">{stream.stats.online_clients}</p>
                </div>
                <div>
                  <p className="text-gray-500">Bitrate</p>
                  <p className="font-medium">{formatBitrate(stream.stats.input_bitrate)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Data Transferred</p>
                  <p className="font-medium">{formatBytes(stream.stats.bytes_out)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
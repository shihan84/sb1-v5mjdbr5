import React from 'react';
import { useServerStreams } from './useServerStreams';
import { Activity, Play, Pause, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface StreamListProps {
  serverId: string;
  serverUrl: string;
  username: string;
  password: string;
}

export function StreamList({ serverId, serverUrl, username, password }: StreamListProps) {
  const { streams, loading, error } = useServerStreams(serverUrl, username, password);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Activity className="w-6 h-6 text-gray-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  const streamEntries = Object.entries(streams);

  if (streamEntries.length === 0) {
    return (
      <div className="text-gray-500 text-center p-4">
        No streams available
      </div>
    );
  }

  const formatBandwidth = (bytes: number) => {
    if (!bytes || isNaN(bytes)) return '0 B/s';
    const k = 1024;
    const sizes = ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getUptime = (stats: any) => {
    if (!stats?.started_at) return 'N/A';
    try {
      const startedAt = new Date(stats.started_at * 1000);
      return format(startedAt, 'HH:mm:ss');
    } catch (error) {
      console.error('Error calculating uptime:', error);
      return 'N/A';
    }
  };

  return (
    <div className="bg-gray-50 p-4">
      <div className="space-y-4">
        {streamEntries.map(([streamName, stream]) => (
          <div 
            key={streamName} 
            className="bg-white p-4 rounded-lg shadow transition-all cursor-pointer hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {stream.stats?.alive ? (
                  <Play className="w-5 h-5 text-green-500" />
                ) : (
                  <Pause className="w-5 h-5 text-red-500" />
                )}
                <div>
                  <h4 className="font-medium">{stream.title || streamName}</h4>
                  {stream.comment && (
                    <p className="text-sm text-gray-500">{stream.comment}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-sm rounded-full ${
                  stream.stats?.alive 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {stream.stats?.alive ? 'Active' : 'Inactive'}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Viewers</div>
                <div className="font-medium">
                  {stream.stats?.online_clients || 0}
                </div>
              </div>

              <div>
                <div className="text-gray-500">Uptime</div>
                <div className="font-medium">
                  {getUptime(stream.stats)}
                </div>
              </div>

              <div>
                <div className="text-gray-500">Input</div>
                <div className="font-medium">
                  {formatBandwidth(stream.stats?.input_bitrate || 0)}
                </div>
              </div>

              <div>
                <div className="text-gray-500">Output</div>
                <div className="font-medium">
                  {formatBandwidth(stream.stats?.output_bitrate || 0)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
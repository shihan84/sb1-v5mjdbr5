import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Users, Activity, Database } from 'lucide-react';
import { formatBytes, formatBitrate } from '../../../utils/format';
import type { FlussonicStream } from '../../../api/types';

interface StreamGridItemProps {
  stream: FlussonicStream;
}

export function StreamGridItem({ stream }: StreamGridItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (stream?.name) {
      navigate(`/streams/${encodeURIComponent(stream.name)}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {stream.stats.alive ? (
              <Play className="w-5 h-5 text-green-500" />
            ) : (
              <Pause className="w-5 h-5 text-red-500" />
            )}
            <div>
              <h3 className="font-medium text-gray-900">
                {stream.title || stream.name}
              </h3>
              {stream.comment && (
                <p className="text-sm text-gray-500">{stream.comment}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-gray-500">Viewers</p>
              <p className="font-medium">{stream.stats.online_clients}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-gray-500">Bitrate</p>
              <p className="font-medium">
                {formatBitrate(stream.stats.input_bitrate)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-gray-500">Data</p>
              <p className="font-medium">
                {formatBytes(stream.stats.bytes_out)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
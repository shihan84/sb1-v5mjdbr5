import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause } from 'lucide-react';
import { formatBytes, formatBitrate } from '../../utils/format';
import type { FlussonicStream } from '../../api/types';

interface StreamListItemProps {
  stream: FlussonicStream;
}

export function StreamListItem({ stream }: StreamListItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/streams/${encodeURIComponent(stream.name)}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {stream.stats.alive ? (
            <Play className="w-5 h-5 text-green-500" />
          ) : (
            <Pause className="w-5 h-5 text-red-500" />
          )}
          
          <div>
            <h4 className="font-medium text-gray-900">
              {stream.title || stream.name}
            </h4>
            {stream.comment && (
              <p className="text-sm text-gray-500">{stream.comment}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 text-sm">
          <div>
            <p className="text-gray-500">Viewers</p>
            <p className="font-medium">{stream.stats.online_clients}</p>
          </div>
          <div>
            <p className="text-gray-500">Bitrate</p>
            <p className="font-medium">
              {formatBitrate(stream.stats.input_bitrate)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Data</p>
            <p className="font-medium">
              {formatBytes(stream.stats.bytes_out)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
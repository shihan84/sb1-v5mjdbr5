import React from 'react';
import { Clock, Users, Activity, Database } from 'lucide-react';
import { formatBytes, formatBitrate } from '../../../utils/format';
import type { FlussonicStream } from '../../../api/types';

interface StreamStatsProps {
  stream: FlussonicStream;
}

export function StreamStats({ stream }: StreamStatsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Stream Statistics</h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-start space-x-3">
          <Users className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Current Viewers</p>
            <p className="font-medium">{stream.stats.online_clients}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Activity className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Input Bitrate</p>
            <p className="font-medium">
              {formatBitrate(stream.stats.input_bitrate)}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Database className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Total Data Transferred</p>
            <p className="font-medium">
              In: {formatBytes(stream.stats.bytes_in)}
              <br />
              Out: {formatBytes(stream.stats.bytes_out)}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className={`font-medium ${stream.stats.alive ? 'text-green-600' : 'text-red-600'}`}>
              {stream.stats.alive ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
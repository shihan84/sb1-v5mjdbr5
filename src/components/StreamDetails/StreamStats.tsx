import React from 'react';
import { Clock, Monitor, Database, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { FlussonicStream } from '../../api/types';

interface Props {
  stream: FlussonicStream;
}

export function StreamStats({ stream }: Props) {
  const formatBitrate = (bitrate: number) => {
    if (!bitrate) return '0 Mbps';
    return `${(bitrate / 1024 / 1024).toFixed(2)} Mbps`;
  };

  const formatBytes = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getUptime = (stats: any) => {
    if (!stats?.started_at) return 'N/A';
    const startedAt = new Date(stats.started_at * 1000);
    try {
      return formatDistanceToNow(startedAt, { addSuffix: false });
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Stream Information</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">
                {stream.stats?.alive ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Uptime</p>
              <p className="font-medium">{getUptime(stream.stats)}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Monitor className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Current Viewers</p>
              <p className="font-medium">{stream.stats?.online_clients || 0}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Database className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Total Data Transferred</p>
              <p className="font-medium">
                In: {formatBytes(stream.stats?.bytes_in || 0)}
                <br />
                Out: {formatBytes(stream.stats?.bytes_out || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Bandwidth</h4>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Input Bitrate</p>
              <p className="font-medium">
                {formatBitrate(stream.stats?.input_bitrate || 0)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Output Bitrate</p>
              <p className="font-medium">
                {formatBitrate(stream.stats?.output_bitrate || 0)}
              </p>
            </div>
          </div>
        </div>

        {stream.stats?.input_media_info && (
          <div className="mt-6 border-t pt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">Media Information</h4>
            <div className="grid grid-cols-2 gap-6">
              {stream.stats.input_media_info.video && (
                <div>
                  <p className="text-sm text-gray-500">Video</p>
                  <ul className="mt-1 space-y-1 text-sm">
                    <li>Codec: {stream.stats.input_media_info.video.codec}</li>
                    <li>Resolution: {stream.stats.input_media_info.video.width}x{stream.stats.input_media_info.video.height}</li>
                    <li>FPS: {stream.stats.input_media_info.video.fps}</li>
                    <li>Bitrate: {formatBitrate(stream.stats.input_media_info.video.bitrate)}</li>
                  </ul>
                </div>
              )}
              
              {stream.stats.input_media_info.audio && (
                <div>
                  <p className="text-sm text-gray-500">Audio</p>
                  <ul className="mt-1 space-y-1 text-sm">
                    <li>Codec: {stream.stats.input_media_info.audio.codec}</li>
                    <li>Channels: {stream.stats.input_media_info.audio.channels}</li>
                    <li>Sample Rate: {stream.stats.input_media_info.audio.sample_rate} Hz</li>
                    <li>Bitrate: {formatBitrate(stream.stats.input_media_info.audio.bitrate)}</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
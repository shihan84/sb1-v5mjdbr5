import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Activity } from 'lucide-react';
import { useStreamInfo } from '../../hooks/useStreamInfo';

interface StreamPlayerProps {
  streamName: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  width?: string | number;
  height?: string | number;
}

export function StreamPlayer({
  streamName,
  autoPlay = true,
  controls = true,
  muted = false,
  width = '100%',
  height = '100%'
}: StreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: streamInfo, isLoading, error: streamError } = useStreamInfo(streamName);

  useEffect(() => {
    if (!streamInfo || !videoRef.current) return;

    const hlsUrl = `${streamInfo.url}/index.m3u8`;

    if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls({
        debug: false,
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(hlsUrl);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              setError('Failed to load stream');
              break;
          }
        }
      });

      hlsRef.current = hls;
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = hlsUrl;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [streamInfo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Activity className="w-6 h-6 text-gray-500 animate-spin" />
      </div>
    );
  }

  if (error || streamError) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        {error || 'Failed to load stream'}
      </div>
    );
  }

  return (
    <div className="relative bg-black rounded-lg overflow-hidden" style={{ width, height }}>
      <video
        ref={videoRef}
        className="w-full h-full"
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        playsInline
      />
    </div>
  );
}
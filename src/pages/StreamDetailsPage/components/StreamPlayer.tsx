import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { useFlussonic } from '../../../hooks/useFlussonic';
import type { FlussonicStream } from '../../../api/types';

interface StreamPlayerProps {
  stream: FlussonicStream;
}

export function StreamPlayer({ stream }: StreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const { client } = useFlussonic();

  useEffect(() => {
    if (!client || !videoRef.current || !stream.name) return;

    const hlsUrl = `${client.getStreamUrl(stream.name)}/index.m3u8`;

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
      hls.loadSource(hlsUrl);

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
  }, [client, stream.name]);

  return (
    <div className="relative bg-black aspect-video">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        autoPlay
        muted
        playsInline
      />
    </div>
  );
}
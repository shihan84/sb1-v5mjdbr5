import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { format } from 'date-fns';
import { useFlussonic } from '../../hooks/useFlussonic';

interface Props {
  serverId: string;
  streamName: string;
}

const timeRanges = [
  { label: 'Last 24 Hours', value: 'day' },
  { label: 'Last Week', value: 'week' },
  { label: 'Last Month', value: 'month' },
];

export function StreamTrafficChart({ serverId, streamName }: Props) {
  const [timeRange, setTimeRange] = useState('day');
  const { cluster } = useFlussonic(serverId);
  const [trafficData, setTrafficData] = useState<any[]>([]);

  useEffect(() => {
    if (cluster.data?.streams[streamName]) {
      const stream = cluster.data.streams[streamName];
      const now = Date.now();
      const points = timeRange === 'day' ? 24 : timeRange === 'week' ? 7 : 30;
      const interval = timeRange === 'day' ? 3600000 : timeRange === 'week' ? 86400000 : 86400000;

      const newData = Array.from({ length: points }, (_, i) => {
        const timestamp = now - (points - 1 - i) * interval;
        return {
          timestamp,
          bandwidth: stream.stats?.output_bitrate || 0,
          viewers: stream.stats?.online_clients || 0,
        };
      });

      setTrafficData(newData);
    }
  }, [timeRange, cluster.data, streamName]);

  const formatValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Traffic Analytics</h3>
        <div className="flex space-x-2">
          {timeRanges.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setTimeRange(value)}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === value
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value) => 
                timeRange === 'day' 
                  ? format(value, 'HH:mm')
                  : format(value, 'MMM dd')
              }
            />
            <YAxis 
              yAxisId="left"
              tickFormatter={formatValue}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              tickFormatter={formatValue}
            />
            <Tooltip
              labelFormatter={(value) =>
                format(value, 'MMM dd, yyyy HH:mm')
              }
              formatter={(value: number) => [formatValue(value), '']}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="bandwidth"
              stroke="#8884d8"
              name="Bandwidth (bps)"
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="viewers"
              stroke="#82ca9d"
              name="Viewers"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
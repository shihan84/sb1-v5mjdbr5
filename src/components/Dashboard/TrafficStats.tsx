import React from 'react';
import { Line } from 'recharts';
import { useStreamTraffic } from '../../hooks/useStreamTraffic';
import { formatBytes, formatBitrate } from '../../utils/format';
import { Activity } from 'lucide-react';

interface TrafficStatsProps {
  streamName: string;
  startDate: Date;
  endDate: Date;
}

export function TrafficStats({ streamName, startDate, endDate }: TrafficStatsProps) {
  const { data, isLoading, error } = useStreamTraffic(streamName, startDate, endDate);

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
        Failed to load traffic stats: {error.message}
      </div>
    );
  }

  const formatXAxis = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Traffic Statistics</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp"
              tickFormatter={formatXAxis}
            />
            <YAxis 
              yAxisId="left"
              tickFormatter={formatBitrate}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              tickFormatter={(value) => value}
            />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleString()}
              formatter={(value: number, name: string) => [
                name === 'bandwidth' ? formatBitrate(value) : value,
                name === 'bandwidth' ? 'Bandwidth' : 'Viewers'
              ]}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="bandwidth"
              stroke="#8884d8"
              name="Bandwidth"
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
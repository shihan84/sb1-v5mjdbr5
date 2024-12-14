import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { formatBytes } from '../../../utils/format';
import type { FlussonicStream } from '../../../api/types';

interface StreamTrafficChartProps {
  stream: FlussonicStream;
}

export function StreamTrafficChart({ stream }: StreamTrafficChartProps) {
  // Sample data - replace with actual API data
  const data = Array.from({ length: 24 }, (_, i) => ({
    time: new Date(Date.now() - (23 - i) * 3600000),
    traffic: Math.random() * 1000000,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Traffic (Last 24 Hours)</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time"
              tickFormatter={(time) => format(new Date(time), 'HH:mm')}
            />
            <YAxis tickFormatter={(value) => formatBytes(value)} />
            <Tooltip
              labelFormatter={(time) => format(new Date(time), 'HH:mm:ss')}
              formatter={(value: number) => formatBytes(value)}
            />
            <Line 
              type="monotone" 
              dataKey="traffic" 
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
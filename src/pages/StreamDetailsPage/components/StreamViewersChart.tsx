import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import type { FlussonicStream } from '../../../api/types';

interface StreamViewersChartProps {
  stream: FlussonicStream;
}

export function StreamViewersChart({ stream }: StreamViewersChartProps) {
  // Sample data - replace with actual API data
  const data = Array.from({ length: 24 }, (_, i) => ({
    time: new Date(Date.now() - (23 - i) * 3600000),
    viewers: Math.floor(Math.random() * 100),
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Viewers (Last 24 Hours)</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time"
              tickFormatter={(time) => format(new Date(time), 'HH:mm')}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(time) => format(new Date(time), 'HH:mm:ss')}
              formatter={(value: number) => [`${value} viewers`, 'Viewers']}
            />
            <Line 
              type="monotone" 
              dataKey="viewers" 
              stroke="#82ca9d"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
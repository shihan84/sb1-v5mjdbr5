import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatBytes } from '../../../utils/format';
import type { FlussonicStream } from '../../../api/types';

interface StreamBandwidthUsageProps {
  stream: FlussonicStream;
}

export function StreamBandwidthUsage({ stream }: StreamBandwidthUsageProps) {
  // Sample data - replace with actual API data
  const data = [
    { month: 'Jan', bandwidth: 1200 },
    { month: 'Feb', bandwidth: 1900 },
    { month: 'Mar', bandwidth: 1500 },
    { month: 'Apr', bandwidth: 2100 },
    { month: 'May', bandwidth: 1800 },
    { month: 'Jun', bandwidth: 2400 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Bandwidth Usage</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => formatBytes(value)} />
            <Tooltip 
              formatter={(value: number) => formatBytes(value)}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Bar dataKey="bandwidth" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
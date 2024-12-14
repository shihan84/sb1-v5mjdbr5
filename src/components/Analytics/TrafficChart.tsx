import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

interface Props {
  data: Array<{
    timestamp: Date;
    bandwidth: number;
    viewers: number;
  }>;
}

export function TrafficChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Traffic Overview</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value) => format(new Date(value), 'MMM dd')}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) =>
                format(new Date(value), 'MMM dd, yyyy HH:mm')
              }
            />
            <Line
              type="monotone"
              dataKey="bandwidth"
              stroke="#8884d8"
              name="Bandwidth (Mbps)"
            />
            <Line
              type="monotone"
              dataKey="viewers"
              stroke="#82ca9d"
              name="Viewers"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
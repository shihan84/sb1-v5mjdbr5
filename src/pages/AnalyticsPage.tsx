import React from 'react';
import { TrafficChart } from '../components/Analytics/TrafficChart';

const sampleData = Array.from({ length: 7 }, (_, i) => ({
  timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
  bandwidth: Math.random() * 100,
  viewers: Math.floor(Math.random() * 1000),
}));

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Bandwidth</h3>
          <p className="text-2xl font-bold">2.4 TB</p>
          <span className="text-green-500 text-sm">↑ 12% from last month</span>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Active Streams</h3>
          <p className="text-2xl font-bold">147</p>
          <span className="text-green-500 text-sm">↑ 8% from last week</span>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Viewers</h3>
          <p className="text-2xl font-bold">15,724</p>
          <span className="text-red-500 text-sm">↓ 3% from yesterday</span>
        </div>
      </div>

      <TrafficChart data={sampleData} />
    </div>
  );
}
import React from 'react';
import { Plus } from 'lucide-react';
import { AddStreamButton } from './AddStreamButton';

export function StreamHeader() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Streams</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and monitor your media streams
        </p>
      </div>
      <AddStreamButton />
    </div>
  );
}
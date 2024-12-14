import React from 'react';
import { Plus } from 'lucide-react';

export function AddStreamButton() {
  return (
    <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
      <Plus size={20} />
      <span>Add Stream</span>
    </button>
  );
}
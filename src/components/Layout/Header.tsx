import React from 'react';
import { Bell, User } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 fixed top-0 right-0 left-64">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-3 py-2">
          <User size={20} />
          <span>Admin</span>
        </button>
      </div>
    </header>
  );
}
import React from 'react';
import { ServerCrash } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NoServerConnection() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <ServerCrash className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        No Active Server Connection
      </h2>
      <p className="text-gray-500 mb-4">
        Please add and connect to a server to view streams
      </p>
      <Link
        to="/servers"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Go to Servers
      </Link>
    </div>
  );
}
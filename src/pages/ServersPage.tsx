import React, { useState } from 'react';
import { ServerList } from '../components/ServerManagement/ServerList';
import { ServerForm } from '../components/ServerManagement/ServerForm';
import { AddServerButton } from '../components/ServerManagement/AddServerButton';

export function ServersPage() {
  const [showAddServer, setShowAddServer] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Media Servers</h1>
        <AddServerButton onClick={() => setShowAddServer(true)} />
      </div>

      <ServerList />

      {showAddServer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Server</h2>
            <ServerForm onClose={() => setShowAddServer(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
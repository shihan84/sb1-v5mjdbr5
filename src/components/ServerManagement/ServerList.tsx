import React, { useState } from 'react';
import { useServerStore } from '../../store/serverStore';
import { useServerStatus } from '../../hooks/useServerStatus';
import { Server, Trash2, Edit, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { StreamList } from '../StreamList/StreamList';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { ErrorMessage } from '../Common/ErrorMessage';

export function ServerList() {
  const { servers, removeServer } = useServerStore();
  const [expandedServer, setExpandedServer] = useState<string | null>(null);
  useServerStatus();

  const toggleServer = (serverId: string) => {
    setExpandedServer(expandedServer === serverId ? null : serverId);
  };

  if (!servers.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 text-center">
          No servers added yet. Click the "Add Server" button to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="space-y-4">
          {servers.map((server) => (
            <div key={server.id} className="border rounded-lg">
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleServer(server.id)}
              >
                <div className="flex items-center space-x-4">
                  <Server className="text-gray-500" />
                  <div>
                    <h4 className="font-medium">{server.name}</h4>
                    <p className="text-sm text-gray-500">{server.url}</p>
                    <p className="text-xs text-gray-400">
                      Last checked: {format(new Date(server.lastPing), 'HH:mm:ss')}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      server.status === 'online'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {server.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeServer(server.id);
                    }}
                    className="p-2 hover:bg-red-100 text-red-600 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                  {expandedServer === server.id ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
              </div>
              {expandedServer === server.id && server.status === 'online' && (
                <div className="border-t p-4">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Input Bandwidth</p>
                      <p className="font-medium">{server.stats?.bandwidth_in || 0} Mbps</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Output Bandwidth</p>
                      <p className="font-medium">{server.stats?.bandwidth_out || 0} Mbps</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Streams</p>
                      <p className="font-medium">{server.stats?.streams_total || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Clients</p>
                      <p className="font-medium">{server.stats?.clients_total || 0}</p>
                    </div>
                  </div>
                  <StreamList />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
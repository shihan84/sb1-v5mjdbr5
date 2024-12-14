import React from 'react';
import { useServerStore } from '../../store/serverStore';
import { useServerConnection } from '../../hooks/useServerConnection';
import { Activity } from 'lucide-react';
import { ErrorMessage } from '../Common/ErrorMessage';

interface ServerFormProps {
  onClose: () => void;
}

export function ServerForm({ onClose }: ServerFormProps) {
  const { addServer } = useServerStore();
  const { testConnection, isLoading, error } = useServerConnection();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const url = formData.get('url') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    
    const isValid = await testConnection(url, username, password);
    if (!isValid) return;
    
    addServer({
      name: formData.get('name') as string,
      url,
      username,
      password,
    });
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Server Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          Server URL
        </label>
        <input
          type="url"
          id="url"
          name="url"
          required
          placeholder="https://your-server.com"
          pattern="https?://.*"
          title="Please enter a valid URL starting with http:// or https://"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Enter the complete URL including http:// or https://
        </p>
      </div>
      
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {error && <ErrorMessage message={error} />}
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading && <Activity className="animate-spin h-4 w-4" />}
          <span>{isLoading ? 'Testing Connection...' : 'Add Server'}</span>
        </button>
      </div>
    </form>
  );
}
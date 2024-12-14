import React from 'react';
import { Save } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">General Settings</h2>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dashboard Refresh Rate
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option>30 seconds</option>
                <option>1 minute</option>
                <option>5 minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Notifications
              </label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
                  <span className="ml-2">Stream offline alerts</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
                  <span className="ml-2">Bandwidth usage alerts</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
                  <span className="ml-2">New user registrations</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Save size={20} />
                <span>Save Settings</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Users, UserPlus } from 'lucide-react';

export function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <UserPlus size={20} />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="space-y-4">
            {/* Sample user list - replace with actual user data */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Users className="text-gray-500" />
                  <div>
                    <h4 className="font-medium">User {i}</h4>
                    <p className="text-sm text-gray-500">user{i}@example.com</p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
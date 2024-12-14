import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ServerCrash,
  Users,
  Activity,
  Settings,
} from 'lucide-react';

const navItems = [
  { to: '/servers', icon: ServerCrash, label: 'Servers' },
  { to: '/streams', icon: LayoutDashboard, label: 'Streams' },
  { to: '/users', icon: Users, label: 'Users' },
  { to: '/analytics', icon: Activity, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-8">Flussonic Admin</h1>
        <nav className="space-y-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
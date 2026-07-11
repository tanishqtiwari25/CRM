import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LayoutDashboard, Users, Layers, LogOut, Code, BarChart3 } from 'lucide-react';

export default function Sidebar() {
  const { logout, user } = useContext(AuthContext);

  const navigation = [
    { name: 'Dashboard', to: '/', icon: LayoutDashboard },
    { name: 'Leads Engine', to: '/leads', icon: Layers },
  ];

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen h-sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 gap-2">
        <Code className="h-6 w-6 text-indigo-600" />
        <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">Nexus Enterprise</span>
      </div>
      <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isActive 
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`
              }
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.name}
            </NavLink>
          );
        })}
      </div>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="mb-3 px-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Role</p>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{user?.role}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all"
        >
          <LogOut className="mr-3 h-4 w-4" /> Log Out
        </button>
      </div>
    </div>
  );
}
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Bell, Search, User } from 'lucide-react';

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center w-96 relative">
        <Search className="absolute left-3 h-4 w-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Global System Scan..." 
          className="w-full pl-10 pr-4 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-all dark:text-white"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-3 border-l pl-4 border-slate-200 dark:border-slate-800">
          <div className="h-8 w-8 bg-indigo-600 text-white flex items-center justify-center font-bold rounded-lg text-sm">
            {user?.name ? user.name[0].toUpperCase() : <User size={16}/>}
          </div>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{user?.name}</span>
        </div>
      </div>
    </header>
  );
}
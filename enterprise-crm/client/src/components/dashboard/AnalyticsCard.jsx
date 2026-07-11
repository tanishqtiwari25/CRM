import React from 'react';

export default function AnalyticsCard({ title, value, icon: Icon, trend, variant = 'indigo' }) {
  const variantStyles = {
    indigo: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50',
    emerald: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50',
    amber: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50',
    rose: 'text-rose-600 bg-rose-50 dark:bg-rose-950/50',
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${variantStyles[variant]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>{trend} vs last month</span>
        </div>
      )}
    </div>
  );
}
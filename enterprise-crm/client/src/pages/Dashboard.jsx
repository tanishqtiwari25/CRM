import React from 'react';
import AnalyticsCard from '../components/dashboard/AnalyticsCard';
import { Users, Layers, TrendingUp, CheckCircle } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';

export default function Dashboard() {
  const { data: leads } = useFetch('/leads');

  const stats = {
    totalLeads: leads.length,
    activeProjects: 12, // Standard default stub
    conversionRate: '4.2%',
    monthlyRevenue: 48500
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Command Analytics</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time status metrics dashboard Overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard title="Total System Leads" value={stats.totalLeads} icon={Layers} trend="+12.3%" variant="indigo" />
        <AnalyticsCard title="Active Pipeline Ops" value={stats.activeProjects} icon={CheckCircle} trend="+4.5%" variant="emerald" />
        <AnalyticsCard title="Conversion Target" value={stats.conversionRate} icon={TrendingUp} trend="+0.8%" variant="amber" />
        <AnalyticsCard title="Monthly Revenue MRR" value={`$${stats.monthlyRevenue.toLocaleString()}`} icon={Users} trend="+18.2%" variant="rose" />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <h3 className="font-bold text-slate-900 dark:text-white text-lg">System Audit Log & Modern Interface Active</h3>
        <p className="text-sm text-slate-400 mt-1">Ready for seamless visual upgrades using production pipeline charts.</p>
      </div>
    </div>
  );
}
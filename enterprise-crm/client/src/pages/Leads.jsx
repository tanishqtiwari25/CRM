import React, { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import API from '../services/api';
import KanbanBoard from '../components/common/KanbanBoard';
import { Plus } from 'lucide-react';

export default function Leads() {
  const { data: leads, setData } = useFetch('/leads');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ clientName: '', email: '', companyName: '', budget: 0 });

  const handleStatusChange = async (leadId, newStatus) => {
    // Optimistic UI updates implementation
    const originalLeads = [...leads];
    setData(leads.map(l => l._id === leadId ? { ...l, status: newStatus } : l));

    try {
      await API.patch(`/leads/${leadId}/status`, { status: newStatus });
    } catch (err) {
      setData(originalLeads);
      alert('System sync operation fault detected.');
    }
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/leads', formData);
      setData([...leads, response.data]);
      setShowForm(false);
      setFormData({ clientName: '', email: '', companyName: '', budget: 0 });
    } catch (err) {
      alert('Error recording transaction schema.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Sales Pipelines</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Interactive Kanban drag-and-drop workspace orchestration matrix.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-all"
        >
          <Plus size={16} /> New Lead Integration
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateLead} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Lead Name</label>
              <input type="text" required value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Contact Email</label>
              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Company</label>
              <input type="text" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Budget Allocation ($)</label>
              <input type="number" value={formData.budget} onChange={e => setFormData({...formData, budget: Number(e.target.value)})} className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-white" />
            </div>
          </div>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">Commit to Cloud Engine</button>
        </form>
      )}

      <KanbanBoard leads={leads} onStatusChange={handleStatusChange} />
    </div>
  );
}
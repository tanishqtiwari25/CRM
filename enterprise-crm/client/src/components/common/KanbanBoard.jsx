import React from 'react';
import { motion } from 'framer-motion';

export default function KanbanBoard({ leads, onStatusChange }) {
  const columns = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Converted'];

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    const leadId = e.dataTransfer.getData('leadId');
    if (leadId) {
      onStatusChange(leadId, targetStatus);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
      {columns.map((column) => {
        const stageLeads = leads.filter(l => l.status === column);
        return (
          <div
            key={column}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column)}
            className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 p-4 rounded-xl min-h-[450px] flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-xs tracking-wider uppercase text-slate-500 dark:text-slate-400">{column}</h4>
              <span className="text-xs font-bold px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full">
                {stageLeads.length}
              </span>
            </div>
            <div className="space-y-3 flex-1 overflow-y-auto">
              {stageLeads.map((lead) => (
                <motion.div
                  key={lead._id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('leadId', lead._id)}
                  whileHover={{ y: -2 }}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm cursor-grab active:cursor-grabbing hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
                >
                  <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">{lead.clientName}</p>
                  <p className="text-xs text-slate-400 mt-1">{lead.companyName || 'No Company'}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      ${lead.budget.toLocaleString()}
                    </span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">
                      Score: {lead.leadScore}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
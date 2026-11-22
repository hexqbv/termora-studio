import React from 'react';

export function Tabs({ tabs, activeTab, onChange, className = '' }) {
  return (
    <div className={`flex items-center gap-1 p-1 bg-dark-900/90 border border-dark-750 rounded-lg ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${
              isActive
                ? 'bg-dark-750 text-cyan-300 shadow-sm border border-dark-650'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/50'
            }`}
          >
            {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="px-1.5 py-0.2 text-[10px] rounded bg-dark-700 text-slate-300">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

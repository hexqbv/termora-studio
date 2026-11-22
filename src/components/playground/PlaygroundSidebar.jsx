import React from 'react';
import { CATEGORIES, COMPONENTS } from '../../data/components';
import { Badge } from '../common/Badge';
import { Terminal, Search } from 'lucide-react';

export function PlaygroundSidebar({
  activeComponentId,
  onSelectComponent,
  categoryFilter,
  setCategoryFilter,
  searchQuery,
  setSearchQuery
}) {
  const filteredComponents = COMPONENTS.filter((comp) => {
    const matchesCategory = categoryFilter === 'all' || comp.category === categoryFilter;
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full lg:w-72 bg-dark-900 border-r border-dark-800 flex flex-col h-full select-none">
      {/* Category header */}
      <div className="p-4 border-b border-dark-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            Components
          </span>
          <span className="text-xs font-mono text-slate-500">
            {filteredComponents.length} items
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search primitives..."
            className="w-full bg-dark-950 border border-dark-750 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-2 py-0.5 text-[11px] rounded-md transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-medium'
                  : 'bg-dark-950 text-slate-400 hover:text-slate-200 border border-dark-800'
              }`}
            >
              {cat.name.replace(' Indicators', '').replace(' & Boxes', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredComponents.map((comp) => {
          const isActive = activeComponentId === comp.id;
          return (
            <button
              key={comp.id}
              onClick={() => onSelectComponent(comp.id)}
              className={`w-full text-left p-2.5 rounded-lg transition-all flex items-start justify-between group ${
                isActive
                  ? 'bg-dark-800 border border-dark-700 shadow-sm'
                  : 'hover:bg-dark-850/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-cyan-300' : 'text-slate-200 group-hover:text-cyan-400'}`}>
                    {comp.name}
                  </span>
                  <Badge variant={comp.status === 'verified' ? 'verified' : 'planned'} size="xs">
                    {comp.status === 'verified' ? 'API' : 'PLANNED'}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {comp.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

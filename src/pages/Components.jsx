import React, { useState } from 'react';
import { CATEGORIES, COMPONENTS } from '../data/components';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Search, Sparkles, BookOpen, ArrowRight, Terminal } from 'lucide-react';

export function Components({ onOpenInPlayground, onOpenInDocs }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = COMPONENTS.filter((comp) => {
    const matchesCategory = selectedCategory === 'all' || comp.category === selectedCategory;
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="cyan">COMPONENT CATALOG</Badge>
          <span className="text-xs font-mono text-slate-500">{COMPONENTS.length} Primitives</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terminal Component Library
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Explore Termora's complete suite of interactive prompts, progress indicators, styling utilities, and terminal layout primitives.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-dark-900 border border-dark-800">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-dark-950 font-bold shadow-sm'
                  : 'bg-dark-950 text-slate-400 hover:text-slate-200 border border-dark-750'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search components..."
            className="w-full bg-dark-950 border border-dark-750 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((comp) => (
          <div
            key={comp.id}
            className="p-5 rounded-xl bg-dark-900 border border-dark-800 hover:border-dark-700 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-mono">
                    {comp.name}
                  </h3>
                  <Badge variant={comp.status === 'verified' ? 'verified' : 'planned'} size="xs">
                    {comp.status === 'verified' ? 'VERIFIED' : 'PLANNED'}
                  </Badge>
                </div>
                <span className="text-[11px] font-mono text-slate-500 uppercase">{comp.category}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {comp.tagline}
              </p>

              {/* Mini Preview Box */}
              <div className="p-3 rounded-lg bg-dark-950 border border-dark-850 font-mono text-xs text-slate-300">
                <div className="text-[10px] text-slate-600 mb-1">// import {'{'} {comp.id} {'}'} from "termora"</div>
                <div className="text-cyan-400 font-semibold truncate">
                  const result = await {comp.id}({'{ ... }'});
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-dark-800/80">
              <button
                onClick={() => onOpenInDocs(`ref-${comp.id}`)}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 font-mono"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>API Docs</span>
              </button>

              <button
                onClick={() => onOpenInPlayground(comp.id)}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono font-semibold"
              >
                <span>Playground</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500 font-mono text-sm">
          No components found matching "{searchQuery}".
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { DOC_SECTIONS, DOCS_CONTENT } from '../data/documentation';
import { CodeBlock } from '../components/common/CodeBlock';
import { Badge } from '../components/common/Badge';
import { BookOpen, Search, ArrowRight, ChevronRight, Terminal } from 'lucide-react';

export function Documentation({ activeDocId = 'what-is-termora', onSelectDoc }) {
  const [currentId, setCurrentId] = useState(activeDocId);
  const [searchQuery, setSearchQuery] = useState('');

  const doc = DOCS_CONTENT[currentId] || DOCS_CONTENT['what-is-termora'];

  const handleSelectDoc = (id) => {
    setCurrentId(id);
    if (onSelectDoc) onSelectDoc(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick parser for markdown-like code blocks and headers in docs
  const renderDocContent = (text) => {
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('```')) {
        const lines = part.trim().slice(3, -3).trim().split('\n');
        const lang = lines[0].trim();
        const code = lines.slice(1).join('\n');
        return (
          <div key={idx} className="my-4">
            <CodeBlock code={code} language={lang || 'javascript'} />
          </div>
        );
      }

      // Format markdown headers, lists, bold text
      return (
        <div key={idx} className="space-y-3 leading-relaxed text-slate-300 text-sm">
          {part.split('\n\n').map((paragraph, pIdx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={pIdx} className="text-lg font-bold text-white mt-6 mb-2 font-mono">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={pIdx} className="text-xl font-bold text-white mt-8 mb-3 font-mono">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
              const listItems = paragraph.split('\n');
              return (
                <ul key={pIdx} className="list-disc pl-5 space-y-1.5 text-slate-300">
                  {listItems.map((li, liIdx) => (
                    <li key={liIdx}>
                      {li.replace(/^[-*]\s+/, '')}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={pIdx} className="text-slate-300 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
      {/* Left Documentation Sidebar */}
      <div className="w-full lg:w-64 shrink-0 space-y-6">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter documentation..."
            className="w-full bg-dark-900 border border-dark-750 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 outline-none focus:border-cyan-400"
          />
        </div>

        <div className="space-y-6">
          {DOC_SECTIONS.map((section) => (
            <div key={section.id} className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono px-2">
                {section.title}
              </h4>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = currentId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectDoc(item.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-dark-800 text-cyan-300 border border-dark-700 font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-dark-900'
                      }`}
                    >
                      <span className="truncate">{item.title}</span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 bg-dark-900/40 border border-dark-800 rounded-2xl p-6 sm:p-10 shadow-xl">
        <div className="max-w-3xl space-y-6">
          {/* Header */}
          <div className="border-b border-dark-800 pb-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400">{doc.category}</span>
              <span className="text-slate-600">/</span>
              <span className="text-xs font-mono text-slate-400">{currentId}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {doc.title}
            </h1>
          </div>

          {/* Body Content */}
          <div className="prose prose-invert max-w-none">
            {renderDocContent(doc.content)}
          </div>
        </div>
      </div>
    </div>
  );
}

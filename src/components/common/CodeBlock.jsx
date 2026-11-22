import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

export function CodeBlock({
  code,
  language = 'javascript',
  filename,
  showCopy = true,
  className = ''
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  // Ultra-clean syntax styling for JavaScript / Bash
  const highlightCode = (rawCode) => {
    const lines = rawCode.split('\n');
    return lines.map((line, idx) => {
      // Keywords
      let formatted = line
        .replace(/(import|export|from|const|let|var|await|async|function|return|if|else|try|catch|new|type)/g, '<span class="text-cyan-400 font-medium">$1</span>')
        .replace(/(console\.log|process\.exit)/g, '<span class="text-amber-300">$1</span>')
        .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-emerald-300">$1</span>')
        .replace(/(\b\d+\b)/g, '<span class="text-amber-400">$1</span>')
        .replace(/(\/\/.*$)/g, '<span class="text-slate-500 italic">$1</span>');

      return (
        <div key={idx} className="table-row">
          <span className="table-cell pr-4 text-slate-600 select-none text-right text-xs font-mono">{idx + 1}</span>
          <span className="table-cell font-mono" dangerouslySetInnerHTML={{ __html: formatted || ' ' }} />
        </div>
      );
    });
  };

  return (
    <div className={`rounded-xl border border-dark-750 bg-dark-900/90 overflow-hidden shadow-xl ${className}`}>
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-dark-750/70 bg-dark-950/60 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono">{filename}</span>
          </div>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors p-1 rounded"
              title="Copy code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          )}
        </div>
      )}

      <div className="relative group p-4 overflow-x-auto text-sm text-slate-200 font-mono leading-relaxed">
        {!filename && showCopy && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-dark-800/90 border border-dark-700 text-slate-400 hover:text-slate-200 hover:border-dark-600 transition-colors opacity-0 group-hover:opacity-100 z-10"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        )}
        <div className="table w-full">
          {highlightCode(code)}
        </div>
      </div>
    </div>
  );
}

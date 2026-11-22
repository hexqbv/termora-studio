import React, { useState } from 'react';
import { Terminal, Copy, Check, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';

export function TerminalWindow({
  title = 'termora — bash — 80x24',
  children,
  onReset,
  className = '',
  statusText = 'Interactive session'
}) {
  const [copied, setCopied] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleCopyText = () => {
    // Collect text content from terminal
    const terminalEl = document.getElementById('terminal-content-area');
    if (terminalEl) {
      navigator.clipboard.writeText(terminalEl.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`flex flex-col rounded-xl border border-dark-750 bg-term-bg shadow-2xl overflow-hidden font-mono transition-all duration-200 ${
        isMaximized ? 'fixed inset-4 z-50' : ''
      } ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-dark-900 border-b border-dark-800 select-none">
        <div className="flex items-center gap-2">
          {/* macOS window controls */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block border border-red-600/50" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/50" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/50" />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium text-slate-300">{title}</span>
          </div>
        </div>

        {/* Window action buttons */}
        <div className="flex items-center gap-1 text-slate-400">
          {onReset && (
            <button
              onClick={onReset}
              className="p-1 hover:text-cyan-400 hover:bg-dark-800 rounded transition-colors"
              title="Reset terminal session"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={handleCopyText}
            className="p-1 hover:text-emerald-400 hover:bg-dark-800 rounded transition-colors"
            title="Copy terminal contents"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 hover:text-slate-200 hover:bg-dark-800 rounded transition-colors"
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div
        id="terminal-content-area"
        tabIndex={0}
        className="flex-1 p-5 overflow-y-auto text-sm text-term-text leading-relaxed outline-none focus:ring-1 focus:ring-cyan-500/20"
      >
        {children}
      </div>

      {/* Terminal Status Footer */}
      <div className="px-4 py-1.5 bg-dark-950/90 border-t border-dark-850 flex items-center justify-between text-[11px] text-slate-500 select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{statusText}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span>ANSI 24-bit</span>
          <span className="text-cyan-400/80">node:tty</span>
        </div>
      </div>
    </div>
  );
}

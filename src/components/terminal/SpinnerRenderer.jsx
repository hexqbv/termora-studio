import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

const SPINNER_FRAMES = {
  dots: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  arc: ['◜', '◠', '◝', '◞', '◡', '◟'],
  line: ['-', '\\', '|', '/'],
  arrow: ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙']
};

export function SpinnerRenderer({ config }) {
  const { text = 'Processing task...', style = 'dots', color = 'cyan' } = config;
  const [frameIdx, setFrameIdx] = useState(0);
  const [status, setStatus] = useState('running'); // running | success | error | stopped

  const frames = SPINNER_FRAMES[style] || SPINNER_FRAMES.dots;

  useEffect(() => {
    if (status !== 'running') return;
    const timer = setInterval(() => {
      setFrameIdx((prev) => (prev + 1) % frames.length);
    }, 80);
    return () => clearInterval(timer);
  }, [status, frames.length]);

  const colorStyles = {
    cyan: 'text-cyan-400',
    emerald: 'text-emerald-400',
    yellow: 'text-amber-400',
    red: 'text-red-400',
    magenta: 'text-pink-400',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 font-mono text-base bg-dark-900/60 p-4 rounded-lg border border-dark-800">
        {status === 'running' && (
          <span className={`font-bold text-lg inline-block w-5 text-center ${colorStyles[color] || 'text-cyan-400'}`}>
            {frames[frameIdx]}
          </span>
        )}
        {status === 'success' && (
          <span className="text-emerald-400 font-bold text-lg inline-block w-5 text-center">✔</span>
        )}
        {status === 'error' && (
          <span className="text-red-400 font-bold text-lg inline-block w-5 text-center">✖</span>
        )}
        {status === 'stopped' && (
          <span className="text-slate-500 font-bold text-lg inline-block w-5 text-center">■</span>
        )}

        <span className={status === 'success' ? 'text-emerald-300' : status === 'error' ? 'text-red-300' : 'text-slate-200'}>
          {status === 'success' ? `Successfully completed: ${text}` : status === 'error' ? `Operation failed: ${text}` : text}
        </span>
      </div>

      {/* Simulator Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-dark-800/80">
        <span className="text-xs text-slate-500 font-mono mr-2">Test State:</span>
        <button
          onClick={() => setStatus('running')}
          className={`px-2.5 py-1 text-xs rounded border transition-colors flex items-center gap-1.5 font-mono ${
            status === 'running' ? 'bg-cyan-950 text-cyan-400 border-cyan-800' : 'bg-dark-800 text-slate-400 border-dark-700 hover:text-slate-200'
          }`}
        >
          <Play className="w-3 h-3" />
          <span>start()</span>
        </button>
        <button
          onClick={() => setStatus('success')}
          className="px-2.5 py-1 text-xs rounded bg-dark-800 text-slate-400 border border-dark-700 hover:text-emerald-400 hover:border-emerald-800 transition-colors flex items-center gap-1.5 font-mono"
        >
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>succeed()</span>
        </button>
        <button
          onClick={() => setStatus('error')}
          className="px-2.5 py-1 text-xs rounded bg-dark-800 text-slate-400 border border-dark-700 hover:text-red-400 hover:border-red-800 transition-colors flex items-center gap-1.5 font-mono"
        >
          <XCircle className="w-3 h-3 text-red-400" />
          <span>fail()</span>
        </button>
        <button
          onClick={() => setStatus('stopped')}
          className="px-2.5 py-1 text-xs rounded bg-dark-800 text-slate-400 border border-dark-700 hover:text-slate-200 transition-colors flex items-center gap-1.5 font-mono"
        >
          <RotateCcw className="w-3 h-3" />
          <span>stop()</span>
        </button>
      </div>
    </div>
  );
}

export function ProgressBarRenderer({ config }) {
  const {
    total = 100,
    current: initialCurrent = 65,
    width = 30,
    completeChar = '█',
    incompleteChar = '░'
  } = config;

  const [current, setCurrent] = useState(initialCurrent);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setCurrent(initialCurrent);
  }, [initialCurrent]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setCurrent((prev) => {
        if (prev >= total) {
          setIsRunning(false);
          return total;
        }
        return prev + 1;
      });
    }, 45);
    return () => clearInterval(interval);
  }, [isRunning, total]);

  const percentage = Math.min(100, Math.round((current / total) * 100));
  const completedCols = Math.round((percentage / 100) * width);
  const incompleteCols = Math.max(0, width - completedCols);

  const filledBar = completeChar.repeat(completedCols);
  const emptyBar = incompleteChar.repeat(incompleteCols);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-dark-900/60 border border-dark-800 font-mono text-sm space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-bold">[{filledBar}<span className="text-slate-600">{emptyBar}</span>]</span>
          <span className="text-slate-200 font-bold">{percentage}%</span>
          <span className="text-slate-400 text-xs">({current}/{total})</span>
        </div>
        <div className="text-xs text-slate-500">
          Status: {percentage === 100 ? 'Completed!' : isRunning ? 'Simulating transfer...' : 'Idle'}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-dark-800">
        <button
          onClick={() => {
            setCurrent(0);
            setIsRunning(true);
          }}
          className="px-3 py-1.5 text-xs font-mono rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors flex items-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5" />
          <span>Simulate Progress</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono ml-auto">
          <span>Manual:</span>
          <input
            type="range"
            min="0"
            max={total}
            value={current}
            onChange={(e) => setCurrent(Number(e.target.value))}
            className="w-24 accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

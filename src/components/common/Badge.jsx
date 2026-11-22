import React from 'react';

export function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const variants = {
    default: 'bg-dark-800 text-slate-300 border-dark-700',
    cyan: 'bg-cyan-950/60 text-cyan-400 border-cyan-800/60',
    green: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60',
    yellow: 'bg-amber-950/60 text-amber-400 border-amber-800/60',
    purple: 'bg-purple-950/60 text-purple-400 border-purple-800/60',
    verified: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-mono',
    planned: 'bg-amber-500/10 text-amber-400 border-amber-500/30 font-mono',
  };

  const sizes = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-md border ${variants[variant] || variants.default} ${sizes[size] || sizes.sm} ${className}`}>
      {children}
    </span>
  );
}

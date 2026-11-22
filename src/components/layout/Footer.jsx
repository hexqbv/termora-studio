import React from 'react';
import { Terminal, Shield, Cpu, Code2 } from 'lucide-react';

export function Footer({ setActivePage }) {
  return (
    <footer className="border-t border-dark-800/80 bg-dark-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-dark-900 border border-dark-750 flex items-center justify-center font-mono font-bold text-cyan-400 text-sm">
                ❯_
              </div>
              <span className="font-bold text-slate-200 text-base tracking-tight">TERMORA STUDIO</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Interactive playground and documentation platform for <code className="text-slate-400">termkit-ui</code>, the zero-dependency CLI toolkit for Node.js.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>MIT Licensed · Author: Sagar</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-3">Product</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setActivePage('home'); window.scrollTo(0, 0); }} className="hover:text-cyan-400 transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('playground'); window.scrollTo(0, 0); }} className="hover:text-cyan-400 transition-colors">
                  Interactive Playground
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('components'); window.scrollTo(0, 0); }} className="hover:text-cyan-400 transition-colors">
                  Component Catalog
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('install'); window.scrollTo(0, 0); }} className="hover:text-cyan-400 transition-colors">
                  Installation
                </button>
              </li>
            </ul>
          </div>

          {/* Documentation Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-3">Documentation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setActivePage('docs'); window.scrollTo(0, 0); }} className="hover:text-cyan-400 transition-colors">
                  Getting Started
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('docs'); window.scrollTo(0, 0); }} className="hover:text-cyan-400 transition-colors">
                  Core Concepts (Virtual Screen)
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('docs'); window.scrollTo(0, 0); }} className="hover:text-cyan-400 transition-colors">
                  API Reference
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('docs'); window.scrollTo(0, 0); }} className="hover:text-cyan-400 transition-colors">
                  Headless Unit Testing
                </button>
              </li>
            </ul>
          </div>

          {/* System & Architecture */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-3">Architecture</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              TermKit UI is engineered for pure Node.js 22+ environments with zero runtime dependencies.
            </p>
            <div className="flex flex-col gap-1.5 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                Pure JavaScript / Node 22+
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Zero runtime dependencies
              </span>
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                Pure ES Modules ("type": "module")
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-850 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Termora Studio. Showcasing termkit-ui open source package.</p>
          <p className="mt-2 sm:mt-0 font-mono">github.com/hexqbv/TermKit</p>
        </div>
      </div>
    </footer>
  );
}

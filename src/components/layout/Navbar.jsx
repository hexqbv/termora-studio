import React, { useState } from 'react';
import { Terminal, Code2, BookOpen, Download, Menu, X, Check, Copy, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Navbar({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [showGithubModal, setShowGithubModal] = useState(false);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm install termora');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const navItems = [
    { id: 'home', label: 'Overview', icon: Terminal },
    { id: 'playground', label: 'Playground', icon: Sparkles, badge: 'Interactive' },
    { id: 'components', label: 'Components', icon: Code2 },
    { id: 'docs', label: 'Documentation', icon: BookOpen },
    { id: 'install', label: 'Install', icon: Download },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-dark-800/80 bg-dark-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-dark-900 border border-dark-750 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                <span className="font-mono font-bold text-cyan-400 text-lg">❯_</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                    TERMORA
                  </span>
                  <Badge variant="cyan" size="xs">STUDIO</Badge>
                </div>
                <p className="text-[10px] text-slate-500 font-mono -mt-0.5">CLI Toolkit for Node.js</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    window.location.hash = item.id;
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-dark-800 text-cyan-300 border border-dark-700'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-dark-850'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-75" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-mono rounded bg-cyan-950/70 text-cyan-400 border border-cyan-800/50">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Install Pill */}
            <button
              onClick={handleCopyInstall}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg bg-dark-900 border border-dark-750 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-all group"
              title="Click to copy npm install command"
            >
              <span className="text-slate-500">$</span>
              <span>npm i termora</span>
              {copiedInstall ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 ml-1" />
              )}
            </button>

            {/* GitHub Link / Modal */}
            <button
              onClick={() => setShowGithubModal(true)}
              className="p-2 text-slate-400 hover:text-slate-100 hover:bg-dark-850 rounded-lg border border-transparent hover:border-dark-750 transition-colors"
              title="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-dark-900 border border-dark-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-dark-800 bg-dark-950/95 px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    window.location.hash = item.id;
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-dark-800 text-cyan-300 border border-dark-750'
                      : 'text-slate-300 hover:bg-dark-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && <Badge variant="cyan" size="xs">{item.badge}</Badge>}
                </button>
              );
            })}
            <div className="pt-2 border-t border-dark-800 mt-2 flex items-center justify-between">
              <button
                onClick={handleCopyInstall}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-mono bg-dark-900 border border-dark-750 rounded-lg text-slate-300"
              >
                <span>npm install termora</span>
                {copiedInstall ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* GitHub Repository Status Modal */}
      {showGithubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-dark-900 border border-dark-700 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowGithubModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700 flex items-center justify-center">
                <GithubIcon className="w-5 h-5 text-slate-200" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Termora Open Source Project</h3>
                <p className="text-xs text-slate-400 font-mono">github.com/termora/termora</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Termora is an open-source initiative designed for the Node.js community. The repository holds the core runtime, ANSI engine, and CLI component drivers.
            </p>
            <div className="bg-dark-950 p-3 rounded-lg border border-dark-800 text-xs font-mono text-slate-400 mb-5 space-y-1">
              <div>License: MIT Open Source</div>
              <div>Runtime: Node.js 18+ (Pure ESM & CJS)</div>
              <div>Repository status: Public Pre-Release</div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowGithubModal(false)}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-dark-800 hover:bg-dark-750 text-slate-200 border border-dark-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActivePage('install');
                  setShowGithubModal(false);
                }}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-semibold"
              >
                View Install Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

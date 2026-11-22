import React, { useState } from 'react';
import { Tabs } from '../components/common/Tabs';
import { CodeBlock } from '../components/common/CodeBlock';
import { Badge } from '../components/common/Badge';
import { TerminalWindow } from '../components/terminal/TerminalWindow';
import { Download, Check, ShieldCheck, Cpu, Terminal, ArrowRight } from 'lucide-react';

export function Installation({ onGoToPlayground }) {
  const [activePkgManager, setActivePkgManager] = useState('npm');

  const pkgCommands = {
    npm: 'npm install termora',
    pnpm: 'pnpm add termora',
    yarn: 'yarn add termora',
    bun: 'bun add termora'
  };

  const tabs = [
    { id: 'npm', label: 'npm' },
    { id: 'pnpm', label: 'pnpm' },
    { id: 'yarn', label: 'yarn' },
    { id: 'bun', label: 'bun' }
  ];

  const smokeTestCode = `// verify-termora.mjs
import { select, colors } from "termora";

console.log(colors.cyan.bold("Termora installation verified!"));

const answer = await select({
  message: "Is your terminal ready for interactive apps?",
  options: [
    { label: "Yes, ready to build", value: "yes" },
    { label: "Show me more components", value: "more" }
  ]
});

console.log(\`Received choice: \${answer}\`);`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <Badge variant="cyan">GETTING STARTED</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Install Termora
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Add Termora to your Node.js command-line application using your favorite JavaScript package manager.
        </p>
      </div>

      {/* Package Manager Selector Card */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-dark-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            Package Manager Command
          </span>
          <Tabs
            tabs={tabs}
            activeTab={activePkgManager}
            onChange={setActivePkgManager}
          />
        </div>

        <CodeBlock
          code={pkgCommands[activePkgManager]}
          language="bash"
        />
      </div>

      {/* Requirements & Environment Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl bg-dark-900/60 border border-dark-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm font-mono">
            <Cpu className="w-4 h-4" />
            <span>Node.js &gt;= 18.0.0</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Requires Node.js 18 LTS or newer for native standard streams and modern asynchronous raw mode handling.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-dark-900/60 border border-dark-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm font-mono">
            <Terminal className="w-4 h-4" />
            <span>Cross-Platform TTY</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Works out of the box on Linux, macOS (Terminal, iTerm2), and Windows (Windows Terminal, PowerShell, Git Bash).
          </p>
        </div>

        <div className="p-5 rounded-xl bg-dark-900/60 border border-dark-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Native C++ Addons</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            No <code className="text-slate-300">node-gyp</code> or Python toolchain required during installation. Fast, reliable CI builds.
          </p>
        </div>
      </div>

      {/* Verification Smoke Test */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white font-mono">Verify Installation</h2>
          <p className="text-xs text-slate-400">
            Create a simple smoke test file to ensure raw terminal mode and ANSI escapes operate correctly on your machine.
          </p>
        </div>

        <CodeBlock
          code={smokeTestCode}
          filename="verify.mjs"
        />

        <div className="p-4 rounded-xl bg-dark-950 border border-dark-850 font-mono text-xs text-slate-300 space-y-2">
          <div className="text-slate-500">// Run verification test:</div>
          <div className="text-cyan-400">$ node verify.mjs</div>
        </div>
      </div>

      {/* Next Step Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-dark-900 to-dark-850 border border-dark-750 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Ready to test components?</h3>
          <p className="text-xs text-slate-400">
            Explore interactive prompts, spinners, and box layouts directly in your browser.
          </p>
        </div>
        <button
          onClick={onGoToPlayground}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-dark-950 text-xs font-bold transition-colors flex items-center gap-2 shrink-0"
        >
          <span>Open Interactive Playground</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

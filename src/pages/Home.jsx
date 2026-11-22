import React, { useState } from 'react';
import { HeroTerminalDemo } from '../components/terminal/HeroTerminalDemo';
import { CodeBlock } from '../components/common/CodeBlock';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  ShieldCheck,
  Check,
  Copy,
  Table,
  Box,
  Compass,
  Zap
} from 'lucide-react';
import { COMPONENTS } from '../data/components';

export function Home({ setActivePage, onOpenComponentInPlayground }) {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState('esm');

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm install termora');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const heroCodeSnippet = `import { select, spinner, box, colors } from "termora";

console.log(box({
  title: "Cloud Engine CLI",
  content: "Provisioning microservice architecture...",
  borderColor: "cyan"
}));

// 1. Prompt developer for target
const targetEnv = await select({
  message: "Choose your deployment cluster:",
  options: [
    { label: "Production (us-east-1)", value: "prod-us" },
    { label: "Staging (eu-central-1)", value: "staging-eu" },
    { label: "Local Kubernetes (minikube)", value: "local" }
  ]
});

// 2. Animate task execution
const loader = spinner({
  text: \`Deploying containers to \${targetEnv}...\`,
  color: "cyan"
}).start();

await deployCluster(targetEnv);
loader.succeed(colors.green("✓ Deployment completed successfully!"));`;

  return (
    <div className="space-y-24 py-8 sm:py-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Release Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-900 border border-dark-750 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Open Source JavaScript CLI Toolkit</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400">Node.js 18+</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Beautiful terminal experiences.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Built with JavaScript.
            </span>
          </h1>

          {/* Supporting text */}
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Build interactive command-line applications with reusable prompts, progress indicators, layouts, and terminal components. No ANSI boilerplate required.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              icon={Sparkles}
              onClick={() => setActivePage('playground')}
              className="w-full sm:w-auto"
            >
              Explore Playground
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={BookOpen}
              onClick={() => setActivePage('docs')}
              className="w-full sm:w-auto"
            >
              Read Documentation
            </Button>
          </div>

          {/* Installation Pill */}
          <div className="pt-2">
            <div
              onClick={handleCopyInstall}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-dark-900 border border-dark-750 hover:border-cyan-500/40 cursor-pointer text-xs font-mono text-slate-300 transition-all shadow-md group"
            >
              <span className="text-cyan-400 font-bold">$</span>
              <span>npm install termora</span>
              {copiedInstall ? (
                <span className="flex items-center gap-1 text-emerald-400 font-sans">
                  <Check className="w-3.5 h-3.5" /> Copied!
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-200" />
              )}
            </div>
          </div>
        </div>

        {/* Interactive Hero Terminal Demo */}
        <div className="mt-12 sm:mt-16">
          <HeroTerminalDemo
            onExplorePlayground={() => setActivePage('playground')}
          />
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
            Core Primitives
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">
            Everything your CLI tool needs
          </p>
          <p className="text-sm text-slate-400">
            Engineered from first principles with zero bloated dependencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Interactive Prompts */}
          <div className="p-6 rounded-2xl bg-dark-900/70 border border-dark-800 hover:border-cyan-500/30 transition-all space-y-4 group">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Compass className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                Interactive Prompts
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Single select, multi-select checkboxes, freeform text, masked password inputs, and autocomplete with real-time arrow key navigation.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-dark-950 border border-dark-850 font-mono text-xs text-slate-300">
              <div className="text-emerald-400 font-bold">? Select region:</div>
              <div className="text-cyan-400 pl-3">❯ US East (Virginia)</div>
              <div className="text-slate-500 pl-3">  EU West (Frankfurt)</div>
            </div>
            <button
              onClick={() => onOpenComponentInPlayground('select')}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono pt-1"
            >
              <span>Test in playground</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 2: Progress & Spinners */}
          <div className="p-6 rounded-2xl bg-dark-900/70 border border-dark-800 hover:border-emerald-500/30 transition-all space-y-4 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                Spinners & Gauges
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Silky-smooth terminal loading spinners and deterministic progress bars with automatic cursor hiding to prevent terminal flicker.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-dark-950 border border-dark-850 font-mono text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="font-bold">⠋</span>
                <span>Optimizing chunks...</span>
              </div>
              <div className="text-emerald-400">
                [████████████░░░░] 75%
              </div>
            </div>
            <button
              onClick={() => onOpenComponentInPlayground('spinner')}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono pt-1"
            >
              <span>Test in playground</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 3: Layouts & Tables */}
          <div className="p-6 rounded-2xl bg-dark-900/70 border border-dark-800 hover:border-amber-500/30 transition-all space-y-4 group">
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-800/60 flex items-center justify-center text-amber-400">
              <Box className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                Boxes & Tables
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clean box panels with UTF-8 border glyphs (round, double, single) and formatted ANSI tables with column width calculations.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-dark-950 border border-dark-850 font-mono text-[11px] text-cyan-400 whitespace-pre">
{`╭─ Termora v1.0 ─╮
│ Port: 3000     │
╰────────────────╯`}
            </div>
            <button
              onClick={() => onOpenComponentInPlayground('box')}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono pt-1"
            >
              <span>Test in playground</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Realistic Code Demonstration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-5">
            <Badge variant="cyan">DEVELOPER EXPERIENCE</Badge>
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              Intuitive, async-first API design
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every Termora prompt returns a native standard JavaScript <code className="text-cyan-300 bg-dark-800 px-1 py-0.5 rounded font-mono">Promise</code> that resolves directly to the user's choice. No complex event listener chains or callback hell.
            </p>
            <ul className="space-y-3 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Standard async/await syntax</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Raw mode TTY management under the hood</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Automatic cursor cleanup on exit</span>
              </li>
            </ul>
            <div className="pt-2">
              <Button
                variant="outline"
                size="md"
                icon={Terminal}
                onClick={() => setActivePage('playground')}
              >
                Launch Playground Studio
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <CodeBlock
              code={heroCodeSnippet}
              filename="cli-app.mjs"
            />
          </div>
        </div>
      </section>

      {/* Why Termora / Comparison Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-dark-900 border border-dark-800 space-y-8">
          <div className="max-w-2xl">
            <Badge variant="green">WHY TERMORA</Badge>
            <h3 className="text-2xl font-bold text-white mt-2">
              Replace fragmented CLI dependencies with one cohesive engine
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Stop installing 5 separate libraries for colors, prompts, tables, spinners, and boxes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-2 p-4 rounded-xl bg-dark-950 border border-dark-850">
              <div className="font-bold text-slate-200 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Zero Bloated Dependencies</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Built directly on top of Node.js core modules (<code className="text-slate-300">readline</code>, <code className="text-slate-300">tty</code>, <code className="text-slate-300">process</code>). Minimizes install size and vulnerability surface.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-dark-950 border border-dark-850">
              <div className="font-bold text-slate-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CI/CD Safe Fallbacks</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Detects non-interactive environments like GitHub Actions and dumb terminals. Returns configured default values without freezing your pipeline.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-dark-950 border border-dark-850">
              <div className="font-bold text-slate-200 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Dual ESM & CJS Builds</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Ship to any Node project seamlessly. Import with modern <code className="text-slate-300">import</code> syntax or require in legacy CommonJS toolchains without transpilation friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Build CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white">
          Ready to build modern command-line tools?
        </h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Jump into the interactive playground to test prompts in real-time or read the step-by-step developer documentation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setActivePage('playground')}
          >
            Launch Playground
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setActivePage('docs')}
          >
            Explore Docs
          </Button>
        </div>
      </section>
    </div>
  );
}

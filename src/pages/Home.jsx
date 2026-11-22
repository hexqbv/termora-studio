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
  Zap,
  SplitSquareVertical
} from 'lucide-react';
import { COMPONENTS } from '../data/components';

export function Home({ setActivePage, onOpenComponentInPlayground }) {
  const [copiedInstall, setCopiedInstall] = useState(false);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm install termkit-ui');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const heroCodeSnippet = `import { select } from "termkit-ui/prompts";
import { spinner } from "termkit-ui/progress";
import { box } from "termkit-ui/layout";
import { colors } from "termkit-ui/styles";
import { defaultCoordinator } from "termkit-ui";

console.log(box(
  "Provisioning microservice architecture on cluster...",
  { title: "Cloud Engine CLI", borderColor: "cyan", borderStyle: "rounded" }
));

// 1. Prompt developer with verified items schema
const targetEnv = await select({
  message: "Choose your deployment cluster:",
  items: [
    { label: "Production (us-east-1)", value: "prod-us", hint: "Live Anycast" },
    { label: "Staging (eu-central-1)", value: "staging-eu" },
    { label: "Local Kubernetes (minikube)", value: "local" }
  ]
});

// 2. Animate task execution with concurrent-safe logging
const loader = spinner({
  message: \`Deploying containers to \${targetEnv}...\`,
  color: "cyan"
}).start();

defaultCoordinator.log("Worker connected: pod/api-service-7f49");
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
            <span>termkit-ui v0.1.0</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400">Node.js &gt;= 22.0.0</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-semibold">Zero Dependencies</span>
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
            Build interactive command-line applications with reusable prompts, progress indicators, layouts, and terminal components on a shared virtual screen renderer.
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
              <span>npm install termkit-ui</span>
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
            Verified Primitives
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">
            Everything your CLI tool needs
          </p>
          <p className="text-sm text-slate-400">
            Engineered from first principles with zero runtime dependencies.
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
                Single select, multi-select checkboxes, number inputs with arrow stepping, freeform text, and masked password inputs.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-dark-950 border border-dark-850 font-mono text-xs text-slate-300">
              <div className="text-emerald-400 font-bold">? Select region:</div>
              <div className="text-cyan-400 pl-3">❯ US East (Virginia) <span className="text-slate-500 text-[10px]">Default</span></div>
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
                Smooth terminal loading spinners and progress bars with concurrent log coordination and automatic accessible milestone mode in CI.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-dark-950 border border-dark-850 font-mono text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="font-bold">⠋</span>
                <span>Optimizing chunks...</span>
              </div>
              <div className="text-emerald-400">
                [████████████░░░░] 75% (ETA: 4s)
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
                Boxes, Dividers & Tables
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unicode border panels (rounded, double, single, bold, ascii), horizontal dividers, and formatted ANSI tables without CJK/emoji border tearing.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-dark-950 border border-dark-850 font-mono text-[11px] text-cyan-400 whitespace-pre">
{`╭─ TermKit UI ───╮
│ Status: READY  │
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
              Every prompt returns a native standard JavaScript <code className="text-cyan-300 bg-dark-800 px-1 py-0.5 rounded font-mono">Promise</code> that resolves directly to the user's choice. Prompts and spinners route to <code className="text-slate-300">stderr</code> by default so your <code className="text-slate-300">stdout</code> pipeline stays clean.
            </p>
            <ul className="space-y-3 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Zero runtime dependencies</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Fail-safe TerminalGuard restoration on exit / Ctrl+C</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Built-in createTestTerminal() for headless testing</span>
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

      {/* Why TermKit / Comparison Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-dark-900 border border-dark-800 space-y-8">
          <div className="max-w-2xl">
            <Badge variant="green">WHY TERMKIT UI</Badge>
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
                <span>Zero Runtime Dependencies</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Built directly on Node.js core streams and <code className="text-slate-300">Intl.Segmenter</code>. Zero native compilation, sub-millisecond startup, and minimal vulnerability surface.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-dark-950 border border-dark-850">
              <div className="font-bold text-slate-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>TerminalGuard & Signal Safety</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Guarantees terminal raw mode and cursor restoration on exit, normal completion, cancellation, and unhandled exceptions.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-dark-950 border border-dark-850">
              <div className="font-bold text-slate-200 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>OutputCoordinator Log Safety</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Asynchronous worker logs write cleanly above active live regions without tearing running spinners or interactive prompts.
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

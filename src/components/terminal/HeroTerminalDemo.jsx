import React, { useState, useEffect } from 'react';
import { TerminalWindow } from './TerminalWindow';
import { RotateCcw, ArrowRight, Check } from 'lucide-react';

const FRAMEWORKS = [
  { id: 'react', name: 'React 19 + Vite', tag: 'Fast HMR' },
  { id: 'next', name: 'Next.js 15 (App Router)', tag: 'Full-stack' },
  { id: 'vue', name: 'Vue 3 + Vite', tag: 'Progressive' },
  { id: 'svelte', name: 'SvelteKit 2', tag: 'Compiler' },
  { id: 'node', name: 'Node.js REST API', tag: 'Minimal' }
];

const FEATURES = [
  { id: 'ts', label: 'TypeScript', default: true },
  { id: 'tailwind', label: 'Tailwind CSS', default: true },
  { id: 'docker', label: 'Docker Containerfile', default: false },
  { id: 'eslint', label: 'ESLint & Prettier', default: true }
];

export function HeroTerminalDemo({ onExplorePlayground }) {
  const [step, setStep] = useState(1); // 1: framework, 2: features, 3: progress, 4: completed
  const [selectedFwIdx, setSelectedFwIdx] = useState(0);
  const [selectedFeatures, setSelectedFeatures] = useState(['ts', 'tailwind', 'eslint']);
  const [progressPercent, setProgressPercent] = useState(0);
  const [spinnerFrame, setSpinnerFrame] = useState(0);

  const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

  // Handle keyboard navigation for Step 1
  useEffect(() => {
    if (step !== 1) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedFwIdx((prev) => (prev + 1) % FRAMEWORKS.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedFwIdx((prev) => (prev - 1 + FRAMEWORKS.length) % FRAMEWORKS.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        setStep(2);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  // Handle progress animation in Step 3
  useEffect(() => {
    if (step !== 3) return;
    const spinnerTimer = setInterval(() => {
      setSpinnerFrame((prev) => (prev + 1) % SPINNER_FRAMES.length);
    }, 80);

    const progressTimer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => setStep(4), 400);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => {
      clearInterval(spinnerTimer);
      clearInterval(progressTimer);
    };
  }, [step]);

  const toggleFeature = (id) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setStep(1);
    setSelectedFwIdx(0);
    setProgressPercent(0);
  };

  const chosenFramework = FRAMEWORKS[selectedFwIdx];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <TerminalWindow
        title="create-termora-app — ~/projects"
        onReset={handleReset}
        statusText={`Step ${step} of 4 — ${step === 1 ? 'Select framework' : step === 2 ? 'Choose features' : step === 3 ? 'Building' : 'Finished'}`}
        className="border-cyan-500/30 glow-cyan"
      >
        {/* Banner Box */}
        <div className="text-cyan-400 font-mono text-xs sm:text-sm select-none leading-tight mb-4">
          <div>╭──────────────────────────────────────────────────╮</div>
          <div className="flex justify-between px-2">
            <span>│</span>
            <span className="font-bold text-white tracking-widest">TERMORA STUDIO CLI</span>
            <span>│</span>
          </div>
          <div className="flex justify-between px-2 text-slate-400 text-xs">
            <span>│</span>
            <span>Build beautiful CLI applications in JavaScript</span>
            <span>│</span>
          </div>
          <div>╰──────────────────────────────────────────────────╯</div>
        </div>

        {/* Step 1: Framework Select */}
        {step >= 1 && (
          <div className="space-y-2 mb-4 font-mono text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className={step > 1 ? 'text-emerald-400 font-bold' : 'text-emerald-400 font-bold'}>
                {step > 1 ? '✔' : '?'}
              </span>
              <span className="text-slate-200 font-medium">Choose your framework:</span>
              {step > 1 && (
                <span className="text-cyan-400 font-semibold">{chosenFramework.name}</span>
              )}
            </div>

            {step === 1 && (
              <div className="space-y-1 pl-4 my-2">
                {FRAMEWORKS.map((fw, idx) => {
                  const isSelected = selectedFwIdx === idx;
                  return (
                    <div
                      key={fw.id}
                      onClick={() => {
                        setSelectedFwIdx(idx);
                        setStep(2);
                      }}
                      onMouseEnter={() => setSelectedFwIdx(idx)}
                      className={`flex items-center justify-between py-1 px-2.5 rounded cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-cyan-950/60 text-cyan-300 font-semibold border-l-2 border-cyan-400'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-3 ${isSelected ? 'text-cyan-400 font-bold' : 'opacity-0'}`}>❯</span>
                        <span>{fw.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{fw.tag}</span>
                    </div>
                  );
                })}
                <div className="pt-2 text-[11px] text-slate-500">
                  Use <kbd className="px-1 py-0.5 rounded bg-dark-800 text-slate-300">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-dark-800 text-slate-300">↓</kbd> or click · Press <kbd className="px-1 py-0.5 rounded bg-dark-800 text-slate-300">Enter</kbd> to continue
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Feature Multiselect */}
        {step >= 2 && (
          <div className="space-y-2 mb-4 font-mono text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className={step > 2 ? 'text-emerald-400 font-bold' : 'text-emerald-400 font-bold'}>
                {step > 2 ? '✔' : '?'}
              </span>
              <span className="text-slate-200 font-medium">Select toolchain features:</span>
              {step > 2 && (
                <span className="text-cyan-400">{selectedFeatures.join(', ') || 'None'}</span>
              )}
            </div>

            {step === 2 && (
              <div className="space-y-1 pl-4 my-2">
                {FEATURES.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className="flex items-center gap-2.5 py-1 px-2 rounded cursor-pointer hover:bg-dark-800 text-slate-300"
                    >
                      <span className={isChecked ? 'text-cyan-400 font-bold' : 'text-slate-600'}>
                        {isChecked ? '[✔]' : '[ ]'}
                      </span>
                      <span>{feat.label}</span>
                    </div>
                  );
                })}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Click checkboxes to toggle</span>
                  <button
                    onClick={() => setStep(3)}
                    className="px-3 py-1 rounded bg-cyan-500 text-dark-950 text-xs font-semibold hover:bg-cyan-400 transition-colors flex items-center gap-1"
                  >
                    <span>Build Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Spinner & Progress */}
        {step === 3 && (
          <div className="space-y-3 p-3 bg-dark-900/60 rounded border border-dark-800 font-mono text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-cyan-400 font-medium">
              <span className="text-base font-bold">{SPINNER_FRAMES[spinnerFrame]}</span>
              <span>Scaffolding {chosenFramework.name}...</span>
            </div>
            <div className="space-y-1">
              <div className="h-2 w-full bg-dark-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-75"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Installing dependencies</span>
                <span>{progressPercent}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Finished Screen */}
        {step === 4 && (
          <div className="space-y-3 font-mono text-xs sm:text-sm">
            <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-lg text-emerald-300 space-y-1">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <Check className="w-4 h-4" />
                <span>Success! Application created in 1.4s</span>
              </div>
              <p className="text-slate-400 text-xs">
                Initialized {chosenFramework.name} with {selectedFeatures.length} features.
              </p>
            </div>

            <div className="bg-dark-950 p-3 rounded border border-dark-850 text-xs space-y-1 text-slate-300">
              <div className="text-slate-500">// Next steps to start developing:</div>
              <div className="text-cyan-400">$ cd my-cli-app</div>
              <div className="text-cyan-400">$ npm run dev</div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Run demo again</span>
              </button>

              {onExplorePlayground && (
                <button
                  onClick={onExplorePlayground}
                  className="text-xs text-cyan-400 hover:text-cyan-300 underline font-semibold"
                >
                  Open in Playground →
                </button>
              )}
            </div>
          </div>
        )}
      </TerminalWindow>
    </div>
  );
}

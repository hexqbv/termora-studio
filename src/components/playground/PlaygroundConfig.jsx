import React from 'react';
import { Sliders, RotateCcw, Sparkles } from 'lucide-react';

export function PlaygroundConfig({
  component,
  config,
  onChangeConfig,
  onReset
}) {
  const updateField = (key, value) => {
    onChangeConfig({
      ...config,
      [key]: value
    });
  };

  const handleApplyPreset = (preset) => {
    onChangeConfig(preset.config);
  };

  return (
    <div className="w-full lg:w-80 bg-dark-900 border-l border-dark-800 flex flex-col h-full select-none text-xs">
      {/* Header */}
      <div className="p-4 border-b border-dark-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-slate-200 uppercase tracking-wider font-mono">
            Configuration
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 font-mono text-[11px] transition-colors"
          title="Reset to default settings"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Preset bar if presets exist */}
      {component.presets && component.presets.length > 0 && (
        <div className="px-4 py-2.5 bg-dark-950/60 border-b border-dark-800/80">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1.5 text-[11px] font-mono">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Load Preset:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {component.presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset)}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-dark-800 hover:bg-dark-750 text-slate-300 border border-dark-700 transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Controls based on active component */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Message field (common to all prompts) */}
        {config.message !== undefined && (
          <div className="space-y-1">
            <label className="text-slate-400 font-mono text-[11px] block">
              Prompt Message:
            </label>
            <input
              type="text"
              value={config.message}
              onChange={(e) => updateField('message', e.target.value)}
              className="w-full bg-dark-950 border border-dark-750 rounded p-1.5 text-slate-100 font-mono text-xs focus:border-cyan-400 outline-none"
            />
          </div>
        )}

        {/* Number controls: min, max, step */}
        {config.min !== undefined && component.id === 'number' && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 font-mono text-[11px] block">Min:</label>
                <input
                  type="number"
                  value={config.min}
                  onChange={(e) => updateField('min', Number(e.target.value))}
                  className="w-full bg-dark-950 border border-dark-750 rounded p-1.5 text-slate-100 font-mono text-xs focus:border-cyan-400 outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 font-mono text-[11px] block">Max:</label>
                <input
                  type="number"
                  value={config.max}
                  onChange={(e) => updateField('max', Number(e.target.value))}
                  className="w-full bg-dark-950 border border-dark-750 rounded p-1.5 text-slate-100 font-mono text-xs focus:border-cyan-400 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-slate-400 font-mono text-[11px] block">Step:</label>
              <input
                type="number"
                value={config.step}
                onChange={(e) => updateField('step', Number(e.target.value))}
                className="w-full bg-dark-950 border border-dark-750 rounded p-1.5 text-slate-100 font-mono text-xs focus:border-cyan-400 outline-none"
              />
            </div>
          </div>
        )}

        {/* Text field for Box content */}
        {config.content !== undefined && (
          <div className="space-y-1">
            <label className="text-slate-400 font-mono text-[11px] block">
              Box Content:
            </label>
            <textarea
              rows={3}
              value={config.content}
              onChange={(e) => updateField('content', e.target.value)}
              className="w-full bg-dark-950 border border-dark-750 rounded p-1.5 text-slate-100 font-mono text-xs focus:border-cyan-400 outline-none"
            />
          </div>
        )}

        {/* Title for Box, Divider, or Banner */}
        {config.title !== undefined && (
          <div className="space-y-1">
            <label className="text-slate-400 font-mono text-[11px] block">
              Title:
            </label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full bg-dark-950 border border-dark-750 rounded p-1.5 text-slate-100 font-mono text-xs focus:border-cyan-400 outline-none"
            />
          </div>
        )}

        {/* Title Alignment (Box & Divider) */}
        {(config.titleAlign !== undefined || config.titleAlignment !== undefined) && (
          <div className="space-y-1">
            <label className="text-slate-400 font-mono text-[11px] block">
              Title Alignment:
            </label>
            <select
              value={config.titleAlign || config.titleAlignment || 'left'}
              onChange={(e) => {
                updateField('titleAlign', e.target.value);
                updateField('titleAlignment', e.target.value);
              }}
              className="w-full bg-dark-950 border border-dark-750 rounded p-1.5 text-slate-200 font-mono text-xs focus:border-cyan-400 outline-none cursor-pointer"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        )}

        {/* Border Style (for Box & Table) */}
        {config.borderStyle !== undefined && (
          <div className="space-y-1">
            <label className="text-slate-400 font-mono text-[11px] block">
              Border Style:
            </label>
            <select
              value={config.borderStyle}
              onChange={(e) => updateField('borderStyle', e.target.value)}
              className="w-full bg-dark-950 border border-dark-750 rounded p-1.5 text-slate-200 font-mono text-xs focus:border-cyan-400 outline-none cursor-pointer"
            >
              <option value="rounded">Rounded (╭─╮│╰─╯)</option>
              <option value="single">Single (┌─┐│└─┘)</option>
              <option value="double">Double (╔═╗║╚═╝)</option>
              <option value="bold">Bold (┏━┓┃┗━┛)</option>
              <option value="ascii">ASCII (+--+|+-+)</option>
            </select>
          </div>
        )}

        {/* Color picker */}
        {(config.color !== undefined || config.borderColor !== undefined) && (
          <div className="space-y-1">
            <label className="text-slate-400 font-mono text-[11px] block">
              Theme Color:
            </label>
            <select
              value={config.color || config.borderColor || 'cyan'}
              onChange={(e) => {
                if (config.color !== undefined) updateField('color', e.target.value);
                if (config.borderColor !== undefined) updateField('borderColor', e.target.value);
              }}
              className="w-full bg-dark-950 border border-dark-750 rounded p-1.5 text-slate-200 font-mono text-xs focus:border-cyan-400 outline-none cursor-pointer"
            >
              <option value="cyan">Cyan</option>
              <option value="green">Green (Emerald)</option>
              <option value="yellow">Yellow (Amber)</option>
              <option value="red">Red</option>
              <option value="magenta">Magenta</option>
              <option value="blue">Blue</option>
              <option value="white">White</option>
              <option value="dim">Dim / Muted</option>
            </select>
          </div>
        )}

        {/* Loop toggle for select */}
        {config.loop !== undefined && (
          <div className="flex items-center justify-between p-2 rounded bg-dark-950 border border-dark-800">
            <span className="text-slate-300 font-mono text-[11px]">Loop Selection:</span>
            <input
              type="checkbox"
              checked={config.loop}
              onChange={(e) => updateField('loop', e.target.checked)}
              className="accent-cyan-400 cursor-pointer"
            />
          </div>
        )}

        {/* Box Padding */}
        {config.padding !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Inner Padding:</span>
              <span>{config.padding} row(s)</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              value={config.padding}
              onChange={(e) => updateField('padding', Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        )}

        {/* Progress Bar Total & Width */}
        {config.total !== undefined && (
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="text-slate-400 font-mono text-[11px] block">
                Total Steps:
              </label>
              <input
                type="number"
                min="10"
                max="200"
                value={config.total}
                onChange={(e) => updateField('total', Number(e.target.value))}
                className="w-full bg-dark-950 border border-dark-750 rounded p-1.5 text-slate-100 font-mono text-xs focus:border-cyan-400 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-400 font-mono text-[11px] block">
                Bar Width (columns):
              </label>
              <input
                type="number"
                min="15"
                max="50"
                value={config.width}
                onChange={(e) => updateField('width', Number(e.target.value))}
                className="w-full bg-dark-950 border border-dark-750 rounded p-1.5 text-slate-100 font-mono text-xs focus:border-cyan-400 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-dark-950 border-t border-dark-800 text-[11px] text-slate-500 font-mono">
        Changes automatically synchronize with terminal preview & verified package code output.
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';

export function SelectRenderer({ config }) {
  const {
    message = 'Choose an option',
    options = [],
    pointer = '❯',
    loop = true
  } = config;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [submittedValue, setSubmittedValue] = useState(null);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (submittedValue !== null) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % options.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + options.length) % options.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (options[selectedIndex]) {
          setSubmittedValue(options[selectedIndex].label || options[selectedIndex].value);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options, selectedIndex, submittedValue]);

  if (submittedValue !== null) {
    return (
      <div className="font-mono text-sm space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">✔</span>
          <span className="text-slate-300 font-medium">{message}:</span>
          <span className="text-cyan-400 font-semibold">{submittedValue}</span>
        </div>
        <div className="pt-2">
          <button
            onClick={() => setSubmittedValue(null)}
            className="text-xs text-slate-500 hover:text-cyan-400 underline font-mono"
          >
            Reset choice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-mono text-sm space-y-3">
      {/* Question prompt */}
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 font-bold">?</span>
        <span className="text-slate-200 font-medium">{message}</span>
        <span className="text-xs text-slate-500">(Use arrow keys or click)</span>
      </div>

      {/* Options list */}
      <div className="space-y-1 pl-4">
        {options.map((opt, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <div
              key={idx}
              onClick={() => {
                setSelectedIndex(idx);
                setSubmittedValue(opt.label || opt.value);
              }}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors ${
                isSelected
                  ? 'text-cyan-300 bg-cyan-950/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`w-3 text-center ${isSelected ? 'text-cyan-400 font-bold' : 'opacity-0'}`}>
                {pointer}
              </span>
              <span>{opt.label || opt.value}</span>
            </div>
          );
        })}
      </div>

      <div className="text-[11px] text-slate-500 pt-2 border-t border-dark-800">
        Press <kbd className="px-1 py-0.5 rounded bg-dark-800 border border-dark-700 text-slate-300">Enter</kbd> to confirm selection
      </div>
    </div>
  );
}

export function InputRenderer({ config }) {
  const {
    message = 'Enter value',
    default: defaultValue = '',
    placeholder = 'Type here...',
    validate = 'none'
  } = config;

  const [value, setValue] = useState(defaultValue);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (validate === 'required' && !value.trim()) {
        setError('Value cannot be empty');
        return;
      }
      if (validate === 'numeric' && isNaN(Number(value))) {
        setError('Value must be a valid number');
        return;
      }
      setError(null);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="font-mono text-sm space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">✔</span>
          <span className="text-slate-300 font-medium">{message}:</span>
          <span className="text-cyan-400 font-semibold">{value || defaultValue}</span>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-slate-500 hover:text-cyan-400 underline font-mono"
        >
          Edit input
        </button>
      </div>
    );
  }

  return (
    <div className="font-mono text-sm space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 font-bold">?</span>
        <span className="text-slate-200 font-medium">{message}</span>
        {defaultValue && (
          <span className="text-slate-500 text-xs">({defaultValue})</span>
        )}
      </div>

      <div className="flex items-center gap-2 pl-4">
        <span className="text-cyan-400 font-bold">❯</span>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="bg-transparent border-b border-dark-700 focus:border-cyan-400 text-slate-100 px-1 py-0.5 outline-none font-mono text-sm w-full max-w-sm transition-colors"
          autoFocus
        />
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-400 pl-4">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="text-[11px] text-slate-500 pt-2 border-t border-dark-800">
        Press <kbd className="px-1 py-0.5 rounded bg-dark-800 border border-dark-700 text-slate-300">Enter</kbd> to submit
      </div>
    </div>
  );
}

export function MultiSelectRenderer({ config }) {
  const {
    message = 'Select options',
    options = [],
    min = 0,
    max = 10
  } = config;

  const [selectedValues, setSelectedValues] = useState(() =>
    options.filter(o => o.checked).map(o => o.value)
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (submitted) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % options.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
      } else if (e.key === ' ') {
        e.preventDefault();
        const currentVal = options[activeIndex]?.value;
        if (currentVal) toggleOption(currentVal);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        setSubmitted(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options, activeIndex, selectedValues, submitted]);

  const toggleOption = (val) => {
    setSelectedValues((prev) => {
      if (prev.includes(val)) {
        return prev.filter(v => v !== val);
      } else {
        if (prev.length >= max) return prev;
        return [...prev, val];
      }
    });
  };

  if (submitted) {
    return (
      <div className="font-mono text-sm space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">✔</span>
          <span className="text-slate-300 font-medium">{message}:</span>
          <span className="text-cyan-400 font-semibold">{selectedValues.join(', ') || 'None'}</span>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-slate-500 hover:text-cyan-400 underline font-mono"
        >
          Change selections
        </button>
      </div>
    );
  }

  return (
    <div className="font-mono text-sm space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 font-bold">?</span>
        <span className="text-slate-200 font-medium">{message}</span>
        <span className="text-xs text-slate-500">(Press Space to select, Enter to finish)</span>
      </div>

      <div className="space-y-1 pl-4">
        {options.map((opt, idx) => {
          const isFocused = activeIndex === idx;
          const isChecked = selectedValues.includes(opt.value);
          return (
            <div
              key={idx}
              onClick={() => toggleOption(opt.value)}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`flex items-center gap-2.5 py-1 px-2 rounded cursor-pointer transition-colors ${
                isFocused ? 'bg-dark-800/80 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`w-3 text-center text-xs ${isFocused ? 'text-cyan-400 font-bold' : 'opacity-0'}`}>
                ❯
              </span>
              <span className={isChecked ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                {isChecked ? '[✔]' : '[ ]'}
              </span>
              <span className={isChecked ? 'text-slate-100 font-medium' : 'text-slate-300'}>
                {opt.label || opt.value}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-dark-800">
        <div>Selected: {selectedValues.length} item(s)</div>
        <div>Min: {min} · Max: {max}</div>
      </div>
    </div>
  );
}

export function ConfirmRenderer({ config }) {
  const { message = 'Are you sure you want to proceed?', default: def = false } = config;
  const [choice, setChoice] = useState(def);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (submitted) return;
      if (e.key === 'y' || e.key === 'Y') {
        setChoice(true);
        setSubmitted(true);
      } else if (e.key === 'n' || e.key === 'N') {
        setChoice(false);
        setSubmitted(true);
      } else if (e.key === 'Enter') {
        setSubmitted(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [choice, submitted]);

  return (
    <div className="font-mono text-sm space-y-3">
      <div className="flex items-center gap-2">
        <span className={submitted ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
          {submitted ? '✔' : '?'}
        </span>
        <span className="text-slate-200 font-medium">{message}</span>
        {!submitted && (
          <span className="text-xs text-slate-400">
            ({def ? 'Y/n' : 'y/N'})
          </span>
        )}
        {submitted && (
          <span className={choice ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
            {choice ? 'yes' : 'no'}
          </span>
        )}
      </div>

      {!submitted ? (
        <div className="flex items-center gap-2 pl-4">
          <button
            onClick={() => { setChoice(true); setSubmitted(true); }}
            className={`px-3 py-1 rounded text-xs border font-mono transition-colors ${
              choice ? 'bg-cyan-950 text-cyan-300 border-cyan-800' : 'bg-dark-800 text-slate-400 border-dark-700'
            }`}
          >
            Yes (y)
          </button>
          <button
            onClick={() => { setChoice(false); setSubmitted(true); }}
            className={`px-3 py-1 rounded text-xs border font-mono transition-colors ${
              !choice ? 'bg-cyan-950 text-cyan-300 border-cyan-800' : 'bg-dark-800 text-slate-400 border-dark-700'
            }`}
          >
            No (n)
          </button>
        </div>
      ) : (
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-slate-500 hover:text-cyan-400 underline font-mono"
        >
          Reset prompt
        </button>
      )}
    </div>
  );
}

export function PasswordRenderer({ config }) {
  const { message = 'Enter password', mask = '•' } = config;
  const [val, setVal] = useState('supersecret123');
  const [showPlain, setShowPlain] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="font-mono text-sm space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 font-bold">{submitted ? '✔' : '?'}</span>
        <span className="text-slate-200 font-medium">{message}</span>
      </div>

      <div className="flex items-center gap-3 pl-4">
        <span className="text-cyan-400 font-bold">❯</span>
        <div className="flex items-center gap-2 bg-dark-900 border border-dark-750 px-3 py-1 rounded">
          <input
            type={showPlain ? 'text' : 'password'}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="bg-transparent text-slate-100 font-mono text-sm outline-none w-48"
          />
          <button
            onClick={() => setShowPlain(!showPlain)}
            className="text-slate-400 hover:text-slate-200 p-0.5"
            title="Toggle reveal"
          >
            {showPlain ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <div className="text-[11px] text-slate-500 pl-4">
        Characters are masked with '{mask}' in standard terminal stdout.
      </div>
    </div>
  );
}

export function AutocompleteRenderer({ config }) {
  const { message = 'Search options', options = [], limit = 5 } = config;
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = options.filter(o => o.toLowerCase().includes(query.toLowerCase())).slice(0, limit);

  return (
    <div className="font-mono text-sm space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 font-bold">{selected ? '✔' : '?'}</span>
        <span className="text-slate-200 font-medium">{message}:</span>
        {selected && <span className="text-cyan-400 font-semibold">{selected}</span>}
      </div>

      {!selected && (
        <div className="space-y-2 pl-4">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">❯</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to filter..."
              className="bg-dark-900 border border-dark-750 px-2 py-1 rounded text-slate-100 text-xs w-60 outline-none focus:border-cyan-400"
            />
          </div>

          <div className="border border-dark-800 rounded bg-dark-900/50 p-1 space-y-0.5 max-w-xs">
            {filtered.length > 0 ? (
              filtered.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelected(item)}
                  className="px-2 py-1 text-xs text-slate-300 hover:text-cyan-300 hover:bg-dark-800 rounded cursor-pointer transition-colors"
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="text-xs text-slate-500 p-1">No matching results</div>
            )}
          </div>
        </div>
      )}

      {selected && (
        <button
          onClick={() => setSelected(null)}
          className="text-xs text-slate-500 hover:text-cyan-400 underline font-mono"
        >
          Clear choice
        </button>
      )}
    </div>
  );
}

export function BannerRenderer({ config }) {
  const { title = 'TERMORA', subtitle = 'CLI Toolkit', badge = 'v1.0.0', theme = 'cyan' } = config;

  return (
    <div className="font-mono text-center py-6 px-4 rounded-lg border border-dark-750 bg-gradient-to-b from-dark-900 to-dark-950 select-text">
      <div className="text-xs text-cyan-400 tracking-widest uppercase mb-1 font-semibold">
        [ {badge} ]
      </div>
      <div className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 mb-2">
        {title}
      </div>
      <div className="text-xs text-slate-400 font-mono tracking-wide">
        {subtitle}
      </div>
      <div className="mt-4 text-[11px] text-slate-600">
        ─────────────────────────────────────────────
      </div>
    </div>
  );
}

export function ColorsRenderer({ config }) {
  const { text = 'Termora Terminal Colors' } = config;

  return (
    <div className="font-mono text-xs space-y-4">
      <div className="text-slate-400 mb-2">ANSI 16-Color Palette Matrix:</div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="p-2 rounded bg-dark-900 border border-dark-800 text-cyan-400">
          colors.cyan("{text}")
        </div>
        <div className="p-2 rounded bg-dark-900 border border-dark-800 text-emerald-400">
          colors.green("{text}")
        </div>
        <div className="p-2 rounded bg-dark-900 border border-dark-800 text-amber-400">
          colors.yellow("{text}")
        </div>
        <div className="p-2 rounded bg-dark-900 border border-dark-800 text-red-400">
          colors.red("{text}")
        </div>
        <div className="p-2 rounded bg-dark-900 border border-dark-800 text-pink-400">
          colors.magenta("{text}")
        </div>
        <div className="p-2 rounded bg-dark-900 border border-dark-800 text-blue-400">
          colors.blue("{text}")
        </div>
        <div className="p-2 rounded bg-dark-900 border border-dark-800 text-white font-bold">
          colors.bold("{text}")
        </div>
        <div className="p-2 rounded bg-dark-900 border border-dark-800 text-slate-500 italic">
          colors.dim.italic("{text}")
        </div>
      </div>
    </div>
  );
}
